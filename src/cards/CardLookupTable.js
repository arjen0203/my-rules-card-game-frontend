import {ReactComponent as ReactClubs1} from './clubs/Clubs1.svg';
import {ReactComponent as ReactClubs2} from './clubs/Clubs2.svg';
import {ReactComponent as ReactClubs3} from './clubs/Clubs3.svg';
import {ReactComponent as ReactClubs4} from './clubs/Clubs4.svg';
import {ReactComponent as ReactClubs5} from './clubs/Clubs5.svg';
import {ReactComponent as ReactClubs6} from './clubs/Clubs6.svg';
import {ReactComponent as ReactClubs7} from './clubs/Clubs7.svg';
import {ReactComponent as ReactClubs8} from './clubs/Clubs8.svg';
import {ReactComponent as ReactClubs9} from './clubs/Clubs9.svg';
import {ReactComponent as ReactClubs10} from './clubs/Clubs10.svg';
import {ReactComponent as ReactClubsJack} from './clubs/ClubsJack.svg';
import {ReactComponent as ReactClubsQueen} from './clubs/ClubsQueen.svg';
import {ReactComponent as ReactClubsKing} from './clubs/ClubsKing.svg';

import {ReactComponent as ReactHearths1} from './hearths/Hearths1.svg';
import {ReactComponent as ReactHearths2} from './hearths/Hearths2.svg';
import {ReactComponent as ReactHearths3} from './hearths/Hearths3.svg';
import {ReactComponent as ReactHearths4} from './hearths/Hearths4.svg';
import {ReactComponent as ReactHearths5} from './hearths/Hearths5.svg';
import {ReactComponent as ReactHearths6} from './hearths/Hearths6.svg';
import {ReactComponent as ReactHearths7} from './hearths/Hearths7.svg';
import {ReactComponent as ReactHearths8} from './hearths/Hearths8.svg';
import {ReactComponent as ReactHearths9} from './hearths/Hearths9.svg';
import {ReactComponent as ReactHearths10} from './hearths/Hearths10.svg';
import {ReactComponent as ReactHearthsJack} from './hearths/HearthsJack.svg';
import {ReactComponent as ReactHearthsQueen} from './hearths/HearthsQueen.svg';
import {ReactComponent as ReactHearthsKing} from './hearths/HearthsKing.svg';

import {ReactComponent as ReactSpades1} from './spades/Spades1.svg';
import {ReactComponent as ReactSpades2} from './spades/Spades2.svg';
import {ReactComponent as ReactSpades3} from './spades/Spades3.svg';
import {ReactComponent as ReactSpades4} from './spades/Spades4.svg';
import {ReactComponent as ReactSpades5} from './spades/Spades5.svg';
import {ReactComponent as ReactSpades6} from './spades/Spades6.svg';
import {ReactComponent as ReactSpades7} from './spades/Spades7.svg';
import {ReactComponent as ReactSpades8} from './spades/Spades8.svg';
import {ReactComponent as ReactSpades9} from './spades/Spades9.svg';
import {ReactComponent as ReactSpades10} from './spades/Spades10.svg';
import {ReactComponent as ReactSpadesJack} from './spades/SpadesJack.svg';
import {ReactComponent as ReactSpadesQueen} from './spades/SpadesQueen.svg';
import {ReactComponent as ReactSpadesKing} from './spades/SpadesKing.svg';

import {ReactComponent as ReactDiamonds1} from './diamonds/Diamonds1.svg';
import {ReactComponent as ReactDiamonds2} from './diamonds/Diamonds2.svg';
import {ReactComponent as ReactDiamonds3} from './diamonds/Diamonds3.svg';
import {ReactComponent as ReactDiamonds4} from './diamonds/Diamonds4.svg';
import {ReactComponent as ReactDiamonds5} from './diamonds/Diamonds5.svg';
import {ReactComponent as ReactDiamonds6} from './diamonds/Diamonds6.svg';
import {ReactComponent as ReactDiamonds7} from './diamonds/Diamonds7.svg';
import {ReactComponent as ReactDiamonds8} from './diamonds/Diamonds8.svg';
import {ReactComponent as ReactDiamonds9} from './diamonds/Diamonds9.svg';
import {ReactComponent as ReactDiamonds10} from './diamonds/Diamonds10.svg';
import {ReactComponent as ReactDiamondsJack} from './diamonds/DiamondsJack.svg';
import {ReactComponent as ReactDiamondsQueen} from './diamonds/DiamondsQueen.svg';
import {ReactComponent as ReactDiamondsKing} from './diamonds/DiamondsKing.svg';

