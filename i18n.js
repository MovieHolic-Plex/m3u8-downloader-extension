// Internationalization (i18n) for M3U8 Video Downloader

const translations = {
  en: {
    extensionName: 'M3U8 Video Downloader',
    extensionDesc: 'Download m3u8 streaming videos easily',

    // Main UI
    title: 'M3U8 Video Downloader',
    detectedSection: 'Detected Videos on page',
    scanBtn: '🔍 Scan',
    clearBtn: 'Clear',
    noDetected: 'No videos detected on this page.<br>Click Scan or play a video to detect automatically.',

    // Input fields
    urlLabel: 'M3U8 URL (Manual Input):',
    urlPlaceholder: 'https://example.com/video.m3u8',
    fileNameLabel: 'Filename (optional):',
    fileNamePlaceholder: 'Leave empty for auto-generation',

    // Settings
    autoSaveLabel: 'Auto-save (no prompt for location)',
    fileFormatLabel: 'File Format:',
    formatTS: 'TS (default, high compatibility)',
    formatMP4: 'MP4 (some players compatible)',
    languageLabel: 'Language:',

    // Buttons
    downloadBtn: 'Download Video',
    downloading: 'Downloading...',

    // Status messages
    statusStarting: 'Starting download...',
    statusSuccess: 'Download started successfully!',
    statusComplete: 'Download complete!',
    statusUrlSelected: 'URL selected. Click download button.',

    // Errors
    errorNoUrl: 'Please enter a M3U8 URL',
    errorInvalidUrl: 'Please enter a valid M3U8 URL',
    errorPrefix: 'Error: ',

    // Time
    timeSecondsAgo: 'seconds ago',
    timeMinutesAgo: 'minutes ago',
    timeHoursAgo: 'hours ago',

    // Progress messages
    progressFetching: 'Fetching M3U8 playlist...',
    progressParsing: 'Parsing playlist...',
    progressVariant: 'Fetching variant playlist...',
    progressSegments: 'Found {count} segments. Downloading...',
    progressDownloading: 'Downloading segment {current}/{total}...',
    progressMerging: 'Merging segments...',
    progressPreparing: 'Preparing download...',
    progressCreating: 'Starting download...',
    progressDone: 'Download complete!',
    successMessage: 'Successfully downloaded {count} segments!'
  },

  ko: {
    extensionName: 'M3U8 비디오 다운로더',
    extensionDesc: 'M3U8 스트리밍 비디오를 쉽게 다운로드',

    title: 'M3U8 비디오 다운로더',
    detectedSection: '페이지에서 감지된 비디오',
    scanBtn: '🔍 스캔',
    clearBtn: '지우기',
    noDetected: '이 페이지에서 비디오를 감지하지 못했습니다.<br>스캔 버튼을 클릭하거나 비디오를 재생하면 자동으로 감지됩니다.',

    urlLabel: 'M3U8 URL (수동 입력):',
    urlPlaceholder: 'https://example.com/video.m3u8',
    fileNameLabel: '파일명 (선택사항):',
    fileNamePlaceholder: '비어있으면 자동 생성',

    autoSaveLabel: '자동 저장 (저장 위치 묻지 않음)',
    fileFormatLabel: '파일 형식:',
    formatTS: 'TS (기본, 호환성 높음)',
    formatMP4: 'MP4 (일부 플레이어 호환)',
    languageLabel: '언어:',

    downloadBtn: '비디오 다운로드',
    downloading: '다운로드 중...',

    statusStarting: '다운로드 시작 중...',
    statusSuccess: '다운로드가 성공적으로 시작되었습니다!',
    statusComplete: '다운로드 완료!',
    statusUrlSelected: 'URL이 입력되었습니다. 다운로드 버튼을 클릭하세요.',

    errorNoUrl: 'M3U8 URL을 입력하세요',
    errorInvalidUrl: '올바른 M3U8 URL을 입력하세요',
    errorPrefix: '오류: ',

    timeSecondsAgo: '초 전',
    timeMinutesAgo: '분 전',
    timeHoursAgo: '시간 전',

    progressFetching: 'M3U8 플레이리스트 가져오는 중...',
    progressParsing: '플레이리스트 분석 중...',
    progressVariant: '변형 플레이리스트 가져오는 중...',
    progressSegments: '{count}개의 세그먼트를 발견했습니다. 다운로드 중...',
    progressDownloading: '세그먼트 다운로드 중 {current}/{total}...',
    progressMerging: '세그먼트 병합 중...',
    progressPreparing: '다운로드 준비 중...',
    progressCreating: '다운로드 시작 중...',
    progressDone: '다운로드 완료!',
    successMessage: '{count}개의 세그먼트를 성공적으로 다운로드했습니다!'
  },

  ja: {
    extensionName: 'M3U8 ビデオダウンローダー',
    extensionDesc: 'M3U8ストリーミングビデオを簡単にダウンロード',

    title: 'M3U8 ビデオダウンローダー',
    detectedSection: 'ページで検出されたビデオ',
    scanBtn: '🔍 スキャン',
    clearBtn: 'クリア',
    noDetected: 'このページでビデオが検出されませんでした。<br>スキャンボタンをクリックするか、ビデオを再生すると自動的に検出されます。',

    urlLabel: 'M3U8 URL（手動入力）:',
    urlPlaceholder: 'https://example.com/video.m3u8',
    fileNameLabel: 'ファイル名（オプション）:',
    fileNamePlaceholder: '空白の場合は自動生成',

    autoSaveLabel: '自動保存（保存場所を聞かない）',
    fileFormatLabel: 'ファイル形式:',
    formatTS: 'TS（デフォルト、高い互換性）',
    formatMP4: 'MP4（一部のプレーヤー互換）',
    languageLabel: '言語:',

    downloadBtn: 'ビデオをダウンロード',
    downloading: 'ダウンロード中...',

    statusStarting: 'ダウンロード開始中...',
    statusSuccess: 'ダウンロードが正常に開始されました！',
    statusComplete: 'ダウンロード完了！',
    statusUrlSelected: 'URLが選択されました。ダウンロードボタンをクリックしてください。',

    errorNoUrl: 'M3U8 URLを入力してください',
    errorInvalidUrl: '有効なM3U8 URLを入力してください',
    errorPrefix: 'エラー: ',

    timeSecondsAgo: '秒前',
    timeMinutesAgo: '分前',
    timeHoursAgo: '時間前',

    progressFetching: 'M3U8プレイリストを取得中...',
    progressParsing: 'プレイリストを解析中...',
    progressVariant: 'バリアントプレイリストを取得中...',
    progressSegments: '{count}個のセグメントが見つかりました。ダウンロード中...',
    progressDownloading: 'セグメントをダウンロード中 {current}/{total}...',
    progressMerging: 'セグメントを結合中...',
    progressPreparing: 'ダウンロードを準備中...',
    progressCreating: 'ダウンロードを開始中...',
    progressDone: 'ダウンロード完了！',
    successMessage: '{count}個のセグメントを正常にダウンロードしました！'
  },

  'zh-CN': {
    extensionName: 'M3U8 视频下载器',
    extensionDesc: '轻松下载M3U8流媒体视频',

    title: 'M3U8 视频下载器',
    detectedSection: '页面上检测到的视频',
    scanBtn: '🔍 扫描',
    clearBtn: '清除',
    noDetected: '此页面未检测到视频。<br>点击扫描按钮或播放视频后将自动检测。',

    urlLabel: 'M3U8 URL（手动输入）:',
    urlPlaceholder: 'https://example.com/video.m3u8',
    fileNameLabel: '文件名（可选）:',
    fileNamePlaceholder: '留空则自动生成',

    autoSaveLabel: '自动保存（不询问保存位置）',
    fileFormatLabel: '文件格式:',
    formatTS: 'TS（默认，高兼容性）',
    formatMP4: 'MP4（部分播放器兼容）',
    languageLabel: '语言:',

    downloadBtn: '下载视频',
    downloading: '下载中...',

    statusStarting: '开始下载...',
    statusSuccess: '下载已成功开始！',
    statusComplete: '下载完成！',
    statusUrlSelected: 'URL已选择。请点击下载按钮。',

    errorNoUrl: '请输入M3U8 URL',
    errorInvalidUrl: '请输入有效的M3U8 URL',
    errorPrefix: '错误: ',

    timeSecondsAgo: '秒前',
    timeMinutesAgo: '分钟前',
    timeHoursAgo: '小时前',

    progressFetching: '正在获取M3U8播放列表...',
    progressParsing: '正在解析播放列表...',
    progressVariant: '正在获取变体播放列表...',
    progressSegments: '找到{count}个片段。正在下载...',
    progressDownloading: '正在下载片段 {current}/{total}...',
    progressMerging: '正在合并片段...',
    progressPreparing: '正在准备下载...',
    progressCreating: '正在开始下载...',
    progressDone: '下载完成！',
    successMessage: '成功下载了{count}个片段！'
  },

  es: {
    extensionName: 'Descargador de Video M3U8',
    extensionDesc: 'Descarga videos streaming M3U8 fácilmente',

    title: 'Descargador de Video M3U8',
    detectedSection: 'Videos detectados en la página',
    scanBtn: '🔍 Escanear',
    clearBtn: 'Limpiar',
    noDetected: 'No se detectaron videos en esta página.<br>Haz clic en Escanear o reproduce un video para detectarlo automáticamente.',

    urlLabel: 'URL M3U8 (Entrada manual):',
    urlPlaceholder: 'https://example.com/video.m3u8',
    fileNameLabel: 'Nombre de archivo (opcional):',
    fileNamePlaceholder: 'Dejar vacío para generación automática',

    autoSaveLabel: 'Guardar automáticamente (sin preguntar ubicación)',
    fileFormatLabel: 'Formato de archivo:',
    formatTS: 'TS (predeterminado, alta compatibilidad)',
    formatMP4: 'MP4 (compatible con algunos reproductores)',
    languageLabel: 'Idioma:',

    downloadBtn: 'Descargar Video',
    downloading: 'Descargando...',

    statusStarting: 'Iniciando descarga...',
    statusSuccess: '¡Descarga iniciada con éxito!',
    statusComplete: '¡Descarga completada!',
    statusUrlSelected: 'URL seleccionada. Haz clic en el botón de descarga.',

    errorNoUrl: 'Por favor ingresa una URL M3U8',
    errorInvalidUrl: 'Por favor ingresa una URL M3U8 válida',
    errorPrefix: 'Error: ',

    timeSecondsAgo: 'segundos atrás',
    timeMinutesAgo: 'minutos atrás',
    timeHoursAgo: 'horas atrás',

    progressFetching: 'Obteniendo lista de reproducción M3U8...',
    progressParsing: 'Analizando lista de reproducción...',
    progressVariant: 'Obteniendo lista de reproducción variante...',
    progressSegments: 'Se encontraron {count} segmentos. Descargando...',
    progressDownloading: 'Descargando segmento {current}/{total}...',
    progressMerging: 'Fusionando segmentos...',
    progressPreparing: 'Preparando descarga...',
    progressCreating: 'Iniciando descarga...',
    progressDone: '¡Descarga completada!',
    successMessage: '¡Se descargaron {count} segmentos con éxito!'
  },

  fr: {
    extensionName: 'Téléchargeur de Vidéo M3U8',
    extensionDesc: 'Téléchargez facilement des vidéos en streaming M3U8',

    title: 'Téléchargeur de Vidéo M3U8',
    detectedSection: 'Vidéos détectées sur la page',
    scanBtn: '🔍 Scanner',
    clearBtn: 'Effacer',
    noDetected: 'Aucune vidéo détectée sur cette page.<br>Cliquez sur Scanner ou lisez une vidéo pour la détecter automatiquement.',

    urlLabel: 'URL M3U8 (Saisie manuelle):',
    urlPlaceholder: 'https://example.com/video.m3u8',
    fileNameLabel: 'Nom de fichier (facultatif):',
    fileNamePlaceholder: 'Laisser vide pour génération automatique',

    autoSaveLabel: 'Enregistrement automatique (sans demander l\'emplacement)',
    fileFormatLabel: 'Format de fichier:',
    formatTS: 'TS (par défaut, haute compatibilité)',
    formatMP4: 'MP4 (compatible avec certains lecteurs)',
    languageLabel: 'Langue:',

    downloadBtn: 'Télécharger la Vidéo',
    downloading: 'Téléchargement...',

    statusStarting: 'Démarrage du téléchargement...',
    statusSuccess: 'Téléchargement démarré avec succès!',
    statusComplete: 'Téléchargement terminé!',
    statusUrlSelected: 'URL sélectionnée. Cliquez sur le bouton de téléchargement.',

    errorNoUrl: 'Veuillez entrer une URL M3U8',
    errorInvalidUrl: 'Veuillez entrer une URL M3U8 valide',
    errorPrefix: 'Erreur: ',

    timeSecondsAgo: 'secondes',
    timeMinutesAgo: 'minutes',
    timeHoursAgo: 'heures',

    progressFetching: 'Récupération de la liste de lecture M3U8...',
    progressParsing: 'Analyse de la liste de lecture...',
    progressVariant: 'Récupération de la liste de lecture variante...',
    progressSegments: '{count} segments trouvés. Téléchargement...',
    progressDownloading: 'Téléchargement du segment {current}/{total}...',
    progressMerging: 'Fusion des segments...',
    progressPreparing: 'Préparation du téléchargement...',
    progressCreating: 'Démarrage du téléchargement...',
    progressDone: 'Téléchargement terminé!',
    successMessage: '{count} segments téléchargés avec succès!'
  },

  de: {
    extensionName: 'M3U8 Video Downloader',
    extensionDesc: 'M3U8 Streaming-Videos einfach herunterladen',

    title: 'M3U8 Video Downloader',
    detectedSection: 'Videos auf der Seite erkannt',
    scanBtn: '🔍 Scannen',
    clearBtn: 'Löschen',
    noDetected: 'Keine Videos auf dieser Seite erkannt.<br>Klicken Sie auf Scannen oder spielen Sie ein Video ab, um es automatisch zu erkennen.',

    urlLabel: 'M3U8 URL (Manuelle Eingabe):',
    urlPlaceholder: 'https://example.com/video.m3u8',
    fileNameLabel: 'Dateiname (optional):',
    fileNamePlaceholder: 'Leer lassen für automatische Generierung',

    autoSaveLabel: 'Automatisch speichern (nicht nach Speicherort fragen)',
    fileFormatLabel: 'Dateiformat:',
    formatTS: 'TS (Standard, hohe Kompatibilität)',
    formatMP4: 'MP4 (mit einigen Playern kompatibel)',
    languageLabel: 'Sprache:',

    downloadBtn: 'Video Herunterladen',
    downloading: 'Herunterladen...',

    statusStarting: 'Download wird gestartet...',
    statusSuccess: 'Download erfolgreich gestartet!',
    statusComplete: 'Download abgeschlossen!',
    statusUrlSelected: 'URL ausgewählt. Klicken Sie auf die Download-Schaltfläche.',

    errorNoUrl: 'Bitte geben Sie eine M3U8 URL ein',
    errorInvalidUrl: 'Bitte geben Sie eine gültige M3U8 URL ein',
    errorPrefix: 'Fehler: ',

    timeSecondsAgo: 'Sekunden her',
    timeMinutesAgo: 'Minuten her',
    timeHoursAgo: 'Stunden her',

    progressFetching: 'M3U8-Playlist wird abgerufen...',
    progressParsing: 'Playlist wird analysiert...',
    progressVariant: 'Varianten-Playlist wird abgerufen...',
    progressSegments: '{count} Segmente gefunden. Herunterladen...',
    progressDownloading: 'Segment {current}/{total} wird heruntergeladen...',
    progressMerging: 'Segmente werden zusammengeführt...',
    progressPreparing: 'Download wird vorbereitet...',
    progressCreating: 'Download wird gestartet...',
    progressDone: 'Download abgeschlossen!',
    successMessage: '{count} Segmente erfolgreich heruntergeladen!'
  }
};

// Get translation with fallback to English
function t(key, lang = 'en', replacements = {}) {
  const translation = translations[lang] || translations['en'];
  let text = translation[key] || translations['en'][key] || key;

  // Replace placeholders like {count}, {current}, {total}
  Object.keys(replacements).forEach(placeholder => {
    text = text.replace(`{${placeholder}}`, replacements[placeholder]);
  });

  return text;
}

// Get browser language
function getBrowserLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;

  // Map browser language codes to our supported languages
  if (browserLang.startsWith('ko')) return 'ko';
  if (browserLang.startsWith('ja')) return 'ja';
  if (browserLang.startsWith('zh')) return 'zh-CN';
  if (browserLang.startsWith('es')) return 'es';
  if (browserLang.startsWith('fr')) return 'fr';
  if (browserLang.startsWith('de')) return 'de';

  return 'en'; // Default to English
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { translations, t, getBrowserLanguage };
}
