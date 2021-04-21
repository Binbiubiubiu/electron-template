import { contextBridge, ipcRenderer } from "electron";

window.addEventListener("DOMContentLoaded", () => {
  // window.localStorage.setItem('version2', JSON.stringify(process.versions));
  // console.log(window.localStorage);
  // msg.innerHTML = JSON.stringify(process.versions);
  // console.log(process.versions);
  console.log("5645");
  console.log(ipcRenderer);
  ipcRenderer.on("message", function (event, text) {
    const container = document.getElementById("messages");
    const message = document.createElement("div");
    message.innerHTML = text;
    console.log(event, text);
    container?.appendChild(message);
  });
});

contextBridge.exposeInMainWorld("myAPI", {
  getVersion: async () => await ipcRenderer.invoke("get-version"),
});
