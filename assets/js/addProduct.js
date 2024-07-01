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
  const payload = { name, description, category, price, image_url };

  addProduct(payload);
});



async function addProduct(payload) {
  try {
    const { error } = await supabaseClient
      .from('products')
      .insert(payload);
    
    if (error) throw new Error(error.message);
    
    if (payload.category === 'Pakaian Pria') window.location.href = 'men.html';
    else if (payload.category === 'Pakaian Wanita') window.location.href = 'women.html';
    else if (payload.category === 'Pakaian Anak') window.location.href = 'children.html';
    else if (payload.category === 'Tas') window.location.href = 'bag.html';
    else if (payload.category === 'Sepatu') window.location.href = 'shoes.html';
    else if (payload.category === 'Aksesoris') window.location.href = 'accessories.html';
  } catch (err) {
    alert('Unable to add product: \n\n' + err.message);
  }
}
