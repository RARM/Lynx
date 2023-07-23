const url = 'https://api.lynxgamestore.com/games/';

async function getGames() {
    const response = await fetch(url + 'list/', {
        method: 'GET'
    });

    return (await response.json()).gameList;
}

async function main() {
    const games = await getGames();

    console.log('Total games in the server: ' + games.length);
}

main();