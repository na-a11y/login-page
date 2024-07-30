document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // For simplicity, assume the login is always successful.
    // You might want to add actual authentication logic here.
    if (username && password) {
        sessionStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'index.html';
    }
});
