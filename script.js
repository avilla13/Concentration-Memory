
/*----CONSTANTS----*/

const cardDeck = [
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
  shuffle (cardDeck);
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
    //   [array[currentIndex], array[randomIndex]] = [
    //     array[randomIndex], array[currentIndex]];
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
  // Need correct card id to match clicked card's id
    const cardObj = cardDeck[parseInt(evt.target.id)];

    // guards for only clicking on card elements
if (evt.target.classList.contains('card') && 
    cardObj.match === 0) { //  & to not select matched cards
    // Check if it's the first click
  if (isFirstClick) {
    // Start timer function
    renderTimer();
    // Set isFirstClick to false, so it won't execute this block on subsequent clicks
    isFirstClick = false;
  }
  
  // Store first card and second card in the 'playerStats.choice1 & 2' (respectively) and track clicks
//   const cardId = parseInt(evt.target.id); // target the selected card's id property
//   const cardChoice = cardDeck[cardId]; //use that id to select cardTypes' object

  flipCard(evt.target);

    //Update player state variables
  if (playerStats.clicks === 0) {
    playerStats.choice1 = cardObj;
    playerStats.clicks++;
  } else if (playerStats.clicks === 1) {
    playerStats.choice2 = cardObj;
    console.log(playerStats);
    
    //check for pairs
    matchPairs(playerStats.choice1, playerStats.choice2);

    playerStats.clicks = 0; // Reset the clicks
    // playerStats.choice1 = null; // Reset player choices
    // playerStats.choice2 = null; // Reset player choices
    
  } 

    render(); // render the card(s) state
}
} // end click handler

function flipCard(card) {
    card.classList.toggle('card-visible'); // toggles the clicked card's class to 'card-visible'
}

  
function matchPairs (card1, card2) { // checks if selected cards are a match
       
    if (card1.img === card2.img) { 
        scores.playerOne++; // if they are, add 1 to scores
        console.log(`scores: ${scores.playerOne}`);  
        
    // Update the 'match' value to 1 for both cards so they become 'unselectable'
        card1.match = 1;
        card2.match = 1;
           
    // Add audio for matching pair
        
    } else {
        // if their match value is 0, flip the cards back
        const card1El = document.getElementById(card1.id.toString()); // 
        const card2El = document.getElementById(card2.id.toString());
        console.log('time out will begin');
        setTimeout(() => {
            flipCard(card1El);
            console.log('flipped first card')
            flipCard(card2El);
            render();
        }, 500);
        

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
