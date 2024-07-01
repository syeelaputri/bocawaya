const productListTableBody = document.getElementById('product-list-table-body');
const productListTableFootLoadingInfo = document.getElementById('product-list-table-foot-loading-info');
const productListTableFootEmptyInfo = document.getElementById('product-list-table-foot-empty-info');



document.addEventListener('DOMContentLoaded', async () => {
  const productList = await getProductList();

  if (productList) productListTableFootLoadingInfo.style.display = 'none';

  if (productList.length === 0) {
    productListTableFootEmptyInfo.style.display = 'table-row';
    return;
  }

  productListTableBody.innerHTML = '';
  productList.forEach(product => {
    const tr = document.createElement('tr');

    const td_id = document.createElement('td');
    td_id.textContent = product.id;
    tr.appendChild(td_id);
    
    const td_name = document.createElement('td');
    td_name.textContent = product.name;
    tr.appendChild(td_name);
    
    const td_description = document.createElement('td');
    td_description.textContent = product.description;
    tr.appendChild(td_description);
    
    const td_category = document.createElement('td');
    td_category.textContent = product.category;
    tr.appendChild(td_category);
    
    const td_price = document.createElement('td');
    td_price.textContent = product.price;
    tr.appendChild(td_price);
    
    const td_image_url = document.createElement('td');
    td_image_url.textContent = product.image_url;
    tr.appendChild(td_image_url);

    const td_action = document.createElement('td');
    const td_action_edit = document.createElement('button');
    const td_action_delete = document.createElement('button');
    td_action_edit.className = 'btn btn-primary btn-sm';
    td_action_delete.className = 'btn btn-danger btn-sm';
    td_action_edit.innerHTML = '<i class="fa fa-edit"></i> Edit';
    td_action_delete.innerHTML = '<i class="fa fa-trash"></i> Delete';
    td_action_edit.addEventListener('click', () => editProduct(product));
    td_action_delete.addEventListener('click', () => deleteProduct(product));
    td_action.appendChild(td_action_edit);
    td_action.appendChild(td_action_delete);
    tr.appendChild(td_action);

    productListTableBody.appendChild(tr);
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

async function editProduct(product) {
  console.log('editProduct', product);
}

async function deleteProduct(product) {
  const result = confirm(`Are you sure you want to delete "${product.name}" product with id of "${product.id}"?`);
  
  if (result) {
    try {
      const { error } = await supabaseClient
        .from('products')
        .delete()
        .eq('id', product.id);

      if (error) throw new Error(error.message);

      location.reload();
    } catch (err) {
      alert('Unable to delete product: \n\n' + err.message);
    }
  }
}
