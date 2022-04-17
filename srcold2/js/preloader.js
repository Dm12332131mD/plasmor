"use strict";

// Imports
const { getCurrentWindow } = require("@electron/remote");

// Events
window.addEventListener("DOMContentLoaded", () => {
    let [ close, maximize, maximizeIcon, minimize ] = [ "close", "maximize", "maximize-icon", "minimize" ].map(v => document.getElementById(`nav-${v}`));
    let nav = document.getElementsByTagName("nav")[0];
    maximizeIcon.src = `../images/${getCurrentWindow().isMaximized() ? "unmaximize" : "maximize"}.png`;
    close.addEventListener("click", () => getCurrentWindow().close());
    maximize.addEventListener("click", () => getCurrentWindow().isMaximized() ? getCurrentWindow().unmaximize() : getCurrentWindow().maximize());
    minimize.addEventListener("click", () => getCurrentWindow().minimize());
    getCurrentWindow().on("maximize", () => maximizeIcon.src = "../images/unmaximize.png");
    getCurrentWindow().on("unmaximize", () => maximizeIcon.src = "../images/maximize.png");
});
window.addEventListener("unload", () => getCurrentWindow().removeAllListeners());