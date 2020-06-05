let colors = ['yellow','red','blue','green','fiolet']
let body = document.body;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let scores = document.querySelector('.score');
let num = 0;
let fail = 0;
let total = 100;
let gameOver = false;
let gameWon = false;
let totalShadow = document.querySelector('.total-shadow');
let currentBallon = 0;

function createBallon() {
  let div = document.createElement('div');
  let rand = Math.floor(Math.random() * colors.length)
  div.className= 'ballon ' + colors[rand] +'-ballon';
  rand = Math.floor(Math.random() * (windowWidth-100) )
  div.style.left = rand + 'px';
  div.dataset.number = currentBallon;
  currentBallon++;
  body.appendChild(div);
  animateBallon(div);
}

function animateBallon(elem) {
  let pos = 0;
  let random = Math.floor(Math.random() * 6 - 3)
  let interval = setInterval(frame, Math.floor(12 - num /10) + random);
  function frame() {
     if (pos >= ( windowHeight + 200) && (document.querySelector('[data-number="'+ elem.dataset.number +'"]') !== null)) {
       fail++;
       AutoPop();
       clearInterval(interval);
       deleteBallon(elem);
       if (fail >= 5) {
         gameOver = true;
       }
     }
     else {
       pos++;
       elem.style.top = windowHeight - pos + 'px';
     }

   }
}


function deleteBallon(elem) {
  if(document.querySelector('[data-number="'+ elem.dataset.number +'"]'))
  {
    elem.remove();
    updateScore();
  }

}
function popBallonSound() {

  let audio = document.createElement('audio');
  audio.src = 'music/pop.mp3';
  audio.play();
}
function bgBallonSound() {
  let audio = document.createElement('audio');
  audio.src = 'music/bg-music.mp3';
  audio.play();
}
document.addEventListener('click',function (e) {
  if (e.target.classList.contains('ballon')) {
      num++;
      popBallonSound();

      if (num>=total) {
        gameWon=true;
      }
      deleteBallon(e.target);
  }
})

function updateScore() {
  scores.textContent = num;
}

function startGame() {
  restartGame();
  let timeout = 0;
  let generateBallon = setInterval(function () {
    timeout = Math.floor( Math.random() * 600 - 100 )
    if (!gameOver && !gameWon) {
      createBallon();
    }
    else if (gameWon) {
      clearInterval(generateBallon);
      totalShadow.style.display = 'flex';
      document.querySelector('.total-win').style.display = 'block';
    }
    else if (gameOver) {
      clearInterval(generateBallon);
      totalShadow.style.display = 'flex';
      document.querySelector('.total-lose').style.display = 'block';
      document.querySelector('.bg-music').pause();
      playFail();
    }

  }, 800 + timeout);
}
function restartGame() {
  let removeAll = document.querySelectorAll('.ballon');
  for (let i = 0; i < removeAll.length; i++) {
    removeAll[i].remove();
  }
  document.querySelector('.bg-music').play();
  gameOver = false;
  gameWon = false;
  num = 0;
  fail= 0;
  updateScore();


}
document.querySelector('.btn-yes').addEventListener('click',function () {
  totalShadow.style.display = 'none';
  document.querySelector('.total-lose').style.display = 'none';
  document.querySelector('.total-win').style.display = 'none';
  startGame();

})
document.querySelector('.btn-no').addEventListener('click',function () {
  totalShadow.style.display = 'none';
  document.querySelector('.bg-music').pause();

})

document.querySelector('.btn-start').addEventListener('click',function () {
  document.querySelector('.start-game').style.display='none';
  startGame();

})

function playFail() {
  let failAudio = document.createElement('audio');
  failAudio.src = 'music/sad.mp3';
  failAudio.play();
}

function AutoPop() {
  if (!gameOver) {
    let failAudio = document.createElement('audio');
    failAudio.src = 'music/auto-pop.mp3';
    failAudio.play();
  }

}
