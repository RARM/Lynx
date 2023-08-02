/**
 * Utility class to work with request/response headers.
**/
class HeaderUtils {
    /**
     * Get the `sessionid` cookie from a response header containing a
     * `Set-Cookie` header.
     * 
     * @param {Response.headers} headers Headers from a fetch response.
     * @returns {string} String containing the `sessionid` to use in the `Cookie` header for future requests.
    **/
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
}

module.exports = HeaderUtils;