/** Gère l'affichage des produits dans une forme de liste, page Accueil */

class Camera{
    constructor(jsonCamera) {
        jsonCamera && Object.assign(this, jsonCamera);
    }
}

fetch("http://localhost:3000/api/cameras")
.then( data => data.json())
.then( jsonListCamera => {
    for(let jsonCamera of jsonListCamera) {
        let camera = new Camera(jsonCamera);
        document.querySelector(".content").innerHTML += `<div class="col-12 col-md-6 pb-3">
        <div class="card shadow-sm">
          <img
            src="http://localhost:3000/api/cameras/${camera.imageUrl}"
            class="card-img-top img-fluid"
          />
          <div class="card-body">
            <h4 class="card-title">${camera.name}</h4>
            <p class="card-text">${camera.description}</p>
            <p class="card-text font-weight-bold">${camera.price}</p>
          </div>
        </div>
      </div>`;
    }
} );
