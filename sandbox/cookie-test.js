function getSessionID(headers) {
    let sessionID = '';
    
    for (const header of headers) {
        if (
            header[0] == 'set-cookie' &&
            header[1].startsWith('sessionid')
        ) sessionID = header[1].match(/sessionid=[0-9a-z]*;/)[0].slice(0, -1);
    }

    return sessionID;
}

async function login() {
    const logins = new FormData();
    logins.append('username', 'rodolfo');
    logins.append('password', 'admin');

    fetch('http://127.0.0.1:8000/auth/signin', {
        method: 'POST',
        body: logins
    })
    .then(response => {
        response.json().then(json => console.log('Login server response: ' + json.message));
        testName(getSessionID(response.headers));
    });
}

async function testName(sessionID) {
    fetch('http://127.0.0.1:8000/auth/getname', {
        headers: {
            'cookie': sessionID
        }
    })
    .then(response => response.json())
    .then(resJSON => {
        console.log('Username according to server: ' + resJSON.name);
    });
}

login();