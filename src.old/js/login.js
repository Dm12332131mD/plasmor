"use strict";

// Events
$("#login-join").click(() => {
    if(loginCheckUsername() && loginCheckAddress()) loginStart();
});
$("#login-username").keyup(event => {
    if(event.key === "Enter" && loginCheckUsername()) loginAddressInput.focus();
});
$("#login-address").keyup(event => {
    if(event.key === "Enter" && loginCheckAddress()) loginStart();
});

// Functions
function loginCheckUsername() {
    let input = $("#login-username")[0], warning = $("#login-warning-username")[0];
    if(!input.value.trim()) warning.innerText = "Username cannot be empty!";
    else if(input.value.trim().length > 16) warning.innerText = "Username is too long!";
    else warning.innerText = "";
    input.style.borderColor = `var(--color-${warning.innerText ? "theme-light" : "background-dark"})`;
    return !warning.innerText;
};

function loginCheckAddress() {
    let input = $("#login-address")[0], warning = $("#login-warning-address")[0];
    if(!input.value.trim()) warning.innerText = "Address cannot be empty!";
    else if(!isValidAddress(input.value.trim())) warning.innerText = "Address is invalid!";
    else warning.innerText = "";
    input.style.borderColor = `var(--color-${warning.innerText ? "theme-light" : "background-dark"})`;
    return !warning.innerText;
};

function loginStart() {
    let join = $("#login-join")[0];
    join.innerText = "Joining...";
    client.emit("upstream", {
        type: "CONNECT",
        data: $("#login-address")[0].value
    });
};

function isValidAddress(address) {
    return /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?):(6553[0-5]|655[0-2]\d|65[0-4]\d\d|6[0-4]\d{4}|[1-5](\d){4}|[1-9](\d){0,3})$/.test(address);
};