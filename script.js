let basket = [];

function init() {
  renderMenu();
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

