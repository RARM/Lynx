window.onload = function() {
    // Handle login form submission.
    document.getElementById('login-form').addEventListener('submit', function(e) {
      e.preventDefault();
      
      var username = document.getElementById('username').value;
      var password = document.getElementById('password').value;

      const data = new FormData();
      data.append('username', username);
      data.append('password', password);
      
      fetch('https://api.lynxgamestore.com/auth/signin', {
        method: 'POST',
        body: data
      })
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(function(data) {
        // Redirect to the home page.
        window.lynx.save_user_fname(data.first_name).then(val => {
          window.location.href = '../user-pages/home.html';
        })
      })
      .catch(function(error) {
        // Display the error message.
        console.error('There has been a problem with your fetch operation:', error);
      });
    });
  };
