const LynxAuthAPI = require('./LynxAuthAPI');

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

    expect(creatAccResp.success).toBe(true);
});