const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'lynx',
  {
    get_user_fname: () => ipcRenderer.invoke('getfname'),
    unzip_game: () => ipcRenderer.invoke('unzipGame'),
    play_game: () => ipcRenderer.invoke('playGame'),
    save_user_fname: (username) => ipcRenderer.invoke('savefname', username),
    test: () => 'It is working!'
  }
)