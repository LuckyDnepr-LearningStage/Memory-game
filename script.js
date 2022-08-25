const doc = document;

const field = doc.querySelector(".game-field");

const cardsBackFaces = [
    "./images/card-1.png",
    "./images/card-2.png",
    "./images/card-3.png",
    "./images/card-4.png",
    "./images/card-5.png",
    "./images/card-6.png",
    "./images/card-7.png",
    "./images/card-8.png",
    "./images/card-9.png",
    "./images/card-10.png"
];

let cardsCount = 12;

let cardsSet = [];

randomizeCards(cardsCount);

addCardsNumbers();

field.addEventListener('click', (e) => {
    if (e.target.classList.contains("game-card")) {
    e.target.classList.toggle("flipped");
    console.log(e.target);
    assingBackImage (e.target);
    } else if (e.target.parentNode.classList.contains("game-card")) {
    e.target.parentNode.classList.toggle("flipped");
    console.log(e.target.parentNode);
    assingBackImage (e.target.parentNode);
    }
});


function addCardsNumbers () {
    doc.querySelectorAll(".game-card").forEach((card, i) => {
        card.setAttribute("data-card_id", i);
    });
}

function assingBackImage (card) {
    const backFace = card.querySelector(".card-face-back");
    console.log(backFace);
    console.log(card.dataset.card_id);
    backFace.src = cardsBackFaces[+card.dataset.card_id];
}

function randomizeCards (cardsCount) {
    //const cards = new Array(cardsCount * 2);
    const cards = (new Array(cardsCount / 2)).fill(-1).map((card) => {
        const n = Math.floor(Math.random() * (cardsCount - 1));
        console.log(n);
        const c = cardsBackFaces[n];
        return c;
    });
    console.log(cards);
}
