//import { makeIntroMenu } from "./intro-menu.js";

const doc = document;

var themesDataPath = "/themesData.json";
var field = doc.querySelector(".game-field");

var themesData,
    themeIndex,
    fieldsAmount,
    cardsSet,
    openedCards = [],
    findedPairs = 0;

makeIntroMenu(themesDataPath);

function gameStart() {

    /* for (let i = 0; i < 30; i++) {
        console.log(makeSetOfPairs(fieldsAmount, themesData[themeIndex].pictures.length));
    } */
    renderGameField(fieldsAmount);
    cardsSet = makeSetOfPairs(fieldsAmount, themesData[themeIndex].pictures.length);
    console.log(cardsSet);
    addCardsNumbers();


    function renderGameField(cardsQuantity) {
        const gameField = doc.querySelector(".game-field");
        let gameFieldHTML = "";
        for (let i = 1; i <= cardsQuantity; i++) {
            gameFieldHTML += `
            <div class="game-card">
                <img src="./images/bg-hearts.png" alt="" class="card-face card-face-front">
                <img src="#" alt="" class="card-face card-face-back">
            </div>
            `;
        }
        gameField.innerHTML = gameFieldHTML;
    }

    field.addEventListener('click', (e) => {
        if (e.target.classList.contains("card-face") && !e.target.parentNode.classList.contains("flipped")) {
            e.target.parentNode.classList.add("flipped");
            assingBackImage(e.target.parentNode);
            openedCards.push(e.target.parentNode);
            flipCardHandler();
            /* 
            const cardFlip = new CustomEvent("cardFlip", {
                detail: e.target.parentNode.dataset.card_id
            });
            field.dispatchEvent(cardFlip); */
        }
    });

    function flipCardHandler () {
        if (openedCards.length % 2 === 0) {
            const firstCard = openedCards.at(-2),
                secondCard = openedCards.at(-1);
            openedCards = [];
            if (cardsSet[firstCard.dataset.card_id] !== cardsSet[secondCard.dataset.card_id]) {
                setTimeout(() => {
                    firstCard.classList.remove("flipped");
                    secondCard.classList.remove("flipped");
                    setTimeout(() => {
                        firstCard.querySelector(".card-face-back").src = "#";
                        secondCard.querySelector(".card-face-back").src = "#";
                    }, 500);
                }, 1000);
            } else {
                firstCard.classList.add("pair");
                secondCard.classList.add("pair");
                findedPairs++;
            }
        }
        isWin ();
    }

    function isWin () {
        if (findedPairs === cardsSet.length / 2) {
            restartGame();
        }
    }


    function restartGame () {
        setTimeout (() => {
                alert("You win!");
            findedPairs = 0;
            cardsSet = makeSetOfPairs(fieldsAmount, themesData[themeIndex].pictures.length);
            document.querySelectorAll(".game-card").forEach((card) => {
                card.classList.remove("flipped");
                card.classList.remove("pair");
            });
            }, 1000);
    }

    function addCardsNumbers() {
        doc.querySelectorAll(".game-card").forEach((card, i) => {
            card.setAttribute("data-card_id", i);
        });
    }

    function assingBackImage(card) {
        const backFace = card.querySelector(".card-face-back");
        backFace.src = themesData[themeIndex].pictures[cardsSet[+card.dataset.card_id]];
    }

    function makeSetOfPairs(sizeOfSet, highestNumber) {
        let firstHalfOfSet = [];
        for (let i = 0; i < sizeOfSet / 2; i++) {
            const random = Math.floor(Math.random() * (highestNumber - 1));
            if (!firstHalfOfSet.includes(random)) {
                firstHalfOfSet.push(random);
            } else {
                i--;
            }
        }
        let secondHalfOfSet = new Array(firstHalfOfSet.length).fill(-1);
        for (let i = 0; i < firstHalfOfSet.length; i++) {
            const random = Math.floor(Math.random() * (firstHalfOfSet.length));
            if (!secondHalfOfSet.includes(firstHalfOfSet[i]) && secondHalfOfSet[random] == -1) {
                secondHalfOfSet[random] = firstHalfOfSet[i];
            } else {
                i--;
            }
        }
        return [...firstHalfOfSet,...secondHalfOfSet];
    }

}
