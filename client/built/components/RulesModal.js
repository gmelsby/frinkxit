"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
function RulesModal() {
    // Citation:
    // Modified from https://react-bootstrap.github.io/components/modal/
    // Date: 07/09/2022
    const [showRules, setShowRules] = (0, react_1.useState)(false);
    const handleCloseRules = () => setShowRules(false);
    const handleShowRules = () => setShowRules(true);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_bootstrap_1.Button, { onClick: handleShowRules }, "View Rules"),
        react_1.default.createElement(react_bootstrap_1.Modal, { show: showRules, onHide: handleCloseRules },
            react_1.default.createElement(react_bootstrap_1.Modal.Header, { closeButton: true },
                react_1.default.createElement(react_bootstrap_1.Modal.Title, null, "Game Rules")),
            react_1.default.createElement(react_bootstrap_1.Modal.Body, null,
                react_1.default.createElement("h5", null, "Gameplay"),
                react_1.default.createElement("p", null, "Each round, one player will be designated the storyteller. That player chooses a card and picks a word to go along with it. The storyteller wants to pick a clue word obscure enough so that not everyone picks the right card but obvious enough so that at least one player guesses the right card. Then every other player gets to pick a card from their own hand that they think could fool other players into picking their card instead of the storyteller's. Once all non-storyteller players have submitted a card, they all get to guess which submitted card is the storyteller's."),
                react_1.default.createElement("h5", null, "Scoring"),
                react_1.default.createElement("p", null, "If everybody guesses the storyteller's card, the storyteller gets 0 points and all other players get 2 points."),
                react_1.default.createElement("p", null, "If nobody guesses the storyteller's card, the storyteller gets 0 points and all other players get 2 points."),
                react_1.default.createElement("p", null, "If at least one person but not everybody guesses the storyteller's card, the storyteller and players who guesssed correctly get 3 points."),
                react_1.default.createElement("p", null, "If a non-story teller fools another player into guessing their card, they get 1 additional point per player fooled.")),
            react_1.default.createElement(react_bootstrap_1.Modal.Footer, null,
                react_1.default.createElement("div", { className: "col text-center" },
                    react_1.default.createElement(react_bootstrap_1.Button, { variant: "secondary", onClick: handleCloseRules }, "Close"))))));
}
exports.default = RulesModal;
