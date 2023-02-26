"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
function PlayerList({ players, setKickUserId, userId, isAdmin, scoreboard }) {
    // descending sort
    const playerList = scoreboard ? players.sort((p1, p2) => p2.score - p1.score) : players;
    return (react_1.default.createElement(react_bootstrap_1.Container, null, playerList.map((player) => react_1.default.createElement(PlayerEntry, { player: player, setKickUserId: setKickUserId, userId: userId, isAdmin: isAdmin, scoreboard: scoreboard, key: player.playerId }))));
}
exports.default = PlayerList;
function PlayerEntry({ player, setKickUserId, userId, isAdmin, scoreboard }) {
    const handleKickThisPlayer = () => {
        setKickUserId(player.playerId);
    };
    if (scoreboard) {
        return (react_1.default.createElement(react_bootstrap_1.Row, null,
            react_1.default.createElement(react_bootstrap_1.Col, { xs: "auto" },
                player.playerId === userId && react_1.default.createElement("p", null,
                    react_1.default.createElement("b", null, player.playerName)),
                player.playerId !== userId && react_1.default.createElement("p", null, player.playerName)),
            react_1.default.createElement(react_bootstrap_1.Col, { xs: 1 },
                react_1.default.createElement("p", null, player.score))));
    }
    return (react_1.default.createElement(react_bootstrap_1.Row, { className: "justify-content-center" },
        react_1.default.createElement(react_bootstrap_1.Col, { xs: 3 }),
        react_1.default.createElement(react_bootstrap_1.Col, { xs: "auto" },
            player.playerId === userId && react_1.default.createElement("p", null,
                react_1.default.createElement("b", null, player.playerName)),
            player.playerId !== userId && react_1.default.createElement("p", null, player.playerName)),
        react_1.default.createElement(react_bootstrap_1.Col, { xs: 3 }, isAdmin && player.playerId !== userId &&
            react_1.default.createElement(react_bootstrap_1.Button, { variant: "danger", onClick: handleKickThisPlayer }, "Kick"))));
}
