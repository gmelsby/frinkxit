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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const react_router_dom_1 = require("react-router-dom");
const RulesModal_1 = __importDefault(require("../components/RulesModal"));
const ButtonTimer_1 = __importDefault(require("../components/ButtonTimer"));
function HomePage({ userId }) {
    // scroll to top of page automatically
    (0, react_1.useEffect)(() => {
        window.scrollTo(0, 0);
    }, []);
    const [enteredRoomId, setEnteredRoomId] = (0, react_1.useState)('');
    const [roomIdSubmitted, setroomIdSubmitted] = (0, react_1.useState)(false);
    const roomCodeSubmit = e => {
        e.preventDefault();
        setroomIdSubmitted(true);
    };
    if (roomIdSubmitted) {
        return react_1.default.createElement(react_router_dom_1.Redirect, { push: true, to: `/room/${enteredRoomId}` });
    }
    // to make a new room before automatically being sent there
    const handleCreateRoom = () => __awaiter(this, void 0, void 0, function* () {
        const adminId = { userId };
        const response = yield fetch(`/room`, {
            method: 'POST',
            body: JSON.stringify(adminId),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status === 201) {
            const data = yield response.json();
            setEnteredRoomId(data.newRoomCode);
            setroomIdSubmitted(true);
        }
        else if (response.status === 403) {
            const data = yield response.json();
            alert(`Failed to create room: ${data.error}`);
        }
        else {
            alert(`Failed to create room: ${response.status}`);
        }
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(RulesModal_1.default, null),
        react_1.default.createElement(react_bootstrap_1.Container, { align: "center" },
            react_1.default.createElement("h1", null, "Simpsxit: A Simpsons Fan Game!"),
            react_1.default.createElement("h5", null, "To play, create a room or join an already existing room."),
            react_1.default.createElement(ButtonTimer_1.default, { onClick: handleCreateRoom }, "Create Room"),
            react_1.default.createElement("h5", { className: "mt-5" }, "Join Existing Room"),
            react_1.default.createElement(react_bootstrap_1.Form, { onSubmit: roomCodeSubmit },
                react_1.default.createElement(react_bootstrap_1.Form.Group, null,
                    react_1.default.createElement(react_bootstrap_1.Form.Label, { htmlFor: "input-room-code" }, "Room Code:"),
                    react_1.default.createElement(react_bootstrap_1.Form.Control, { className: "w-auto", type: "text", name: "input-room-code", required: true, size: "4", maxLength: "4", placeholder: "XYZW", pattern: "[A-Z]{4}", value: enteredRoomId, onChange: e => setEnteredRoomId(e.target.value.toUpperCase()) }),
                    react_1.default.createElement(react_bootstrap_1.Button, { type: "submit", disabled: enteredRoomId.length !== 4 }, "Join!"))))));
}
exports.default = HomePage;
