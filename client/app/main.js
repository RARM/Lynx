const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

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
  createWindow()

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