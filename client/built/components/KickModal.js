"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
function KickModal({ kickUserId, setKickUserId, kickPlayer, players }) {
    // Citation:
    // Modified from https://react-bootstrap.github.io/components/modal/
    // Date: 07/09/2022
    const handleCloseKick = () => {
        setKickUserId('');
    };
    const handleKickButton = () => {
        kickPlayer();
    };
    const playerName = kickUserId === '' ? '' : players.filter(p => p.playerId === kickUserId)[0].playerName;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_bootstrap_1.Modal, { show: kickUserId, onHide: handleCloseKick },
            react_1.default.createElement(react_bootstrap_1.Modal.Header, { closeButton: true },
                react_1.default.createElement(react_bootstrap_1.Modal.Title, null, "Kick Player")),
            react_1.default.createElement(react_bootstrap_1.Modal.Body, null,
                react_1.default.createElement("h5", null,
                    "Are you sure you want to kick ",
                    playerName,
                    "?"),
                react_1.default.createElement("p", null, "Player will not be able to rejoin the room from the same tab.")),
            react_1.default.createElement(react_bootstrap_1.Modal.Footer, null,
                react_1.default.createElement("div", { className: "col text-center" },
                    react_1.default.createElement(react_bootstrap_1.Button, { variant: "secondary", onClick: handleCloseKick }, "Close"),
                    react_1.default.createElement(react_bootstrap_1.Button, { variant: "danger", onClick: handleKickButton }, "Kick"))))));
}
exports.default = KickModal;
