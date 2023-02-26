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
const OptionsModal_1 = __importDefault(require("../components/OptionsModal"));
const PlayerList_1 = __importDefault(require("../components/PlayerList"));
const bi_1 = require("react-icons/bi");
function Lobby({ players, roomId, userId, handleLeave, isAdmin, setKickUserId, currentOptions, changeOptions, socket }) {
    // scroll to top of page automatically
    (0, react_1.useEffect)(() => {
        window.scrollTo(0, 0);
    }, []);
    function handleStartGame() {
        socket.emit('startGame', { roomId, userId });
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        isAdmin && react_1.default.createElement(OptionsModal_1.default, { currentOptions: currentOptions, changeOptions: changeOptions }),
        react_1.default.createElement(react_bootstrap_1.Container, { align: "center" },
            react_1.default.createElement("p", null, "Share this code (or the page's url) to let players join this room!"),
            react_1.default.createElement("h1", null,
                "Room Code: ",
                roomId),
            react_1.default.createElement(NameForm, { players: players, roomId: roomId, userId: userId, socket: socket }),
            react_1.default.createElement("h3", null, "Player List"),
            react_1.default.createElement(PlayerList_1.default, { players: players, setKickUserId: setKickUserId, userId: userId, isAdmin: isAdmin }),
            react_1.default.createElement(react_bootstrap_1.Button, { onClick: handleLeave, variant: "danger" }, "Leave Room"),
            isAdmin && players.length > 2 && react_1.default.createElement(react_bootstrap_1.Button, { onClick: handleStartGame }, "Start Game"),
            isAdmin && players.length <= 2 && react_1.default.createElement(react_bootstrap_1.Button, { disabled: true }, "Start Game"),
            players.length <= 2 && react_1.default.createElement("p", null, "At least 3 players must be in the room to start a game."))));
}
exports.default = Lobby;
function NameForm({ players, roomId, userId, socket }) {
    const currentName = players.filter(player => player.playerId === userId)[0].playerName;
    const [isEditingName, setIsEditingName] = (0, react_1.useState)(false);
    const [newName, setNewName] = (0, react_1.useState)(currentName);
    const nameFormRef = (0, react_1.useRef)(null);
    const undoRef = (0, react_1.useRef)(null);
    const handleNameChange = (0, react_1.useCallback)(e => {
        e.preventDefault();
        setIsEditingName(false);
        if (newName === currentName) {
            return;
        }
        socket.emit('changeName', { roomId, userId, newName });
    }, [roomId, userId, newName, socket, currentName]);
    // automatically selects text box
    (0, react_1.useEffect)(() => {
        if (isEditingName) {
            nameFormRef.current.focus();
            nameFormRef.current.select();
        }
    }, [isEditingName]);
    // check if click outside of text box, if so cancels update
    (0, react_1.useEffect)(() => {
        const clickHandler = e => {
            if (nameFormRef.current && !nameFormRef.current.contains(e.target) && undoRef.current && !undoRef.current.contains(e.target)) {
                handleNameChange(e);
            }
        };
        document.addEventListener("mousedown", clickHandler);
        return () => {
            document.removeEventListener("mousedown", clickHandler);
        };
    }, [nameFormRef, undoRef, handleNameChange]);
    if (isEditingName) {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(react_bootstrap_1.Form, { onSubmit: handleNameChange, align: "center" },
                react_1.default.createElement(react_bootstrap_1.Row, { className: 'justify-content-center' },
                    react_1.default.createElement(react_bootstrap_1.Col, { xs: "auto" },
                        react_1.default.createElement("h5", { className: 'mx-0' }, "Your Name: ")),
                    react_1.default.createElement(react_bootstrap_1.Col, { xs: "auto" },
                        react_1.default.createElement(react_bootstrap_1.Form.Control, { className: "px-1 mx-0", type: "text", required: true, name: "new-name", maxLength: "20", placeholder: "New Name", value: newName, onChange: e => setNewName(e.target.value.trimStart()), ref: nameFormRef })),
                    react_1.default.createElement(react_bootstrap_1.Col, { xs: "auto", className: "d-none d-md-flex", ref: undoRef },
                        react_1.default.createElement("h5", null,
                            react_1.default.createElement(bi_1.BiUndo, { className: "mx-1 selectable", onClick: () => { setIsEditingName(false); } })))))));
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h4", null,
            "Your Name: ",
            currentName,
            react_1.default.createElement(bi_1.BiPencil, { className: "mx-2 selectable", onClick: () => { setIsEditingName(true); } }))));
}
