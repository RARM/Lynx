document.getElementById('login-form').addEventListener('submit', function(event) {
    // Prevent the form from being submitted normally.
    event.preventDefault();
    
    const newAccConf = {
        username: document.getElementById('username').value,
        fname: document.getElementById('fname').value,
        lname: document.getElementById('lname').value,
        email: document.getElementById('email').value,
        password: document.getElementById('pass1').value,
        passwordConfirm: document.getElementById('pass2').value
    };
    
    // Check if passwords match
    if (newAccConf.password !== newAccConf.passwordConfirm) {
        alert("Passwords do not match.");
    } else {
        window.lynx.createAccount(newAccConf)
        .then(accResp => {
            if (accResp.success) window.location.href = 'signin.html';
            else {
                let message_box = document.getElementById("msg");
                message_box.innerHTML = accResp.message;
            }
        });
    }
});
