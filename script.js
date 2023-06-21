
/*----CONSTANTS----*/
const cardDeck = [];

const cardTypes = [
    {id: 0, img: 'blue'},
    {id: 1, img: 'blue'},
    {id: 2, img: 'red'},
    {id: 3, img: 'red'},
    {id: 4, img: 'yellow'},
    {id: 6, img: 'yellow'},
];

/*----game STATE variables----*/
let isFirstClick = true; // Variable to track the first click
 // Variable to track state of cards
let playerStats = { // Variable to track player choices and stats
    choice1: null,
    choice2: null,
    clicks: 0
}; 
let cardChoices = []; // Empty array to hold player choices
let timer;


/*----CACHED elements----*/

const cardEls = document.querySelectorAll('.card'); // Get all the elements with the class 'card'
const gameboard = document.getElementById('gameboard'); // Get all the elements in gameboard


/*----EVENT listeners----*/

// Add a click event listener to each card element -> triggers the handleClick()
// cardEls.forEach((cardEl) => {
//   cardEl.addEventListener('click', handleClick);
// });
gameboard.addEventListener('click', handleClick);


/*----FUNCTIONS----*/

// DON'T FORGET TO CALL init() to initialize all state, then call render()
init();

function init() {
  scores = {
   playerOne: 0
  };
//   results = {};
//   outcomes ;
  render();
}

// render() should transfer/visualize all state
function render() {
    renderBoard();
    renderScores();
    renderResults();
}
// render board-> initiate board (only once), render state of cards
function renderBoard() {
    //assign all cards with 'card-visible' class to 'cardVisibleEls'
    const cardVisibleEls = document.querySelectorAll('.card-visible'); 
    // Assign the 'images' from the cardTypes to each card element
        cardVisibleEls.forEach((cardVisibleEl, index) => {
        cardVisibleEl.style.backgroundColor = cardTypes[index].img;
    });

  }
  


function handleClick(evt) {
  // Check if it's the first click
  if (isFirstClick) {
    // Start timer function
    renderTimer();
    // Set isFirstClick to false, so it won't execute this block on subsequent clicks
    isFirstClick = false;
  }
  // Store first card and second card in the 'playerStats.choice1 & 2' (respectively) and track clicks
  const cardChoice = evt.target.style.backgroundColor;

  if (playerStats.clicks === 0) {
    playerStats.choice1 = cardChoice;
    playerStats.clicks++;
  } else if (playerStats.clicks === 1) {
    playerStats.choice2 = cardChoice;
    playerStats.clicks++;
    //check for pairs
    matchPairs(playerStats.choice1, playerStats.choice2);

    playerStats.clicks = 0; // Reset the clicks
    // playerStats.choice1 = null; // Reset player choices
    // playerStats.choice2 = null; // Reset player choices
  } 
  

//   for(let i =0; i < 1; i++){
//     cardChoices[i] = cardChoice};

    console.log(playerStats);



}
  
function matchPairs (card1, card2) { // check if selected cards are a match

    if (card1 === card2) { // if they are, add 1 to scores
        scores.playerOne++;
        console.log(`scores: ${scores.playerOne}`);
    } else{ // if they are not, then clear playerStats.choices
        console.log(`card one ${card1} does not pair with card two ${card2}`);
        // card1 = null;
        // card2 = null; 
    }
}

function renderTimer() {
  return console.log(`First card has been selected, the timer has begun!`);
}

function renderScores() {

}
function renderResults() {

}
