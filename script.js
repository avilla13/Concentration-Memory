
/*----CONSTANTS----*/
const cardDeck = [


];

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
let gameboard; // Variable to track state of cards
let playerStats = [ // Variable to track player choices and stats
    {choice1: 'null', choice2: 'null'},
    {clicks: 0, pairs: 0}
]; 
    


/*----CACHED elements----*/

const cardEls = document.querySelectorAll('.card'); // Get all the elements with the class 'card'


/*----EVENT listeners----*/

// Add a click event listener to each card element
cardEls.forEach((cardEl) => {
  cardEl.addEventListener('click', handleClick);
});


/*----FUNCTIONS----*/

// DON'T FORGET TO CALL init() to initialize all state, then call render()
init();

function init() {
  scores = {
   playerOne: 0
  };
//   results = {
    
//   };
//   outcomes ;
  
  render();
}

// render() should transfer/visualize all state
function render() {
    renderBoard();
    // handleClick();
    renderScores();
    renderResults();
}

// Assign the 'images' from the cardTypes to each card element
function renderBoard() {
    // const cardVisibleEls = document.querySelectorAll('.card-visible');
    // const cardHiddenEls = document.querySelectorAll('.card-hidden');
  
    // cardVisibleEls.forEach((cardVisibleEl, index) => {
    //   cardVisibleEl.style.backgroundColor = cardTypes[index].img;
    // });
  
    // cardHiddenEls.forEach((cardHiddenEl, index) => {
    //   cardHiddenEl.style.backgroundColor = cardTypes[index].img;
    // });
  }
  


function handleClick() {
  // Check if it's the first click
  if (isFirstClick) {
    // Start timer function
    renderTimer();
    // Set isFirstClick to false, so it won't execute this block on subsequent clicks
    isFirstClick = false;
  }
  this.classList.toggle('card-visible');
  this.classList.toggle('card-hidden');

//   const cardVisible = this.querySelector('.card-visible');
//   const cardHidden = this.querySelector('.card-hidden');

//   if (cardVisible.style.display === 'none') {
//     cardVisible.style.display = 'block';
//     cardHidden.style.display = 'none';
//   } else {
//     cardVisible.style.display = 'none';
//     cardHidden.style.display = 'block';
//   }
}
  


function renderTimer() {
  return console.log(`First card has been selected, the timer has begun!`);
}

function renderScores() {

}
function renderResults() {

}
