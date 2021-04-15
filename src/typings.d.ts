interface Window {
  myAPI: myAPI;
}

interface myAPI {
  getVersion: () => Promise<string>;
}
