# Changelog

## v1.2.0 - 자동 저장 및 MP4 형식 지원

### 새로운 기능
- **자동 저장 옵션**: 체크박스로 활성화 시 저장 위치를 묻지 않고 자동으로 다운로드
- **MP4 형식 선택**: TS 또는 MP4 형식으로 저장 가능 (드롭다운 메뉴)
- **자동 파일명 생성**: 파일명을 입력하지 않으면 타임스탬프로 자동 생성 (예: video_20231211_143022)
- **설정 저장**: 자동 저장 및 파일 형식 설정이 자동으로 저장되어 다음에도 유지

### 개선 사항
- 파일명 입력 필드 플레이스홀더 개선
- 사용자 설정이 chrome.storage에 저장되어 영구 보존
- UI 레이블 한글화

### 기술적 세부사항
- popup.html:185-199 - 자동 저장 체크박스 및 파일 형식 선택 추가
- popup.js:11-12, 31-37 - 설정 로드 및 저장 로직
- popup.js:64-69 - 타임스탬프 기반 자동 파일명 생성
- background.js:107, 165-172 - autoSave 및 fileFormat 파라미터 처리

## v1.1.1 - Service Worker 호환성 수정

### 수정 사항
- **URL.createObjectURL 에러 수정**: Service worker 컨텍스트에서 작동하지 않는 문제 해결
- Base64 data URL 방식으로 변경하여 Manifest V3 호환성 확보
- `blobToDataURL` 함수 추가: 대용량 파일 처리를 위한 청크 방식 base64 인코딩

### 기술적 세부사항
- background.js:299-316 - blobToDataURL 함수 추가
- background.js:156 - URL.createObjectURL 대신 data URL 사용
- 8KB 청크 단위로 처리하여 call stack 오버플로우 방지

### 알려진 제한사항
- 매우 큰 비디오 파일(100MB+)의 경우 메모리 사용량이 높을 수 있음
- 추후 offscreen document 방식으로 개선 예정

## v1.1.0 - Master Playlist 지원 추가

### 수정 사항
- **Master Playlist 자동 처리**: M3U8 파일이 master playlist인 경우 자동으로 variant playlist를 fetch하여 실제 세그먼트 다운로드
- `parseM3U8WithMaster` 함수 추가: #EXT-X-STREAM-INF 태그를 감지하여 master playlist 판별
- 첫 번째 variant를 자동으로 선택하여 다운로드

### 해결된 문제
- "No video segments found in M3U8 file" 에러 수정
- Master playlist가 포함된 M3U8 URL도 이제 정상 다운로드 가능

### 기술적 세부사항
- background.js:184-234 - parseM3U8WithMaster 함수 추가
- Master playlist 감지 로직 구현
- Variant playlist 재귀 fetch 구현

## v1.0.0 - 초기 릴리스 + 자동 감지

### 주요 기능
- 웹페이지에서 M3U8 자동 감지
- 배지 알림
- 원클릭 URL 선택
- M3U8 파일 다운로드 및 세그먼트 병합
- 진행률 표시
