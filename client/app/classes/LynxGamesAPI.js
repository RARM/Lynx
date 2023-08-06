const fs = require('fs');
const urlLynxServer = require('../clientConfig.json').server;

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
     * installed games and configurations.
     * 
     * @param {string} configFile  Path to the config file.
     * @param {string} username    The logged in user name (must match config).
    **/
    constructor(configFile, username) {
        this.configFilePath = configFile;
        this.systemData;

        let newAccount = false;
        try {
            this.systemData = JSON.parse(fs.readFileSync(configFile));
        } catch (error) {
            if (error.code === 'ENOENT') {
                this.systemData = new Object();
                this.systemData.username = username;
                this.systemData.games = new Array();
                
                newAccount = true;
            } else {
                throw error;
            }
        } finally {
            if (this.systemData.username != username || newAccount) {
                fs.writeFileSync(configFile, JSON.stringify(this.systemData));
            }
        }
    }
    
    async downloadGame(gameId, execpath) {
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