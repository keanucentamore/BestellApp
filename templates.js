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
  return `<button class="dish-button">Add to basket</button>`;
}


function getFormattedPrice(price) {
  return price.toFixed(2).replace('.', ',');
}