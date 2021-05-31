/** Fonction principal du telechargement de la page Produit */

(async() => {
    const productId = getProductId()
    const productInfo = await getProductInfo(productId)
    
    productPage(productInfo)
})()

/** Recupere le id du produit */

function getProductId(){
    return new URL(window.location.href).searchParams.get('id')
}

/** Appelle l'api des produits */

function getProductInfo(productId) {
    return fetch(apiUrl + "/api/cameras/" + productId)
    .catch((error)=> {
        console.log(error);
    })
    .then((httpBodyResponse)=> httpBodyResponse.json())
    .then((productInfo)=> productInfo)
}

/** Recupere les elements de chaque produit */

function productPage(product) {
    document.getElementById('imgCamera').src = product.imageUrl
    document.getElementById('nameCamera').textContent = product.name
    document.getElementById('descriptionCamera').textContent = product.description
    document.getElementById('priceCamera').textContent = `${product.price / 100}.00 €`
}