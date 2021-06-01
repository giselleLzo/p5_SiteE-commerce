
let params = (new URL(document.location)).searchParams;

/** Recupere le id du produit */
let id = params.get("id"); 

/** Recupere les elements de chaque produit */
function productPage(product) {
    document.getElementById('imgCamera').src = product.imageUrl
    document.getElementById('nameCamera').textContent = product.name
    document.getElementById('descriptionCamera').textContent = product.description
    document.getElementById('priceCamera').textContent = `${product.price / 100}.00 €`
}

/** Appelle l'api des produits */
function getCamera(id) {
    fetch(apiUrl + "/api/cameras/" + id)
      .then(response => response.json())
      .then(product => {
        productPage(product);
        
    })
    .catch(function() {
        console.log('Erreur de chargement');
    });
  }

  getCamera(id);


/** Gère l'affichage du menu deroulant  */

  /** Initialisation des variables */
   let cameraLenses;
   const lenses = document.getElementById('lenses');

   /** Appelle l'api */
    fetch(apiUrl + "/api/cameras/" + id) 
    .then(async result_ => { 
        const result = await result_.json() 
        cameraLenses = result 
        lensesList()
           
    })
    .catch((error) => {
        console.log(error);
    })

    /** Cree les elements du menu deroulant */

    const lensesList = () => {
        for (let i = 0; i < cameraLenses.lenses.length; i++) {
            const option = document.createElement("option") 
            option.setAttribute("value", cameraLenses.lenses[i])                
            option.innerHTML = cameraLenses.lenses[i]
            lenses.appendChild(option)
        }
    }
    


/** Gère les interactions du button Ajouter au panier */

let cart = document.querySelector('.addCart');

cart.addEventListener('click', () => {
    productNumbers();
})

function loadProductNumbers() {
    let cameraNumbers = localStorage.getItem('productNumbers');

    if(cameraNumbers) {
        document.querySelector('.cart span').textContent = cameraNumbers;
    }
}

function productNumbers() {
    let cameraNumbers = localStorage.getItem('productNumbers');
    
    cameraNumbers = parseInt(cameraNumbers);

    if(cameraNumbers) {
        localStorage.setItem('productNumbers', cameraNumbers + 1);
        document.querySelector('.cart span').textContent = cameraNumbers + 1;
    } else {
        localStorage.setItem('productNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
     
}

loadProductNumbers();






 