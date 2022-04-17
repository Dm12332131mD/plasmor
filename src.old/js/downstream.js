"use strict";

// Variables
let client = io("http://localhost:17778");

// Events
client.on("downstream", data => {
    switch(data?.type) {
        case "STREAM_CONNECT": {
            console.log(`Established connection between upstream!`);
            break;
        };
        case "STREAM_DISCONNECT": {
            console.log("Disconnected from upstream!");
            break;
        };
        default: {
            console.log(`Unknown data type received! Got "${data.type}"`);
            break;
        };
    };
});