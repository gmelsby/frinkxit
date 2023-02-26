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
const CardInfoWaiting_js_1 = __importDefault(require("../components/CardInfoWaiting.js"));
const Hand_js_1 = __importDefault(require("../components/Hand.js"));
const OtherPlayerModal_js_1 = __importDefault(require("../components/OtherPlayerModal.js"));
function OtherPlayersPick({ userId, storyTeller, roomId, storyDescriptor, socket, players, submittedCards }) {
    const [selectedCard, setSelectedCard] = (0, react_1.useState)(false);
    const user = players.find(p => p.playerId === userId);
    // resets selected card if a card has been submitted
    // scrolls to top on page load
    (0, react_1.useEffect)(() => {
        window.scrollTo(0, 0);
        setSelectedCard(false);
    }, [user.hand.length]);
    const playerSubmittedCards = submittedCards.filter(c => c.submitter === userId);
    const expectedCards = players.length === 3 ? 2 : 1;
    const waitingOn = players.filter(p => p.playerId !== storyTeller.playerId && submittedCards.filter(c => c.submitter === p.playerId).length < expectedCards);
    // executes if storyteller 
    if (storyTeller.playerId === userId) {
        return (react_1.default.createElement(CardInfoWaiting_js_1.default, { use: "storyTeller", cards: playerSubmittedCards, storyDescriptor: storyDescriptor, waitingOn: waitingOn }));
    }
    // or player who has submitted a fake card
    if (playerSubmittedCards.length === expectedCards) {
        return (react_1.default.createElement(CardInfoWaiting_js_1.default, { use: "deceive", cards: playerSubmittedCards, storyDescriptor: storyDescriptor, waitingOn: waitingOn }));
    }
    const handleSubmit = () => {
        if (selectedCard) {
            socket.emit('submitOtherCard', { roomId, userId, selectedCard });
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(OtherPlayerModal_js_1.default, { use: "deceive", selectedCard: selectedCard, setSelectedCard: setSelectedCard, storyDescriptor: storyDescriptor, handleSubmit: handleSubmit }),
        react_1.default.createElement(react_bootstrap_1.Container, { className: "text-center" },
            react_1.default.createElement("h3", null,
                "The storyteller submitted the descriptor \"",
                storyDescriptor,
                "\""),
            react_1.default.createElement("h5", null, "Pick a card from your hand to fool the other players!"),
            react_1.default.createElement(Hand_js_1.default, { hand: user.hand, setSelectedCard: setSelectedCard }))));
}
exports.default = OtherPlayersPick;
