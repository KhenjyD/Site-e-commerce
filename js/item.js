export default class Item {
    constructor(name, img, description, category, price){
        this.name = name;
        this.img = img;
        this.description = description;
        this.category = category;
        this.price = price;
    }

    createCard() {
        let col = document.createElement("div");
        col.className = "col mb-5";

        let card = document.createElement("div");
        card.className = "card";
        card.style.width = "18rem";

        let img = document.createElement("img");
        img.src = this.img;
        img.className = "card-img-top";

        let body = document.createElement("div");
        body.className = "card-body";

        let title = document.createElement("h5");
        title.className = "card-title";
        title.textContent = this.name;

        let ctg = document.createElement("p");
        ctg.className = "fw-lighter fst-italic";
        ctg.textContent = "Catégorie: " + this.category;

        let describ = document.createElement("p");
        describ.className = "card-text";
        describ.textContent = this.description;

        let price = document.createElement("p");
        price.className = "fw-bold";
        price.textContent = "Prix: " + this.price + "€";

        let buyBtn = document.createElement("button");
        buyBtn.className = "btn btn-primary rounded-pill";
        buyBtn.textContent = "Ajouter au panier";
        buyBtn.id = this.name;
        buyBtn.name = "buyBtn";

        card.appendChild(img);
        card.appendChild(body);
        body.appendChild(title);
        body.appendChild(ctg);
        body.appendChild(describ);
        body.appendChild(price);
        body.appendChild(buyBtn);
        col.appendChild(card)

        return col;
    }
}