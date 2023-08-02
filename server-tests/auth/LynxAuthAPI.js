const HeaderUtils = require('./HeaderUtils');

const urlLynxServer = 'http://127.0.0.1:8000';

/**
 * Configuration object for creating an account.
 * @typedef {Object} NewAccConfig
 * @property {string} username
 * @property {string} fname
 * @property {string} lname
 * @property {string} email
 * @property {string} password
 * @property {string} passwordConfirm
**/

/**
 * Request response of attempting to create an account.
 * @typedef {Object} NewAccResponse
 * @property {boolean} success
 * @property {string} message
**/

/**
 * Class for handling user authentication with the Lynx server.
**/
class LynxClientAuthentication {
    constructor() {
        /**
         * The `sessionid` used in the `Cookie` header for future requests.
         * @type {string}
         * @readonly
        **/
        this.sessionid = '';

        /** 
         * Local copy of the username.
         * @type {string}
         * @readonly
        **/
        this.username = '';

        /**
         * Local copy of the user first name.
         * @type {string}
         * @readonly
        **/
        this.fname = '';

        /**
         * Local copy of the user last name.
         * @type {string}
         * @readonly
        **/
        this.lname = '';

        /**
         * Local copy of the user email.
         * @type {string}
         * @readonly
        **/
        this.email = '';
    }

    /**
     * Log in implies requesting a sessionid that will be used in subsequent
     * requests so that the server can identify the user.
     * 
     * This methods saves the user information on successful log in.
     * 
     * @param {string} username 
     * @param {string} password 
     * @returns {Promise<boolean>} Returns true on successful log in. False otherwise.
    **/
    async signin(username, password) {
        const logins = new FormData();
        logins.append('username', username);
        logins.append('password', password);
    
        const response = await fetch(urlLynxServer + '/auth/signin', {
            method: 'POST',
            body: logins
        });

        if (response.status == 201) {
            let userinfo = await response.json();
            this.username = username;
            this.fname = userinfo.first_name;
            this.lname = userinfo.last_name;
            this.email = userinfo.email;
            this.sessionid = HeaderUtils.getSessionID(response.headers);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Asks the server to dissociate the `sessionid` with the user account
     * (asks to log out). The local info is errased.
     * 
     * @returns {Promise<void>}
    **/
    async signout() {
        await fetch(urlLynxServer + '/auth/signout', {
            headers: {
                'cookie': this.sessionid
            }
        });
    }

    /**
     * Asks the server to create an account.
     * 
     * @param {NewAccConfig} config 
     * @returns {Promise<NewAccResponse>}
    **/
    static async createAccount(config) {
        const request = new FormData();
        request.append('username', config.username);
        request.append('fname', config.fname);
        request.append('lname', config.lname);
        request.append('email', config.email);
        request.append('password', config.password);
        request.append('passwordConfirm', config.passwordConfirm);

        const response = await fetch(urlLynxServer + '/auth/signup', {
            method: 'POST',
            body: request
        });

        let reqResponse = new Object();
        const respMsg = await response.json();
        if (response.status == 201) {
            reqResponse.success = true;
            reqResponse.message = respMsg.message;
        } else {
            reqResponse.success = false;
            reqResponse.message = respMsg.error;
        }

        return reqResponse;
    }

    /**
     * This function is not officially in supported (neither by the client nor
     * by the server). It is only for testing whether the server can recognize
     * a specific `sessionid`.
     * 
     * @param {string} sessionid
     * @returns {string} 
    **/
    static async askName(sessionid) {
        const response = await fetch(urlLynxServer + '/auth/getname', {
            headers: {
                'cookie': sessionid
            }
        });

        const jsonResp = await response.json();

        return jsonResp.name;
    }
}

module.exports = LynxClientAuthentication;