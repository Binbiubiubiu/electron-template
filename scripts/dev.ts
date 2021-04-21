import * as esbulid from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";

const isDev = process.env.NODE_ENV === "develepment";

esbulid
  .build({
    entryPoints: {
      main: "electron/main.ts",
      preload: "electron/preload.ts",
    },
    bundle: true,
    platform: "node",
    format: "cjs",
    target: ["node12"],
    outdir: "app",
    loader: {
      ".ts": "ts",
    },
    watch: isDev,
    treeShaking: true,
    external: ["electron"],
    // plugins: [nodeExternalsPlugin()],
  })
  .then((result) => {
    console.log("build");
    // result.stop && result.stop();
  })
  .catch((err) => {
    console.log(err);
  });