import {ReactComponent as ReactJoker1} from './jokers/Joker1.svg';
import {ReactComponent as ReactJoker2} from './jokers/Joker2.svg';

const cardLookupTable = [[<ReactClubs1/>, <ReactClubs2/>, <ReactClubs3/>, <ReactClubs4/>, <ReactClubs5/>, <ReactClubs6/>, <ReactClubs7/>, <ReactClubs8/>, <ReactClubs9/>, <ReactClubs10/>, <ReactClubsJack/>, <ReactClubsQueen/>, <ReactClubsKing/>],
                        [<ReactHearths1/>, <ReactHearths2/>, <ReactHearths3/>, <ReactHearths4/>, <ReactHearths5/>, <ReactHearths6/>, <ReactHearths7/>, <ReactHearths8/>, <ReactHearths9/>, <ReactHearths10/>, <ReactHearthsJack/>, <ReactHearthsQueen/>, <ReactHearthsKing/>],
                        [<ReactSpades1/>, <ReactSpades2/>, <ReactSpades3/>, <ReactSpades4/>, <ReactSpades5/>, <ReactSpades6/>, <ReactSpades7/>, <ReactSpades8/>, <ReactSpades9/>, <ReactSpades10/>, <ReactSpadesJack/>, <ReactSpadesQueen/>, <ReactSpadesKing/>],
                        [<ReactDiamonds1/>, <ReactDiamonds2/>, <ReactDiamonds3/>, <ReactDiamonds4/>, <ReactDiamonds5/>, <ReactDiamonds6/>, <ReactDiamonds7/>, <ReactDiamonds8/>, <ReactDiamonds9/>, <ReactDiamonds10/>, <ReactDiamondsJack/>, <ReactDiamondsQueen/>, <ReactDiamondsKing/>],
                        [<ReactJoker1/>, <ReactJoker2/>]];

const cardValueTable = [[{suit: 0, value: 0}, {suit: 0, value: 1}, {suit: 0, value: 2}, {suit: 0, value: 3}, {suit: 0, value: 4}, {suit: 0, value: 5}, {suit: 0, value: 6}, {suit: 0, value: 7}, 
                        {suit: 0, value: 8}, {suit: 0, value: 9}, {suit: 0, value: 10}, {suit: 0, value: 11}, {suit: 0, value: 12}],

                        [{suit: 1, value: 0}, {suit: 1, value: 1}, {suit: 1, value: 2}, {suit: 1, value: 3}, {suit: 1, value: 4}, {suit: 1, value: 5}, {suit: 1, value: 6}, {suit: 1, value: 7}, 
                        {suit: 1, value: 8}, {suit: 1, value: 9}, {suit: 1, value: 10}, {suit: 1, value: 11}, {suit: 1, value: 12}],

                        [{suit: 2, value: 0}, {suit: 2, value: 1}, {suit: 2, value: 2}, {suit: 2, value: 3}, {suit: 2, value: 4}, {suit: 2, value: 5}, {suit: 2, value: 6}, {suit: 2, value: 7}, 
                        {suit: 2, value: 8}, {suit: 2, value: 9}, {suit: 2, value: 10}, {suit: 2, value: 11}, {suit: 2, value: 12}],

                        [{suit: 3, value: 0}, {suit: 3, value: 1}, {suit: 3, value: 2}, {suit: 3, value: 3}, {suit: 3, value: 4}, {suit: 3, value: 5}, {suit: 3, value: 6}, {suit: 3, value: 7}, 
                        {suit: 3, value: 8}, {suit: 3, value: 9}, {suit: 3, value: 10}, {suit: 3, value: 11}, {suit: 3, value: 12}],

                        [{suit: 4, value: 0}, {suit: 4, value: 1}]];

const suitEnum = {
    CLUBS: 0,
    HEARTHS: 1,
    SPADES: 2,
    DIAMONDS: 3,
    JOKER: 4
}

const cardValueEnum = {
    ACE: 0,
    TWO: 1,
    THREE: 2,
    FOUR: 3,
    FIVE: 4,
    SIX: 5,
    SEVEN: 6,
    EIGHT: 7,
    NINE: 8,
    TEN: 9,
    JACK: 10,
    QUEEN: 11,
    KING: 12,
    JOKER1: 0,
    JOKER2: 1
}

export { cardLookupTable, suitEnum, cardValueEnum, cardValueTable };