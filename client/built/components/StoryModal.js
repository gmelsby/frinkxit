"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const ButtonTimer_1 = __importDefault(require("./ButtonTimer"));
function StoryModal({ selectedCard, setSelectedCard, descriptor, setDescriptor, handleSubmit }) {
    const handleCloseSelect = () => {
        setSelectedCard(false);
        setDescriptor("");
    };
    const descriptionForm = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (selectedCard) {
            descriptionForm.current.focus();
        }
    }, [selectedCard]);
    return (react_1.React.createElement(react_bootstrap_1.Modal, { show: selectedCard, onHide: handleCloseSelect },
        react_1.React.createElement(react_bootstrap_1.Modal.Header, { closeButton: true },
            react_1.React.createElement(react_bootstrap_1.Modal.Title, null, "You selected this image:")),
        react_1.React.createElement(react_bootstrap_1.Modal.Body, null,
            react_1.React.createElement(react_bootstrap_1.Image, { src: selectedCard.locator, fluid: true })),
        react_1.React.createElement(react_bootstrap_1.Form, { onSubmit: e => {
                e.preventDefault();
                handleSubmit();
            } },
            react_1.React.createElement(react_bootstrap_1.Modal.Footer, null,
                react_1.React.createElement(react_bootstrap_1.Col, { xs: 8 },
                    react_1.React.createElement(react_bootstrap_1.Form.Control, { type: "text", required: true, name: "descriptor", maxLength: "45", placeholder: "Describe the image", value: descriptor, onChange: e => setDescriptor(e.target.value.trimStart()), ref: descriptionForm })),
                react_1.React.createElement(react_bootstrap_1.Col, null,
                    react_1.React.createElement(ButtonTimer_1.default, { onClick: handleSubmit, disabled: descriptor.length < 1 }, "Submit"))))));
}
exports.default = StoryModal;
