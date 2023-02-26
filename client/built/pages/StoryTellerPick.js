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
const StoryModal_js_1 = __importDefault(require("../components/StoryModal.js"));
function StoryTellerPick({ userId, storyTeller, roomId, socket, handSize }) {
    // scroll to top of page automatically
    (0, react_1.useEffect)(() => {
        window.scrollTo(0, 0);
    }, []);
    const [selectedCard, setSelectedCard] = (0, react_1.useState)(false);
    const [descriptor, setDescriptor] = (0, react_1.useState)("");
    if (storyTeller.hand.length < handSize) {
        return (react_1.default.createElement(react_bootstrap_1.Container, { className: "text-center" },
            react_1.default.createElement(react_bootstrap_1.Spinner, { className: "mx-auto mt-5", animation: "border", variant: "primary" }),
            react_1.default.createElement("h5", null, "Generating cards...")));
    }
    if (userId === storyTeller.playerId) {
        const handleSubmit = () => {
            if (selectedCard) {
                socket.emit('submitStoryCard', { roomId, userId, selectedCard, descriptor });
            }
        };
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(StoryModal_js_1.default, { selectedCard: selectedCard, setSelectedCard: setSelectedCard, descriptor: descriptor, setDescriptor: setDescriptor, handleSubmit: handleSubmit }),
            react_1.default.createElement(react_bootstrap_1.Container, { className: "text-center" },
                react_1.default.createElement("h3", null, "You are the storyteller! Pick an image and come up with a description."),
                react_1.default.createElement(Hand_js_1.default, { hand: storyTeller.hand, setSelectedCard: setSelectedCard }))));
    }
    return (react_1.default.createElement(react_bootstrap_1.Container, { className: "text-center" },
        react_1.default.createElement("h3", { className: "mt-2" },
            storyTeller.playerName,
            " is the Storyteller. Wait for them to pick a card...")));
}
exports.default = StoryTellerPick;
