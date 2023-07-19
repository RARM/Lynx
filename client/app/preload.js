const { contextBridge, ipcRenderer } = require('electron')

/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

// Preload (Isolated World)
contextBridge.exposeInMainWorld(
  'lynx',
  {
    get_user_fname: () => ipcRenderer.invoke('getfname'),
    save_user_fname: (username) => ipcRenderer.invoke('savefname', username),
    test: () => 'It is working!'
  }
)