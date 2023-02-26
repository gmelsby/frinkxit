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
const uuid_1 = require("uuid");
require("bootstrap/dist/css/bootstrap.min.css");
require("./App.css");
const react_router_dom_1 = require("react-router-dom");
const HomePage_1 = __importDefault(require("./pages/HomePage"));
const RoomPage_1 = __importDefault(require("./pages/RoomPage"));
const useSessionStorage_1 = __importDefault(require("./hooks/useSessionStorage"));
function App() {
    const [userId, setUserId] = (0, useSessionStorage_1.default)('image-app', '');
    const generateUuid = (0, react_1.useCallback)(() => {
        setUserId((0, uuid_1.v4)());
    }, [setUserId]);
    (0, react_1.useEffect)(() => {
        if (userId === '') {
            generateUuid();
        }
    }, [userId, generateUuid]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(react_router_dom_1.Switch, null,
                react_1.default.createElement(react_router_dom_1.Route, { path: "/", exact: true },
                    react_1.default.createElement(HomePage_1.default, { userId: userId })),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/room/:roomId" },
                    react_1.default.createElement(RoomPage_1.default, { userId: userId }))))));
}
exports.default = App;
