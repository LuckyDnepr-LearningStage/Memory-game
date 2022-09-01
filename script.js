const doc = document;

const themesDataPath = "/themesData.json";

let themesData,
    themeIndex = 0,
    fieldSize = 6,
    cardsSet,
    openedCards = [],
    findedPairs;

doc.querySelector(".game_field").addEventListener("click", (e) => cardFlip(e.target));

makeMenuAndListeners (themesDataPath);

function gameStart() {
    renderGameField(fieldSize);
    generateCardsSet(fieldSize, themesData[themeIndex].pictures.length - 1);
    findedPairs = 0;
    switchMenuAndGameField();
}

function renderGameField(fieldSize) {
    const gameField = doc.querySelector(".game_field");
    switch (fieldSize) {
        case 6:
            gameField.setAttribute("style", "--cols: 3; --rows: 2");
            break;
        case 12:
            gameField.setAttribute("style", "--cols: 4; --rows: 3");
            break;
        default:
            break;
    }
    gameField.innerHTML = new Array(fieldSize)
        .fill(0)
        .map(
            (newCard, i) => `
            <div class="game_card" data-card_id="${i}">
                <img src="./images/bg-hearts.png" alt="" class="card_face card_face_front">
                <img src="#" alt="" class="card_face card_face_back">
            </div>
        `
        )
        .join("");
}

function cardFlip (cardFace) {
    if (cardFace.classList.contains("card_face")) {
        const card = cardFace.parentNode;
        if (!card.classList.contains("flipped")) {
            card.classList.add("flipped");
            openedCards.push(card);
            card.querySelector(".card_face_back").src =
                themesData[themeIndex].pictures[cardsSet[+card.dataset.card_id]];
            flipCardHandler();
        }
    }
}

function flipCardHandler() {
    if (openedCards.length % 2 === 0) {
        const firstCard = openedCards.at(-2),
            secondCard = openedCards.at(-1);
        openedCards = [];
        if (
            cardsSet[firstCard.dataset.card_id] !==
            cardsSet[secondCard.dataset.card_id]
        ) {
            setTimeout(() => {
                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");
                setTimeout(() => {
                    firstCard.querySelector(".card_face_back").src = "#";
                    secondCard.querySelector(".card_face_back").src = "#";
                }, 500);
            }, 1000);
        } else {
            firstCard.classList.add("pair");
            secondCard.classList.add("pair");
            findedPairs++;
        }
    }
    if (findedPairs === cardsSet.length / 2) {
        winGame();
    }
}

function winGame() {
    setTimeout(() => {
        showWinWindow ("show");
    }, 1000);
}

function resetCardsStage () {
        document.querySelectorAll(".game_card").forEach((card) => {
            card.classList.remove("flipped");
            card.classList.remove("pair");
        });
}

function generateCardsSet(sizeOfSet, highestNumber) {
    let mixedSetOfPairs = [],
        setOfPairs = [];
    for (let i = 0; i < sizeOfSet / 2; i++) {
        const randomNumber = Math.floor(Math.random() * highestNumber);
        if (!setOfPairs.includes(randomNumber)) {
            setOfPairs.push(randomNumber, randomNumber);
        } else {
            i--;
        }
    }
    while (setOfPairs.length >= 1) {
        const index = Math.floor(Math.random() * (setOfPairs.length - 1));
        if (Math.random() < 0.5) {
            mixedSetOfPairs.push(setOfPairs[index]);
         } else {
            mixedSetOfPairs.unshift(setOfPairs[index]);
         }
        setOfPairs.splice(index, 1);
    }
    console.log(mixedSetOfPairs);
    cardsSet = mixedSetOfPairs;
}
