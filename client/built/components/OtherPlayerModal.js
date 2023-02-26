"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_bootstrap_1 = require("react-bootstrap");
const ButtonTimer_1 = __importDefault(require("../components/ButtonTimer"));
function OtherPlayerModal({ use, selectedCard, setSelectedCard, storyDescriptor, handleSubmit }) {
    const handleCloseSelect = () => {
        setSelectedCard(false);
    };
    const submitCard = () => {
        handleSubmit();
    };
    return (React.createElement(react_bootstrap_1.Modal, { show: selectedCard, onHide: handleCloseSelect },
        React.createElement(react_bootstrap_1.Modal.Header, { closeButton: true },
            use === "deceive" &&
                React.createElement(react_bootstrap_1.Modal.Title, null,
                    "Do you want to submit this card for the phrase \"",
                    storyDescriptor,
                    "\"?"),
            use === "guess" &&
                React.createElement(react_bootstrap_1.Modal.Title, null,
                    "Do you want to guess this card for the phrase \"",
                    storyDescriptor,
                    "\"?")),
        React.createElement(react_bootstrap_1.Modal.Body, null,
            React.createElement(react_bootstrap_1.Image, { src: selectedCard.locator, fluid: true })),
        React.createElement(react_bootstrap_1.Modal.Footer, null,
            React.createElement(react_bootstrap_1.Stack, { direction: "horizontal", gap: 3 },
                React.createElement(react_bootstrap_1.Button, { variant: "secondary", onClick: handleCloseSelect }, "Close"),
                React.createElement(ButtonTimer_1.default, { onClick: submitCard }, "Submit")))));
}
exports.default = OtherPlayerModal;
