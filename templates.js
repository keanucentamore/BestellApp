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
          <p class="dish-price">${getFormattedPrice(dish.price)}€</p>
        </div>
        <p class="dish-description">${dish.description}</p>
        <div class="dish-action" id="dish-action-${dish.id}">${getDishButtonTemplate(dish.id)}</div>
      </div>
    </article>`;
}


function getDishButtonTemplate(id) {
  let item = getBasketItem(id);
  if (item == undefined) {
    return `<button class="dish-button" onclick="addToBasket(${id})">Add to basket</button>`;
  }
  return `<button class="dish-button added" onclick="addToBasket(${id})">Added ${item.amount}</button>`;
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
  let total = subtotal + deliveryFee;
  return `
    <div class="basket-summary">
      <p class="summary-row"><span>Subtotal</span><span>${getFormattedPrice(subtotal)}</span></p>
      <p class="summary-row"><span>Delivery fee</span><span>${getFormattedPrice(deliveryFee)}€</span></p>
      <p class="summary-row summary-total"><span>Total</span><span>${getFormattedPrice(total)}€</span></p>
    </div>
    <button class="buy-button" onclick="placeOrder()">Buy now (${getFormattedPrice(total)}€)</button>`;
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
