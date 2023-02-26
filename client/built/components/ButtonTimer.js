"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const react_2 = require("react");
/*
* Wrapper for react-bootstrap Button that activates a cooldown timer when pressed
* Default value for timeout is 6 seconds, can be modified by passing in "timer" as a prop
*/
function ButtonTimer(props) {
    // copy props and store children seperately
    const buttonProps = Object.assign({}, props);
    const children = buttonProps.children;
    delete buttonProps.children;
    // handles clearing timeout when component unmounted
    const timeoutRef = (0, react_2.useRef)(undefined);
    (0, react_2.useEffect)(() => {
        return () => clearTimeout(timeoutRef.current);
    }, []);
    const [recentlyClicked, setRecentlyClicked] = (0, react_2.useState)(false);
    // modify passed-in onClick to use a timer
    buttonProps.onClick = () => {
        setRecentlyClicked(true);
        if (props.onClick !== undefined) {
            props.onClick();
        }
        // default is 6 seconds unless props.timer is defined
        timeoutRef.current = setTimeout(() => setRecentlyClicked(false), props.timer || 6000);
    };
    // keep button disabled if props indicate, otherwise disable when recently clicked
    buttonProps.disabled = props.disabled || recentlyClicked;
    if (recentlyClicked) {
        return (react_1.default.createElement(react_bootstrap_1.Button, Object.assign({}, buttonProps),
            react_1.default.createElement(react_bootstrap_1.Spinner, { as: "span", animation: "border", size: "sm" }),
            ' ' + children));
    }
    return (react_1.default.createElement(react_bootstrap_1.Button, Object.assign({}, buttonProps), children));
}
exports.default = ButtonTimer;
