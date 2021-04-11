import { app, BrowserWindow } from 'electron';

import installExtension, {
  REACT_DEVELOPER_TOOLS,
  MOBX_DEVTOOLS,
} from 'electron-devtools-installer';
import isDev from 'electron-is-dev';
import path from 'path';

function createWindow() {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(app.getAppPath(), 'preload.js'),
    },
  });
  if (isDev) {
    // win.loadFile('index.html');
    win.loadURL('http://localhost:9000/');
  } else {
    win.loadFile('index.html');
  }
}

app.whenReady().then(() => {
  if (isDev) {
    installExtension(REACT_DEVELOPER_TOOLS);
    installExtension(MOBX_DEVTOOLS);
  }

  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length == 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
  app.quit();
  // }
});
