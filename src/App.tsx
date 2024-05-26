import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

const MOCK = {
  "@electron-forge/cli": "^7.4.0",
  "@electron-forge/maker-deb": "^7.4.0",
  "@electron-forge/maker-rpm": "^7.4.0",
  "@electron-forge/maker-squirrel": "^7.4.0",
  "@electron-forge/maker-zip": "^7.4.0",
  "@electron-forge/plugin-auto-unpack-natives": "^7.4.0",
  "@electron-forge/plugin-fuses": "^7.4.0",
  "@electron-forge/plugin-webpack": "^7.4.0",
  "@electron/fuses": "^1.8.0",
  "@types/react": "^18.3.1",
  "@types/react-dom": "^18.3.0",
  "@typescript-eslint/eslint-plugin": "^5.62.0",
  "@typescript-eslint/parser": "^5.62.0",
  "@vercel/webpack-asset-relocator-loader": "^1.7.3",
  autoprefixer: "^10.4.19",
  "css-loader": "^6.11.0",
  electron: "30.0.1",
  "electron-squirrel-startup": "^1.0.0",
  eslint: "^8.57.0",
  "eslint-plugin-import": "^2.29.1",
  "fork-ts-checker-webpack-plugin": "^7.3.0",
  "node-loader": "^2.0.0",
  postcss: "^8.4.38",
  "postcss-loader": "^8.1.1",
  "style-loader": "^3.3.4",
  tailwindcss: "^3.4.3",
  "ts-loader": "^9.5.1",
  "ts-node": "^10.9.2",
  typescript: "~4.5.4",
};

root.render(
  <React.StrictMode>
    <div className="w-full h-full bg-slate-900 text-gray-50 p-4">
      <div className="flex flex-col gap-2">
        <div>Dependencies</div>

        {Object.entries(MOCK).map(([key, value]) => (
          <div
            key={key}
            className="flex flex-col justify-center p-4 gap-2 even:bg-slate-800/25 rounded odd:bg-slate-800"
          >
            <div className="flex flex-row items-center">
              <div className="flex flex-row gap-2 items-center">
                <h1 className="text-lg font-medium">{key}</h1>
                <span className="text-sm text-slate-500 italic">{`Current version: ${value}`}</span>
              </div>
              <div className="flex flex-row ml-auto gap-2 text-xs">
                <span>NPM</span>
                <span>Github</span>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <button className="rounded-md bg-green-600 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                Satisfies 1.0.0
              </button>
              <button className="rounded-md bg-violet-600 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">
                Update to latest
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </React.StrictMode>
);
