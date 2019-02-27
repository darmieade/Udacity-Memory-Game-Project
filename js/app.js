//Reshuffles game when window loads
window.onload = resetGame;

 let cards = document.querySelectorAll("li.card");                  //Cards variable, holds the list of all the cards
 let cardsArray = [...document.querySelectorAll("li.card")];        //Turned Cards variable created above to array for 
 let list = [...document.getElementsByClassName("deck")][0];        //Cards variable, holds the list of all the cards
 const stars = document.querySelectorAll("ul.stars>li>i");
 const restartBtn = document.querySelector(".restart");
 const playAgain = document.querySelector(".repeat");
 const endTimer = document.querySelector(".endTime");
 const endMoves = document.querySelector(".endMoves");
 const endRating = document.querySelectorAll("p.endRating>i");
 const displayTimer = document.querySelector('.timer');
 const moves = document.querySelector('.moves');
 const showModal = document.getElementById('results');
 
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

 //cardCounter += 1;

 //Create Timer
 let ms = 0, s = 0, m = 0, h = 0, t;

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
function timer() {
    t = setTimeout(countTimer, 999);
    stopTimer();
}

function stopTimer() {
    if (countMatched === 8) {
        clearTimeout(t);
    }
}

//This function flips the card when clicked, by virtue of the click event listener
function openShowCard(){
    if(beginTimer === 0){
        timer();
        beginTimer++;
    }

    if(lockboard) return;
    if(this === firstCard)return;
    
    this.classList.add('open');
    this.classList.add('show');

    if(!flippedCard){
        firstCard = this;
        flippedCard = true;
    }else{
        secondCard = this;
       flippedCard = false;
       matchCards();
    }
}

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

    function countMoves() {
        countPlay = (countMatched+countUnmatched);
        moves.innerHTML = countPlay;
        setRating();

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

    function resetNums() {
        flippedCard = false;
        firstCard = "";
        secondCard = "";
        lockboard = false;
    }
}
cards.forEach(card => card.addEventListener('click', openShowCard));

// Shuffle function from http://stackoverflow.com/a/2450976
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
restartBtn.addEventListener('click',resetGame);

function endGame() {
    if (countMatched === 8) {
        showModal.classList.remove('hide');
        endTimer.innerHTML = "Your Game Time was " + endTime;
        endMoves.innerHTML = "You made " + countPlay + " Moves";
    }
}

function endGamerepeat(){
    resetGame();
    showModal.classList.add('hide');
}
playAgain.addEventListener('click',endGamerepeat);