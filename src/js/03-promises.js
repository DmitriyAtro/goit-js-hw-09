import { Notify } from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', createPromises);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function createPromises(event) {
  event.preventDefault();

  const form = event.currentTarget;

  let delay = Number(form.elements.delay.value);
  const step = Number(form.elements.step.value);
  const amount = Number(form.elements.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`😀 Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`😡 Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}
