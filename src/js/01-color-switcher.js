const startBtn = document.querySelector(`button[data-start]`);
const stopBtn = document.querySelector('button[data-stop]')
const body = document.querySelector('body')

let intervalId = null

startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick)

function onStartClick() {
  intervalId = setInterval(() => {
    startBtn.disabled = true
    body.style.backgroundColor = getRandomHexColor()
  },1000)
  
}

function onStopClick() {
  startBtn.disabled = false
  clearInterval(intervalId)
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
