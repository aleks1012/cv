const keysAll = document.querySelector('.keys');
const key = document.querySelectorAll('.key')
//piano.addEventListener('click', playAudio);
const audio = document.querySelector('audio');


function playAudio(src) {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

//Клавиатура
window.addEventListener('keydown', (e) => {
  console.log(e)
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  //key.classList.add('playing');
  console.log(audio, key)
  if(!audio) return false;
  key.classList.add('playing');
  audio.currentTime = 0;
  //audio.play();
  if (e.repeat == false) {
  audio.play();
}
if (e.repeat) return;
})

//Анимация кнопок оранжевым при нажатии 
function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
  }
  const keys = Array.from(document.querySelectorAll('.key'));
  keys.forEach(key => key.addEventListener('transitionend', removeTransition)); 


// Мышь
keysAll.addEventListener('click', (event) => {
  console.log(111)
  if(event.target.classList.contains('key') || event.target.classList.contains('sound') || event.target.classList.contains('letter')) {
    const note = event.target.dataset.note;
    const src = `assets/sounds/${note}.wav`;
    playAudio(src);
    const key = document.querySelector(`.key[data-note="${note}"]`);
    key.classList.add('playing');
  }
});

//Полноэкранный режим
document.querySelector('.fullscreen').addEventListener('click', fullscreen);

function fullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.fullscreenEnabled) {
      document.exitFullscreen();
    }
  }
}

//переключение на светлую тему
  const themeColor =  document.querySelector('.toggleThemeBtn');

  themeColor.addEventListener('click', (event) => {
    document.body.classList.toggle('light');
    themeColor.innerText = document.body.classList.contains('light') ? 'Dark mode' : 'Light mode';
  });