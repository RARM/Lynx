const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
var LynxUtility = require('./classes/LynxUtility');
var exec = require('child_process').execFile;

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('app/start-pages/signin.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

let liveProgramData = {
  user: new Object(),
  sessionID: ''
}

ipcMain.handle('getfname', async (event, arg) => {
  return new  Promise(function(resolve, reject) {
    resolve(liveProgramData.user.fname);
  });
});

ipcMain.handle('savefname', async (event, name) => {
  return new  Promise(function(resolve, reject) {
    liveProgramData.user.fname = name;
    resolve(true);
  });
});

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
  const sampleGameZip = app.getAppPath() + '/sample-files/demo-game.setup.exe.zip';
  LynxUtility.unzipGame(sampleGameZip, localGamesFolder);
}

function executeDemoGame() {
  const localGamesFolder = app.getAppPath() + '/local-games/demo-game.setup.exe';
  exec(localGamesFolder);
}