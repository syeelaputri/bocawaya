const editProductModalCloseButton = document.getElementById('edit-product-modal-close-button');



editProductModalForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const id = form.elements['id'].value;
  const name = form.elements['name'].value;
  const description = form.elements['description'].value;
  const category = form.elements['category'].value;
  const price = form.elements['price'].value;
  const image_url = form.elements['image_url'].value;
  const product = { id, name, description, category, price, image_url };

  updateProduct(product);
});

editProductModalCloseButton.addEventListener('click', () => location.reload());



async function updateProduct(product) {
  try {
    const { error } = await supabaseClient
      .from('products')
      .update(product)
      .eq('id', product.id);

    if (error) throw new Error(error.message);

    location.reload();
  } catch (err) {
    alert('Unable to edit product: \n\n' + err.message);
  }
}