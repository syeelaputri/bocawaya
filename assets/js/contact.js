const username = document.getElementById('username');
const email = document.getElementById('email');



document.addEventListener('DOMContentLoaded', () => {
  if (signedUser) {
    username.textContent = signedUser.username;
    email.textContent = signedUser.email;
  }
});
