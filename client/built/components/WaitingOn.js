"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function WaitingOn({ waitingOn }) {
    return (React.createElement("h5", null,
        "Waiting on ",
        waitingOn.map(p => p.playerName).join(", ")));
}
exports.default = WaitingOn;
