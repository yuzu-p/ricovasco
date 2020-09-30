var spotOne = document.getElementById('spotOne');
var spotTwo = document.getElementById('spotTwo');
var spotThree = document.getElementById('spotThree');
var guessing = false;
var speed = 260; // 속도 낮을수록 빠름
var speedFactor = 500;
var shuffles = 20;
var score = 0;
var highScores;

function init() {
  if (localStorage.scores){
    highScores = JSON.parse(localStorage.scores);
  } else {
    highScores = [{n:'AAA',s: 1000}, {n: 'ABB', s: 1200}, {n: 'BBB', s: 1400}, {n: 'CCC', s: 1600}, {n: 'DDD', s: 1800}];
  }
}

var Shuffler = {

  options: [],
  classTime: 0,

  getOptions: function() {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0; i<vars.length; i++) {
      var pair = vars[i].split("=");
      this.options[i] = pair[1]
    }
  },

  parseOptions: function(options) {
    this.classTime = speed - 20;
    return speed, speedFactor, shuffles;
  },

  assignRightAnswer: function() {
    var randomNumber = Math.floor(Math.random()*3);
    if (randomNumber === 0 ){
      spotOne.children[0].setAttribute('id', 'winner');
      spotOne.children[0].children[0].src = '../images/heat_open.png';
      setTimeout(function(){
      spotOne.children[0].children[0].src = '../images/heat.png'
      },1000);
    } else if(randomNumber === 1){
      spotTwo.children[0].setAttribute('id', 'winner');
      spotTwo.children[0].children[0].src = '../images/heat_open.png'
      setTimeout(function(){
      spotTwo.children[0].children[0].src = '../images/heat.png'
      },1000);
    } else if(randomNumber === 2){
      spotThree.children[0].setAttribute('id', 'winner');
      spotThree.children[0].children[0].src = '../images/heat_open.png'
      setTimeout(function(){
      spotThree.children[0].children[0].src = '../images/heat.png'
      },1000);
    }
  },
  
  shuffle: function(s, i) {
     setTimeout(function () {
        Shuffler.pickRandomShuffle();
        if (--i) {
          Shuffler.shuffle(speed, i);
        } else {
          guessing = true;
        }
     }, s)
  },

  runGame: function() {
    this.getOptions();
    this.parseOptions(this.options);
    this.assignRightAnswer();
    setTimeout(function() {
      Shuffler.shuffle(speed, shuffles)}, 1000)
  },

  pickRandomShuffle: function() {
    var randomNumber = Math.floor(Math.random()*3);
    if (randomNumber === 0) {
      this.animateFirstToThird(spotOne.children[0], spotThree.children[0]);
    } else if (randomNumber === 1) {
      this.animateSecondToOne(spotOne.children[0], spotTwo.children[0]);
    } else if (randomNumber === 2) {
      this.animateSecondToThird(spotTwo.children[0], spotThree.children[0]);
    }
  },

  animateFirstToThird: function(childOfSpotOne, childOfSpotThree) {
    childOfSpotThree.style.animation = 'threeToOnes ' + speed + 'ms';
    childOfSpotOne.style.animation = 'oneToThrees ' + speed + 'ms';
    setTimeout(function(){
      childOfSpotOne.style.animation = null;
      childOfSpotThree.style.animation = null;
      spotOne.appendChild(childOfSpotThree);
      spotThree.appendChild(childOfSpotOne);
    }, this.classTime)
  },

  animateSecondToOne: function(childOfSpotOne, childOfSpotTwo) {
    childOfSpotTwo.style.animation = 'twoToOnes ' + speed + 'ms';
    childOfSpotOne.style.animation = 'oneToTwos ' + speed + 'ms';
    setTimeout(function(){
      childOfSpotTwo.style.animation = null;
      childOfSpotOne.style.animation = null;
      spotOne.appendChild(childOfSpotTwo);
      spotTwo.appendChild(childOfSpotOne);
    }, this.classTime)
  },

  animateSecondToThird: function(childOfSpotTwo, childOfSpotThree) {
    childOfSpotTwo.style.animation = 'twoToThrees ' + speed + 'ms';
    childOfSpotThree.style.animation = 'threeToTwos ' + speed + 'ms';
    setTimeout(function(){
      childOfSpotTwo.style.animation = null;
      childOfSpotThree.style.animation = null;
      spotTwo.appendChild(childOfSpotThree);
      spotThree.appendChild(childOfSpotTwo);
    }, this.classTime)
  }
};

var Responder = {
  feedback: document.getElementById('feedback'),
  popup: document.getElementById('popup'),

  winNHS: function() {
    this.popup.setAttribute('class', 'popup');
    this.feedback.innerHTML = '<p class="win"><span class="result">SUCCESS!</span><br><a href="../index.html">당첨금을 무사히 되찾았다!</a></p>';
  },

  lose: function() {
    this.popup.setAttribute('class', 'popup');
    this.feedback.innerHTML = '<p class="lose"><span class="result">FAIL...</span><br>당신은 로또 회사와의 결착 논란으로 잡혀갔습니다...<br><a href="find.html">뭐라고? 다시 할래!</a></p>';
  },

  spotOneClick: function() {
    if(guessing) {
      Responder.reveal();
      if(spotOne.children[0].id === 'winner'){
        score = speedFactor * shuffles;
          Responder.winNHS();
      } else {
        Responder.lose();
      }
    }
    guessing = false;
    return score;
  },

  spotTwoClick: function() {
    if(guessing) {
      Responder.reveal();
      if(spotTwo.children[0].id === 'winner'){
        score = speedFactor * shuffles;
          Responder.winNHS();
      } else {
        Responder.lose();
      }
    }
    guessing = false;
    return score;
  },

  spotThreeClick: function() {
    if(guessing) {
      Responder.reveal();
      if(spotThree.children[0].id === 'winner'){
        score = speedFactor * shuffles;
          Responder.winNHS();
      } else {
        Responder.lose();
      }
    }
    guessing = false;
    return score;
  },

  reveal: function() {
    var winnerReveal = document.getElementById('winner');
    winnerReveal.children[0].src = '../images/heat_open.png';
  },


  formListen: function() {
    var form = document.getElementById('form');
    form.addEventListener('submit', function(event) {
      event.preventDefault();
    });
  }
};

spotOne.addEventListener('click', Responder.spotOneClick);
spotTwo.addEventListener('click', Responder.spotTwoClick);
spotThree.addEventListener('click', Responder.spotThreeClick);

init();
setTimeout(function(){
  Shuffler.runGame();
}, 500);

