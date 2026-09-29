let basket = [];
let deliveryFee = 4.99;


function init() {
  renderMenu();
  renderBasket();
}


function renderMenu() {
  let menuRef = document.getElementById('menu');
  menuRef.innerHTML = '';
  for (let i = 0; i < menu.length; i++) {
    menuRef.innerHTML += getCategoryTemplate(menu[i]);
  }
}


function getDishById(id) {
  for (let i = 0; i < menu.length; i++) {
    let matches = menu[i].dishes.filter(dish => dish.id == id);
    if (matches.length > 0) {
      return matches[0];
    }
  }
}


function getBasketItem(id) {
  let matches = basket.filter(item => item.id == id);
  return matches[0];
}


function addToBasket(id) {
  let item = getBasketItem(id);
  if (item == undefined) {
    let dish = getDishById(id);
    basket.push({ "id": dish.id, "name": dish.name, "price": dish.price, "amount": 1 });
  } else {
    item.amount = item.amount + 1;
  }
  updateBasketView(id);
}


function decreaseAmount(id) {
  let item = getBasketItem(id);
  item.amount = item.amount - 1;
  updateBasketView(id);
}


function removeFromBasket(id) {
  basket = basket.filter(item => item.id != id);
  updateBasketView(id);
}


function updateBasketView(id) {
  renderBasket();
  document.getElementById(`dish-action-${id}`).innerHTML = getDishButtonTemplate(id);
}


function renderBasket() {
  document.getElementById('basket-content').innerHTML = getBasketContentTemplate();
  renderMobileBasketContent();
  document.getElementById('basket-count').innerHTML = getBasketCountTemplate(getBasketCount());
}


function renderMobileBasketContent() {
  let mobileRef = document.getElementById('mobile-basket-content');
  if (mobileRef != null) {
    mobileRef.innerHTML = getBasketContentTemplate();
  }
}


function getBasketCount() {
  let count = 0;
  for (let i = 0; i < basket.length; i++) {
    count = count + basket[i].amount;
  }
  return count;
}


function openMobileBasket() {
  document.getElementById('mobile-basket').innerHTML = getMobileBasketTemplate();
}


function closeMobileBasket() {
  document.getElementById('mobile-basket').innerHTML = '';
}


function getSubtotal() {
  let subtotal = 0;
  for (let i = 0; i < basket.length; i++) {
    subtotal = subtotal + basket[i].price * basket[i].amount;
  }
  return subtotal;
}


function getDeliveryFee() {
  if (basket.length == 0) {
    return 0;
  }
  return deliveryFee;
}


function getBuyButtonState() {
  if (basket.length == 0) {
    return 'disabled';
  }
  return '';
}


function placeOrder() {
  basket = [];
  renderMenu();
  renderBasket();
  closeMobileBasket();
  document.getElementById('order-dialog').innerHTML = getOrderDialogTemplate();
}


function closeOrderDialog() {
  document.getElementById('order-dialog').innerHTML = '';
}


function getFormattedPrice(price) {
  return price.toFixed(2).replace('.', ',');
}
