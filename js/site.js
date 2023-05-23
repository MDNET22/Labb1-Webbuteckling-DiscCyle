document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('#products')) {
    displayProducts();
  }
});

const products = [
 {
  id: 1,
  name: 'Dynamic Disc Judge',
  plastic: 'Lucid',
  image: 'img/DD-Judge-Lucid.webp',
  price: 120,
  grade: 7,
  weight: 172,
  color: 'White',
},
{
  id: 2,
  name: 'Streamline Pilot',
  plastic: 'Electron Firm',
  image: 'img/SL-Pilot-EFP.webp',
  price: 80,
  grade: 6,
  weight: 175,
  color: 'White',
},
{
  id: 3,
  name: 'Streamline Pilot',
  plastic: 'Neutron Special Edition',
  image: 'img/SL-Pilot-SE.webp',
  price: 120,
  grade: 6,
  weight: 173,
  color: 'Turquoise',
},
{
  id: 4,
  name: 'Westside Discs Harp',
  plastic: 'BT Soft',
  image: 'img/WD-Harp-BTS.webp',
  price: 60,
  grade: 4,
  weight: 174,
  color: 'Blue',
},
];

let cart = [];

function displayProducts() {
  const productsContainer = document.querySelector('#products');
  products.forEach((product) => {
    const productCard = `
      <div class="card col-6 p-5 mb-5 mt-5 custom-product-card">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">Price: ${product.price} kr</p>
          <p class="card-text">Plastic: ${product.plastic}</p> 
          <p class="card-text">Color: ${product.color}</p>
          <p class="card-text">Weight: ${product.weight} g</p>
          <p class="card-text">Grade: ${product.grade}</p>
          <button class="btn custom-button" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    `;
    productsContainer.innerHTML += productCard;
  });
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existingProduct = cart.find((p) => p.id === productId);

  if (existingProduct) {
    alert('All of our discs are one of a kind, you can not add the same disc twice!');
    return;
  }

  cart.push(product);
  saveCart();
  updateCart();
}

function removeFromCart(productId) {
  const productIndex = cart.findIndex((p) => p.id === productId);
  cart.splice(productIndex, 1);
  saveCart();
  updateCart();
}

function updateCart() {
  const cartItemsContainer = document.querySelector('#cart-items');
  cartItemsContainer.innerHTML = '';

  cart.forEach((item) => {
    const cartItem = `
      <li>
        ${item.name} - ${item.price} kr
        <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Remove</button>
      </li>
    `;
    cartItemsContainer.innerHTML += cartItem;
  });
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
  }
}

loadCart();