const sampleGames = require('./test-games.json');
const uploadURL = 'https://api.lynxgamestore.com/games/';

class Game {
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }

    async upload() {
        const body = new FormData();
        body.append('gname', this.title);
        body.append('gdescr', this.description);
        
        const response = await fetch(uploadURL + 'upload/', {
            method: 'POST',
            data: body
        });

        return response.ok;
    }
}

async function main() {
    let games = new Array();
    for (let i = 0; i < sampleGames.games.length; i++) {
        const title = sampleGames.games[i].title;
        const descr = sampleGames.games[i].description;
        games.push(new Game(title, descr));
    }

    let ok = true;
    for (const game of games) {
        const good = await game.upload();
        if (!good) {
            console.log('Error: There was an issue uploading ' + game.title);
            ok = false;
            break;
        }
    }

    if (ok) console.log("All games uploaded successfully");
}

main();