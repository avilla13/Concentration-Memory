/*----CONSTANTS----*/
const cardDeck = [
    {img: 'blue', match: 0}, // NOTE: match property is actually STATE variable
    {img: 'blue', match: 0}, // match: 0 -> card not matched
    {img: 'red', match: 0}, // match: 1 -> card has been matched
    {img: 'red', match: 0},
    {img: 'yellow', match: 0},
    {img: 'yellow', match: 0},
    {img: 'plum', match: 0},
    {img: 'plum', match: 0},
    {img: 'orange', match: 0},
    {img: 'orange', match: 0},
    {img: 'cyan', match: 0},
    {img: 'cyan', match: 0},
];

/*----game STATE variables----*/
let isFirstClick = true; // Variable to track the first click
let playerStats = { // Variable to track player choices and stats
    choice1: null, // Variable to store odd-numbered clicked cards
    choice2: null, // Variable to store even-numbered clicked cards
    clicks: 0 // Variable used to track only every 2 cards
};
let countdown; // Holds reference to renderTimer()
let winner; // Hold reference to getWinner()

/*----CACHED elements----*/
const cardEls = document.querySelectorAll('.card'); // Get all the card elements
const gameboard = document.getElementById('gameboard'); // Get all the elements in gameboard
const playAgainBtn = document.querySelector('button'); // Get the button element
const timerDisplay = document.getElementById('timer'); // Get the timer element
const resultsEl = document.getElementById('results'); // Get results element

/*----EVENT listeners----*/
gameboard.addEventListener('click', handleClick); // To trigger the handleClick()
playAgainBtn.addEventListener('click', init); // To reset gameboard to initial state (init())

/*----FUNCTIONS----*/
init(); 
function init() { // Initiate all initial state
  shuffle (cardDeck); // Shuffle or re-shuffle (if playing again)
  scores = {playerOne: 0}; // Reset scores
  playerStats.choice1 = null; // Reset the choices
  playerStats.choice2 = null;
  playerStats.clicks = 0; // Reset clicks to render proper match condition
  winner = null; // Reset winner
  isFirstClick = true; // Reset timer
  cardDeck.forEach((card) => card.match = 0); // Clear matched cards
  cardEls.forEach(cardEl => cardEl.classList.remove('card-visible')); // Clear visible cards
  countdown = 20; // Count
  timerDisplay.style.visibility = 'hidden';
  gameboard.addEventListener('click', handleClick);
  resultsEl.style.visibility = 'hidden';
  render();
}

function render() { // Transfers/visualizes all state
    renderBoard(); // Render the game board
    renderScores(); // Render the scores
    renderResults(); // Render the game results
}
// Using the Fisher-Yates shuffle algorithm method:
function shuffle(array) { 
    let currentIndex = array.length;
    let randomIndex;
    // While there remain card elements to shuffle.
    while (currentIndex) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      const tempVal = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = tempVal;
    }
    return array;
  }

function renderBoard() { // Render state of cards whenever invoked
    // Assign the 'colors' from the cardDeck to each card element's 'card-visible' class
    cardEls.forEach((cardEl, index) => {
        if(cardEl.classList.contains('card-visible')) {
            cardEl.style.backgroundColor = cardDeck[index].img;
        } else {
            cardEl.style.backgroundColor = 'black'; // the colors will be toggled-on in handleClick
        }
    })
}

function handleClick(evt) {
    // Assign the 'clicked card' to variable cardObj(object)
    const cardObj = cardDeck[parseInt(evt.target.id)];
    // Guards for only clicking on card elements
    if (evt.target.classList.contains('card') && 
    cardObj.match === 0) { //  & to only select unmatched cards
        // Check if it's the first click
        if (isFirstClick) {
            renderTimer(); // Start timer function
            isFirstClick = false; // So it won't on subsequent clicks
        }
        flipCard(evt.target);

        if (playerStats.clicks === 0) { // Store as first card choice
            playerStats.choice1 = cardObj; // Add clicked cardObj to choice1
            playerStats.choice1El = evt.target; // & add the HTML element
            playerStats.clicks++; // Set up for next card
        } else if (playerStats.clicks === 1) { // Store as second card choice 
            playerStats.choice2 = cardObj;
            playerStats.choice2El = evt.target;   
            // Check for pairs
            matchPairs(playerStats.choice1, playerStats.choice1El, 
            playerStats.choice2, playerStats.choice2El);
            playerStats.clicks = 0; // Reset the clicks to repeat on subsequent click
        } 
        render(); // Render the card(s) state
    }
} // end click handler

function flipCard(card) {
    card.classList.toggle('card-visible'); // Toggle target card's 'card-visible' class
} 

function matchPairs (card1, card1El, card2, card2El) { // Checks if selected cards are a match   
    if (card1.img === card2.img) { 
        scores.playerOne++; // if they are, add 1 to scores 
        // Update the 'match' value to 1 for both cards so they become 'unselectable'
        card1.match = 1;
        card2.match = 1;           
    } else {
        // if their match value is 0, flip the cards back
        setTimeout(() => {
            flipCard(card1El);
            flipCard(card2El);
            render();
        }, 500); 
    }
}

function renderTimer() {
    timerDisplay.innerText = `Time: ${countdown}s`; // Update timer display
    timerDisplay.style.visibility = 'visible'; // Make it visible
    const timer = setInterval(() => {
        getWinner(timer);
        countdown--;
        if (countdown && isFirstClick === false && !winner) { // while it's ticking down & no winner
            timerDisplay.innerText = `Time: ${countdown}s`;
        } else if (countdown && isFirstClick === false && winner) { // while ticking down & player wins
            timerDisplay.innerText = `Time: ${countdown}s`;    
        } else if(countdown && isFirstClick === true) { // reset timer when 'play again' is clicked
            clearInterval(timer);
        } else {
            timerDisplay.innerText = `Time's Up!`;
            clearInterval(timer);
            gameboard.style.cursor = 'auto';
            gameboard.removeEventListener('click', handleClick);
            cardEls.forEach(cardEl => {
                cardEl.style.cursor = 'auto';
              });
            renderMsg(winner);
        }
    }, 1000);
}

function renderScores() { // Display player matched pairs
    const scoreEl = document.getElementById('score');
    scoreEl.innerText = `Matched Pairs: ${scores.playerOne}/${(cardDeck.length)/2}`;
}
function getWinner(timeNum) { // If all pairs have been matched, player wins
    if(scores.playerOne === (cardDeck.length)/2) {
        winner = true;
        clearInterval(timeNum); // Stop timer 
        renderMsg(winner)
    } else {
        return;
    }
}

function renderResults() { 
    return renderMsg(winner);
}

function renderMsg(booleanVal) { // Checks if there is a winner
    if (booleanVal){
        resultsEl.style.visibility = 'visible';
        resultsEl.innerText = 'YOU WIN!';
    } else if(countdown){ // While it's counting down, carry on
        return;
    } else { // If countdown ended, output loser message
        resultsEl.style.visibility = 'visible';
        resultsEl.innerText = 'YOU LOSE!';
    }
}
