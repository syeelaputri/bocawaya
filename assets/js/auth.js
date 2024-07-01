const authForm = document.getElementById('auth-form');



authForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (signedUser) {
    alert('You\'re already signed in!');
    return;
  }

  const form = e.target;
  const username = form.elements['username'].value;
  const email = form.elements['email'].value;
  const password = form.elements['password'].value;
  const payload = { username, email, password };
  
  const usernameExistence = await getUserUsernameExistence(payload);

  if (!usernameExistence) {
    createUser(payload);
    form.reset();
    return;
  }

  const user = await getUser(payload);

  if (!user) {
    alert('Unable to sign in: \n\n' + 'Password is incorrect.');
    return;
  }
  
  signInUser(payload);
  form.reset();
});



async function getUserUsernameExistence(payload) {
  try {
    const { data, error } = await supabaseClient
      .from('users')
      .select()
      .eq('username', payload.username);

    if (error) throw new Error(error.message);
    
    if (data.length === 0) return false;
    return true;
  } catch (err) {
    alert('Unable to get user: \n\n' + err.message);
  }
}

async function getUser(payload) {
  try {
    const { data, error } = await supabaseClient
      .from('users')
      .select()
      .eq('username', payload.username)
      .eq('password', payload.password);

    if (error) throw new Error(error.message);
    
    return data[0];
  } catch (err) {
    alert('Unable to get user: \n\n' + err.message);
  }
}

async function createUser(payload) {
  try {
    const { error } = await supabaseClient
      .from('users')
      .insert(payload);
    
    if (error) throw new Error(error.message);

    signInUser(payload);
  } catch (err) {
    alert('Unable to create user: \n\n' + err.message);
  }
}

function signInUser(payload) {
  sessionStorage.setItem('signedUser', payload.username);
  location.reload();
}
