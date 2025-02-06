// Grab DOM elements
let username = document.querySelector('#username');
let saveScoreBtn = document.querySelector('#saveScoreBtn');
let finalScore = document.querySelector('#finalScore');
let mostRecentScore = localStorage.getItem('mostRecentScore');

// Attempt to retrieve the high scores from local storage
let highScores = JSON.parse(localStorage.getItem('highScores'));

//set up the maximum numbers of high score to save
let maxHighScore = 5;

// Display the most recent score to the user
finalScore.innerText = mostRecentScore;

// Event listener to enable the save button only when there is some input in the username field
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
})

// Function to handle saving the high score
saveHighScore = e => {
    e.preventDefault();

    // Create a score object with the user's name and score
    let score = {
        score: mostRecentScore,
        name: username.value
    }

    // Add the new score to the array of high scores and sort from highest to lowest
    highScores.push(score);
    highScores.sort((a, b) => {
        return b.score - a.score
    })

    highScores.splice(maxHighScore);

    // Save the updated high scores array to local storage
    localStorage.setItem('highScores', JSON.stringify(highScores));
    
    // Redirect the user to the start page after saving their score
    window.location.assign('start.html')
}