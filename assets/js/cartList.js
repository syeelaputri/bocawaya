const cartProductItemContainer = document.getElementById('cart-product-item-container');
const buyButton = document.getElementById('buy-button');



document.addEventListener('DOMContentLoaded', async () => {
  const cartList = sessionStorage.getItem('cartList');
  
  if (!cartList) return;

  JSON.parse(cartList).forEach((cart, index) => {
    const delay = (index + 1) * 100;
    const cardItem = createCardItem(cart, delay);
    cartProductItemContainer.appendChild(cardItem);
  });
});

buyButton.addEventListener('click', addShipping);

async function addShipping() {
  try {
    const user_id = signedUser.id;
    const cartList = sessionStorage.getItem('cartList');
    if (!cartList) return;
    const product_id_list = JSON.parse(cartList).map(cartItem => cartItem.id);
    const payload = { user_id, product_id_list };

    const { error } = await supabaseClient
      .from('shipping')
      .insert(payload);
    
    if (error) throw new Error(error.message);
    
    sessionStorage.removeItem('cartList');
    alert('Product bought successfully');
    location.reload();
  } catch (err) {
    alert('Unable to add shipping: \n\n' + err.message);
  }
}



function createCardItem(product, delay) {
  const colDiv = document.createElement('div');
  colDiv.className = 'col-lg-4 col-md-6';
  colDiv.setAttribute('data-aos', 'fade-up');
  colDiv.setAttribute('data-aos-delay', delay);

  const cardDiv = document.createElement('div');
  cardDiv.className = 'card';

  const cardImgDiv = document.createElement('div');
  cardImgDiv.className = 'card-img';

  const imgElement = document.createElement('img');
  imgElement.src = product.image_url;
  imgElement.alt = product.name;
  imgElement.className = 'img-fluid';

  const h3Element = document.createElement('h3');
  const aElement = document.createElement('a');
  aElement.href = '#';
  aElement.className = 'stretched-link';
  aElement.textContent = product.name;
  h3Element.appendChild(aElement);

  const pDescription = document.createElement('p');
  pDescription.textContent = product.description;

  const pPrice = document.createElement('p');
  pPrice.textContent = product.price;

  const existingCartList = sessionStorage.getItem('cartList');
  const cartList = existingCartList ? [...JSON.parse(existingCartList)] : [];
  const isProductAlreadyInCart = cartList.some(cart => cart.id === product.id);
  const buttonElement = document.createElement('button');
  buttonElement.textContent = isProductAlreadyInCart ? 'Produk sudah ditambahkan di keranjang' : 'Tambahkan ke keranjang!';
  buttonElement.disabled = isProductAlreadyInCart ? true : false;
  buttonElement.addEventListener('click', () => {
    if (!signedUser) {
      alert('You must be signed in first!');
      return;
    }

    cartList.push(product);
    sessionStorage.removeItem('cartList');
    sessionStorage.setItem('cartList', JSON.stringify(cartList));

    location.reload();
  });

  cardImgDiv.appendChild(imgElement);
  cardDiv.appendChild(cardImgDiv);
  cardDiv.appendChild(h3Element);
  cardDiv.appendChild(pDescription);
  cardDiv.appendChild(pPrice);
  // cardDiv.appendChild(buttonElement);
  colDiv.appendChild(cardDiv);

  return colDiv;
}
