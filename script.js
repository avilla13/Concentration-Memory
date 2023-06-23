
/*----CONSTANTS----*/
const cardDeck = [
    {img: 'blue', match: 0}, // match: 0 -> card not matched
    {img: 'blue', match: 0}, // match: 1 -> card has been matched
    {img: 'red', match: 0},
    {img: 'red', match: 0},
    {img: 'yellow', match: 0},
    {img: 'yellow', match: 0},
];

/*----game STATE variables----*/
let isFirstClick = true; // Variable to track the first click
let playerStats = { // Variable to track player choices and stats
    choice1: null,
    choice2: null,
    clicks: 0
};
let count; // Holds reference to renderTimer()

/*----CACHED elements----*/

const cardEls = document.querySelectorAll('.card'); // Get all the elements with the class 'card'
const gameboard = document.getElementById('gameboard'); // Get all the elements in gameboard
const playAgainBtn = document.querySelector('button');
const timerDisplay = document.getElementById('timer');

/*----EVENT listeners----*/

// Add a click event listener to each gameboard element -> triggers the handleClick()
// gameboard.addEventListener('click', handleClick);
playAgainBtn.addEventListener('click', init);

/*----FUNCTIONS----*/

init();
function init() {
  shuffle (cardDeck);
  scores = {playerOne: 0};
  playerStats.choice1 = null;
  playerStats.choice2 = null;
  playerStats.clicks = 0;
  isFirstClick = true; // reset timer
  cardDeck.forEach((card) => card.match = 0); // clear matched cards
  cardEls.forEach(cardEl => cardEl.classList.remove('card-visible')); // clear visible cards
  count = 10;
  timerDisplay.style.visibility = 'hidden';
  gameboard.addEventListener('click', handleClick);
  
// results = {};
  render();
}

// render() should transfer/visualize all state
function render() {
    renderBoard();
    renderScores();
    renderResults();
}
// Using the Fisher-Yates shuffle algorithm method:
function shuffle(array) { 
    let currentIndex = array.length;
    let randomIndex;
    // While there remain elements to shuffle.
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

// render board-> initiate shuffled board grid (only once), 
// then render state of cards whenever invoked
function renderBoard() {
    // Assign the 'images' from the cardTypes to each card element w/ 'card-visible' class
    cardEls.forEach((cardEl, index) => {
        if(cardEl.classList.contains('card-visible')) {
            cardEl.style.backgroundColor = cardDeck[index].img;
        } else {
            cardEl.style.backgroundColor = 'black'; // the 'images' will be toggled on in handleClick
        }
    })
}

function handleClick(evt) {
    // Need to assign clicked card to variable (object)
    const cardObj = cardDeck[parseInt(evt.target.id)];
    // guards for only clicking on card elements
    if (evt.target.classList.contains('card') && 
    cardObj.match === 0) { //  & to not select matched cards
        // Check if it's the first click
        if (isFirstClick) {
        // Start timer function
        renderTimer();
        // Set isFirstClick to false, so it won't on subsequent clicks
        isFirstClick = false;
        }
  
        flipCard(evt.target);
        
        // Store first card and second card in the 'playerStats.choice1 & 2' 
        //Update player state variables
        if (playerStats.clicks === 0) {
         playerStats.choice1 = cardObj; // add clicked card obj to choice1
            playerStats.choice1El = evt.target; // add the HTML element
         playerStats.clicks++;
        } else if (playerStats.clicks === 1) {
            playerStats.choice2 = cardObj;
            playerStats.choice2El = evt.target;
            
        //check for pairs
        matchPairs(playerStats.choice1, playerStats.choice1El, 
            playerStats.choice2, playerStats.choice2El);

        playerStats.clicks = 0; // Reset the clicks
        } 
        render(); // render the card(s) state
    }
} // end click handler

function flipCard(card) {
    card.classList.toggle('card-visible'); // toggle target card's class to 'card-visible'
} 

function matchPairs (card1, card1El, card2, card2El) { // checks if selected cards are a match
       
    if (card1.img === card2.img) { 
        scores.playerOne++; // if they are, add 1 to scores 
        
    // Update the 'match' value to 1 for both cards so they become 'unselectable'
        card1.match = 1;
        card2.match = 1;
           
    // Add audio for matching pair
        
    } else {
        // if their match value is 0, flip the cards back
        setTimeout(() => {
            flipCard(card1El);
            flipCard(card2El);
            render();
        }, 500);
       
        // Add audio for no-match 
    }
}

function renderTimer() {
    timerDisplay.innerText = `Time: ${count}`;
    timerDisplay.style.visibility = 'visible';
    const timer = setInterval(() => {
        count--;
        if (count && isFirstClick === false) { // handle while it's ticking down
            timerDisplay.innerText = `Time: ${count}`;
        } else if(count && isFirstClick === true) {
            
            clearInterval(timer);
        } else {
            timerDisplay.innerText = `Time's Up!`;
            clearInterval(timer);
            gameboard.style.cursor = 'pointer';
            gameboard.removeEventListener('click', handleClick);
            cardEls.forEach(cardEl => {
                cardEl.style.cursor = 'auto';
              });
        }
    }, 1000);
    console.log(`First card has been selected, the timer has begun!`);
}

function renderScores() {
    const scoreEl = document.getElementById('score');
    scoreEl.innerText = `Score: ${scores.playerOne}`;
}
function renderResults() {
    // const matchedCards = cardEls.filter(cardEl => cardEl.classList ==='card-visible');
    // console.log(matchedCards);
    return renderMsg();
}
function renderMsg() {

}
