"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_bootstrap_1 = require("react-bootstrap");
const ScoringCard_1 = __importDefault(require("./ScoringCard"));
const react_1 = __importDefault(require("react"));
function ScoringCardHand({ storyTeller, players, submittedCards, guesses }) {
    // returns list of player names that guessed the card
    const playersWhoGuessed = cardId => {
        return players.filter(p => guesses[p.playerId] === cardId);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_bootstrap_1.Row, { xs: 1, md: Math.min(3, Object.values(submittedCards).length), className: "g-2 mx-5 my-3 d-none d-md-flex justify-content-center" }, submittedCards.map(c => react_1.default.createElement(ScoringCard_1.default, { key: c.cardId, player: players.filter(p => p.playerId === c.submitter)[0], card: c, guessedPlayers: playersWhoGuessed(c.cardId), isStoryTeller: c.submitter === storyTeller.playerId }))),
        react_1.default.createElement(react_bootstrap_1.Carousel, { className: "d-xs-flex d-md-none", interval: null, variant: "dark" }, submittedCards.map(c => react_1.default.createElement(react_bootstrap_1.Carousel.Item, { key: c.cardId },
            react_1.default.createElement(react_bootstrap_1.Row, { className: "mx-5" },
                react_1.default.createElement(ScoringCard_1.default, { player: players.filter(p => p.playerId === c.submitter)[0], card: c, guessedPlayers: playersWhoGuessed(c.cardId), isStoryTeller: c.submitter === storyTeller.playerId })))))));
}
exports.default = ScoringCardHand;
