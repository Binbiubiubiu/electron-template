import { Notification, dialog, BrowserWindow } from "electron";

import log, { ElectronLog } from "electron-log";
import { autoUpdater } from "electron-updater";
import isDev from "electron-is-dev";

autoUpdater.logger = log;
autoUpdater.autoDownload = false;
(autoUpdater.logger as ElectronLog).transports.file.level = "info";
log.info("App starting...");

// autoUpdater.setFeedURL('http://localhost:3000/autoUpdate');
autoUpdater.on("checking-for-update", () => {
  console.log("Checking for update...");
});
autoUpdater.on("update-available", (info) => {
  console.log("Update available.", info);
  const n = new Notification({
    title: "升级提醒",
    body: "监测到有新版本是否升级？",
    actions: [
      { text: "升级", type: "button" },
      { text: "取消", type: "button" },
    ],
  });
  n.show();
  n.on("action", (event, index) => {
    if (!index) {
      autoUpdater.downloadUpdate();
    }
  });
  n.on("click", () => {
    if (process.platform != "darwin") {
      autoUpdater.downloadUpdate();
    }
  });
});
autoUpdater.on("update-not-available", (info) => {
  console.log("Update not available.", info);
});
autoUpdater.on("error", (err) => {
  console.log("Error in auto-updater. " + err);
});
autoUpdater.on("download-progress", (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + " - Downloaded " + progressObj.percent + "%";
  log_message =
    log_message +
    " (" +
    progressObj.transferred +
    "/" +
    progressObj.total +
    ")";
  console.log(log_message);
});
autoUpdater.on("update-downloaded", (info) => {
  const result = dialog.showMessageBoxSync(BrowserWindow.getFocusedWindow()!, {
    title: "下载完成",
    message: "是否重启安装更新？",
    buttons: ["重启", "取消"],
  });
  if (!result) {
    autoUpdater.quitAndInstall();
  }
});

export function checkUpdate() {
  autoUpdater.checkForUpdates();
}
