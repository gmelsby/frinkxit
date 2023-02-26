"use strict";
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
const react_1 = require("react");
const CardInfoText_1 = __importDefault(require("./CardInfoText"));
function CardInfoWrapper({ card }) {
    const [cardInfo, setCardInfo] = (0, react_1.useState)(false);
    const loadCardInfo = (0, react_1.useCallback)(() => __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`/cardinfo/${card.cardId}`);
        const data = yield response.json();
        setCardInfo(data);
    }), [card]);
    // only try to get card info if we don't already have it
    (0, react_1.useEffect)(() => {
        if (card && !cardInfo) {
            loadCardInfo();
        }
    }, [card, cardInfo, loadCardInfo]);
    return (React.createElement(CardInfoText_1.default, { cardInfo: cardInfo }));
}
exports.default = CardInfoWrapper;
