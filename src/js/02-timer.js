import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose,
};


flatpickr('#datetime-picker', options)

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    mins: document.querySelector('span[data-minutes]'),
    secs: document.querySelector('span[data-seconds]'),
}


refs.startBtn.disabled = true

function onClose(selectedDates) {
    const currentDate = Date.now()
    if (selectedDates[0].getTime() >= currentDate ) {
        refs.startBtn.disabled = false;
        refs.startBtn.addEventListener('click', () => {
            refs.startBtn.disabled = true;
            const timerId = setInterval(() => {
                 
                const timer = convertMs(selectedDates[0].getTime() - Date.now());
                console.log(selectedDates[0].getTime() - Date.now())
                if (selectedDates[0].getTime() - Date.now() <= 1000) {
                    clearInterval(timerId)
                     Notify.success('Відлік завершено');
                }
                const { days, hours, mins, secs } = timer;
                const dayLeft = addLeadingZero(days);
                const hoursLeft = addLeadingZero(hours);
                const minutesLeft = addLeadingZero(mins);
                const secondsLeft = addLeadingZero(secs);
                refs.days.textContent = dayLeft;
                refs.hours.textContent = hoursLeft;
                refs.mins.textContent = minutesLeft;
                refs.secs.textContent = secondsLeft;
            }, 1000);
            Notify.success('Починаємо відлік');
        })
    }    else {
        Notify.failure('Виберіть дату в майбутньому');
  } 
      
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}



function convertMs(time) {
 const days = Math.floor(
    (time % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24)
  );
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((time % (1000 * 60)) / 1000);

  return { days, hours, mins, secs };
}

