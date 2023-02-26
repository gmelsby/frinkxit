"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
function Hand({ hand, setSelectedCard, gallery }) {
    const handleSelectCard = card => {
        setSelectedCard(card);
    };
    const selectable = gallery ? "" : "selectable";
    return (react_1.default.createElement(react_bootstrap_1.Row, { xs: 1, sm: 2, md: Math.min(3, hand.length), className: "justify-content-center g-2 my-3 mx-3" }, hand.map(card => react_1.default.createElement(react_bootstrap_1.Col, { key: card.cardId },
        react_1.default.createElement(react_bootstrap_1.Image, { src: card.locator, className: selectable, fluid: true, onClick: () => handleSelectCard(card) })))));
}
exports.default = Hand;
