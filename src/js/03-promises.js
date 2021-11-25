import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function onSubmit(element) {
  element.preventDefault();
  const { delay, step, amount } = element.currentTarget;

  let delayElement = Number(delay.value);
  const stapElement = Number(step.value);
  const amounEl = Number(amount.value);
  for (let position = 1; position <= amounEl; position += 1) {
    createPromise(position, delayElement);
    console.log('delayPromise', delayElement, 'position', position);
    delayElement += stapElement;
  }
}

function createPromise(position, delay) {
  const result = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (result) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  promise
    .then(({ position, delay }) => {
      Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}