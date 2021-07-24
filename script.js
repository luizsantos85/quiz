//initial data
let currentQuestion = 0;
let scoreArea = document.querySelector('.scoreArea');
let questionArea = document.querySelector('.questionArea');
let questionInput = document.querySelector('.question');
let optionsInput = document.querySelector('.options');
let scorePct = document.querySelector('.scorePct');
let scoreTxt1 = document.querySelector('.scoreText1');
let scoreTxt2 = document.querySelector('.scoreText2');
let progressBar = document.querySelector('.progress--bar');
let button = document.querySelector('.scoreArea button');
let correctAnswer = 0;

//calls
showQuestions();

//events
button.addEventListener('click', resetEvent);


//functions
function showQuestions() {
   if (questions[currentQuestion]) {
      let q = questions[currentQuestion];

      let pct = Math.floor((currentQuestion / questions.length) * 100);
      progressBar.style.width = `${pct}%`;

      scoreArea.style.display = 'none';
      questionArea.style.display = 'block';
      questionInput.innerHTML = q.question;

      let optionsHtml = '';
      for (let i in q.options) {
         optionsHtml += `<div data-op=${i} class="option"><span>${
            parseInt(i) + 1
         }</span>${q.options[i]}</div>`;
      }
      optionsInput.innerHTML = optionsHtml;

      document.querySelectorAll('.options .option').forEach((item) => {
         item.addEventListener('click', optionClickEvent);
      });
   } else {
      finishQuestions();
   }
}

function optionClickEvent(e) {
   let clickeOption = parseInt(e.target.getAttribute('data-op'));

   if (questions[currentQuestion].answer === clickeOption) {
      correctAnswer++;
   }

   currentQuestion++;
   showQuestions();
}

function finishQuestions() {
   scoreArea.style.display = 'block';
   questionArea.style.display = 'none';
   progressBar.style.width = `100%`;

   let points = Math.floor((correctAnswer / questions.length) * 100);

   if (points < 50) {
      scoreTxt1.innerHTML = 'Pode melhorar, continue estudando!';
      scorePct.style.color = '#c0392b';
   } else if (points >= 50 && points < 70) {
      scoreTxt1.innerHTML = 'Nossa, que evolução!!';
      scorePct.style.color = '#f1c40f';
   } else if (points >= 70) {
      scoreTxt1.innerHTML = 'Parabéns';
      scorePct.style.color = '#2ecc71';
   }

   scorePct.innerHTML = `Você acertou ${points}%`;
   scoreTxt2.innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswer}.`;
}

function resetEvent(){
    correctAnswer = 0;
    currentQuestion = 0;
    showQuestions();
}