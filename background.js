// Store detected m3u8 URLs by tab
const detectedM3U8s = new Map();

// Listen for web requests to detect m3u8 files
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const url = details.url;

    // Check if URL contains .m3u8
    if (url.includes('.m3u8')) {
      const tabId = details.tabId;

      // Don't track requests from the extension itself
      if (tabId < 0) return;

      // Get existing URLs for this tab or create new array
      if (!detectedM3U8s.has(tabId)) {
        detectedM3U8s.set(tabId, []);
      }

      const tabUrls = detectedM3U8s.get(tabId);

      // Add URL if not already present
      if (!tabUrls.some(item => item.url === url)) {
        tabUrls.push({
          url: url,
          timestamp: Date.now(),
          tabUrl: details.initiator || 'unknown'
        });

        // Keep only last 10 URLs per tab
        if (tabUrls.length > 10) {
          tabUrls.shift();
        }

        console.log('Detected M3U8:', url);

        // Update badge to show count
        chrome.action.setBadgeText({
          text: tabUrls.length.toString(),
          tabId: tabId
        });
        chrome.action.setBadgeBackgroundColor({
          color: '#4CAF50',
          tabId: tabId
        });
      }
    }
  },
  { urls: ["<all_urls>"] }
);

// Clean up when tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
  detectedM3U8s.delete(tabId);
});

// Clean up when tab is updated (navigated to new page)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading' && changeInfo.url) {
    detectedM3U8s.delete(tabId);
    chrome.action.setBadgeText({ text: '', tabId: tabId });
  }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'downloadM3U8') {
    handleM3U8Download(
      request.url,
      request.fileName,
      request.autoSave || false,
      request.fileFormat || 'ts'
    )
      .then(() => {
        sendResponse({ success: true });
      })
      .catch((error) => {
        sendResponse({ success: false, error: error.message });
      });
    return true; // Keep the message channel open for async response
  } else if (request.action === 'getDetectedM3U8s') {
    // Get detected URLs for current tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        const tabId = tabs[0].id;
        const urls = detectedM3U8s.get(tabId) || [];
        sendResponse({ urls: urls });
      } else {
        sendResponse({ urls: [] });
      }
    });
    return true;
  } else if (request.action === 'clearDetected') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        const tabId = tabs[0].id;
        detectedM3U8s.delete(tabId);
        chrome.action.setBadgeText({ text: '', tabId: tabId });
        sendResponse({ success: true });
      }
    });
    return true;
  }
});

async function handleM3U8Download(m3u8Url, fileName, autoSave, fileFormat) {
  try {
    // Fetch the m3u8 playlist
    sendProgressUpdate(5, 'Fetching M3U8 playlist...');
    const playlistResponse = await fetch(m3u8Url);
    if (!playlistResponse.ok) {
      throw new Error(`Failed to fetch M3U8: ${playlistResponse.status}`);
    }

    const playlistText = await playlistResponse.text();
    sendProgressUpdate(10, 'Parsing playlist...');

    // Parse the m3u8 file to get segment URLs (handles master playlists)
    const segments = await parseM3U8WithMaster(playlistText, m3u8Url);

    if (segments.length === 0) {
      throw new Error('No video segments found in M3U8 file');
    }

    sendProgressUpdate(15, `Found ${segments.length} segments. Downloading...`);

    // Download all segments
    const segmentBlobs = [];
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      try {
        const progress = 15 + (70 * (i / segments.length));
        sendProgressUpdate(progress, `Downloading segment ${i + 1}/${segments.length}...`);

        const response = await fetch(segment);
        if (!response.ok) {
          console.warn(`Failed to fetch segment ${i + 1}: ${response.status}`);
          continue;
        }

        const blob = await response.blob();
        segmentBlobs.push(blob);
      } catch (error) {
        console.warn(`Error downloading segment ${i + 1}:`, error);
      }
    }

    if (segmentBlobs.length === 0) {
      throw new Error('Failed to download any segments');
    }

    sendProgressUpdate(85, 'Merging segments...');

    // Merge all segments into one blob
    const mergedBlob = new Blob(segmentBlobs, { type: 'video/mp2t' });

    sendProgressUpdate(90, 'Preparing download...');

    // Convert blob to data URL (service workers don't support URL.createObjectURL)
    const dataUrl = await blobToDataURL(mergedBlob);

    sendProgressUpdate(95, 'Starting download...');

    // Determine file extension based on format
    const extension = fileFormat === 'mp4' ? 'mp4' : 'ts';

    // Trigger download with data URL
    const downloadId = await chrome.downloads.download({
      url: dataUrl,
      filename: `${fileName}.${extension}`,
      saveAs: !autoSave  // If autoSave is true, don't show save dialog
    });

    sendProgressUpdate(100, 'Download complete!');

    // Send completion message
    chrome.runtime.sendMessage({
      action: 'downloadComplete',
      message: `Successfully downloaded ${segmentBlobs.length} segments!`
    });

  } catch (error) {
    console.error('Download error:', error);
    chrome.runtime.sendMessage({
      action: 'downloadError',
      error: error.message
    });
    throw error;
  }
}

