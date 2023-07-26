const fs = require('fs');
const unzipper = require('unzipper');

module.exports = class LynxUtility {
    static hello() {
        console.log('Hello world!');
    }

    static getSessionID(headers) {
        let sessionID = '';
        
        for (const header of headers) {
            if (
                header[0] == 'set-cookie' &&
                header[1].startsWith('sessionid')
            ) sessionID = header[1].match(/sessionid=[0-9a-z]*;/)[0].slice(0, -1);
        }

        return sessionID;
    }

    static unzipGame(gamepath, localpath) {
        fs.createReadStream(gamepath)
        .pipe(unzipper.Extract({ path: localpath }));
    }
}