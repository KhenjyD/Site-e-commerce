import {items} from "./bdd.js";

/* Partie fonction */

/* Affiche la page des articles */
const displayItemsScreen = () => {
    document.getElementById("accueil").style.display = "none";
    document.getElementById("items").style.display = "block";
}

/* Affiche l'écran d'accueil */
const displayWelcomeScreen = () => {
    document.getElementById("accueil").style.display = "block";
    document.getElementById("items").style.display = "none";
}

/* Crée une étiquette pour afficher la catégorie en cours */
const createCategorySpan = (category) => {
    let title = document.createElement("h2");
    let span = document.createElement("span");
    span.className = "badge bg-info";
    span.textContent = "Catégorie: " + category;
    title.appendChild(span);

    return title;
}

/* Affiche tous les articles */
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

/* Affiche les articles d'une sous-catégorie */
const displayCategoryItems = (category) => {
    displayItemsScreen();
    let display = document.getElementById("items");
    display.innerHTML = "";
    display.appendChild(createCategorySpan(category));
    let newRow = document.createElement("div");
    newRow.className = "row";

    items.forEach(item => {
        if(category == item.category){
            newRow.appendChild(item.createCard());
        }
    });
    display.appendChild(newRow);
}

/* Affiche tous les article d'une grande catégorie */
const displayAllCategoryItems = (category) => {
    displayItemsScreen();
    let display = document.getElementById("items");
    display.innerHTML = "";
    display.appendChild(createCategorySpan(category));
    let newRow = document.createElement("div");
    newRow.className = "row";

    items.forEach(item => {
        if(item.category.includes(category)){
            newRow.appendChild(item.createCard());
        }
    });
    display.appendChild(newRow);
}

/* Ajoute un article au panier */
const addToCart = (id) => {
    let item = JSON.parse(localStorage.getItem(id));

    if(item){
        item[1]++;
        localStorage.setItem(id, JSON.stringify(item));
    } else {
        items.forEach(myItem => {
            if(id == myItem.name){
                localStorage.setItem(id, JSON.stringify([myItem.price, 1]));
            }
        });
    }
}

/* Retire un article du panier */
const removeToCart = (id) => {
    let item = JSON.parse(localStorage.getItem(id));

    if (item[1] == 1){
        localStorage.removeItem(id);
    } else {
        item[1]--;
        localStorage.setItem(id, JSON.stringify(item));
    }
    
}

/* Affiche les infos d'un article dans le panier */
const createCartItem = (id,price, quantity) => {
    let cart = document.getElementById("cart-body");
    let body = document.createElement("p");
    body.textContent = `${id}, ${price}€, quantité: ${quantity}`;

    let groupBtn = document.createElement("div");
    groupBtn.className = "btn-group";

    let minusBtn = document.createElement("button");
    minusBtn.className = "btn btn-danger";
    minusBtn.textContent = "-";
    minusBtn.id = id;
    minusBtn.name = "minusItem";

    let plusBtn = document.createElement("button");
    plusBtn.className = "btn btn-success";
    plusBtn.textContent = "+";
    plusBtn.id = id;
    plusBtn.name = "plusItem";
    
    groupBtn.appendChild(minusBtn);
    groupBtn.appendChild(plusBtn);
    body.appendChild(groupBtn);
    cart.appendChild(body);
}

/* Affiche le contenu du panier */
const displayCart = () => {
    document.getElementById("cart-body").innerHTML = "";
    let cartKeys = Object.keys(localStorage);
    let totalEl = document.createElement("h5");
    document.getElementById("cart-body").innerHTML = "";
    
    cartKeys.forEach(key => {
        let cartItem = JSON.parse(localStorage.getItem(key));
        createCartItem(key,cartItem[0],cartItem[1]);
    });
    totalEl.textContent =  `Total: ${totalPrice()}€`;
    document.getElementById("cart-body").appendChild(totalEl);
}

/* Calcule le prix total du panier */
const totalPrice = () => {
    let cartKeys = Object.keys(localStorage);
    let total;

    cartKeys.forEach(key => {
        let cartItem = JSON.parse(localStorage.getItem(key));
        total = cartItem[0] * cartItem[1];
    });

    if(!total)
        total = 0;

    return total;
}

/* Partie programme */
document.addEventListener('DOMContentLoaded', () => {
    /* Interaction avec les boutons */
    document.getElementById("allItems").addEventListener('click', () => {
        displayAllItems();
    })

    document.getElementById("welcomeScreen").addEventListener('click', () => {
        displayWelcomeScreen();
    })

    document.getElementById("navbarAll").addEventListener('click', () => {
        displayAllItems();
    })
    
    document.addEventListener('click', event => {
        if(event.target.name == "buyBtn") {
            addToCart(event.target.id);
        }

        if(event.target.matches("#triggerCart")){
            displayCart();
        }
        
        if(event.target.name == "minusItem"){
            removeToCart(event.target.id);
            displayCart();
        }

        if(event.target.name == "plusItem"){
            addToCart(event.target.id);
            displayCart();
        }

        if(event.target.matches("#clearCart")){
            localStorage.clear();
            displayCart();
        }

        if(event.target.name == "category") {
            displayCategoryItems(event.target.id);
        }

        if(event.target.name == "allCategory") {
            displayAllCategoryItems(event.target.id);
        }
    })
})