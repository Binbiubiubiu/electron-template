interface Window {
  myAPI: MyAPI;
}

interface MyAPI {
  getVersion: () => Promise<string>;
}

// interface NodeModule {
//   hot?: {
//     accept: (path?: string, callback?: () => void) => void;
//   };
// }
