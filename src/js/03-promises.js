import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[type="submit"]')
const formRef = document.querySelector('form')

formRef.addEventListener('submit', onFormSubmit)

function onFormSubmit(evt) {
  evt.preventDefault();

  startBtn.disabled = true;
  const {
    elements: { delay, step, amount }
  } = evt.currentTarget;
  let delayEl = Number(delay.value)
  let stepEl = Number(step.value)
  let amountEl = Number(amount.value)

  let totalDelay = delayEl + stepEl * amountEl;

  if (delayEl < 0 || stepEl < 0 || amountEl < 0) {
    Notify.failure('Заповніть коректні дані')
    return;
  }

  for (let position = 1; position <= amountEl; position++){
    createPromise(position, delayEl).then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
    })
    .catch(({ position, delay }) =>
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
    );
    delayEl += stepEl  
  }
  formRef.reset();
  handleBtn(totalDelay);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  
  return new Promise((Fulfill, Reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        Fulfill({ position, delay });
        console.log({ position, delay })
      } else {
        Reject({ position, delay });
        console.log({ position, delay })
      }
    }, delay);
  });
}


function handleBtn(total) {
  setTimeout(() => {
    startBtn.disabled = false
  },total)  
}