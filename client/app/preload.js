const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
  'lynx',
  {
    // Authentication.
    createAccount: (newAccConf) => ipcRenderer.invoke('createAccount', newAccConf),
    signin: (username, password) => ipcRenderer.invoke('signin', username, password),
    getAccountInfo: () => ipcRenderer.invoke('getAccountInfo'),

    // Games API.
    unzip_game: () => ipcRenderer.invoke('unzipGame'),
    play_game: () => ipcRenderer.invoke('playGame')
  }
)