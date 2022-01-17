import {items} from "./bdd.js";

/* Partie fonction */
const displayItemsScreen = () => {
    document.getElementById("accueil").style.display = "none";
    document.getElementById("items").style.display = "block";
}

const displayWelcomeScreen = () => {
    document.getElementById("accueil").style.display = "block";
    document.getElementById("items").style.display = "none";
}

const createCategorySpan = (category) => {
    let title = document.createElement("h2");
    let span = document.createElement("span");
    span.className = "badge bg-info";
    span.textContent = "Catégorie: " + category;
    title.appendChild(span);

    return title;
}

const displayAllItems = () => {
    displayItemsScreen();
    let display = document.getElementById("items");
    display.innerHTML = "";
    display.appendChild(createCategorySpan("Tout"));
    let newRow = document.createElement("div");
    newRow.className = "row";

    items.forEach(item => {
        newRow.appendChild(item.createCard());
    });
    display.appendChild(newRow);
}

const displayCategoryItems = (category) => {
    displayItemsScreen();
    items.forEach(item => {
        if(item.category == category){
            item.createCard();
        }
    });
}

/* Partie programme */
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("allItems").addEventListener('click', () => {
        displayAllItems();
    })

    document.getElementById("welcomeScreen").addEventListener('click', () => {
        displayWelcomeScreen();
    })

    document.getElementById("navbarAll").addEventListener('click', () => {
        displayAllItems();
    })
})