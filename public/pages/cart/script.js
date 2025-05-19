document.addEventListener('DOMContentLoaded', function () {
    let user = JSON.parse(sessionStorage.getItem("loggedUser"));
    if (!user) {
      alert("Você precisa estar logado para ver o carrinho.");
      window.location = '../../../index.html';
    }

    let cart = JSON.parse(localStorage.getItem('carts')) || {};
    let userCart = cart[user.email] || [];
    let cartContainer = document.getElementById('cart-items');
    let totalItemsElement = document.getElementById('total-items');
    let totalPriceElement = document.getElementById('total-price');

    let totalItems = 0;
    let totalPrice = 0;

    if (userCart.length === 0) {
      cartContainer.innerHTML = '<p>O carrinho está vazio.</p>';
      return;
    }

    for (let i = 0; i < userCart.length; i++) {
      let item = userCart[i];
      let section = document.createElement('section');
      section.className = 'cart-item';

      let itemTotal = item.price * item.quantity;
      totalItems = totalItems + item.quantity;
      totalPrice = totalPrice + itemTotal;

      section.innerHTML =
        '<div class="item-details">' +
        '<img src="' + item.image + '" alt="' + item.title + '">' +
        '<div>' +
        '<h3>' + item.title + '</h3>' +
        '<p>' + item.description + '</p>' +
        '</div>' +
        '</div>' +
        '<div class="item-quantity">' +
        '<span>Quantidade</span>' +
        '<div class="quantity-control">' +
        '<button class="remove-button" data-title="' + item.title + '">❌</button>' +
        '<input type="number" value="' + item.quantity + '" min="1" data-id="' + item.title + '" data-price="' + item.price + '">' +
        '</div>' +
        '</div>' +
        '<div class="item-price">' +
        '<span>Preço</span>' +
        '<p>R$ ' + itemTotal.toFixed(2) + '</p>' +
        '</div>';

      cartContainer.appendChild(section);
    }

    totalItemsElement.textContent = 'Total de itens: ' + totalItems;
    totalPriceElement.textContent = 'Valor total: R$ ' + totalPrice.toFixed(2);

    let quantityInputs = document.querySelectorAll('.quantity-control input');
    for (let q = 0; q < quantityInputs.length; q++) {
      quantityInputs[q].addEventListener('change', function (e) {
        let newQuantity = parseInt(e.target.value);
        if (isNaN(newQuantity) || newQuantity < 1) {
          e.target.value = 1;
          return;
        }

        let title = e.target.getAttribute('data-id');
        let price = parseFloat(e.target.getAttribute('data-price'));

        for (let j = 0; j < userCart.length; j++) {
          if (userCart[j].title === title) {
            userCart[j].quantity = newQuantity;
          }
        }

        cart[user.email] = userCart;
        localStorage.setItem('carts', JSON.stringify(cart));

        location.reload();
      });
    }

    var removeButtons = document.querySelectorAll('.remove-button');
    for (let r = 0; r < removeButtons.length; r++) {
      removeButtons[r].addEventListener('click', function (e) {
        var title = e.target.getAttribute('data-title');

        let newCart = [];
        for (var k = 0; k < userCart.length; k++) {
          if (userCart[k].title !== title) {
            newCart.push(userCart[k]);
          }
        }

        cart[user.email] = newCart;
        localStorage.setItem('carts', JSON.stringify(cart));

        location.reload();
      });
    }
  });

  function addToCart(button) {
    let card = button.closest('.card');

    let name = card.getAttribute('data-name');
    let category = card.getAttribute('data-category');
    let price = parseFloat(card.getAttribute('data-price'));
    let image = card.querySelector('img').src;
    let description = card.querySelector('.textbody').textContent;

    if (isNaN(price)) {
      alert("Erro ao obter o preço do produto.");
      return;
    }
  }