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
function NameModal({ currentName, changeName }) {
    // Citation:
    // Modified from https://react-bootstrap.github.io/components/modal/
    // Date: 07/09/2022
    const [showName, setShowName] = (0, react_1.useState)(false);
    const [newName, setNewName] = (0, react_1.useState)(currentName);
    // enables automatic focus on form when modal pops up
    const nameForm = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (showName) {
            nameForm.current.focus();
        }
    }, [showName]);
    const handleCloseName = () => setShowName(false);
    const handleShowName = () => setShowName(true);
    const changeNameToNew = e => {
        e.preventDefault();
        changeName(newName);
        handleCloseName();
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_bootstrap_1.Button, { onClick: handleShowName }, "Change Name"),
        react_1.default.createElement(react_bootstrap_1.Modal, { show: showName, onHide: handleCloseName },
            react_1.default.createElement(react_bootstrap_1.Modal.Header, { closeButton: true },
                react_1.default.createElement(react_bootstrap_1.Modal.Title, null, "Change Name")),
            react_1.default.createElement(react_bootstrap_1.Modal.Body, null,
                react_1.default.createElement(react_bootstrap_1.Form, { onSubmit: changeNameToNew },
                    react_1.default.createElement(react_bootstrap_1.Form.Group, null,
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { className: "w-auto", type: "text", required: true, name: "new-name", maxLength: "20", placeholder: "New Name", value: newName, onChange: e => setNewName(e.target.value.trimStart()), ref: nameForm }),
                        react_1.default.createElement(react_bootstrap_1.Button, { type: "submit" }, "Submit")))),
            react_1.default.createElement(react_bootstrap_1.Modal.Footer, null))));
}
exports.default = NameModal;
