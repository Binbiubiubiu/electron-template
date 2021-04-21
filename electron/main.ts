import { app, BrowserWindow, ipcMain } from "electron";

import installExtension, {
  REACT_DEVELOPER_TOOLS,
  MOBX_DEVTOOLS,
} from "electron-devtools-installer";
import isDev from "electron-is-dev";
import path from "path";
import { checkUpdate } from "./auto-update";

let win: BrowserWindow;

function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      // contextIsolation: true,
      preload: path.join(app.getAppPath(), "preload.js"),
    },
  });
  // checkUpdate();
  // if (isDev) {
  //   win.loadURL("http://localhost:9000/");
  // } else {
  win.loadFile("index.html");
  // }
}

app.on("ready", () => {
  if (isDev) {
    // installExtension(REACT_DEVELOPER_TOOLS);
    // installExtension(MOBX_DEVTOOLS);
  } else {
    checkUpdate();
  }

  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("get-version", async () => "0.02");
