'use strict'

const STORE = [
//Question 1
    {
        quizQuestion: 'What kind of star system is our solar system?',
        quizChoices: [
            'Binary', 
            'Trinary', 
            'Unary', 
            'Quarternary'
            ],
        quizCorrectChoice: 'Unary',
        quizCorrect: 'Correct!',
        quizIncorrect: `Incorrect, the answer is 'Unary'`
    },
//Question 2
    {
        quizQuestion: 'How many planets revolve around our sun?',
        quizChoices: [
            '7', 
            '8', 
            '9', 
            'None of the above'
            ],
        quizCorrectChoice: '8',
        quizCorrect: 'Correct!',
        quizIncorrect: `Incorrect, the answer is '8'`
    },
//Question 3
    {
        quizQuestion: 'Which planet is the closest our sun?',
        quizChoices: [
            'Venus',
            'Mercury', 
            'Mars', 
            'Earth'
            ],
        quizCorrectChoice: 'Mercury',
        quizCorrect: 'Correct!',
        quizIncorrect: `Incorrect, the answer is 'Mercury'`
    },    
//Question 4
    {
        quizQuestion: 'How many of the planets in our solar system are \'gas giants\'?',
        quizChoices: [
            '2',
            '3', 
            '4', 
            '5'
            ],
        quizCorrectChoice: '4',
        quizCorrect: 'Correct! The gas giants of the solar system are Jupiter, Saturn, Uranis and Neptune.',
        quizIncorrect: `Incorrect, the answer is '4'`
    },
//Question 5
    {
        quizQuestion: 'How many moons in our solar system?',
        quizChoices: [
            'One, THE Moon', 
            '181', 
            '90', 
            'NEEDS AN OPTION'
            ],
        quizCorrectChoice: '181',
        quizCorrect: 'Correct! That\'s a lot of moons!',
        quizIncorrect: `Incorrect, the answer is '181'`
    },
//Question 6
    {
        quizQuestion: 'Which of these are the effects of tidal forces?',
        quizChoices: [
            'High and low tides of Earth\'s oceans', 
            'Moon quakes', 
            'NEEDS AN OPTION', 
            'All of the above'
            ],
        quizCorrectChoice: 'All of the above',
        quizCorrect: 'Correct!',
        quizIncorrect: `Incorrect, the answer is 'All of the above'`
    },
//Question 7
    {
        quizQuestion: 'Space is mostly made up of...?',
        quizChoices: [
            'Nothing, most of space is a vacuum',
            'Matter', 
            'Energy',
            'None of the above', 
            ],
        quizCorrectChoice: 'Nothing, most of space is a vacuum',
        quizCorrect: 'Correct!',
        quizIncorrect: `Incorrect, the answer is 'Nothing, most of space is a vacuum'`
    },
//Question 8
    {
        quizQuestion: 'What is the effect of time dialation?',
        quizChoices: [
            'Time slows (relative to earth) as gravity increases',
            'Time slows (relative to earth) as gravity decreases', 
            'Time hastens (relative to earth) as grativy increases',
            'No effect, time is constant throughout space', 
            ],
        quizCorrectChoice: 'Time slows (relative to earth) as gravity increases',
        quizCorrect: 'Correct!',
        quizIncorrect: `Incorrect, the answer is 'Time slows (relative to earth) as gravity increases'`
    },
//Question 9
    {
        quizQuestion: 'When did the first human go to space?',
        quizChoices: [
            '2001', 
            '1968', 
            '1961', 
            'Never, space doesn\'t exist!'
            ],
        quizCorrectChoice: '1968',
        quizCorrect: 'Correct!',
        quizIncorrect: `Incorrect, the answer is '1968'`
    },
//Question 10
    {
        quizQuestion: 'How many miles above Earth does space begin?',
        quizChoices: [
            '62 miles', 
            '20 miles', 
            '632 miles', 
            '467 miles'
            ],
        quizCorrectChoice: '62 miles',
        quizCorrect: 'Correct!',
        quizIncorrect: `Incorrect, the answer is '62 miles'`
    },
];

let currentDataSet = 0;
let quizProgress = 0;
let quizScore = 0;

function updateDataSet() {
    currentDataSet++;
}

