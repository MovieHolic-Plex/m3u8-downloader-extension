// Global language variable
let currentLang = 'en';

// Apply translations to UI
function applyTranslations(lang) {
  currentLang = lang;

  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = t(key, lang);
  });

  // Update elements with data-i18n-html attribute (for HTML content)
  document.querySelectorAll('[data-i18n-html]').forEach(element => {
    const key = element.getAttribute('data-i18n-html');
    element.innerHTML = t(key, lang);
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    element.placeholder = t(key, lang);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const downloadBtn = document.getElementById('downloadBtn');
  const m3u8UrlInput = document.getElementById('m3u8Url');
  const fileNameInput = document.getElementById('fileName');
  const statusDiv = document.getElementById('status');
  const progressContainer = document.getElementById('progressContainer');
  const progressFill = document.getElementById('progressFill');
  const detectedList = document.getElementById('detectedList');
  const detectedCount = document.getElementById('detectedCount');
  const clearBtn = document.getElementById('clearBtn');
  const autoSaveCheckbox = document.getElementById('autoSave');
  const fileFormatSelect = document.getElementById('fileFormat');
  const languageSelect = document.getElementById('language');
  const scanBtn = document.getElementById('scanBtn');

  // Load detected M3U8 URLs
  loadDetectedUrls();

  // Load saved settings from storage
  chrome.storage.local.get(['lastUrl', 'autoSave', 'fileFormat', 'language'], function(result) {
    if (result.lastUrl) {
      m3u8UrlInput.value = result.lastUrl;
    }
    if (result.autoSave !== undefined) {
      autoSaveCheckbox.checked = result.autoSave;
    }
    if (result.fileFormat) {
      fileFormatSelect.value = result.fileFormat;
    }

    // Load language or detect browser language
    const savedLang = result.language || getBrowserLanguage();
    languageSelect.value = savedLang;
    applyTranslations(savedLang);
  });

  // Save settings when changed
  autoSaveCheckbox.addEventListener('change', function() {
    chrome.storage.local.set({ autoSave: autoSaveCheckbox.checked });
  });

  fileFormatSelect.addEventListener('change', function() {
    chrome.storage.local.set({ fileFormat: fileFormatSelect.value });
  });

  // Language selection
  languageSelect.addEventListener('change', function() {
    const selectedLang = languageSelect.value;
    chrome.storage.local.set({ language: selectedLang });
    applyTranslations(selectedLang);

    // Reload detected URLs to update time strings
    loadDetectedUrls();
  });

  // Clear detected URLs
  clearBtn.addEventListener('click', function() {
    chrome.runtime.sendMessage({ action: 'clearDetected' }, function(response) {
      if (response.success) {
        loadDetectedUrls();
      }
    });
  });

  // Scan page for videos
  scanBtn.addEventListener('click', function() {
    scanBtn.disabled = true;
    scanBtn.textContent = '⏳ Scanning...';

    chrome.runtime.sendMessage({ action: 'scanPageNow' }, function(response) {
      scanBtn.disabled = false;
      scanBtn.textContent = '🔍 Scan';

      if (response && response.success) {
        showStatus(`Found ${response.count} video(s) on page!`, 'success');
        loadDetectedUrls();
      } else {
        showStatus('No videos found on page', 'info');
      }
    });
  });

  downloadBtn.addEventListener('click', async function() {
    const m3u8Url = m3u8UrlInput.value.trim();
    let fileName = fileNameInput.value.trim();
    const autoSave = autoSaveCheckbox.checked;
    const fileFormat = fileFormatSelect.value;

    if (!m3u8Url) {
      showStatus(t('errorNoUrl', currentLang), 'error');
      return;
    }

    // Check if URL is valid video URL
    const videoExtensions = ['.m3u8', '.mp4', '.webm', '.avi', '.mov', '.mkv', '.flv', '.wmv', '.m4v', '.mpg', '.mpeg', '.3gp'];
    const isValidVideo = videoExtensions.some(ext => m3u8Url.toLowerCase().includes(ext));

    if (!isValidVideo) {
      showStatus(t('errorInvalidUrl', currentLang), 'error');
      return;
    }

    // Generate filename if empty
    if (!fileName) {
      const now = new Date();
      const timestamp = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}_${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}${String(now.getSeconds()).padStart(2,'0')}`;
      fileName = `video_${timestamp}`;
    }

    // Save URL for next time
    chrome.storage.local.set({ lastUrl: m3u8Url });

    // Disable button and show progress
    downloadBtn.disabled = true;
    downloadBtn.textContent = t('downloading', currentLang);
    progressContainer.style.display = 'block';
    showStatus(t('statusStarting', currentLang), 'info');

    try {
      // Send message to background script
      chrome.runtime.sendMessage({
        action: 'downloadM3U8',
        url: m3u8Url,
        fileName: fileName,
        autoSave: autoSave,
        fileFormat: fileFormat
      }, function(response) {
        if (response.success) {
          showStatus(t('statusSuccess', currentLang), 'success');
        } else {
          showStatus(t('errorPrefix', currentLang) + response.error, 'error');
          downloadBtn.disabled = false;
          downloadBtn.textContent = t('downloadBtn', currentLang);
          progressContainer.style.display = 'none';
        }
      });

      // Listen for progress updates
      chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action === 'downloadProgress') {
          updateProgress(request.progress, request.message);
        } else if (request.action === 'downloadComplete') {
          showStatus(request.message, 'success');
          downloadBtn.disabled = false;
          downloadBtn.textContent = t('downloadBtn', currentLang);
          progressContainer.style.display = 'none';
        } else if (request.action === 'downloadError') {
          showStatus(t('errorPrefix', currentLang) + request.error, 'error');
          downloadBtn.disabled = false;
          downloadBtn.textContent = t('downloadBtn', currentLang);
          progressContainer.style.display = 'none';
        }
      });

    } catch (error) {
      showStatus(t('errorPrefix', currentLang) + error.message, 'error');
      downloadBtn.disabled = false;
      downloadBtn.textContent = t('downloadBtn', currentLang);
      progressContainer.style.display = 'none';
    }
  });

  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = type;
    statusDiv.style.display = 'block';
  }

  function updateProgress(progress, message) {
    const percentage = Math.round(progress);
    progressFill.style.width = percentage + '%';
    progressFill.textContent = percentage + '%';
    if (message) {
      showStatus(message, 'info');
    }
  }

  function loadDetectedUrls() {
    chrome.runtime.sendMessage({ action: 'getDetectedM3U8s' }, function(response) {
      if (response && response.urls && response.urls.length > 0) {
        displayDetectedUrls(response.urls);
      } else {
        displayNoDetected();
      }
    });
  }

  function displayDetectedUrls(urls) {
    detectedCount.textContent = `(${urls.length})`;
    detectedList.innerHTML = '';

    urls.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'detected-item';

      const urlDiv = document.createElement('div');
      urlDiv.className = 'detected-url';

      // Shorten URL for display
      const displayUrl = item.url.length > 80
        ? item.url.substring(0, 77) + '...'
        : item.url;
      urlDiv.textContent = displayUrl;
      urlDiv.title = item.url; // Show full URL on hover

      const timeDiv = document.createElement('div');
      timeDiv.className = 'detected-time';
      timeDiv.textContent = formatTime(item.timestamp);

      itemDiv.appendChild(urlDiv);
      itemDiv.appendChild(timeDiv);

      // Click to select this URL
      itemDiv.addEventListener('click', function() {
        m3u8UrlInput.value = item.url;

        // Visual feedback
        itemDiv.style.backgroundColor = '#4CAF50';
        itemDiv.style.color = 'white';
        setTimeout(() => {
          itemDiv.style.backgroundColor = '';
          itemDiv.style.color = '';
        }, 300);

        showStatus(t('statusUrlSelected', currentLang), 'success');
      });

      detectedList.appendChild(itemDiv);
    });
  }

  function displayNoDetected() {
    detectedCount.textContent = '(0)';
    detectedList.innerHTML = `<div class="no-detected">${t('noDetected', currentLang)}</div>`;
  }

  function formatTime(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) {
      return `${seconds} ${t('timeSecondsAgo', currentLang)}`;
    } else if (minutes < 60) {
      return `${minutes} ${t('timeMinutesAgo', currentLang)}`;
    } else if (hours < 24) {
      return `${hours} ${t('timeHoursAgo', currentLang)}`;
    } else {
      return new Date(timestamp).toLocaleString();
    }
  }
});
