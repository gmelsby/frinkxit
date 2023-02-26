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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const ButtonTimer_1 = __importDefault(require("../components/ButtonTimer"));
const ScoringCardHand_1 = __importDefault(require("../components/ScoringCardHand"));
const WaitingOn_1 = __importDefault(require("../components/WaitingOn"));
function Scoring({ userId, storyTeller, roomId, socket, players, storyCard, submittedCards, guesses, readyPlayers, targetScore }) {
    // scroll to top of page automatically
    (0, react_1.useEffect)(() => {
        window.scrollTo(0, 0);
    }, []);
    const handleReady = () => {
        if (!(isReady)) {
            socket.emit('endScoring', { roomId, userId });
        }
    };
    const winner = players.filter(p => p.score >= targetScore).sort((p1, p2) => p2.score - p1.score)[0];
    const isReady = readyPlayers.includes(userId);
    const waitingOn = players.filter(p => !(readyPlayers.includes(p.playerId)));
    const correctGuesses = Object.values(guesses).filter(cardId => cardId === storyCard);
    let topMessage = `Nobody guessed the storyteller's card.`;
    if (correctGuesses.length > 0 && correctGuesses.length < Object.values(guesses).length) {
        topMessage = `${players.filter(p => guesses[p.playerId] === storyCard).map(p => p.playerName).join(", ")} guessed the storyteller's card.`;
    }
    else if (correctGuesses.length === Object.values(guesses).length) {
        topMessage = `Everyone guessed the storyteller's card.`;
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_bootstrap_1.Container, { className: "text-center" },
            winner && react_1.default.createElement("h1", null,
                winner.playerName,
                " wins!"),
            react_1.default.createElement("h3", { className: "my-4" }, topMessage),
            react_1.default.createElement(ScoringCardHand_1.default, { storyTeller: storyTeller, players: players, submittedCards: submittedCards, guesses: guesses })),
        react_1.default.createElement(react_bootstrap_1.Container, { className: "my-4 text-center" },
            !(winner) && !(isReady) && react_1.default.createElement(ButtonTimer_1.default, { onClick: handleReady }, "Ready for Next Round"),
            winner && !(isReady) && react_1.default.createElement(ButtonTimer_1.default, { onClick: handleReady }, "Return to Room Lobby"),
            isReady && react_1.default.createElement(WaitingOn_1.default, { waitingOn: waitingOn }))));
}
exports.default = Scoring;
