(function() {
  const canvas = document.querySelector('.canvas--gauge');
  const context = canvas.getContext('2d');
  const offScreenCanvas = document.createElement('canvas'); // offscreencanvas
  
  const startAngle = 45 * Math.PI / 180; // 시작 각도
  const endAngle = 135 * Math.PI / 180; // 끝 각도
  const x = context.canvas.width; // 원의 중심 x좌표
  const y = context.canvas.height; // 원의 중심 y좌표
  const radius = 100; // 원에 있는 반지름의 길이
  const angle = 2.7; // 총 각도 (270도)
  const endPoint = 135; // 
  const speed = 5000; // 데이터 전송 속도
  
  let randomAngle = 135; // 랜덤 각도 (초기값: 135)
  let randomPercent = 0; // 랜덤값 퍼센티지 (초기값: 0)
  let prevAngle = 0; // 이전 각도 (초기값: 0)
  let stepAngle = 135; // 애니메이션을 위한 step 각도 (초기값: 135)
  let offScreenContext, drawTimer, drawRaf; // offscreencavas context, 애니메이션을 위한 timer, raf 변수

  function drawBackground () {
    offScreenContext.beginPath();
    offScreenContext.arc(x, y, radius, startAngle, endAngle, true);
    offScreenContext.lineWidth = 35;
    offScreenContext.strokeStyle = '#eee';
    offScreenContext.stroke();
    offScreenContext.closePath();

    context.drawImage(offScreenCanvas, 0, 0);
  }
  
  function drawText() {
    offScreenContext.beginPath();
    offScreenContext.font = 'bold 48px Arial';
    offScreenContext.textAlign = 'center';
    offScreenContext.fillText(`${randomPercent}`, x, y);
    offScreenContext.font = 'bold 24px Arial';
    offScreenContext.fillText('percent', x, y + 48);
    offScreenContext.closePath();

    context.drawImage(offScreenCanvas, 0, 0);
  }

  function getRandomData () {
    let randomNumber = Math.random();
    // 랜덤한 숫자 퍼센티지, 각도 설정
    randomPercent = (randomNumber * 100).toFixed(1); // 0.0 ~ 100%
    randomAngle = (randomPercent * angle) + endPoint; // 135 (0.0%) ~ 45 (100%)
  }

  function drawAnimation () {
    console.log('start Animation');
    
    if (stepAngle === Math.floor(randomAngle)) { // 애니메이션을 그리고 있는 각도와 랜덤 숫자 데이터 각도가 같을 경우
      prevAngle = randomAngle; // 현재 랜덤 데이터를 이전 각도 데이터로 선언
      drawTimer = setTimeout(drawStart, speed); // 5초 뒤에 다시 drawStart 시작
      return;
    }
    
    initDraw(); // 초기화
    
    // 이전 각도와 현재 데이터 비교
    // 만약 이전 각도가 현재 데이터 보다 클 경우 현재 각도보다 1도씩 감소
    // 작을 경우 1도씩 증가
    stepAngle += prevAngle < randomAngle ? 1 : -1;
    offScreenContext.beginPath();
    offScreenContext.lineWidth = 35;
    offScreenContext.strokeStyle = 'yellow';
    offScreenContext.arc(x, y, radius, stepAngle * Math.PI / 180, endAngle, true);
    offScreenContext.stroke();
    offScreenContext.closePath();

    context.drawImage(offScreenCanvas, 0, 0);
    
    // 애니메이션 업데이트
    drawRaf = window.requestAnimationFrame(drawAnimation);
  }

  function drawStart () {
    // 시작 버튼 클릭시 실행
    console.log('START');

    getRandomData();
    initDraw();
    drawAnimation();
  }
  
  function drawStop () {
    // 종료 버튼 클릭시 실행
    // 타이머, 애니메이션 업데이트 중지
    clearTimeout(drawTimer);
    window.cancelAnimationFrame(drawRaf);
    
    // 퍼센티지, 각도값 초기화
    randomAngle = 135;
    randomPercent = 0;
    prevAngle = 0;
    stepAngle = 135;

    // 배경, 텍스트 초기화
    initDraw();
  }
  
  function initDraw () {
    // offscreencanvas 초기화
    offScreenCanvas.width = context.canvas.width * 2;
    offScreenCanvas.height = context.canvas.width * 2;
    offScreenContext = offScreenCanvas.getContext('2d');
    
    // canvas context clear
    context.clearRect(x - context.canvas.width, y - context.canvas.height, x * 2, y * 2);
    
    // 배경, 텍스트 그리기
    drawBackground();
    drawText();
  }

  function init () {
    // 배경 scale 설정
    context.scale(0.5, 0.5);
    
    // 시작, 종료 버튼 이벤트 리스너 설정
    const startButton = document.querySelector('.button--start');
    const stopButton = document.querySelector('.button--stop');
    
    startButton.addEventListener('click', drawStart);
    stopButton.addEventListener('click', drawStop);
  
    // canvas 초기화
    initDraw();
  }
  
  init();
})();