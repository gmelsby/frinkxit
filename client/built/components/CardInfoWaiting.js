"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const CardInfoWrapper_1 = __importDefault(require("./CardInfoWrapper"));
const WaitingOn_1 = __importDefault(require("./WaitingOn"));
function CardInfoWaiting({ use, storyDescriptor, cards, waitingOn }) {
    const use_to_message_map = {
        storyTeller: `You submitted the descriptor "${storyDescriptor}" for this image:`,
        deceive: `For the descriptor "${storyDescriptor}" you submitted this image:`,
        guess: `For the descriptor "${storyDescriptor}" you guessed this image:`
    };
    const message = use_to_message_map[use];
    return (react_1.React.createElement(react_1.React.Fragment, null,
        cards.map(card => react_1.React.createElement(react_bootstrap_1.Container, { className: "text-center", key: card.cardId },
            react_1.React.createElement("h3", { className: "my-4" }, message),
            react_1.React.createElement(react_bootstrap_1.Row, { xs: 1, md: 2 },
                react_1.React.createElement(react_bootstrap_1.Col, null,
                    react_1.React.createElement(react_bootstrap_1.Image, { src: card.locator, fluid: true })),
                react_1.React.createElement(react_bootstrap_1.Col, { className: "my-auto" },
                    react_1.React.createElement(CardInfoWrapper_1.default, { card: card }))))),
        react_1.React.createElement(react_bootstrap_1.Container, { className: "text-center my-4" },
            react_1.React.createElement(WaitingOn_1.default, { waitingOn: waitingOn }))));
}
exports.default = CardInfoWaiting;
