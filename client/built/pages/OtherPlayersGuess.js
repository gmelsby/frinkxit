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
const Hand_js_1 = __importDefault(require("../components/Hand.js"));
const OtherPlayerModal_js_1 = __importDefault(require("../components/OtherPlayerModal.js"));
const CardInfoWaiting_js_1 = __importDefault(require("../components/CardInfoWaiting.js"));
const WaitingOn_1 = __importDefault(require("../components/WaitingOn"));
function OtherPlayersGuess({ userId, storyTeller, roomId, storyDescriptor, socket, players, submittedCards, submittedGuesses }) {
    // scroll to top of page automatically
    (0, react_1.useEffect)(() => {
        window.scrollTo(0, 0);
    }, []);
    const [selectedCard, setSelectedCard] = (0, react_1.useState)(false);
    const guessedCardId = submittedGuesses[userId];
    const waitingOn = players.filter(p => !(Object.keys(submittedGuesses).includes(p.playerId)) && !Object.is(p, storyTeller));
    const [otherCards, setOtherCards] = (0, react_1.useState)([]);
    // shuffles cards on load
    (0, react_1.useEffect)(() => {
        const shuffled = submittedCards.filter(c => c.submitter !== userId);
        // citation: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setOtherCards(shuffled);
        // change dependency array when socket updates just the values that changed
        // currently each update updates every object, even when the same values
        // this causes rerenders when specifying submittedCards as a dependency
        // eslint-disable-next-line
    }, []);
    if (userId !== storyTeller.playerId) {
        const handleSubmit = () => {
            if (selectedCard) {
                socket.emit('guess', { roomId, userId, selectedCard });
            }
        };
        if (guessedCardId) {
            const guessedCard = Object.values(submittedCards).filter(c => c.cardId === guessedCardId)[0];
            return (react_1.default.createElement(CardInfoWaiting_js_1.default, { className: "my-4", use: "guess", cards: [guessedCard], storyDescriptor: storyDescriptor, waitingOn: waitingOn }));
        }
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(OtherPlayerModal_js_1.default, { use: "guess", selectedCard: selectedCard, setSelectedCard: setSelectedCard, storyDescriptor: storyDescriptor, handleSubmit: handleSubmit }),
            react_1.default.createElement(react_bootstrap_1.Container, { className: "text-center" },
                react_1.default.createElement("h3", null,
                    "The storyteller submitted the descriptor \"",
                    storyDescriptor,
                    "\""),
                react_1.default.createElement("h5", null, "Guess which card is the storyteller's!"),
                react_1.default.createElement(Hand_js_1.default, { hand: otherCards, selectedCard: selectedCard, setSelectedCard: setSelectedCard }))));
    }
    return (react_1.default.createElement(react_bootstrap_1.Container, { className: "text-center" },
        react_1.default.createElement("h3", { className: "my-4" }, "Here are all the cards that were submitted:"),
        react_1.default.createElement("h5", null, "Wait for other players to guess..."),
        react_1.default.createElement(Hand_js_1.default, { hand: Object.values(submittedCards), gallery: true }),
        react_1.default.createElement(react_bootstrap_1.Container, { className: "my-4" },
            react_1.default.createElement(WaitingOn_1.default, { waitingOn: waitingOn }))));
}
exports.default = OtherPlayersGuess;
