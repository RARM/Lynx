const downButton = document.getElementById('game-download-button');
let downloaded;

downButton.addEventListener('click', () => {
    window.lynx.unzip_game()
    .then(done => {
        downButton.innerHTML = "Play";
    });
});