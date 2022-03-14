(function() {
  const canvas = document.querySelector('.canvas--gauge');
  const context = canvas.getContext('2d');
  const startAngle = 45 * Math.PI / 180;
  const endAngle = 135 * Math.PI / 180;
  
  const x = context.canvas.width;
  const y = context.canvas.height;
  const radius = 100;
  const angle = 2.7;
  const endPoint = 135;
  const speed = 5000;
  
  let randomAngle = 135;
  let randomPercent = 0;
  let prevAngle = 0;
  let stepAngle = 135;
  let timer, raf;

  function drawBackground () {
    context.beginPath();
    context.arc(x, y, radius, startAngle, endAngle, true);
    context.lineWidth = 35;
    context.strokeStyle = '#eee';
    context.stroke();
    context.closePath();
  }
  
  function drawText() {
    context.beginPath();
    context.font = 'bold 48px Arial';
    context.textAlign = 'center';
    context.fillText(`${randomPercent}`, x, y);
    context.font = 'bold 24px Arial';
    context.fillText('percent', x, y + 48);
    context.closePath();
  }

  function getRandomData () {
    let randomNumber = Math.random();
    randomPercent = (randomNumber * 100).toFixed(1);
    randomAngle = (randomPercent * angle) + endPoint;
  }

  function drawAnimation () {
    console.log('start Animation');
    
    if (stepAngle === Math.floor(randomAngle)) {
      prevAngle = randomAngle;
      timer = setTimeout(drawStart, speed);
      return;
    }
    
    initDraw();
    
    stepAngle += prevAngle < randomAngle ? 1 : -1;
    context.beginPath();
    context.lineWidth = 35;
    context.strokeStyle = 'yellow';
    context.arc(x, y, radius, stepAngle * Math.PI / 180, endAngle, true);
    context.stroke();
    context.closePath();
    
    raf = window.requestAnimationFrame(drawAnimation);
  }

  function drawStart () {
    console.log('START');

    getRandomData();
    initDraw();
    drawAnimation();
  }
  
  function drawStop () {
    clearTimeout(timer);
    window.cancelAnimationFrame(raf);
    
    randomAngle = 135;
    randomPercent = 0;
    prevAngle = 0;
    stepAngle = 135;

    initDraw();
  }
  
  function initDraw () {
    context.clearRect(x - context.canvas.width, y - context.canvas.height, x * 2, y * 2);
    drawBackground();
    drawText();
  }

  function init () {
    context.scale(0.5, 0.5);
    
    const startButton = document.querySelector('#button--start');
    const stopButton = document.querySelector('#button--stop');
    
    startButton.addEventListener('click', drawStart);
    stopButton.addEventListener('click', drawStop);
  
    initDraw();
  }
  
  init();
})();