"use strict";

// Imports
const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("node:path");
const remoter = require("@electron/remote/main");

// Events
if(!app.requestSingleInstanceLock()) app.quit();
else {
    let plasmor = null;
    app.on("second-instance", () => {
        if(plasmor) {
            if(plasmor.isMinimized()) plasmor.maximize();
            plasmor.focus();
        };
    });
    app.whenReady().then(() => {
        // Variables
        plasmor = new BrowserWindow({
            autoHideMenuBar: true,
            frame: false,
            height: 600,
            icon: path.resolve(__dirname, "./src/images/icon.png"),
            minHeight: 600,
            minWidth: 1000,
            webPreferences: {
                preload: path.resolve(__dirname, "./src/js/preloader.js"),
                spellcheck: true
            },
            width: 1000
        });
        
        // Handlers
        plasmor.webContents.setWindowOpenHandler(details => {
            shell.openExternal(details.url);
            return { action: "deny" };
        });

        // Initiates
        ipcMain.on("upstream", data => {
            console.log("upstream", data);
        });
        remoter.enable(plasmor.webContents);
        remoter.initialize();
        plasmor.loadFile(path.resolve(__dirname, "./src/html/plasmor.html"));
    });
    app.on("window-all-closed", () => {
        if(process.platform !== "darwin") app.quit();
    });
};