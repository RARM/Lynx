const sampleGames = require('./test-games.json');
// const uploadURL = 'https://api.lynxgamestore.com/games/';
const uploadURL = 'http://127.0.0.1:8000/games/upload';

const fs = require('fs');
const fsp = require('fs/promises');
const mt = require('mime-types');

class Game {
    constructor(gameData) {
        this.title = gameData.title;
        this.description = gameData.description;
        this.pathToFile = gameData.file;
        this.desired_filename = gameData.filename;
    }

    async upload() {
        const gameFile = new Blob([await fsp.readFile(this.pathToFile)], {type: mt.lookup(this.pathToFile)});

        const body = new FormData();
        body.append('name', this.title);
        body.append('description', this.description);
        body.append('gbin', gameFile, this.desired_filename);
        
        const response = await fetch(uploadURL, {
            method: 'POST',
            body: body
        });

        return response;
    }
}

function consoleLogForm(form) {
    for (const pair of form.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }
}

async function main() {
    let games = new Array();
    for (let i = 0; i < sampleGames.games.length; i++) {
        games.push(new Game(sampleGames.games[i]));
    }

    let ok = true;
    for (const game of games) {
        const resp = await game.upload();
        if (!resp.ok) {
            console.log('Error: There was an issue uploading "' + game.title + '"');
            console.log('Error (' + resp.status + ') message: ' + resp.statusText);
            resp.json().then(data => console.log(data));
            ok = false;
            break;
        }
    }

    if (ok) console.log("All games uploaded successfully");
}

main();