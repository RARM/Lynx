window.lynx.get_user_fname()
.then(name => {
    document.getElementById('user-fname').innerHTML = name;
});