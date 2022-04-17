"use strict";

// Paste
$(document).on("keydown", event => {
    console.log(event.key)
    if($("#app")[0].style.display !== "none") {
        // if(/^[a-zA-Z0-9`~!@#$%^&\*\(\)\-_=\+\[{\]}\\\|;:'",<\.>\/\?]$/.test(event.key)) $("#app-chat-content")[0].focus();
    };
});

$("#app-chat-content").on("paste", event => {
    event.preventDefault();
    let range = document.getSelection().getRangeAt(0);
    range.deleteContents();
    let textNode = document.createTextNode((event.originalEvent || event).clipboardData.getData("text/plain"));
    range.insertNode(textNode);
    range.selectNodeContents(textNode);
    range.collapse(false);
    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
});