async function parseM3U8WithMaster(content, baseUrl) {
  // First, check if this is a master playlist
  const lines = content.split('\n').map(line => line.trim());
  const variantPlaylists = [];

  // Get base URL for relative paths
  const baseUrlObj = new URL(baseUrl);
  const basePath = baseUrl.substring(0, baseUrl.lastIndexOf('/') + 1);

  // Check for master playlist indicators
  let isMasterPlaylist = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Master playlists have #EXT-X-STREAM-INF tags
    if (line.startsWith('#EXT-X-STREAM-INF')) {
      isMasterPlaylist = true;
      // The next non-comment line is the variant playlist URL
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j] && !lines[j].startsWith('#')) {
          const variantUrl = resolveUrl(lines[j], basePath, baseUrlObj);
          variantPlaylists.push(variantUrl);
          break;
        }
      }
    }
  }

  // If it's a master playlist, fetch the first variant
  if (isMasterPlaylist && variantPlaylists.length > 0) {
    console.log('Master playlist detected, fetching variant:', variantPlaylists[0]);
    sendProgressUpdate(12, 'Fetching variant playlist...');

    try {
      const variantResponse = await fetch(variantPlaylists[0]);
      if (!variantResponse.ok) {
        console.warn('Failed to fetch variant, trying direct parse');
        return parseM3U8(content, baseUrl);
      }

      const variantText = await variantResponse.text();
      return parseM3U8(variantText, variantPlaylists[0]);
    } catch (error) {
      console.warn('Error fetching variant playlist:', error);
      return parseM3U8(content, baseUrl);
    }
  }

  // Not a master playlist, parse directly
  return parseM3U8(content, baseUrl);
}

function parseM3U8(content, baseUrl) {
  const lines = content.split('\n').map(line => line.trim());
  const segments = [];

  // Get base URL for relative paths
  const baseUrlObj = new URL(baseUrl);
  const basePath = baseUrl.substring(0, baseUrl.lastIndexOf('/') + 1);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip comments and empty lines, but not segment URLs
    if (!line || line.startsWith('#EXT')) {
      continue;
    }

    // If it's a master playlist with other m3u8 files, we need to handle that
    if (line.includes('.m3u8')) {
      // This is a master playlist pointing to other playlists
      // We'll take the first variant for simplicity
      const variantUrl = resolveUrl(line, basePath, baseUrlObj);
      console.log('Found variant playlist:', variantUrl);
      // Note: In a real implementation, we'd recursively fetch this
      // For now, we'll just note it
      continue;
    }

    // Check if this is a segment URL (typically .ts files or URLs without #)
    if (line && !line.startsWith('#')) {
      const segmentUrl = resolveUrl(line, basePath, baseUrlObj);
      segments.push(segmentUrl);
    }
  }

  return segments;
}

function resolveUrl(url, basePath, baseUrlObj) {
  // If it's already an absolute URL, return it
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // If it starts with /, it's relative to the domain
  if (url.startsWith('/')) {
    return `${baseUrlObj.protocol}//${baseUrlObj.host}${url}`;
  }

  // Otherwise, it's relative to the base path
  return basePath + url;
}

function sendProgressUpdate(progress, message) {
  chrome.runtime.sendMessage({
    action: 'downloadProgress',
    progress: progress,
    message: message
  }).catch(() => {
    // Ignore errors if popup is closed
  });
}

async function blobToDataURL(blob) {
  // Convert blob to ArrayBuffer
  const arrayBuffer = await blob.arrayBuffer();

  // Convert ArrayBuffer to base64
  // For large files, we need to process in chunks to avoid call stack issues
  const uint8Array = new Uint8Array(arrayBuffer);
  const chunkSize = 8192; // Process 8KB at a time
  let binary = '';

  for (let i = 0; i < uint8Array.length; i += chunkSize) {
    const chunk = uint8Array.subarray(i, Math.min(i + chunkSize, uint8Array.length));
    binary += String.fromCharCode.apply(null, chunk);
  }

  const base64 = btoa(binary);
  return `data:${blob.type || 'application/octet-stream'};base64,${base64}`;
}
