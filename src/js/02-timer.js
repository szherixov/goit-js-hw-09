import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

function onStartClick() {
  refs.input.disabled = true;
  refs.startBtn.disabled = true;
  idTimer = setInterval(() => {
    const targetDate = selectedDate - new Date();
    if (targetDate <= 1000) {
      clearInterval(idTimer);
      Notify.success('the time has come');
      refs.input.disabled = false;
      refs.startBtn.disabled = false;
    }
    const { days, hours, minutes, seconds } = convertMs(targetDate);
    console.log(days, hours, minutes, seconds);

    refs.days.textContent = modifyTime(days);
    refs.hours.textContent = modifyTime(hours);
    refs.minutes.textContent = modifyTime(minutes);
    refs.seconds.textContent = modifyTime(seconds);
  }, 1000);
}

refs.startBtn.setAttribute('disabled', true);
let selectedDate = 0;
let idTimer = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();

    if (new Date() > selectedDate) {
      Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.removeAttribute('disabled');
    }
  },
};
flatpickr(refs.input, options);

refs.startBtn.addEventListener('click', onStartClick);



function modifyTime(time) {
  return String(time).padStart(2, 0);
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}