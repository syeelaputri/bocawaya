const addProductForm = document.getElementById('add-product-form');



addProductForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!signedUser) {
    alert('You must be signed in first.');
    return;
  }

  const form = e.target;
  const name = form.elements['name'].value;
  const description = form.elements['description'].value;
  const category = form.elements['category'].value;
  const price = form.elements['price'].value;
  const image_url = form.elements['image_url'].value;
  const product = { name, description, category, price, image_url };

  addProduct(product);
});



async function addProduct(product) {
  try {
    const { error } = await supabaseClient
      .from('products')
      .insert(product);
    
    if (error) throw new Error(error.message);
    
    if (product.category === 'Pakaian Pria') window.location.href = 'men.html';
    else if (product.category === 'Pakaian Wanita') window.location.href = 'women.html';
    else if (product.category === 'Pakaian Anak') window.location.href = 'children.html';
    else if (product.category === 'Tas') window.location.href = 'bag.html';
    else if (product.category === 'Sepatu') window.location.href = 'shoes.html';
    else if (product.category === 'Aksesoris') window.location.href = 'accessories.html';
  } catch (err) {
    alert('Unable to add product: \n\n' + err.message);
  }
}
