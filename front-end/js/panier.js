/** Gère les interactions de la page Panier */

// Création d'une variable pour manipuler le panier
let addToBasket = JSON.parse(localStorage.getItem("basket"));

const productContainer = document.querySelector("#itemsInBasket");

let displayBasket = [];

if(addToBasket === null || addToBasket == 0 ) {
    const emptyBasket = `
        <div class="col-12">
            <div class="row pb-2 pt-2">
                <div class="col">
                    <p class="font-weight-bold text-center pt-3">Votre panier est vide</p>
                </div>
            </div>
        </div>`;

    productContainer.innerHTML = emptyBasket;
}else {
    for (j = 0; j < addToBasket.length; j++) {
        displayBasket = displayBasket + `
            <div class="col-12 border-bottom border-secondary">
                <div class="row pb-2 pt-4 pt-lg-3">
                    <div class="col-4">
                        <div class="d-flex wrap">
                            <img class="img-fluid" src=${addToBasket[j].imageUrl}
                            width="100"
                            height="70"
                             />
                            <div>
                                <p class="pl-md-2 font-weight-bold">${addToBasket[j].name}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-3 col-md-4 ">
                        <p class="pl-2 ">${addToBasket[j].selectedLense}</p>
                    </div>
                    <div class="col-3">
                        <p>${addToBasket[j].price / 100}.00 €</p>
                    </div>
                    <div class="col-2 col-md-1">
                        <div>
                        <button type="button" class="btn btn-sm btn-danger btnRemove"><i class="bi bi-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>`;
        }

        if(j == addToBasket.length) {
            productContainer.innerHTML = displayBasket;   
        }
    }


/**Calcule le montant total du panier */

let totalPrice = [];

for (let k = 0; k < addToBasket.length; k++){
    let priceProductsInBasket = addToBasket[k].price;

    totalPrice.push(priceProductsInBasket)
}

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPriceInBasket = totalPrice.reduce(reducer,0);
console.log(totalPriceInBasket);

productContainer.innerHTML += `
    <div class="col-12">
        <div class="row">
            <div class="col-5 col-md-8">
                <div></div>
            </div>
            <div class="col-4 col-md-2 pt-3">
                <p class="font-weight-bold">Total</p>
            </div>
            <div class="col-3 col-md-2 pt-3 text-md-center">
                <p>${totalPriceInBasket / 100}.00 €</p>
            </div>
        </div>
    </div>`;


/** Suprime les produits du panier */

let buttonRemove = document.querySelectorAll(".btnRemove");

for (let l = 0; l < buttonRemove.length; l++) {
    buttonRemove[l].addEventListener("click", (event) => {
        event.preventDefault();
    
        let idRemoveSelection = addToBasket[l]._id;
           
        addToBasket = addToBasket.filter( el => el._id !== idRemoveSelection);
    
        localStorage.setItem("basket", JSON.stringify(addToBasket));
    
        alert("Le produit a été supprimé");
        window.location.href = "panier.html";
    })
}

