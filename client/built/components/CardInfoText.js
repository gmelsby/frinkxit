"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_bootstrap_1 = require("react-bootstrap");
function CardInfoText({ cardInfo }) {
    // case where we cannot load or are waiting on loading card info
    if (!(cardInfo)) {
        return (React.createElement(React.Fragment, null,
            React.createElement(react_bootstrap_1.Spinner, { animation: "border" }),
            React.createElement("p", null, "Loading Card Info...")));
    }
    // each line of subtitles gets its own line
    const SubtitleDisplay = ({ subtitles }) => {
        return (React.createElement(React.Fragment, null, subtitles.map((subtitle, idx) => React.createElement("p", { key: idx }, subtitle))));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("p", null,
            React.createElement("b", null, "Episode:"),
            " ",
            cardInfo.episode,
            ": ",
            cardInfo.title),
        React.createElement("p", null,
            React.createElement("b", null, "Subtitles:")),
        React.createElement(SubtitleDisplay, { subtitles: cardInfo.subtitles }),
        React.createElement("p", null,
            React.createElement("b", null, "Writer:"),
            " ",
            cardInfo.writer),
        React.createElement("p", null,
            React.createElement("b", null, "Director:"),
            " ",
            cardInfo.director)));
}
exports.default = CardInfoText;
