const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
var exec = require('child_process').execFile;

const LynxUtility = require('./classes/LynxUtility');
const LynxAuthAPI = require('./classes/LynxAuthAPI');
const LynxGamesAPI = require('./classes/LynxGamesAPI');
let liveProgramData = {}

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 692,
    resizable: false,
    webPreferences: {
      // devTools: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('app/start-pages/signin.html')

  mainWindow.webContents.on('did-finish-load', () => {
    const url = mainWindow.webContents.getURL();

    if (url.endsWith('signin.html') || url.endsWith('signup.html')) {
      mainWindow.setSize(1000, 692); 
    } else if (url.endsWith('discover.html') || url.endsWith('library.html') ||
               url.endsWith('purchasepage.html') || url.endsWith('launchpage.html') ||
               url.endsWith('create.html')) {
      mainWindow.setSize(1440, 892); 
    }
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  liveProgramData.lynxAuth = new LynxAuthAPI();
  liveProgramData.lynxGames;
  liveProgramData.purchaseGameID = null;
  
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// Expose server URL.
ipcMain.handle('getServerURL', async (_event) => {
  return LynxGamesAPI.serverURL;
});

// Exposed functions for authentication.
ipcMain.handle('createAccount', async (_event, newAccConf) => {
  return LynxAuthAPI.createAccount(newAccConf);
});

ipcMain.handle('signin', async (_event, username, password) => {
  return liveProgramData.lynxAuth.signin(username, password);
});

ipcMain.handle('getAccountInfo', async (_event) => {
  return new Promise(resolve => resolve({
    username: liveProgramData.lynxAuth.username,
    fname: liveProgramData.lynxAuth.fname,
    lname: liveProgramData.lynxAuth.lname,
    email: liveProgramData.lynxAuth.email
  }));
});

// Exposed functions for game management.
ipcMain.handle('setPurchaseGame', async (_event, gameid) => {
  liveProgramData.purchaseGameID = gameid;
  return;
});

ipcMain.handle('getPurchaseGame', async (_event) => {
  return liveProgramData.purchaseGameID;
});

ipcMain.handle('getGames', async (_event) => {
  return LynxGamesAPI.getAllGames();
});

ipcMain.handle('uploadGame', async (_event, newGameConf) => {
  console.log(newGameConf.gbin_info.path);
  newGameConf.gbin = new File([fs.readFileSync(newGameConf.gbin_info.path)], newGameConf.gbin_info.name);
  newGameConf.thumbnail = new File([fs.readFileSync(newGameConf.thumbnail_info.path)], newGameConf.thumbnail_info.name);
  
  return LynxGamesAPI.uploadGame(newGameConf, liveProgramData.lynxAuth.sessionid);
})

ipcMain.handle('unzipGame', async (event, arg) => {
  return new Promise(function(resolve, reject) {
    unzipGame();
    resolve(true);
  });
});

ipcMain.handle('playGame', async (event, arg) => {
  return new Promise(function(resolve, reject) {
    executeDemoGame();
  });
});

function unzipGame() {
  const localGamesFolder = app.getAppPath() + '/local-games';
  const sampleGameZip = app.getAppPath() + '/sample-files/Truck_Town.zip';
  LynxUtility.unzipGame(sampleGameZip, localGamesFolder);
}

function executeDemoGame() {
  const localGamesFolder = app.getAppPath() + '/local-games/TruckTown.exe';
  exec(localGamesFolder);
}