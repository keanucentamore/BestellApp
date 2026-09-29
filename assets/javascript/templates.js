function getCategoryTemplate(category) {
  return `
    <section class="category">
      <div class="category-bar">
        <img class="category-icon" src="./assets/icons/${category.icon}" alt="">
        <h2 class="category-title">${category.category} <span class="category-suffix">${category.suffix}</span></h2>
      </div>
      <div class="dish-list">${getDishListTemplate(category)}</div>
    </section>`;
}


function getDishListTemplate(category) {
  let listHtml = '';
  for (let i = 0; i < category.dishes.length; i++) {
    listHtml += getDishTemplate(category.dishes[i]);
  }
  return listHtml;
}


function getDishTemplate(dish) {
  return `
    <article class="dish-card">
      <img class="dish-image" src="./assets/images/${dish.image}" alt="${dish.name}">
      <div class="dish-body">
        <div class="dish-head">
          <h3 class="dish-name">${dish.name}</h3>
          <p class="dish-price dish-price-top">${getFormattedPrice(dish.price)}€</p>
        </div>
        <p class="dish-description">${dish.description}</p>
        ${getDishFooterTemplate(dish)}
      </div>
    </article>`;
}


function getDishFooterTemplate(dish) {
  return `
    <div class="dish-footer">
      <p class="dish-price dish-price-bottom">${getFormattedPrice(dish.price)}€</p>
      <div id="dish-action-${dish.id}">${getDishButtonTemplate(dish.id)}</div>
    </div>`;
}


function getDishButtonTemplate(id) {
  let item = getBasketItem(id);
  if (item == undefined) {
    return `<button class="dish-button" onclick="addToBasket(${id})">Add to basket</button>`;
  }
  return `<button class="dish-button added" onclick="addToBasket(${id})">Added ${item.amount}</button>`;
}


function getBasketContentTemplate() {
  return `
    <ul class="basket-list">${getBasketItemsTemplate()}</ul>
    ${getBasketSummaryTemplate(getSubtotal())}`;
}


function getBasketItemsTemplate() {
  if (basket.length == 0) {
    return getEmptyBasketTemplate();
  }
  let itemsHtml = '';
  for (let i = 0; i < basket.length; i++) {
    itemsHtml += getBasketItemTemplate(basket[i]);
  }
  return itemsHtml;
}


function getBasketItemTemplate(item) {
  return `
    <li class="basket-item">
      <p class="basket-item-name">${item.amount} x ${item.name}</p>
      <div class="basket-item-row">
        <div class="amount-control">
          ${getDecreaseButtonTemplate(item)}
          <span class="amount">${item.amount}</span>
          <button class="amount-button" onclick="addToBasket(${item.id})">+</button>
        </div>
        <p class="basket-item-price">${getFormattedPrice(item.price * item.amount)}€</p>
      </div>
    </li>`;
}


function getDecreaseButtonTemplate(item) {
  if (item.amount == 1) {
    return `<button class="amount-button" onclick="removeFromBasket(${item.id})">
              <img class="trash-icon" src="./assets/icons/icons_trash.svg" alt="Entfernen">
            </button>`;
  }
  return `<button class="amount-button" onclick="decreaseAmount(${item.id})">−</button>`;
}


function getEmptyBasketTemplate() {
  return `<li class="basket-empty">Your basket is empty.</li>`;
}


function getBasketSummaryTemplate(subtotal) {
  let fee = getDeliveryFee();
  let total = subtotal + fee;
  return `
    <div class="basket-summary">
      <p class="summary-row"><span>Subtotal</span><span>${getFormattedPrice(subtotal)}</span></p>
      <p class="summary-row"><span>Delivery fee</span><span>${getFormattedPrice(fee)}€</span></p>
      <p class="summary-row summary-total"><span>Total</span><span>${getFormattedPrice(total)}€</span></p>
    </div>
    <button class="buy-button" onclick="placeOrder()" ${getBuyButtonState()}>Buy now (${getFormattedPrice(total)}€)</button>`;
}


function getMobileBasketTemplate() {
  return `
    <div class="mobile-basket-overlay">
      <section class="mobile-basket-box">
        <button class="close-button" onclick="closeMobileBasket()">✕</button>
        <h2 class="basket-title">Your Basket</h2>
        <div id="mobile-basket-content">${getBasketContentTemplate()}</div>
      </section>
    </div>`;
}


function getBasketCountTemplate(count) {
  if (count == 0) {
    return '';
  }
  return `<span class="basket-count">${count}</span>`;
}


function getOrderDialogTemplate() {
  return `
    <div class="order-overlay">
      <section class="order-box">
        <button class="close-button" onclick="closeOrderDialog()">✕</button>
        <img class="delivery-icon" src="./assets/icons/icons_delivery.svg" alt="">
        <h2 class="order-title">Order confirmed!</h2>
        <p class="order-text">Your food is on the way!</p>
      </section>
    </div>`;
}
