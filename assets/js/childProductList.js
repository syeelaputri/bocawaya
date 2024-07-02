const childProductItemContainer = document.getElementById('child-product-item-container');



document.addEventListener('DOMContentLoaded', async () => {
  const productList = await getProductList();
  
  if (!productList || productList.length === 0) return;

  const childProductList = productList.filter(product => product.category === 'Pakaian Anak');

  childProductList.forEach((menProduct, index) => {
    const delay = (index + 1) * 100;
    const cardItem = createCardItem(menProduct, delay);
    childProductItemContainer.appendChild(cardItem);
  });
});



async function getProductList() {
  try {
    const { data, error } = await supabaseClient
      .from('products')
      .select();

    if (error) throw new Error(error.message);
    
    return data;
  } catch (err) {
    alert('Unable to get product list: \n\n' + err.message);
  }
}

function createCardItem(product, delay) {
  const colDiv = document.createElement('div');
  colDiv.className = 'col-lg-4 col-md-6';
  colDiv.setAttribute('data-aos', 'fade-up');
  colDiv.setAttribute('data-aos-delay', delay);

  const cardDiv = document.createElement('div');
  // cardDiv.className = 'card';
  cardDiv.style = 'border: 1px solid grey; padding: 4px; border-radius: 4px;'

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

  const buttonElement = document.createElement('button');
  buttonElement.textContent = 'Tambahkan ke keranjang!';
  buttonElement.addEventListener('click', () => {
    console.log(product);
  });

  cardImgDiv.appendChild(imgElement);
  cardDiv.appendChild(cardImgDiv);
  cardDiv.appendChild(h3Element);
  cardDiv.appendChild(pDescription);
  cardDiv.appendChild(pPrice);
  cardDiv.appendChild(buttonElement);
  colDiv.appendChild(cardDiv);

  return colDiv;
}
