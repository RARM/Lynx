const LynxAuthAPI = require('../app/classes/LynxAuthAPI');
const clientToServerURL = require('../app/clientConfig.json').server;

test('Client using the Lynx server.', () => {
    expect(clientToServerURL).toBe('https://api.lynxgamestore.com')
});

test('Server (' + LynxAuthAPI.serverURL + ') is up.', async () => {
    const resp = await fetch(LynxAuthAPI.serverURL);
    await expect(resp).not.toBeNull();
});