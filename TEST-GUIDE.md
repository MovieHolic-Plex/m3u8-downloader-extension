# M3U8 Downloader 테스트 가이드

## 1단계: Chrome에 확장 프로그램 설치

1. **Chrome 브라우저 열기**

2. **확장 프로그램 페이지로 이동**
   - 주소창에 `chrome://extensions/` 입력 후 Enter
   - 또는 Chrome 메뉴 > 도구 더보기 > 확장 프로그램

3. **개발자 모드 활성화**
   - 페이지 오른쪽 상단의 "개발자 모드" 토글 스위치 클릭

4. **확장 프로그램 로드**
   - "압축해제된 확장 프로그램을 로드합니다" 버튼 클릭
   - 파일 탐색기에서 이 폴더 선택:
     ```
     C:\Users\hyeon\PycharmProjects\m3u8-downloader-extension
     ```
   - "폴더 선택" 클릭

5. **설치 확인**
   - "M3U8 Video Downloader" 확장 프로그램이 목록에 나타남
   - 확장 프로그램이 활성화 상태인지 확인

## 2단계: 확장 프로그램 테스트

### 기본 테스트

1. **확장 프로그램 열기**
   - Chrome 도구 모음의 확장 프로그램 아이콘(퍼즐 모양) 클릭
   - "M3U8 Video Downloader" 선택
   - 또는 확장 프로그램을 고정하여 직접 클릭

2. **테스트 URL 입력**
   ```
   https://api.wecandeo.com/video/castAll.m3u8?k=BOKNS9AQWrFShbvDFYKgDnpipLknSJ6tcsV6MqKmZNisww2B0wFRsWafHFwTOX8carvlYyqgZT3r90iiI5pDN495yii8hisD1oF9KUAqyI8isEx2XoHf8EUAMRMV13Uoisipml1gV9PkQWysGDpaMiiYZZlOotAieie
   ```

3. **파일명 입력 (선택사항)**
   - 예: `test_video`
   - 입력하지 않으면 기본값 "video" 사용

4. **다운로드 시작**
   - "Download Video" 버튼 클릭
   - 다운로드 위치 선택 대화상자가 나타남
   - 원하는 위치 선택 후 "저장" 클릭

5. **진행률 모니터링**
   - 확장 프로그램 팝업에서 진행률 확인
   - 진행 상태 메시지 확인
   - 진행률 바 확인

6. **다운로드 완료 확인**
   - "Download complete!" 메시지 확인
   - 다운로드 폴더에서 파일 확인
   - 파일 형식: `.ts` (MPEG-TS)

## 3단계: 다운로드된 비디오 재생

### VLC Player로 재생
1. VLC Player 설치 (없는 경우)
   - https://www.videolan.org/vlc/
2. 다운로드된 .ts 파일을 VLC로 열기
3. 정상 재생 확인

### MP4로 변환 (선택사항)
FFmpeg가 설치되어 있다면:
```bash
ffmpeg -i test_video.ts -c copy test_video.mp4
```

## 4단계: 디버깅 (문제 발생 시)

### Chrome 개발자 도구 사용

1. **확장 프로그램 페이지 열기**
   - `chrome://extensions/`

2. **개발자 도구 열기**
   - "M3U8 Video Downloader" 아래 "서비스 워커" 옆 "검사" 클릭
   - 또는 백그라운드 페이지 검사

3. **Console 탭 확인**
   - 에러 메시지 확인
   - 다운로드 진행 로그 확인

4. **Network 탭 확인**
   - M3U8 파일 요청 확인
   - 세그먼트 다운로드 확인
   - CORS 에러 확인

### 일반적인 문제 해결

**문제: "Failed to fetch M3U8" 에러**
- 해결: URL이 올바른지 확인
- 해결: 네트워크 연결 확인
- 해결: URL이 만료되지 않았는지 확인

**문제: CORS 에러**
- 해결: 일부 사이트는 외부 접근을 차단합니다
- 해결: 다른 M3U8 URL로 테스트

**문제: 세그먼트 다운로드 실패**
- 해결: 일부 세그먼트 실패해도 다운로드는 계속됩니다
- 해결: 네트워크가 안정적인지 확인

**문제: 다운로드 버튼이 반응하지 않음**
- 해결: URL에 .m3u8이 포함되어 있는지 확인
- 해결: 확장 프로그램을 다시 로드
- 해결: Chrome을 재시작

## 5단계: 추가 테스트 URL (선택사항)

다른 공개 M3U8 URL로도 테스트해보세요:

```
# Apple의 샘플 스트림
https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8

# 테스트용 샘플
https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8
```

## 테스트 체크리스트

- [ ] 확장 프로그램이 Chrome에 성공적으로 설치됨
- [ ] 확장 프로그램 팝업이 정상적으로 열림
- [ ] URL 입력 필드가 작동함
- [ ] "Download Video" 버튼이 작동함
- [ ] 진행률 바가 표시됨
- [ ] 세그먼트 다운로드가 진행됨
- [ ] 다운로드가 완료됨
- [ ] .ts 파일이 생성됨
- [ ] 비디오가 정상적으로 재생됨

## 성공!

모든 단계가 성공적으로 완료되면 확장 프로그램이 정상 작동하는 것입니다!

추가 문의사항이나 개선 사항이 있다면 알려주세요.
