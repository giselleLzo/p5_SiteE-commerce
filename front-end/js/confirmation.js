// Recupere l'Id de la commande

let orderId = localStorage.getItem('orderId');

//Recupere le prix total de la commande

let totalPriceInBasket = localStorage.getItem('totalPriceInBasket');

//Recupere les informations de la commande

const orderNumber = document.getElementById('orderNumber');
orderNumber.textContent = "Numéro de commande : " + orderId;

const totalOrder = document.getElementById('totalOrder');
totalOrder.textContent = "Montant total de votre commande : " + totalPriceInBasket + "€";

localStorage.clear();


