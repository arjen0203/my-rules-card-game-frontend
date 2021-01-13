import React, { Component } from 'react';
import { ruleLookupTable } from './RuleInfo.js';
import './Creating.scss';
import autobind from 'class-autobind';
import { cardLookupTable, cardValueTable } from './../../cards/CardLookupTable.js';

export default class Creating extends Component {
    constructor(props) {
        super(props)

        let cardRules = [];
        for (let i = 0; i < ruleLookupTable.length; i++) {
            cardRules.push({ruleEnum: i, cards: [{suit: 0, value: 0}]});
        }

        this.state = {
            cardRules: cardRules,
            pickingCardsId: null
        }

        autobind(this);
    }

    renderCurrentRules() {
        var rules = [];
        for (let i = 0; i < this.state.cardRules.length; i++) {
            rules.push(<div key={'rls' + i} className='rule'>
                <div className='rule-info'>
                    <div className='rule-title'>{ruleLookupTable[this.state.cardRules[i].ruleEnum].title}: </div>
                    <div className='rule-desc'>{ruleLookupTable[this.state.cardRules[i].ruleEnum].desc}</div>
                </div>
                <div className='rule-cards'>
                    <div className='cards-select'>Cards selected: {this.state.cardRules[i].cards.length} </div>
                    <button className='cards-edit' onClick={() => this.setState({pickingCardsId: i})}>Edit</button>
                </div>
            </div>)
        }
        return rules;
    }

    closeWindow(event) {
        if (event.target.className === 'click-lock-div') this.setState({pickingCardsId: null})
    }

    unSelectCardById(id) {
        let cards = this.state.cardRules[this.state.pickingCardsId].cards.slice();

        cards.pop(id);

        let cardRules = this.state.cardRules.slice();
        cardRules[this.state.pickingCardsId].cards = cards;

        this.setState({cardRules});
    }

    selectCardById(card) {
        let cards = this.state.cardRules[this.state.pickingCardsId].cards.slice();

        cards.push(card);

        let cardRules = this.state.cardRules.slice();
        cardRules[this.state.pickingCardsId].cards = cards;

        this.setState({cardRules});
    }

    getCardValueClone(){
        let clone = [[], [], [], [], []];
        for (let i = 0; i < cardValueTable.length; i++){
            for (let j = 0; j < cardValueTable[i].length; j++){
                clone[i][j] = {suit: cardValueTable[i][j].suit, value: cardValueTable[i][j].value};
            }
        }
        return clone;
    }

    renderCardPicker() {
        let selectedCardDivs = [];
        let unSelectedCardDivs = [];

        let selectedCards = this.state.cardRules[this.state.pickingCardsId].cards;
        let cardValueTableCopy = this.getCardValueClone();
        for (let i = 0; i < selectedCards.length; i++) {
            selectedCardDivs.push(<div className='picked-card' onClick={() => this.unSelectCardById(i)}>{cardLookupTable[selectedCards[i].suit][selectedCards[i].value]}</div>)
            cardValueTableCopy[selectedCards[i].suit][selectedCards[i].value] = null;
        }
        for (let i = 0; i < cardValueTableCopy.length; i++) {
            for (let j = 0; j < cardValueTableCopy[i].length; j++) {
                if (cardValueTableCopy[i][j] !== null) {
                    unSelectedCardDivs.push(<div className='unpicked-card' onClick={() => this.selectCardById({suit: i, value: j})}>{cardLookupTable[i][j]}</div>)
                }
            }
        }

        return <div className='click-lock-div' onClick={this.closeWindow}>
                    <div className='card-picker' onClick={null}>
                        <div className='selected-cards-title'>Selected cards:</div>
                            <div className='selected-cards'>
                                {selectedCardDivs}
                            </div>
                        <div className='not-selected-cards-title'>Available cards:</div>
                            <div className='unselected-cards'>
                                {unSelectedCardDivs}
                            </div>
                    </div>
            </div>
    }

    render() {
        return (
            <div className='creating-main'>
                <div className='win-rule'>
                    <div className='win-title'>Win rule:</div>
                    <div className='win-desc'>When a player has no more cards in his hand he or she wins</div>
                </div>
                <div className='card-rules'>
                    <div className='card-rules-title'>Card rules</div>
                    <div className='card-rules-desc'>If a rule is above another rule, <br /> it means that rule will occur before the rules below it</div>
                    {this.renderCurrentRules()}
                </div>
                {(this.state.pickingCardsId !== null) ? this.renderCardPicker(): <div></div>}
            </div>
        )
    }
}
