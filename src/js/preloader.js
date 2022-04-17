"use strict";

// Imports
const { getCurrentWindow } = require("@electron/remote");
const build = require("./build.json");
const os = require("node:os");

// Events
window.addEventListener("DOMContentLoaded", () => {
    // Navigator
    let [ close, maximize, maximizeIcon, minimize ] = [ "close", "maximize", "maximize-icon", "minimize" ].map(v => document.getElementById(`nav-${v}`));
    maximizeIcon.src = `../images/${getCurrentWindow().isMaximized() ? "unmaximize" : "maximize"}.png`;
    close.addEventListener("click", () => {
        close.blur();
        getCurrentWindow().close();
    });
    maximize.addEventListener("click", () => {
        maximize.blur();
        getCurrentWindow().isMaximized() ? getCurrentWindow().unmaximize() : getCurrentWindow().maximize();
    });
    minimize.addEventListener("click", () => {
        minimize.blur();
        getCurrentWindow().minimize();
    });
    getCurrentWindow().on("maximize", () => maximizeIcon.src = "../images/unmaximize.png");
    getCurrentWindow().on("unmaximize", () => maximizeIcon.src = "../images/maximize.png");

    // Build information
    let versions = {
        chrome: process.versions.chrome,
        electron: process.versions.electron,
        node: process.versions.node,
        version: build.version,
        os: {
            aix: "IBM AIX",
            android: "Android",
            darwin: "Darwin",
            freebsd: "FreeBSD",
            linux: "Linux",
            openbsd: "OpenBSD",
            sunos: "SunOS",
            win32: "Windows"
        }[os.platform()]
    };
    for(let version of [ "chrome", "electron", "node", "os", "version" ]) {
        let element = document.getElementById(`servers-${version}`);
        if(element) element.innerText = versions[version];
    };
});
window.addEventListener("unload", () => getCurrentWindow().removeAllListeners());