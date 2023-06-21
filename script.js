
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
let playerStats = [ // Variable to track player choices and stats
    {choices: []},
    {clicks: 0, pairs: 0},
    {currCard: 'null'}
]; 
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
  // Store first card and second card in the 'cardChoices' array, respectively
  const cardChoice = evt.target.style.backgroundColor;
  for(let i =0; i < 2; i++){
    cardChoices[i] = cardChoices.push(cardChoice)};

    console.log(cardChoices);


//   const cardVisible = document.querySelector('.card-visible'); // access 'card-visible' class
//   const cardHidden = document.querySelector('.card-hidden'); // access 'card-hidden' class

//   cardVisible.classList.toggle('card-visible'); // toggles the clicked card to class 'card-visible'
//   this.classList.toggle('card-hidden'); // toggles the clicked card to class 'card-hidden'
  

//   if (cardVisible.style.display === 'none') {
    
//     cardVisible.style.display = 'block';
//     cardHidden.style.display = 'none';
//   } else {
//     cardVisible.style.display = 'none';
//     cardHidden.style.display = 'block';
//   }
}
  
function matchPairs (card1, card2) { // check if selected cards are a match
    if (card1 === card2) { // if they are, add 1 to scores
        scores++;
    } else{
        return; // if they are not, then clear playerStats.choices
    }
}

function renderTimer() {
  return console.log(`First card has been selected, the timer has begun!`);
}

function renderScores() {

}
function renderResults() {

}
