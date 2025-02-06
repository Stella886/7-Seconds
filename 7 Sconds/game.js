// Game variables
let maxQuestions = 11; // only have 10 times to choose because of the delay function
let correctAnswer;
let previousCorrectAnswer;
let timerInterval;

// Get ready to start the game
$(document).ready(function () {
    startGame();
});

function startGame() {
    score = 0;
    questionCount = 0;
    correctAnswer = undefined; // Clear current correct answer
    previousCorrectAnswer = undefined;
    clearInterval(timerInterval); // Clear any existing game timers 
    updateUI();
    displayQuestion(); // display the first question
}

// Function to handle the display and logic of each question
function displayQuestion() {
    questionCount++;

    //Save final scores to local storage
    if (questionCount > maxQuestions) {
        localStorage.setItem('mostRecentScore', score);
        // Redirect to the end page after the last question
        return window.location.assign('/end.html');
    }

    // The first question is unique; needs to be considered separately
    // Update previous correct answer（except the first question）
    if (questionCount > 1) {
        previousCorrectAnswer = correctAnswer;
    }
    generateQuestion();

    // Set up answer options (start from the second question)
    if (questionCount > 1) {
        setupAnswerOptions();
    }

    // 3 seconds for the first question, 7 seconds countdown after that
    if (questionCount === 1) {
        startTimer(3);
    } else {
        startTimer(7);
    }
    updateUI();
}

// Function to generate the question and calculate the correct answer
function generateQuestion() {
    let num1 = Math.floor(Math.random() * 7) + 1;
    let num2 = Math.floor(Math.random() * 9) + 1;
    let operations = ['+', '-', '*']; //array of possible operations
    let operation = operations[Math.floor(Math.random() * operations.length)];
    correctAnswer = eval(`${num1} ${operation} ${num2}`); // Evaluate the expression to find the correct answer
    $('#questionArea').text(`${num1} ${operation} ${num2}`);
}

// Function to setup answer options
function setupAnswerOptions() {
    let randomAnswer;
    // Generate a random answer different from the correct answer and previous correct answer
    do {
        randomAnswer = Math.floor(Math.random() * 23) + 1;
    } while (randomAnswer === correctAnswer || randomAnswer === previousCorrectAnswer);

    // Do not set options for the first question, jump directly to the next question
    if (questionCount === 1) {
        previousCorrectAnswer = correctAnswer; // Store the correct answer for use in the next question
        return;
    }

    let answers = [previousCorrectAnswer, randomAnswer];
    answers.sort(() => Math.random() - 0.5); // Randomly shuffle the answers

    // Set up text and click handles to each button
    $('#answerOptions button').each(function (index) {
        $(this).removeClass('correct incorrect').text(answers[index]).off('click').click(function () {
            clearInterval(timerInterval);

            let selectedAnswer = parseInt($(this).text()); // Parse the button text to a number
            let classToApply = selectedAnswer === previousCorrectAnswer ? 'correct' : 'incorrect'; // Determine class based on answer correctness; styled in css

            $(this).addClass(classToApply);
            if (selectedAnswer === previousCorrectAnswer) {
                score++;
            }
            updateUI();
            setTimeout(function () {
                previousCorrectAnswer = correctAnswer;
                displayQuestion();
            }, 1000); // Delay of 1s
        });
    });

}


function startTimer(seconds) {
    clearInterval(timerInterval);
    let timeLeft = seconds; // Initialize timeleft with the starting seconds
    $('#timerDisplay').text(`Time Left: ${timeLeft}s`);

    // Setup a new timer to decrement the timeLeft every second
    timerInterval = setInterval(() => {
        timeLeft--;
        $('#timerDisplay').text(`Time Left: ${timeLeft}s`); // Update the display with new time
        if (timeLeft <= 0) {
            clearInterval(timerInterval); // stop timer when it reaches 0
            displayQuestion();
        }
    }, 1000); // Interval set to 1s
}

function updateUI() {
    $('#scoreDisplay').text(`Score: ${score}`);
    $('#questionCountDisplay').text(`Question: ${questionCount - 1}/${maxQuestions - 1}`);
}
