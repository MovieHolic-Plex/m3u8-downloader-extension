// Content script to scan page for video URLs

const VIDEO_EXTENSIONS = ['.m3u8', '.mp4', '.webm', '.avi', '.mov', '.mkv', '.flv', '.wmv', '.m4v', '.mpg', '.mpeg', '.3gp'];

// Check if URL is a video file
function isVideoUrl(url) {
  if (!url) return false;
  const urlLower = url.toLowerCase();
  return VIDEO_EXTENSIONS.some(ext => urlLower.includes(ext));
}

// Extract all video URLs from the page
function scanPageForVideos() {
  const foundVideos = [];
  const uniqueUrls = new Set();

  try {
    // 1. Scan all <video> elements
    const videoElements = document.querySelectorAll('video');
    videoElements.forEach(video => {
      // Check src attribute
      if (video.src && isVideoUrl(video.src)) {
        uniqueUrls.add(video.src);
      }

      // Check currentSrc
      if (video.currentSrc && isVideoUrl(video.currentSrc)) {
        uniqueUrls.add(video.currentSrc);
      }

      // Check <source> children
      const sources = video.querySelectorAll('source');
      sources.forEach(source => {
        if (source.src && isVideoUrl(source.src)) {
          uniqueUrls.add(source.src);
        }
      });

      // Check data attributes
      Object.keys(video.dataset).forEach(key => {
        const value = video.dataset[key];
        if (isVideoUrl(value)) {
          uniqueUrls.add(value);
        }
      });
    });

    // 2. Scan all <source> elements (might be outside video tags)
    const sourceElements = document.querySelectorAll('source');
    sourceElements.forEach(source => {
      if (source.src && isVideoUrl(source.src)) {
        uniqueUrls.add(source.src);
      }
    });

    // 3. Scan all <a> links pointing to video files
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
      if (isVideoUrl(link.href)) {
        uniqueUrls.add(link.href);
      }
    });

    // 4. Scan for URLs in data attributes of any element
    const elementsWithData = document.querySelectorAll('[data-src], [data-video], [data-url], [data-file]');
    elementsWithData.forEach(element => {
      ['data-src', 'data-video', 'data-url', 'data-file'].forEach(attr => {
        const value = element.getAttribute(attr);
        if (value && isVideoUrl(value)) {
          uniqueUrls.add(value);
        }
      });
    });

    // 5. Scan all iframes for video content
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      if (iframe.src && isVideoUrl(iframe.src)) {
        uniqueUrls.add(iframe.src);
      }
    });

    // 6. Search in page text for video URLs (common in streaming sites)
    const scripts = document.querySelectorAll('script:not([src])');
    scripts.forEach(script => {
      const content = script.textContent;
      // Look for URLs in script content
      const urlRegex = /(https?:\/\/[^\s"'<>]+\.(m3u8|mp4|webm|avi|mov|mkv|flv|wmv|m4v|mpg|mpeg|3gp)[^\s"'<>]*)/gi;
      const matches = content.match(urlRegex);
      if (matches) {
        matches.forEach(url => uniqueUrls.add(url));
      }
    });

    // Convert to array with metadata
    uniqueUrls.forEach(url => {
      foundVideos.push({
        url: url,
        timestamp: Date.now(),
        source: 'page-scan',
        type: getVideoType(url)
      });
    });

  } catch (error) {
    console.error('Error scanning page for videos:', error);
  }

  return foundVideos;
}

// Get video type from URL
function getVideoType(url) {
  const urlLower = url.toLowerCase();
  if (urlLower.includes('.m3u8')) return 'm3u8';
  if (urlLower.includes('.mp4')) return 'mp4';
  if (urlLower.includes('.webm')) return 'webm';
  return 'video';
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scanPage') {
    const videos = scanPageForVideos();
    sendResponse({ videos: videos });
  }
  return true;
});

// Auto-scan on page load
window.addEventListener('load', () => {
  // Wait a bit for dynamic content to load
  setTimeout(() => {
    const videos = scanPageForVideos();
    if (videos.length > 0) {
      // Send to background script
      chrome.runtime.sendMessage({
        action: 'videosFound',
        videos: videos
      });
    }
  }, 2000);
});

// Watch for new video elements being added (for dynamic sites)
const observer = new MutationObserver((mutations) => {
  let shouldRescan = false;

  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1) { // Element node
        if (node.tagName === 'VIDEO' || node.tagName === 'SOURCE' ||
            (node.tagName === 'A' && isVideoUrl(node.href))) {
          shouldRescan = true;
        }
      }
    });
  });

  if (shouldRescan) {
    setTimeout(() => {
      const videos = scanPageForVideos();
      if (videos.length > 0) {
        chrome.runtime.sendMessage({
          action: 'videosFound',
          videos: videos
        });
      }
    }, 500);
  }
});

// Start observing
observer.observe(document.body, {
  childList: true,
  subtree: true
});

console.log('M3U8 Video Downloader: Content script loaded');
