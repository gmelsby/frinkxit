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
function OptionsModal({ currentOptions, changeOptions }) {
    const [showOptions, setShowOptions] = (0, react_1.useState)(false);
    const [newOptions, setNewOptions] = (0, react_1.useState)(currentOptions);
    const handleCloseOptions = () => setShowOptions(false);
    const handleShowOptions = () => setShowOptions(true);
    const changeOptionsToNew = e => {
        e.preventDefault();
        changeOptions(newOptions);
        handleCloseOptions();
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_bootstrap_1.Button, { variant: "warning", onClick: handleShowOptions }, "Advanced Options"),
        react_1.default.createElement(react_bootstrap_1.Modal, { show: showOptions, onHide: handleCloseOptions },
            react_1.default.createElement(react_bootstrap_1.Modal.Header, { closeButton: true },
                react_1.default.createElement(react_bootstrap_1.Modal.Title, null, "Advanced Options")),
            react_1.default.createElement(react_bootstrap_1.Modal.Body, null,
                react_1.default.createElement(react_bootstrap_1.Form, { onSubmit: changeOptionsToNew },
                    react_1.default.createElement(react_bootstrap_1.Form.Group, null,
                        react_1.default.createElement(react_bootstrap_1.Form.Label, { htmlFor: "new-target-score" }, "Target Score (Default 25, Valid range [5-100]):"),
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { className: "w-auto", type: "number", required: true, name: "new-target-score", value: newOptions, max: "100", min: "5", onChange: e => setNewOptions(e.target.value) }),
                        react_1.default.createElement(react_bootstrap_1.Button, { type: "submit" }, "Submit")))),
            react_1.default.createElement(react_bootstrap_1.Modal.Footer, null,
                react_1.default.createElement(react_bootstrap_1.Button, { variant: "secondary", onClick: handleCloseOptions }, "Close")))));
}
exports.default = OptionsModal;
