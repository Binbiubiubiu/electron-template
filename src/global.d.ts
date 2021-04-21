interface Window {
  myAPI: MyAPI;
}

interface MyAPI {
  getVersion: () => Promise<string>;
}
