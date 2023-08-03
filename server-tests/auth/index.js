const LynxAuthAPI = require('./LynxAuthAPI');

async function main() {
    const randUser = await fetch('https://randomuser.me/api/').then(resp => resp.json());
    console.log('Requested random user. Random user name: ' + randUser.results[0].name.first + ' ' + randUser.results[0].name.last);

    const creatAccResp = await LynxAuthAPI.createAccount({
        username: randUser.results[0].login.username,
        fname: randUser.results[0].name.first,
        lname: randUser.results[0].name.last,
        email: randUser.results[0].email,
        password: randUser.results[0].login.password,
        passwordConfirm: randUser.results[0].login.password
    });

    console.log("\nResponse from the server.");
    console.log('Success: ' + creatAccResp.success);
    console.log('Message: ' + creatAccResp.message);
}

main();