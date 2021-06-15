/** Gère les interactions de la page Produit */

let params = (new URL(document.location)).searchParams;
let id = params.get("id"); //Récupérer le id du produit 

//Récupérer les informations de chaque produit 
function productPage(product) {
    document.getElementById('imgCamera').src = product.imageUrl
    document.getElementById('nameCamera').textContent = product.name
    document.getElementById('descriptionCamera').textContent = product.description
    document.getElementById('priceCamera').textContent = `${product.price / 100}.00 €`
    selectLenses = document.querySelector("select");

    //Création des éléments du menu déroulant 
    for (i = 0; i < product.lenses.length; i++) {
      let option = document.createElement("option");
      option.textContent = product.lenses[i];
      selectLenses.appendChild(option);
    }
}

//Appelle l'api de produits
function getCamera(id) {
    fetch("http://localhost:3000/api/cameras/" + id)
      .then(response => response.json())
      .then(product => {
        productPage(product);
        
      //Ecouter les clics sur le bouton addToBasket
      let addItemToBasket = document.querySelector("#addToBasket");
      addItemToBasket.addEventListener("click", function () {
        
        addToBasket(product);
        alert("Ajouté au panier"); //Alert de l'ajoute au panier d'un produit
      
      });
    })
    .catch(function() {
    });
}

function addToBasket(product) {
    
    //Création du panier dans le localStorage s'il n'existe pas déjà
    if (typeof localStorage.getItem("basket") !== "string") {
        let basket = [];
        localStorage.setItem("basket", JSON.stringify(basket));
    }

    //Récupérer les informations du lenses de la caméra
    product.selectedLense = document.querySelector("option:checked").innerText;
    delete product.lenses;
    //Création d'une variable pour manipuler le panier
    let basket = JSON.parse(localStorage.getItem("basket"));
    //Vérification que l'item n'existe pas déjà dans le panier
    let isThisItemExist = false;
    let existingItem;
    for (let i = 0; i < basket.length; i++) {
      if (product._id === basket[i]._id && product.price === basket[i].price && product.selectedLense === basket[i].selectedLense) {
        isThisItemExist = true;
        existingItem = basket[i];
      }
    }
    
    //Ajouter la caméra au panier
    if (!isThisItemExist) {
      basket.push(product);
    } 
      localStorage.setItem("basket", JSON.stringify(basket));
  }

    
getCamera(id);

