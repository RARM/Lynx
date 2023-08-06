const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
  'lynx',
  {
    // Server info.
    getServerURL: () => ipcRenderer.invoke('getServerURL'),

    // Authentication.
    createAccount: (newAccConf) => ipcRenderer.invoke('createAccount', newAccConf),
    signin: (username, password) => ipcRenderer.invoke('signin', username, password),
    getAccountInfo: () => ipcRenderer.invoke('getAccountInfo'),

    // Games API.
    getGames: () => ipcRenderer.invoke('getGames'),
    unzip_game: () => ipcRenderer.invoke('unzipGame'),
    play_game: () => ipcRenderer.invoke('playGame')
  }
)