const btnNotes = document.querySelector('.btn-notes');
const btnLetters = document.querySelector('.btn-letters');
const pianoKeyLetterNotes = document.querySelectorAll('.piano-key');

const piano = document.querySelector('.piano');
const pianoКey = document.querySelectorAll('.piano-key');

function playAudio(src) {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

piano.addEventListener('click', (event) => {
  if(event.target.classList.contains('piano-key')) {
    const note = event.target.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);
    const key = document.querySelector(`.piano-key[data-note="${note}"]`);
    key.classList.add('piano-key-active');
    setTimeout(function(){
      pianoКey.forEach((el) => {
        if(el.classList.contains('piano-key-active')) {
          el.classList.remove('piano-key-active');
        };
      }); 
    }, 200);  
  }
});

window.addEventListener('keydown', (e) => {
  if (e.repeat) return;
  console.log(e)
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.piano-key[data-key="${e.keyCode}"]`);
  if(!audio) return false;
  audio.currentTime = 0;
  audio.play();


key.classList.add('piano-key-active');
console.log(key);
setTimeout(function(){
    pianoКey.forEach((el) => {
      if(el.classList.contains('piano-key-active')) {
        el.classList.remove('piano-key-active');
      };
    }); 
  }, 200);
});

btnNotes.addEventListener ('click', (event) => {
    btnNotes.classList.add('btn-active');
    btnLetters.classList.remove('btn-active');
    pianoKeyLetterNotes.forEach((key) => {
      key.classList.remove('piano-key-letter');
      });
});

btnLetters.addEventListener ('click', (event) => {
    btnLetters.classList.add('btn-active');
    btnNotes.classList.remove('btn-active');
    pianoKeyLetterNotes.forEach((key) => {
      key.classList.add('piano-key-letter');
      });
});

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