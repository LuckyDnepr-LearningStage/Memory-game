async function makeMenuAndListeners () {
    switchMenuAndGameField();
    await readThemes(themesDataPath);
    renderMenu(themesData);
    addMenuItemsEventListeners();
}

async function readThemes(path) {
    try {
        const response = await fetch(path);
        themesData = await response.json();
        //return json;
    } catch (error) {
        console.log(error);
    }
}

function renderMenu(data) {
    doc.querySelector(".sub-menu-themes-inputs").innerHTML = new Array(
        themesData.length
    )
        .fill(0)
        .map((item, i) => {
            const checked = i === 0 ? " checked" : "";
            return ` <label class="sub-menu-item-label" for="group-${i}">
            <input type="radio" id="group-${i}" class="sub-menu_item" name="face-type" data-theme="${i}"${checked}> 
            ${themesData[i].theme}
            </label>
        `;
        })
        .join("");
    doc.querySelector(".face-type-image").src = themesData[0].pictures[0];
}

function addMenuItemsEventListeners() {
    doc.querySelectorAll('input[type=radio][name="fieldSize"]').forEach(
        (radio) =>
            radio.addEventListener("change", (e) =>
                fieldSizeChange(
                    e.target.dataset.fieldcols,
                    e.target.dataset.fieldrows
                )
            )
    );
    doc.querySelectorAll('input[type=radio][name="face-type"]').forEach(
        (radio) =>
            radio.addEventListener("change", (e) =>
                themeChange(e.target.dataset.theme)
            )
    );
    doc.querySelector(".start-game").addEventListener("click", () => {
        gameStart();
    });
    doc.querySelector("#replay").addEventListener("click", () => {
        hideWinWindow();
        findedPairs = 0;
        resetCardsStage();
        generateCardsSet(fieldSize, themesData[themeIndex].pictures.length - 1);
        }
    );
    doc.querySelector("#back-to-menu").addEventListener("click", () => {
        hideWinWindow();
        switchMenuAndGameField();
    });
}

function fieldSizeChange(fieldWidth, fieldHeight) {
    fieldSize = fieldWidth * fieldHeight;
}

function themeChange(themeNumber) {
    themeIndex = themeNumber;
    doc.querySelector(".face-type-image").src =
        themesData[themeIndex].pictures[
            Math.floor(Math.random() * themesData[themeIndex].pictures.length)
        ];
}

function switchMenuAndGameField() {
    doc.querySelector(".game-field").classList.toggle("hide");
    doc.querySelector(".intro-menu").classList.toggle("hide");
}

function showWinWindow() {
    doc.querySelector(".fader").classList.remove("hide");
    doc.querySelector(".modal").classList.remove("hide");
}

function hideWinWindow () {
    doc.querySelector(".fader").classList.add("hide");
    doc.querySelector(".modal").classList.add("hide");
}
