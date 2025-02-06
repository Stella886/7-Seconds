let highScoreList = document.querySelector('#highScoreList');
let highScores = JSON.parse(localStorage.getItem('highScores'));

// Populate the high score list in the HTML
highScoreList.innerHTML =
    highScores.map(score => {
        // Return a list item string for each score containing the name and score
        return `<li class="high-score"> ${score.name} - ${score.score} </li>`
    }).join(''); // Join all the list item strings into a single string to set as the innerHTMLs