// ------------------- DOM Elements -------------------
const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

// ------------------- Quiz State & Logic -------------------
let questionCount = 0;
let questionNumb = 1;
let userScore = 0;
const userAnswers = []; // Array to store user's answers

// Event Listeners
startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
};

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
};

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    updateQuestionCounter(1);
    updateHeaderScore();
};

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    resultBox.classList.remove('active');
    resetQuiz();
    showQuestions(questionCount);
    updateQuestionCounter(questionNumb);
    updateHeaderScore();
};

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    quizBox.classList.remove('active');
    resultBox.classList.remove('active');
    resetQuiz();
};

const nextBtn = document.querySelector('.next-btn');
nextBtn.onclick = () => {
    // Check if an answer has been selected for the current question
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        alert('Please select an answer before proceeding.');
        return;
    }
    // Store the selected answer
    userAnswers[questionCount] = selectedOption.value;

    if (questionCount < questions.length - 1) {
        questionCount++;
        questionNumb++;
        showQuestions(questionCount);
        updateQuestionCounter(questionNumb);

        // Change button to "Submit" on the last question
        if (questionCount === questions.length - 1) {
            nextBtn.textContent = 'Submit';
        }
    } else {
        // When 'Submit' is clicked on the last question
        submitQuiz();
    }
};


// Display current question and options with radio buttons
function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    const optionList = document.querySelector('.option-list');
    
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = '';
    for (let i = 0; i < questions[index].options.length; i++) {
        const optionValue = questions[index].options[i];
        optionTag += `<label class="option">
                        <input type="radio" name="option" value="${optionValue}">
                        <span>${optionValue}</span>
                      </label>`;
    }
    optionList.innerHTML = optionTag;
}

// Submits the quiz, validates answers, and calculates the score
function submitQuiz() {
    // Loop through all questions and check stored answers
    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] === questions[i].answer) {
            userScore++;
        }
    }
    updateHeaderScore();
    showResultBox();
}

// Show the final result box
function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    // Provide feedback as required
    scoreText.textContent = `You scored ${userScore} out of ${questions.length} questions correctly`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    const percentage = (userScore / questions.length) * 100;
    
    let progressStartValue = -1;
    let progressEndValue = Math.round(percentage);
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(var(--main-color) ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;

        if (progressStartValue === progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
}

// Update question counter text
function updateQuestionCounter(qNumb) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${qNumb} of ${questions.length} Questions`;
}

// Update header score text
function updateHeaderScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

// Reset all quiz state variables
function resetQuiz() {
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    userAnswers.length = 0; // Clear the answers array
    nextBtn.textContent = 'Next'; // Reset button text
    updateHeaderScore();
}