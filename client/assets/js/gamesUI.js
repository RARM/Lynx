async function loadPurchaseGameStore() {
    const gameId = await window.lynx.getPurchaseGame();
    const games =  await window.lynx.getGames();

    if (gameId != null) {
        const gameInfo = games.find(elem => elem.id == gameId);
        document.getElementById('game-description').innerHTML = gameInfo.description;
        document.getElementById('game-name').innerHTML = gameInfo.name;
    }
}

loadPurchaseGameStore();