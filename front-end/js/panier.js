/** Gère les interactions de la page Panier */

//Création d'une variable pour manipuler le panier
let addToBasket = JSON.parse(localStorage.getItem("basket"));

const productContainer = document.querySelector("#itemsInBasket");

let displayBasket = [];

//Montre un message si le panier est vide
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
}else { //Récupération des éléments dans le panier, s'il y en a
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

        //Montre les élémentss dans le panier
        if(j == addToBasket.length) {
            productContainer.innerHTML = displayBasket;   
        }
    }


// Calcule le montant total du panier

let totalPrice = [];

for (let k in addToBasket){ //Cherche les prix dans le panier
    let priceProductsInBasket = addToBasket[k].price;

    totalPrice.push(priceProductsInBasket); //Mets les prix du panier
}

const reducer = (accumulator, currentValue) => accumulator + currentValue; //Additionne les prix avec la méthode reduce
const totalPriceInBasket = totalPrice.reduce(reducer,0);

localStorage.setItem('totalPriceInBasket', totalPrice.reduce(reducer,0));

//Affiche le prix total du panier
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

 
// Suprime les produits du panier

let buttonRemove = document.querySelectorAll(".btnRemove");

for (let l = 0; l < buttonRemove.length; l++) { //Ecouter les clics sur le bouton btnRemove
    buttonRemove[l].addEventListener("click", (event) => {
        event.preventDefault();
    
        let idRemoveSelection = addToBasket[l].selectedLense; //Viser le type de lentille pour la suppression du produit
           
        addToBasket = addToBasket.filter( el => el.selectedLense !== idRemoveSelection);
    
        localStorage.setItem("basket", JSON.stringify(addToBasket)); //Envoyer la variable dans le localStorage en format Json
    
        alert("Le produit a été supprimé"); //Alert de la suppression du produit et rechargement de la page
        window.location.href = "panier.html";
    })
}


/**Gère la forme de contact de la page Panier */

  function checkIfFieldIsValid(input, regExp) {
    return input.value.match(regExp) !== null;
  }

  let productsID = [];

  function paymentFormTest(){

    if(addToBasket === null || addToBasket == 0 ) {
      alert("Votre panier est vide ! Ajoutez un produit avant de procéder au paiement.");
  }else {
    //Si la fonction a déjà été utilisée on réinitialise le formulaire
    let inputs = document.querySelectorAll("input");
    for (let i = 0; i < inputs.length ; i++) {
      inputs[i].classList.remove("is-invalid"); //supprime is-valid/is-invalid
      inputs[i].classList.remove("is-valid");
    }
  
    let alertMessages = document.querySelectorAll(".alertMessages");
    for (let i = 0; i < alertMessages.length ; i++) {
      alertMessages[i].remove();
    };

    //Récupérer les informations du formulaire
    var firstName = document.querySelector("#firstName"),
        lastName = document.querySelector("#lastName"),
        address = document.querySelector("#address"),
        city = document.querySelector("#city"),
        email = document.querySelector("#email");

    //Définition des expressions régulières pour la vérification de la validité des champs
    let stringRegExp = /([A-Za-z0-9_\s\-'\u00C0-\u024F]+)/;
        emailRegExp = /^([\w\-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i;
  
    //Vérification de la validité des champs
    let isfirstNameValid = checkIfFieldIsValid(firstName, stringRegExp);
        isLastNameValid = checkIfFieldIsValid(lastName, stringRegExp);
        isAddressValid = checkIfFieldIsValid(address, stringRegExp);
        isCityValid = checkIfFieldIsValid(city, stringRegExp);
        isEmailValid = checkIfFieldIsValid(email, emailRegExp);
  
    //Alerter l'utilisateur s'il a mal rempli le formulaire
    let fields = [firstName, lastName, address, city, email],
        fieldsValidity = [isfirstNameValid, isLastNameValid, isAddressValid, isCityValid, isEmailValid],
        isAFieldInvalid = false;
  
    for (let i = 0; i < fields.length; i++) {
      if (!fieldsValidity[i]) { //si un champ n'est pas valide
        isAFieldInvalid = true; //un champ au moins est incorrect, empêche la requête POST
  
        //Création du message à envoyer à l'utilisateur
        let message;
        if (fields[i] === document.querySelector("#firstName")) {
          message = "Le prénom est incorrect !";
        } else if (fields[i] === document.querySelector("#lastName")) {
          message = "Le nom est incorrect !";
        } else if (fields[i] === document.querySelector("#address")) {
          message = "L'adresse postale est incorrecte !";
        } else if (fields[i] === document.querySelector("#city")) {
          message = "La ville est incorrecte !";
        } else if (fields[i] === document.querySelector("#email")) {
          message = "L'adresse mail est incorrecte !";
        }
  
        //Création de l'alerte
        let alert = document.createElement("div");
        alert.appendChild(document.createTextNode(message));
        fields[i].classList.add("is-invalid");
        alert.classList.add("alertMessages", "invalid-feedback");
        fields[i].parentElement.appendChild(alert);
  
      } else {
        fields[i].classList.add("is-valid");
      }
    }
    //Si l'un des champs a été vidé
    if (isAFieldInvalid) return; //la fonction s'arrête 
    //sinon on continue

      let contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
      },
        products = productsID;
      //Récupérer l'orderId
      fetch('http://localhost:3000/api/cameras/order', {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ //On convertit les données au format JSON
          contact: contact,
          products: products
        })
      })
        .then(response => response.json())
        .then(order => {
          localStorage.setItem("orderId", order.orderId); //On definit orderID
          window.location.href = "confirmation.html"; // On redirige
        })
        .catch(function(_err) {
        });
  }
}
  
  document.querySelector("#submitPayment").addEventListener("click", paymentFormTest, true);