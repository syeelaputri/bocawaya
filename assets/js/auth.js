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
  const user = { username, email, password };
  
  const usernameExistence = await getUserUsernameExistence(user);

  if (!usernameExistence) {
    createUser(user);
    form.reset();
    return;
  }

  const fetchedUser = await getUser(user);

  if (!fetchedUser) {
    alert('Unable to sign in: \n\n' + 'Password is incorrect.');
    return;
  }
  
  signInUser(fetchedUser);
  form.reset();
});



async function getUserUsernameExistence(user) {
  try {
    const { data, error } = await supabaseClient
      .from('users')
      .select()
      .eq('username', user.username);

    if (error) throw new Error(error.message);
    
    if (data.length === 0) return false;
    return true;
  } catch (err) {
    alert('Unable to get user: \n\n' + err.message);
  }
}

async function getUser(user) {
  try {
    const { data, error } = await supabaseClient
      .from('users')
      .select()
      .eq('username', user.username)
      .eq('password', user.password);

    if (error) throw new Error(error.message);
    
    return data[0];
  } catch (err) {
    alert('Unable to get user: \n\n' + err.message);
  }
}

async function createUser(user) {
  try {
    const { error } = await supabaseClient
      .from('users')
      .insert(user);
    
    if (error) throw new Error(error.message);

    const fetchedUser = await getUser(user);
    signInUser(fetchedUser);
  } catch (err) {
    alert('Unable to create user: \n\n' + err.message);
  }
}

function signInUser(user) {
  sessionStorage.setItem('signedUser', JSON.stringify(user));
  location.reload();
}
