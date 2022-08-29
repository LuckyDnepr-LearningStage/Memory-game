

//makeIntroMenu (settings);

async function makeIntroMenu (settings) {
    await readSettings(settings);
    renderIntroMenu (themesData);
    addIntroElementsEventListeners();
}

async function readSettings (path) {
    themesData = await readJSON (path);
}

function renderIntroMenu (data) {
    const cardchoice = document.querySelector(".sub-menu-themes-inputs");
    let innerHtmlContent = "";
    for (let i = 0; i < themesData.length; i++) {
        innerHtmlContent += `<label class="sub-menu-item-label" for="group-${i}">
        <input type="radio" id="group-${i}" class="sub-menu_item" name="face-type" data-imagesGroup="${i}"`;
        if (i == 0) {
            innerHtmlContent += `checked`;
        }
        innerHtmlContent += `>${themesData[i].theme} </label>`;
        }
    cardchoice.innerHTML = innerHtmlContent;
    const themeImage = document.querySelector(".face-type-image");
    themeImage.src = themesData[0].pictures[Math.floor(Math.random() * themesData[0].pictures.length)];
    themeIndex = 0;
    fieldsAmount = 6;
}

function addIntroElementsEventListeners () {
    document.querySelector(".start-game").addEventListener("click", () => {
        document.querySelector(".intro-menu").classList.add("hide");
        gameStart();
    });
    addFieldSizeChangeListener ();
    addThemeChangeListener();    
}

function addFieldSizeChangeListener () {
    const radios = document.querySelectorAll('input[type=radio][name="fieldSize"]');
    radios.forEach(radio => radio.addEventListener('change', (e) => fieldSizeChange(e.target)));
}

function fieldSizeChange (radio) {
    fieldsAmount = radio.dataset.fieldcols * radio.dataset.fieldrows;
}

function addThemeChangeListener () {
    const radios = document.querySelectorAll('input[type=radio][name="face-type"]');
    radios.forEach(radio => radio.addEventListener('change', (e) => themeChange(e.target)));
}

function themeChange (radio) {
    const themeImage = document.querySelector(".face-type-image");
    themeIndex = radio.dataset.imagesgroup;
    themeImage.src = themesData[themeIndex].pictures[Math.floor(Math.random() * themesData[themeIndex].pictures.length)];
}

async function readJSON(source) {
    try {
        const response = await fetch(source);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
  }
