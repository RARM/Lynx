const downButton = document.getElementById('game-download-button');
let downloaded = false;

downButton.addEventListener('click', () => {
    if (!downloaded) {
        window.lynx.unzip_game()
        .then(done => {
            downButton.innerHTML = "Play";
            downloaded = true;
        });
    } else {
        window.lynx.play_game();
    }
});