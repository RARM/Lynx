const LynxGamesAPI = require('../app/classes/LynxGamesAPI');
const LynxAuthAPI = require('../app/classes/LynxAuthAPI');
const fs = require('fs');

test('Create account, log in, and upload a game.', async () => {
    // Get random user.
    const randUser = await fetch('https://randomuser.me/api/').then(resp => resp.json());

    const accountInfo = {
        username: randUser.results[0].login.username,
        fname: randUser.results[0].name.first,
        lname: randUser.results[0].name.last,
        email: randUser.results[0].email,
        password: randUser.results[0].login.password,
        passwordConfirm: randUser.results[0].login.password
    }

    const creatAccResp = await LynxAuthAPI.createAccount(accountInfo);
    await expect(creatAccResp.success).toBe(true);

    let LynxAuth = new LynxAuthAPI();
    signed_in = await LynxAuth.signin(accountInfo.username, accountInfo.password);
    await expect(signed_in).toBeTruthy();

    const newGameConf = {
        name: 'Demo Game',
        description: 'This is a sample game.',
        exepath: '/demo-game.setup.exe.zip',
        gbin: fs.readFileSync(require.resolve('../sample-files/demo-game.setup.exe.zip')),
        thumbnail: fs.readFileSync(require.resolve('../sample-files/demo-thumb.png'))
    }

    const gUploaded = await LynxGamesAPI.uploadGame(newGameConf, LynxAuth.sessionid);
    await expect(gUploaded).toBeTruthy();

    const serverGames = await LynxGamesAPI.getAllGames();
    const gameFound = serverGames.find((game) => game.name == newGameConf.name);
    expect(gameFound).toBeDefined();
}, 30_000);