function updateQuizProgress() {
    // This function is responsible for increasing the value displayed in the Progress tracker ('0/10' - '10/10')
    quizProgress++;
    $('.js-progress-num').html(`${quizProgress}`);
}

function updateQuizScore() {
    // This function tallies the amount of questions that the user got correct
    quizScore++;
    $('.js-score-num').html(`${quizScore}`);
}   

function choiceCorrect() {
    // This function will render the 'correct' message
    return `<h2 class="choice-result">${STORE[currentDataSet].quizCorrect}</h2>
    <button type="button" class="js-quiz-continue">CONTINUE</button>`;
}

function choiceIncorrect() {
    // This function will render the 'incorrect' message
    return `<h2 class="choice-result">${STORE[currentDataSet].quizIncorrect}</h2>
    <button type="button" class="js-quiz-continue">CONTINUE</button>`;
}

// Generates the enitre current quiz data and inserts it into the DOM to be rendered
function generateQuiz() {
    // This function renders the Question and Answer form in the webpage
    return [generateQuestionElement(), generateQuizForm(STORE[currentDataSet].quizChoices)];
}

// Generates the question element of the current question for the quiz to be rendered
function generateQuestionElement() {
    const question = STORE[currentDataSet].quizQuestion;
    return `<h2 class="quiz-question js-quiz-question">${question}</h2>`
}

// Generates each HTML element to make up the multiple-choice answers
function generateChoiceElement(item, itemIndex) {
    // const choices = quizData.quizChoices
    return `<label for="choice-${itemIndex}"><input type="radio" id="choice-${itemIndex}" name="quiz-choice" value="${item}">${item}</label>`;
}   

// Sets generateChoiceElement elements into an HTML form to be rendered
function generateQuizForm(quizChoices) {
    const items = quizChoices.map((item, index) => generateChoiceElement(item, index));  
    return `<form id="quiz-choices js-quiz-choices">
        <fieldset>
            ${items.join("")}
            <button type="button" class="quiz-submit js-quiz-submit">SUBMIT</button>
        </fieldset>
    </form>`
}

function generateResults() {
    return `<h2 class="choice-result">Thank you for taking my quiz! <br> You scored <span class="js-score-num">0</span>/10 <br> Feel free to try again!</h2>
    <button type="button" class="js-quiz-restart">RESTART</button>`
}

function renderQuiz() {
    // Starts the quiz, rendering the first question when the user clicks start
    $('main').on('click', '.js-quiz-start', function(event) {
        event.preventDefault();
        $('main').empty();
        $('.status-bar').css('visibility', 'visible');
        $('main').html(generateQuiz());
        updateQuizProgress();
    });
}

function submitAnswer() {
    $('main').on('click', '.js-quiz-submit', function(event) {
        event.preventDefault();
        let choiceValue = $('input[name="quiz-choice"]:checked').val();
        if (choiceValue === STORE[currentDataSet].quizCorrectChoice) { 
            $('main').html(choiceCorrect());
            updateQuizScore();
        } else {
            $('main').html(choiceIncorrect());
        }
    });
}

function continueQuiz() {
    $('main').on('click', '.js-quiz-continue', function(event) {
        event.preventDefault();
        updateDataSet();
        if (currentDataSet > 9) {
            $('main').empty();
            $('main').html(generateResults());
        } else {
            $('main').empty();
            $('main').html(generateQuiz());
            updateQuizProgress();
        }
    });
}

function restartQuiz() {
    $('.js-quiz-restart').on('click', function(event) {
        currentDataSet = 0;
        quizProgress = 0;
        quizScore = 0;
        $('.js-progress-num').html(`${quizProgress}`);
        $('.js-score-num').html(`${quizScore}`);
        $('main').empty();
        $('main').html('<h1 class="quiz-start">Ready to start your quiz through space?</h1><button type="submit" class="quiz-start js-quiz-start">BEGIN!</button>')
    })
}

// when user clicks start   
// update quizProgress
// generate first set of questions and answers
// when user clicks sumbit
// update quizScore
// display corret or incorrect
// when user clicks continue
// update quizProgress
// generate next set of questions and answers

function doTheThings() {
    renderQuiz();
    submitAnswer();
    continueQuiz();
    restartQuiz();
}

$(doTheThings);