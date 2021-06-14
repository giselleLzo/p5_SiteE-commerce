/** Gère les interactions de la page Confirmation */

let orderId = localStorage.getItem('orderId'); //Recupère l'Id de la commande

let totalPriceInBasket = localStorage.getItem('totalPriceInBasket'); //Recupère le prix total de la commande

//Recupère les informations de la commande
const orderNumber = document.getElementById('orderNumber'); 
orderNumber.textContent = "Numéro de commande : " + orderId;

const totalOrder = document.getElementById('totalOrder');
totalOrder.textContent = "Montant total de votre commande : " + totalPriceInBasket / 100 + ".00 €";

localStorage.clear(); //Efface le localStorage