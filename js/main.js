const products = [
  { id: 1, title: 'Ateş Ölçer', price: 320, image: 'ates.webp' },
  { id: 2, title: 'Anti Covid-19 Eldiven', price: 20, image: 'eldiven.webp' },
  { id: 3, title: 'Alkollü Jel', price: 60, image: 'jel.webp' },
  { id: 4, title: 'Koruyucu Maske', price: 80, image: 'maske.webp' },
  { id: 5, title: 'Basınç Nefes Ölçer', price: 320, image: 'nefesolcer.webp' },
  { id: 6, title: 'Reliex 12"li Kapsül', price: 16, image: 'kapsul.webp' },
  { id: 7, title: 'C Vitamini', price: 22, image: 'cvitamini.webp' },
  { id: 8, title: 'B-12 Vitamini', price: 12, image: 'b12vitamini.webp' },
];

/* Show Products Index */
const productsContainer = document.querySelector('#products .container');
const renderProducts = () => {
  products.forEach(item => {
    productsContainer.innerHTML += `
      <div class="product">
        <img src="images/${item.image}" alt="">
        <h3>${item.title}</h3>
        <span>${item.price.toFixed(2)}₺</span>
        <button data-productid="${item.id}">Sepete ekle</button>
      </div>
  `;
  });
}
/* start products */
productsContainer ? renderProducts() : null;

/* Get cart item length */
const updateCartLength = () => {
  const cartCount = document.querySelector('.cart-count');
  const cart = localStorage.cart ? JSON.parse(localStorage.cart) : [];
  if (cart && cart.length > 0) {
    cartCount.style.display = 'inline-block';
    cartCount.innerText = `(${cart.length})`;
    return;
  }
  cartCount.style.display = 'none';
}

/* Add Item */
const addItem = async event => {
  const cart = localStorage.cart ? JSON.parse(localStorage.cart) : [];
  const productID = event.target.dataset.productid;
  /* find product */
  const product = await products.find(item => {
    if (item.id == productID) return item;
  });
  /* find product in cart */
  const inCartItem = await cart.find((value, index) => {
    if (value.id == productID) {
      cart.splice(index, 1);
      return value;
    }
  });
  /* set qty */
  product.qty = inCartItem && inCartItem.qty ? ++inCartItem.qty : 1;
  /* save cart */
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartLength();
}

/* Add cart */
const addButtons = document.querySelectorAll('.product button');
addButtons.forEach(button => {
  button.addEventListener('click', addItem);
});


const cartContainer = document.querySelector('#cart .container');
const totalPriceContainer = document.querySelector('#total-price');

/* render cart */
const renderCart = () => {
  cartContainer.innerHTML = '';
  let totalPrice = 0;
  const cart = localStorage.cart ? JSON.parse(localStorage.cart) : [];

  if (cart.length === 0) totalPrice = 0;
  totalPriceContainer.innerText = `${totalPrice.toFixed(2)}₺`;

  cart.forEach((item, index) => {
    totalPrice += item.qty * item.price;
    totalPriceContainer.innerText = `${totalPrice.toFixed(2)}₺`;

    cartContainer.innerHTML += `
     <div class="cart-item">
        <i class="ion ion-md-close remove-item" onclick="removeItem(${index})"></i>
        <img src="images/${item.image}" alt="">
        <span class="title">${item.title}</span>
        <span class="qty">${item.qty} adet</span>
        <span class="price">${item.price.toFixed(2)}₺</span>
        <span class="item-total">${(item.qty * item.price).toFixed(2)}₺</span>
      </div> 
    `;
  });
}

/* start render */
cartContainer ? renderCart() : null;

/* remove cart */
const removeItem = index => {
  console.log(index);
  const cart = localStorage.cart ? JSON.parse(localStorage.cart) : [];
  /* remove product */
  cart.splice(index, 1);
  /* save cart */
  localStorage.setItem('cart', JSON.stringify(cart));
  /* render cart */
  renderCart();
  updateCartLength();
}


/* Start app */
updateCartLength();