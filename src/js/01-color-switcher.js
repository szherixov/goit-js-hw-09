function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  const body = document.querySelector('body');
  const buttonStart = document.querySelector('[data-start]');
  const buttonStop = document.querySelector('[data-stop]');
  let timerId = null;
  buttonStop.setAttribute('disabled', 'disabled');
  
  buttonStart.addEventListener('click', () => {
    buttonStart.setAttribute('disabled', 'disabled');
    buttonStop.removeAttribute('disabled', 'disabled');
  
    body.style.backgroundColor = getRandomHexColor();
    timerId = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  });
  
  buttonStop.addEventListener('click', () => {
    buttonStop.setAttribute('disabled', 'disabled');
    buttonStart.removeAttribute('disabled', 'disabled');
    clearInterval(timerId);
  });