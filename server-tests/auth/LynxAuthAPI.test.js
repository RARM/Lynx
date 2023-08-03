const LynxAuthAPI = require('./LynxAuthAPI');
const sampleUser = require('./sample-user.json');

function accountExists(actual) {
    if (actual.success == true || actual.message == 'That username already exists. Please try another one.')
        return {
            message: 'Creating or existing account.',
            pass: true
        }
    else return {
        message: "Couldn't create account and it doesn't exist.",
        pass: false
    }
}

expect.extend({
    accountExists,
});

test('Creating an account.', async () => {
    // Get random user.
    const randUser = await fetch('https://randomuser.me/api/').then(resp => resp.json());

    // Test.
    const creatAccResp = await LynxAuthAPI.createAccount({
        username: randUser.results[0].login.username,
        fname: randUser.results[0].name.first,
        lname: randUser.results[0].name.last,
        email: randUser.results[0].email,
        password: randUser.results[0].login.password,
        passwordConfirm: randUser.results[0].login.password
    });

    await expect(creatAccResp.success).toBe(true);
});

test('Sign in to account and use sessionid two times.', async () => {
    let resp = await LynxAuthAPI.createAccount({
        username: sampleUser.results[0].login.username,
        fname: sampleUser.results[0].name.first,
        lname: sampleUser.results[0].name.last,
        email: sampleUser.results[0].email,
        password: sampleUser.results[0].login.password,
        passwordConfirm: sampleUser.results[0].login.password
    });

    await expect(resp).accountExists();

    const lynxClientAuth = new LynxAuthAPI();
    
    await expect(
        lynxClientAuth.signin(sampleUser.results[0].login.username, sampleUser.results[0].login.password)
    ).resolves.toBe(true);

    const curSessionID = lynxClientAuth.sessionid;
    await expect(LynxAuthAPI.askName(curSessionID)).resolves.toBe(sampleUser.results[0].name.first);
    await expect(LynxAuthAPI.askName(curSessionID)).resolves.toBe(sampleUser.results[0].name.first); // Ask twice to ensure sessionid stays valid.

    await lynxClientAuth.signout();
    expect(lynxClientAuth.sessionid).toBe('');
});