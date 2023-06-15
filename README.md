# Concentration/Memory Game
​
![Project Proposal Image](./screenshot1.png)
​
##  Initial State:
    - Set a class (or id) of cards or any set of matching pairs 
	    - Render the gameCards type (e.g., cards with numbers, letters, or pictures)
	    - Card 'Ids' are set
    - BOARD = Render the gameBoard in 'hidden' state
	    - Shuffle the cards in a grid pattern (hidden = facedown)
    - Player scores are set to zero
	    - Clear cached pairs/matches if playing again
	- Timer would have to reset to initial countdown
	- Player firstChoice and secondChoice = null; 
​
##  Turn-Taking:
    - The first player begins by flipping two cards face up. 
	    - Player firstChoice and secondChoice
	- Comparison begins: 
    - If the two cards match (i.e., they have the same number, letter, or picture), the player keeps them and gets to take another turn.
	    - run player inputs (firstChoice & secondChoice) --> run flipping animation/sfx (reference class)
	    - 
    - If the two cards do not match, cards are flipped back facedown, and it becomes the next player's turn.
	    - if firstChoice !== secondChoice --> cards are returned 'hidden' state
	    - switch player turns
    
​
##  Winning:
    - Players continue taking turns until all the cards have been matched.
    - The game ends when all the pairs have been found.
    - The winner is the player with the most matched pairs.
​
​
​
​
​
​
​
hints/strategies:
​
As the game progresses, players need to remember the location of previously flipped cards in order to make matches when they turn other cards.
​
It's helpful to pay attention to the cards and their positions during other players' turns.
​
​
​
Define constants: Player turn, card types (pictures/icon pairs in array)
​
  
​
State variables: board of cards, turns (1/-1), winner
​
  
​
Cached Elements:
​
  
​
Event Listeners:
​
  
​
Functions:
