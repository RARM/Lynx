const fs = require('fs');

const urlLynxServer = 'http://127.0.0.1:8000'; // FIXME: Change to Lynx server for release.

/**
 * Configuration object for new game.
 * @typedef {Object} NewGameConf
 * @property {string} name        Name of the game (as shown in the store).
 * @property {string} description Brief description of the game.
 * @property {string} exepath     Path to executable within the zip file.
 * @property {File}   gbin        Zip file containing the game.
 * @property {File}   thumbnail   Thumbnail of the game (as shown in the store).
**/

/**
 * Manage games in the client. This API includes functions to request data to
 * the server as well as to manage data in the local installation.
**/
class LynxGamesAPI {
    static serverURL = urlLynxServer;

    /**
     * Constructs an instance of the game management module for handling local
     * installed games and configuration.
     * 
     * @param {string} configFile 
     * @param {string} username 
     * @param {string} installPath 
    **/
    constructor(configFile, username, installPath) {
        // Code here...
    }
    
    async downloadGame(gameId) {
        // Code here...
    }
    
    /**
     * Upload a new game to the store. If the upload was successful, the object
     * returns true. It returns false otherwise (if any issue occurs).
     * 
     * @param   {NewGameConf} newGameConf Configuration object for the new game.
     * @param   {string}      sessionid   Cookie for user authentication.
     * @returns {boolean}
    **/
    static async uploadGame(newGameConf, sessionid) {
        const data = new FormData();
        data.append('name', newGameConf.name);
        data.append('description', newGameConf.description);
        data.append('exepath', newGameConf.exepath);
        data.append('gbin', newGameConf.gbin);
        data.append('thumbnail', newGameConf.thumbnail);
        
        const resp = await fetch(urlLynxServer + '/games/upload', {
            method: 'POST',
            body: data,
            headers: {
                'cookie': sessionid
            }
        });

        return resp.status == 201;
    }

    /**
     * Get a list of all the games (only info, not files).
     * 
     * @returns {Promise<Array>}
    **/
    static async getAllGames() {
        const gamesResp = await fetch(urlLynxServer + '/games/list');
        return await gamesResp.json();
    }
}

module.exports = LynxGamesAPI;