const username = sessionStorage.getItem('username');
console.log(username);
const loginLi = document.getElementById('loginLi');
const registerLi = document.getElementById('registerLi');
const usernameLi = document.getElementById('usernameli');
const usernameText = document.getElementById('usernameText');

if (username.length > 0) {
    loginLi.style.display = 'none';
    registerLi.style.display = 'none';
    usernameLi.style = 'display: block;';
    usernameText.innerHTML = username;
} else {
    loginLi.style.display = 'block';
    registerLi.style.display = 'block';
    usernameLi.style = 'display: none;';
}