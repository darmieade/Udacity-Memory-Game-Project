//Reshuffles game when window loads
window.onload = resetGame;

//Declares and initializes Card/Deck variables
 let cards = document.querySelectorAll("li.card");                  //Cards variable, holds the list of all the cards
 let cardsArray = [...document.querySelectorAll("li.card")];        //Turned Cards variable created above to array for 
 let list = [...document.getElementsByClassName("deck")][0];        //Cards variable, holds the list of all the cards

 //Declares and initializes Score Panel & ScoreBoard/Modal variables
 const stars = document.querySelectorAll("ul.stars>li>i");
 const restartBtn = document.querySelector(".restart");
 const playAgain = document.querySelector(".repeat");
 const endTimer = document.querySelector(".endTime");
 const endMoves = document.querySelector(".endMoves");
 const endRating = document.querySelectorAll("p.endRating>i");
 const displayTimer = document.querySelector('.timer');
 const moves = document.querySelector('.moves');
 const showModal = document.getElementById('results');
 
 //Declares and initializes variables need to flip cards, match them and countplay
 let flippedCard = false;
 let firstCard = "";
 let secondCard = "";
 let countMatched = 0;
 let countUnmatched = 0;
 let countPlay = 0;
 let lockboard = false;
 let beginTimer = 0;
 let endTime = "";
 let collectLastRating = "";

//Create Timer
//Declares and initializes variables Seconds(s), Minuites(m), Hour (h) and SetTimeout assignment (t)
let s = 0, m = 0, h = 0, t;

//Function to calculate Seconds(s), Minuites(m), Hour (h) 
function countTimer() {
         s++;
        if (s >= 60) {
            s = 0;
            m++;
            if (m >= 60) {
                m = 0;
                h++;
            }
        }
    displayTimer.innerHTML = (h ? (h > 9 ? h : "0" + h) : "00") + ":" + (m ? (m > 9 ? m : "0" + m) : "00") + ":" + (s > 9 ? s : "0" + s);
    endTime = displayTimer.innerHTML;
    timer();
}
// Function to call the Settimeout Method & stopTimer function below
function timer() {
    t = setTimeout(countTimer, 999);
    stopTimer();
}

// Function to clear time out and stop the timer
function stopTimer() {
    if (countMatched === 8) {
        clearTimeout(t);
    }
}

//This function reveals the card when clicked, by virtue of the click event listener
function openShowCard(){
    //Starts Timer once 1st card is clicked
    if(beginTimer === 0){
        timer();
        beginTimer++;
    }
    //Locks the deck during matching
    if(lockboard) return;
    if(this === firstCard)return;
    
    //Adds clas list to Open and reveal the card clicked
    this.classList.add('open');
    this.classList.add('show');

    //Determines Logic to assign 1st and 2nd clicked cards to a variable then call Match function created below
    if(!flippedCard){
        firstCard = this;
        flippedCard = true;
    }else{
        secondCard = this;
       flippedCard = false;
       matchCards();
    }
}

//Determines Logic to Match revealed card
function matchCards() {
    if (secondCard.firstElementChild.classList.value === firstCard.firstElementChild.classList.value) {
        matchClass();
    }else{
        removeShowOpen();
    }

    function matchClass() {
        firstCard.classList.remove('open');
        firstCard.classList.remove('show');
        firstCard.classList.add('match');
        secondCard.classList.remove('open');
        secondCard.classList.remove('show');
        secondCard.classList.add('match');
        countMatched += 1;
        countMoves();
        resetNums();
        endGame();
    }

    //Removes the Open & Show Class to hide unmatched cards
    function removeShowOpen() {
        lockboard = true;
        setTimeout(() => {
            firstCard.classList.remove('open');
            firstCard.classList.remove('show');
            secondCard.classList.remove('open');
            secondCard.classList.remove('show');
            countUnmatched += 1;
            countMoves();
            resetNums();
            endGame();
        }, 700);
    }

    //This function counts the number of moves made based on how many times two cards are revealed and call setRating function
    function countMoves() {
        countPlay = (countMatched+countUnmatched);
        moves.innerHTML = countPlay;
        setRating();

        //This function uses logic to decrement the number of start depending on the number of moves made
        function setRating() {
            if (countPlay === 16) {
                stars[2].classList.toggle('hide');
                endRating[2].classList.toggle('hide');
            }else if (countPlay === 30) {
                stars[1].classList.toggle('hide');
                endRating[1].classList.toggle('hide');
            }
         }
    }

    //This function resets all the varibles associated with openShowCard function above
    function resetNums() {
        flippedCard = false;
        firstCard = "";
        secondCard = "";
        lockboard = false;
    }
}
cards.forEach(card => card.addEventListener('click', openShowCard));        //Event Listenser for the openShowCard

// Shuffle function from http://stackoverflow.com/a/2450976 - helps to reshuffle cards
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//This function resets the whole game and prepares it for a new game
function resetGame() {
    for (let i = 0; i < 3; i++) {
        stars[i].classList.remove('hide');
    }
    for (let i = 0; i < 3; i++) {
        endRating[i].classList.remove('hide');
    }
    for (let i = 0; i < 16; i++) {
        cards[i].classList.remove('match');
    }
    countPlay = 0;
    countMatched = 0;
    countUnmatched = 0;
    beginTimer = 0;
        endTime = "";
        moves.innerHTML = 0;
        clearTimeout(t);
        displayTimer.innerHTML = "00:00:00";

        if(firstCard != ""){
            firstCard.classList.remove('open');
            firstCard.classList.remove('show'); 
        }
        flippedCard = false;
        firstCard = "";
        secondCard = "";
        lockboard = false;
        ms = 0, s = 0, m = 0, h = 0,t = "";
        cardsArray = shuffle(cardsArray);

        list.innerHTML = "";

        for (let value of cardsArray) {
            list.appendChild(value);
        }
    }
restartBtn.addEventListener('click',resetGame);     //This event listerner is called everytime the reset button is clicked

//This function uses logic to determine when all card matches would be completed then displays modal and score card
function endGame() {
    if (countMatched === 8) {
        showModal.classList.remove('hide');
        endTimer.innerHTML = "Your Game Time was " + endTime;
        endMoves.innerHTML = "You made " + countPlay + " Moves";
    }
}

//This function is used to call the resetgame function when the "Play Agin" button is clicked
function endGamerepeat(){
    resetGame();
    showModal.classList.add('hide');
}
playAgain.addEventListener('click',endGamerepeat);     //This event listerner is called everytime the "Play Agin" button is clicked