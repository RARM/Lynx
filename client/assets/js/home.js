window.lynx.getAccountInfo()
.then(account => {
    document.getElementById('user-fname').innerHTML = account.fname;
});