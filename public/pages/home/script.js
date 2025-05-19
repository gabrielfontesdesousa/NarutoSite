function addToCart(button) {
    const card = button.closest('.card');
    const name = card.getAttribute('data-name');
    const category = card.getAttribute('data-category');
    const priceText = card.querySelector('.card-footer .text-title').textContent;
    const price = parseFloat(priceText.replace('R$', '').replace(',', '.').trim());
    const image = card.querySelector('img').src;
    const description = card.querySelector('.textbody').textContent;
    if (isNaN(price)) {
      alert("Erro ao obter o preço do produto.");
      return;
    }
    const user = JSON.parse(sessionStorage.getItem("loggedUser"));
    if (!user) {
      alert("Você precisa estar logado para adicionar itens ao carrinho.");
      window.location('/public/pages/login/index.html')
      return;
    }

    const product = {
      title: name,
      category: category,
      price: price,
      quantity: 1,
      image: image,
      description: description
    };

    const cart = JSON.parse(localStorage.getItem('carts')) || {};
    const userCart = cart[user.email] || [];

    const existingProductIndex = userCart.findIndex(item => item.title === product.title);
    if (existingProductIndex !== -1) {
      userCart[existingProductIndex].quantity += 1;
    } else {
      userCart.push(product);
    }

    cart[user.email] = userCart;
    localStorage.setItem('carts', JSON.stringify(cart));

    alert(`${name} foi adicionado ao carrinho!`);
  }
