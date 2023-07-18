window.onload = function() {
    // Handle login form submission.
    document.getElementById('login-form').addEventListener('submit', function(e) {
      e.preventDefault();
      
      var username = document.getElementById('username').value;
      var password = document.getElementById('password').value;
      
      fetch('https://api.lynxgamestore.com/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(function(data) {
        // Store the token.
        localStorage.setItem('token', data.token);
        // Redirect to the home page.
        window.location.href = 'home.html';
      })
      .catch(function(error) {
        // Display the error message.
        console.error('There has been a problem with your fetch operation:', error);
      });
    });
  };
  