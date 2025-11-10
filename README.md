# M3U8 Video Downloader - Chrome Extension

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/yourusername/m3u8-downloader-extension)

A powerful Chrome extension to easily download M3U8 streaming videos with multi-language support.

[English](#english) | [한국어](#한국어) | [日本語](#日本語) | [中文](#中文) | [Español](#español) | [Français](#français) | [Deutsch](#deutsch)

---

## English

### Features

- **Auto-Detection**: Automatically detects M3U8 and direct video files (MP4, WebM, etc.) on web pages
- **Badge Notifications**: Shows count of detected video files on extension icon
- **One-Click Selection**: Select detected URLs with a single click
- **Multi-Format Support**: M3U8, MP4, WebM, AVI, MOV, MKV, FLV, WMV, and more
- **Manual Input**: Option to enter URLs directly
- **Auto-Parsing**: Automatically parses video segments from M3U8 URLs
- **Master Playlist Support**: Automatically handles master playlists
- **Merged Downloads**: Downloads and merges all M3U8 segments into a single file
- **Direct Downloads**: Direct download for MP4 and other video formats
- **Progress Display**: Real-time download progress and status updates
- **Auto-Filename**: Generates timestamp-based filenames when left empty
- **Auto-Save**: Option to download without prompting for location
- **Format Selection**: Choose between TS or MP4 format (for M3U8)
- **Multi-Language**: Supports 7 languages (EN, KO, JA, ZH-CN, ES, FR, DE)

### Installation

1. Open Chrome browser
2. Navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked"
5. Select the `m3u8-downloader-extension` folder

### Usage

1. Visit a webpage with M3U8 video
2. Play the video (or wait for page load)
3. Extension icon will show a badge with count
4. Click extension icon
5. Click detected URL from the list
6. Click "Download Video" button

---

## 한국어

### 주요 기능

- **자동 감지**: 웹페이지에서 M3U8 및 직접 비디오 파일(MP4, WebM 등)을 자동으로 감지하고 표시
- **배지 알림**: 감지된 비디오 파일 개수를 확장 프로그램 아이콘에 표시
- **원클릭 선택**: 감지된 URL을 클릭 한 번으로 선택
- **다양한 형식 지원**: M3U8, MP4, WebM, AVI, MOV, MKV, FLV, WMV 등
- **수동 입력**: URL을 직접 입력할 수도 있음
- **자동 파싱**: M3U8 URL에서 비디오 세그먼트 자동 파싱
- **Master Playlist 지원**: Master playlist 자동 처리
- **병합 다운로드**: M3U8 세그먼트를 다운로드하여 하나의 파일로 병합
- **직접 다운로드**: MP4 및 기타 비디오 형식의 직접 다운로드
- **진행률 표시**: 실시간 다운로드 진행률 및 상태 표시
- **자동 파일명**: 파일명을 비우면 타임스탬프로 자동 생성
- **자동 저장**: 저장 위치를 묻지 않고 자동으로 다운로드 (옵션)
- **형식 선택**: TS 또는 MP4 형식으로 저장 가능 (M3U8용)
- **다국어 지원**: 7개 언어 지원 (영어, 한국어, 일본어, 중국어, 스페인어, 프랑스어, 독일어)

## 설치 방법

1. Chrome 브라우저를 엽니다
2. 주소창에 `chrome://extensions/` 입력
3. 오른쪽 상단의 "개발자 모드" 활성화
4. "압축해제된 확장 프로그램을 로드합니다" 클릭
5. 이 폴더(`m3u8-downloader-extension`)를 선택

## 사용 방법

### 방법 1: 자동 감지 (추천)

1. M3U8 비디오가 있는 웹페이지 방문
2. 비디오 재생 (또는 페이지 로드 대기)
3. 확장 프로그램 아이콘에 숫자 배지가 나타남
4. 확장 프로그램 아이콘 클릭
5. "페이지에서 감지된 M3U8" 섹션에서 원하는 URL 클릭
6. 원하는 파일명 입력 (선택사항)
7. "Download Video" 버튼 클릭
8. 다운로드 위치 선택
9. 다운로드 완료 대기

### 방법 2: 수동 입력

1. 확장 프로그램 아이콘 클릭
2. "M3U8 URL (수동 입력)" 필드에 URL 입력
3. 원하는 파일명 입력 (선택사항)
4. "Download Video" 버튼 클릭
5. 다운로드 위치 선택
6. 다운로드 완료 대기

## 주의사항

- 다운로드된 파일은 .ts 형식입니다
- VLC Player, FFmpeg 등으로 재생 가능
- MP4로 변환하려면 FFmpeg 사용:
  ```bash
  ffmpeg -i video.ts -c copy video.mp4
  ```

## 파일 구조

```
m3u8-downloader-extension/
├── manifest.json       # 확장 프로그램 설정
├── popup.html         # UI 인터페이스
├── popup.js           # UI 로직
├── background.js      # 다운로드 핵심 로직
├── icon16.png         # 16x16 아이콘
├── icon48.png         # 48x48 아이콘
├── icon128.png        # 128x128 아이콘
└── README.md          # 이 파일
```

## 테스트 URL

제공된 테스트 URL:
```
https://api.wecandeo.com/video/castAll.m3u8?k=BOKNS9AQWrFShbvDFYKgDnpipLknSJ6tcsV6MqKmZNisww2B0wFRsWafHFwTOX8carvlYyqgZT3r90iiI5pDN495yii8hisD1oF9KUAqyI8isEx2XoHf8EUAMRMV13Uoisipml1gV9PkQWysGDpaMiiYZZlOotAieie
```

## 문제 해결

### 다운로드가 시작되지 않는 경우
- URL이 올바른지 확인
- CORS 문제일 수 있음 (일부 사이트는 접근 제한)
- 개발자 도구(F12)에서 에러 확인

### 세그먼트 다운로드 실패
- 네트워크 연결 확인
- URL 만료 여부 확인
- 일부 세그먼트만 실패해도 다운로드는 계속됩니다

## 라이선스

MIT License
