

class Camera{
    constructor(jsonCamera) {
        jsonCamera && Object.assign(this, jsonCamera);
    }
}

/** Gère l'affichage des produits dans une forme de liste, page Accueil */

fetch(apiUrl + "/api/cameras/")
.then( data => data.json())
.then( jsonListCamera => {
    for(let jsonCamera of jsonListCamera) {
        let camera = new Camera(jsonCamera);
        document.querySelector(".content").innerHTML += `<div class="col-12 col-md-6 pb-4">
        <a href="produit.html?id=${camera._id}"><div class="card shadow-sm scale">
          <img
            src="${camera.imageUrl}"
            class="card-img-top img-fluid"
          />
          <div class="card-body">
            <h4 class="card-title">${camera.name}</h4>
            <p class="card-text">${camera.description}</p>
            <p class="card-text font-weight-bold">${camera.price / 100}.00 €</p>
          </div>
        </div></a>
      </div>`;
   
    }
} );

