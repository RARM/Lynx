document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    window.lynx.signin(username, password)
    .then(success => {
        if (success) window.location.href = '../user-pages/discover.html';
        else alert('Login unsuccessful.')
    });
});
