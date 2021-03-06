# Gauge-Chart

## 요구사항
1. ES6+ 문법으로 작성
2. 기능 별로 파일 모듈화 할 것
3. 리사이즈 기능 넣을 것 (브라우저 크기 변화에 따라 캔버스 게이지 차트의 크기도 변화할 것)
4. 5초마다 차트에 랜덤한 데이터 값을 전송하는 시작/종료 하는 Element 추가 (버튼, 토글 등)
5. 게이지 차트의 타원 각도는 270도로 만들 것 (자동차 계기판 모양처럼)
6. 값의 범위는 0.0 ~ 100.0 %
    1. 소수점 한자리 수 만큼 출력
    2. 단위는 %, 상단의 사진에서 thermometer 를 percent로 변경
    3. 외부에서 0 ~ 1(`Math.random() 사용`)을 게이지 차트가 전달받아 렌더링하는 방식
7. 애니메이션 효과 부여
    - 바는 점진적으로 크기가 변경되어야 함
    - (선택 사항) 게이지 차트 중앙의 숫자로 점진적으로 변경되어야 함
8. 캔버스로 해당 차트를 25개 만들면서 성능을 올리기 위한 방법 적용
    - chrome devtools performance를 사용하여 성능 차이 비교
    - 적용 할만한 기능 및 패턴 목록
        1. OffscreenCanvas
        2. Double Buffering
        3. Page Flipping
        4. Throttling & Debouncing
9. (선택 사항) 안티 앨리어싱 적용