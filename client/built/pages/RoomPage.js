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
const react_router_dom_1 = require("react-router-dom");
const react_bootstrap_1 = require("react-bootstrap");
const RulesModal_1 = __importDefault(require("../components/RulesModal"));
const KickModal_1 = __importDefault(require("../components/KickModal"));
const NameModal_1 = __importDefault(require("../components/NameModal"));
const LeaveRedirect_1 = __importDefault(require("../components/LeaveRedirect"));
const Scoreboard_1 = __importDefault(require("../components/Scoreboard"));
const Lobby_js_1 = __importDefault(require("./Lobby.js"));
const StoryTellerPick_js_1 = __importDefault(require("./StoryTellerPick.js"));
const OtherPlayersPick_1 = __importDefault(require("./OtherPlayersPick"));
const OtherPlayersGuess_1 = __importDefault(require("./OtherPlayersGuess"));
const Scoring_1 = __importDefault(require("./Scoring"));
const socket_io_client_1 = require("socket.io-client");
function RoomPage({ userId }) {
    const { roomId } = (0, react_router_dom_1.useParams)();
    const [isConnected, setIsConnected] = (0, react_1.useState)(false);
    const [socket, setSocket] = (0, react_1.useState)(undefined);
    const [roomState, setRoomState] = (0, react_1.useState)({
        adminId: "placeholder",
        players: [{ playerId: ' ', playerName: '' }, { playerId: userId }],
        gamePhase: "lobby",
        submittedCards: [],
        playersToSubmit: [],
        kickedPlayers: [],
        handSize: 6,
        maxPlayers: 8,
        targetScore: 25,
        playerTurn: 0,
        guesses: {},
        readyForNextRound: [],
        lastModified: 0
    });
    const [errorMessage, setErrorMessage] = (0, react_1.useState)('');
    const [kickUserId, setKickUserId] = (0, react_1.useState)('');
    const [leaveAttempt, setLeaveAttempt] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (!userId) {
            return;
        }
        const newSocket = (0, socket_io_client_1.io)('/');
        newSocket.on('connect', () => {
            setIsConnected(true);
        });
        newSocket.on('disconnect', () => {
            setIsConnected(false);
        });
        newSocket.on("receiveRoomState", data => {
            setRoomState(data);
        });
        setSocket(newSocket);
        return () => {
            newSocket.close();
        };
    }, [userId, roomId]);
    // queries for up-to-date room info
    (0, react_1.useEffect)(() => {
        if (!userId || !socket || !isConnected) {
            return;
        }
        socket.emit('joinRoom', { roomId, userId }, error => {
            if (error) {
                setErrorMessage(error);
            }
        });
    }, [socket, isConnected, roomId, userId]);
    // case where player clicked the leave button on an error screen
    if (errorMessage && leaveAttempt) {
        return (react_1.default.createElement(LeaveRedirect_1.default, { immediate: true }));
    }
    if (errorMessage) {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(react_bootstrap_1.Alert, { variant: "warning" },
                "Error: ",
                errorMessage),
            react_1.default.createElement(react_bootstrap_1.Container, { className: "text-center" },
                react_1.default.createElement(react_bootstrap_1.Button, { onClick: () => { setLeaveAttempt(true); } }, "Return to homepage"))));
    }
    // case where a user is kicked
    if (roomState.kickedPlayers.includes(userId)) {
        return (react_1.default.createElement(LeaveRedirect_1.default, { kick: true }));
    }
    // case where player has been removed form server due to leave attempt
    if (!(roomState.players.map(player => player.playerId).includes(userId)) && leaveAttempt) {
        return (react_1.default.createElement(LeaveRedirect_1.default, null));
    }
    // loading screen
    if (roomState.adminId === "placeholder") {
        return (react_1.default.createElement(react_bootstrap_1.Container, { className: "text-center my-5" },
            react_1.default.createElement(react_bootstrap_1.Spinner, { animation: "border", variant: "primary" }),
            react_1.default.createElement("h5", null, "Attempting to connect to room...")));
    }
    const isAdmin = roomState.players[0].playerId === userId ? true : false;
    const storyTeller = roomState.players[roomState.playerTurn];
    const handleLeave = () => {
        setLeaveAttempt(true);
        socket.emit('leaveRoom', { roomId, userId }, error => {
            if (error) {
                setErrorMessage(error);
            }
        });
    };
    const kickPlayer = () => {
        socket.emit('kickPlayer', { roomId, userId, kickUserId });
        setKickUserId('');
    };
    const changeName = newName => {
        socket.emit('changeName', { roomId, userId, newName });
    };
    const changeOptions = newOptions => {
        socket.emit('changeOptions', { roomId, userId, newOptions });
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        !isConnected &&
            react_1.default.createElement(react_bootstrap_1.Alert, { variant: "danger", className: "my-0" }, "Connection with server interrupted. Attempting to reconnect..."),
        react_1.default.createElement(RulesModal_1.default, null),
        react_1.default.createElement(NameModal_1.default, { currentName: roomState.players.filter(player => player.playerId === userId)[0].playerName, changeName: changeName }),
        react_1.default.createElement(KickModal_1.default, { kickUserId: kickUserId, setKickUserId: setKickUserId, kickPlayer: kickPlayer, players: roomState.players }),
        roomState.gamePhase !== "lobby" && react_1.default.createElement(Scoreboard_1.default, { players: roomState.players, userId: userId, targetScore: roomState.targetScore }),
        roomState.gamePhase === "lobby" && react_1.default.createElement(Lobby_js_1.default, { players: roomState.players, roomId: roomId, userId: userId, handleLeave: handleLeave, isAdmin: isAdmin, setKickUserId: setKickUserId, currentOptions: roomState.targetScore, changeOptions: changeOptions, socket: socket }),
        roomState.gamePhase === "storyTellerPick" && react_1.default.createElement(StoryTellerPick_js_1.default, { userId: userId, storyTeller: storyTeller, roomId: roomId, socket: socket, handSize: roomState.handSize }),
        roomState.gamePhase === "otherPlayersPick" && react_1.default.createElement(OtherPlayersPick_1.default, { userId: userId, storyTeller: storyTeller, roomId: roomId, storyDescriptor: roomState.storyDescriptor, socket: socket, players: roomState.players, submittedCards: roomState.submittedCards }),
        roomState.gamePhase === "otherPlayersGuess" && react_1.default.createElement(OtherPlayersGuess_1.default, { userId: userId, storyTeller: storyTeller, roomId: roomId, storyDescriptor: roomState.storyDescriptor, socket: socket, players: roomState.players, submittedCards: roomState.submittedCards, submittedGuesses: roomState.guesses }),
        roomState.gamePhase === "scoring" && react_1.default.createElement(Scoring_1.default, { userId: userId, storyTeller: storyTeller, roomId: roomId, socket: socket, players: roomState.players, submittedCards: roomState.submittedCards, submittedGuesses: roomState.guesses, readyPlayers: roomState.readyForNextRound, storyCard: roomState.storyCard, guesses: roomState.guesses, targetScore: roomState.targetScore })));
}
exports.default = RoomPage;
