"use strict";

// Server selection
$(".servers-server").on("click", event => {
    let target = event.currentTarget, selected = $("#servers-selected");
    if(target === selected[0]) return;
    selected.removeAttr("id");
    target.setAttribute("id", "servers-selected");
    target.classList.remove("servers-notification");
    target.blur();
});

// Chat box
$("#messages-content-box").on("click", () => {
    $("#messages-content-text").focus();
});