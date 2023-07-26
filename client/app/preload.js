const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'lynx',
  {
    get_user_fname: () => ipcRenderer.invoke('getfname'),
    save_user_fname: (username) => ipcRenderer.invoke('savefname', username),
    test: () => 'It is working!'
  }
)