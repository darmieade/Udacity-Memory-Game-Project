# Memory Game Project

## Table of Contents
* [How The Game Works]()
* [Game Functionality]()
* [Steps to Creating the Game]()

## "How the Game Works"
The game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, unlike other memory games each card is only made up of one side which is revealed when it is clicked and is hidden when a match is not found. The gameplay rules are very simple:
* Reveal two hidden cards at a time to locate the ones that match by clicking on them.
* If the cards match, both cards stay revealed and their background color is changed to green.
* If the cards do not match, both are hidden.
* The game ends once all cards have been correctly matched.

## Game Functionality
The main interactions in this game are:
* Revealing contents of the cards
* Code to determine what happens when cards match
* Code to determine what happens when cards do not match
* Code to display results/score board When the game finishes

## Steps to Creating the Game

This game was created by:
1. Creating a list that holds all the cards
2. Displaying the cards on the page
    * Shuffling the list of cards
    * Looping through each card based on the provided HTML by Udacity

3. setting up an event listener if the card is clicked to:
    * Display the card's symbol.
    * Add the card to a *list* of "open" cards.
        * Check to see if the two cards clicked on match.
        * If the cards do match, lock the cards in the open position.
        * if the cards do not match, remove the cards from the list and hide the card's symbol.
    * Increment the move counter and display it on the page.
    * If all cards have matched, display a message with the final score.
4. Add a Timer that records the duration of the game and displays it on the scoreboard.
5. Ensure rating, number of moves and duration of play are shown on the scoreboard.
6. Add transformation animation to matched cards.