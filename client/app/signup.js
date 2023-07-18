let message_box = document.getElementById("msg");

document.getElementById('signup-form').addEventListener('submit', function(event) {
  // Prevent the form from being submitted normally.
  event.preventDefault();

  var username = document.getElementById('username').value;
  var fname = document.getElementById('fname').value;
  var lname = document.getElementById('lname').value;
  var email = document.getElementById('email').value;
  var password1 = document.getElementById('pass1').value;
  var password2 = document.getElementById('pass2').value;

  // Check if passwords match
  if (password1 !== password2) {
    alert("Passwords do not match");
    return;
  }

  var formData = new FormData();
  formData.append('username', username);
  formData.append('first_name', fname);
  formData.append('last_name', lname);
  formData.append('email', email);
  formData.append('password', password1);
  
  fetch('https://api.lynxgamestore.com/auth/signup', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(text => {
    // Signup was successful.
    message_box.innerHTML = "Signup successful, redirecting to login page...";
    window.location.href = 'login.html';
  })
  .catch(error => {
    // Display the error message.
    message_box.innerHTML = "Signup failed: " + error;
  });
});
