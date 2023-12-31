import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const textInput = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const seconds = document.querySelector('[data-seconds]');
const minutes = document.querySelector('[data-minutes]');
const hours = document.querySelector('[data-hours]');
const days = document.querySelector('[data-days]');
const timerStyle = document.querySelector(".timer");

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;

      Notiflix.Notify.success('Go!');
    }
  },
};

flatpickr(textInput, options);

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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

btnStart.addEventListener('click', () => {
  let timeFinish = setInterval(() => {
    let chooseDate = new Date(textInput.value) - new Date();
    btnStart.disabled = true;
    if (chooseDate >= 0) {
      let timeDate = convertMs(chooseDate);
      days.textContent = addLeadingZero(timeDate.days);
      hours.textContent = addLeadingZero(timeDate.hours);
      minutes.textContent = addLeadingZero(timeDate.minutes);
      seconds.textContent = addLeadingZero(timeDate.seconds);
    } else {
      Notiflix.Notify.success('Finish');
      clearInterval(timeFinish);
    }
  }, 1000);
});



timerStyle.style.display = "flex";
timerStyle.style.gap = "50px";
timerStyle.style.maxWidth = "500px"
timerStyle.style.marginTop = "20px"
timerStyle.style.border = "1px solid grey";
timerStyle.style.fontSize = "20px"