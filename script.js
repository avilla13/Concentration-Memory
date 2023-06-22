
/*----CONSTANTS----*/
const cardDeck = [];

const cardTypes = [
    {id: 0, img: 'blue', match: 0}, // match: 0 -> card not matched
    {id: 1, img: 'blue', match: 0}, // match: 1 -> card has been matched
    {id: 2, img: 'red', match: 0},
    {id: 3, img: 'red', match: 0},
    {id: 4, img: 'yellow', match: 0},
    {id: 5, img: 'yellow', match: 0},
];

/*----game STATE variables----*/
let isFirstClick = true; // Variable to track the first click
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

// Add a click event listener to each gameboard element -> triggers the handleClick()
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
// render board-> initiate shuffled board grid (only once), 
// then render state of cards whenever invoked
function renderBoard() {
    // Assign the 'images' from the cardTypes to each card element w/ 'card-visible' class
    cardEls.forEach((cardEl, index) => {
        if(cardEl.classList.contains('card-visible')) {
            cardEl.style.backgroundColor = cardTypes[index].img;
        } else {
            cardEl.style.backgroundColor = 'black'; // the 'images' will be toggled on in handleClick
        }
    })
}

function handleClick(evt) {
  // guards for only clicking on card elements
if (evt.target.classList.contains('card') && 
    cardTypes[parseInt(evt.target.id)].match === 0) { //  & to not select matched cards
    // Check if it's the first click
  if (isFirstClick) {
    // Start timer function
    renderTimer();
    // Set isFirstClick to false, so it won't execute this block on subsequent clicks
    isFirstClick = false;
  }
  
  // Store first card and second card in the 'playerStats.choice1 & 2' (respectively) and track clicks
  const cardId = parseInt(evt.target.id); // target the selected card's id property
  const cardChoice = cardTypes[cardId].img; //use that id to select cardTypes' image

  if (cardTypes[cardId].match === 0) { // checks to see if card has been matched
      evt.target.classList.toggle('card-visible'); // toggles the clicked card's class to 'card-visible'
  }
    
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

    console.log(playerStats);
    render(); // render the card(s) state
    }
}

function flipCard() {

}

function matchPairs (card1, card2) { // checks if selected cards are a match
    if (card1 === card2) { // if they are, add 1 to scores
        scores.playerOne++;
        console.log(`scores: ${scores.playerOne}`);
        // card1 and card2 -> stay as card-visible class and unselectable
       // Find the indices of card1 and card2 in the cardTypes array
        const card1Index = cardTypes.findIndex(card => card.img === card1);
        const card2Index = cardTypes.findIndex(card => card.img === card2 && card.id !== card1Index);
    console.log(card1Index, card2Index);
    // Update the 'match' value to 1 for both cards
        if (card1Index !== -1 && card2Index !== -1) {
        cardTypes[card1Index].match = 1;
        cardTypes[card2Index].match = 1;
        }
       
        // Add audio for matching pair
       
    } else { // if they are not, then clear playerStats.choices
        console.log(`card one ${card1} does not pair with card two ${card2}`);
        // Add audio for no-match
        
    }
}

function renderTimer() {
  return console.log(`First card has been selected, the timer has begun!`);
}

function renderScores() {
    
    const scoreEl = document.getElementById('score');
    scoreEl.innerText = `Score: ${scores.playerOne}`;
}
function renderResults() {

}
