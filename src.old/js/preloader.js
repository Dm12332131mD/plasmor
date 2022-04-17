"use strict";

// Imports
const { getCurrentWindow } = require("@electron/remote");

// Events
window.addEventListener("DOMContentLoaded", () => {
    let [ close, maximize, minimize ] = [ "close", "maximize", "minimize" ].map(v => document.getElementById(`title-${v}`));
    let maximizeIcon = maximize.firstChild;
    maximizeIcon.setAttribute("src", `../images/${getCurrentWindow().isMaximized() ? "unmaximize" : "maximize"}.png`);
    close.addEventListener("click", () => getCurrentWindow().close());
    maximize.addEventListener("click", () => getCurrentWindow().isMaximized() ? getCurrentWindow().unmaximize() : getCurrentWindow().maximize());
    minimize.addEventListener("click", () => getCurrentWindow().minimize());
    getCurrentWindow().on("maximize", () => maximizeIcon.setAttribute("src", "../images/unmaximize.png"));
    getCurrentWindow().on("unmaximize", () => maximizeIcon.setAttribute("src", "../images/maximize.png"));
});
window.addEventListener("unload", () => getCurrentWindow().removeAllListeners());