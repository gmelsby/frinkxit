"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_bootstrap_1 = require("react-bootstrap");
const CardInfoWrapper_1 = __importDefault(require("./CardInfoWrapper"));
function ScoringCard({ player, card, guessedPlayers, isStoryTeller }) {
    const GuessedInfo = () => {
        return (React.createElement(React.Fragment, null, guessedPlayers.map(p => (React.createElement("p", { key: p.playerId },
            React.createElement("b", null, p.playerName))))));
    };
    return (React.createElement(react_bootstrap_1.Col, null,
        React.createElement(react_bootstrap_1.Card, null,
            React.createElement(react_bootstrap_1.Card.Img, { variant: "top", src: card.locator }),
            React.createElement(react_bootstrap_1.Accordion, null,
                React.createElement(react_bootstrap_1.Accordion.Item, { eventKey: "0" },
                    React.createElement(react_bootstrap_1.Accordion.Header, null, "Card Info"),
                    React.createElement(react_bootstrap_1.Accordion.Body, null,
                        React.createElement(CardInfoWrapper_1.default, { card: card })))),
            React.createElement(react_bootstrap_1.Card.Body, null,
                React.createElement(react_bootstrap_1.Card.Title, null,
                    "Submitted by ",
                    isStoryTeller && "Storyteller ",
                    !isStoryTeller && player.playerName),
                React.createElement(react_bootstrap_1.ListGroup, { variant: "flush" },
                    React.createElement(react_bootstrap_1.ListGroupItem, null,
                        React.createElement("p", null,
                            "Guessed by ",
                            guessedPlayers.length,
                            " Players"),
                        guessedPlayers.length !== 0 && React.createElement(GuessedInfo, null)),
                    React.createElement(react_bootstrap_1.ListGroupItem, null,
                        React.createElement("p", null,
                            player.playerName,
                            " earned ",
                            player.scoredThisRound,
                            " points."),
                        React.createElement("p", null,
                            player.playerName,
                            " now has ",
                            player.score,
                            " points.")))))));
}
exports.default = ScoringCard;
