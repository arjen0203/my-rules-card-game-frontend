import React, { Component } from 'react';
import { ruleLookupTable } from './RuleInfo.js';
import './Creating.scss';
import autobind from 'class-autobind';
import { cardLookupTable, cardValueTable } from './../../cards/CardLookupTable.js';
import { RESTURL } from '../../Constants';

export default class Creating extends Component {
    constructor(props) {
        super(props)

        let cardRules = [];
        for (let i = 0; i < ruleLookupTable.length; i++) {
            cardRules.push({ruleEnum: i, cards: []});
        }

        this.state = {
            cardRules: cardRules,
            pickingCardsId: null,
            error: '',
            name: ''
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

        cards.splice(id, 1);

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

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    async saveRuleSet() {
        if (this.saving) return;
        

        if (this.state.name.length < 3) {
            this.setState({error: "Name is too short"})
            return;
        }
        if (this.state.name.length > 64) {
            this.setState({error: "Name is too long"})
            return;
        }
        this.saving = true;

        let trueCardRules = [];
        for(let i = 0; i < this.state.cardRules.length; i++) {
            if (this.state.cardRules[i].cards.length > 0) {
                var newCards = [];
                for (let j = 0; j < this.state.cardRules[i].cards.length; j++) {
                    newCards.push({suitEnum: this.state.cardRules[i].cards[j].suit, suitValue: this.state.cardRules[i].cards[j].value});
                }
                var newCardRule = {ruleEnum: this.state.cardRules[i].ruleEnum, cards: newCards};
                trueCardRules.push(newCardRule);
            }
        }
        let ruleset = { name: this.state.name, cardRules: trueCardRules };

        fetch(RESTURL + '/rulesets/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' , 'Authorization': 'Bearer ' + localStorage.getItem("token")},
            body: JSON.stringify(ruleset)
        })
            .then(res => {
                if(!res.ok){
                    this.setState({ ...this.state, saveError: "Something went wrong while saving"});
                    this.saving = false;
                    return Promise.reject("Promise rejected")
                }
                res.json()
            })
            .then(data => {
                this.props.history.push("/userGames");
                this.saving = false;
            })
            .catch(this.setState({ ...this.state, registerError: "Something went wrong while saving"}));

    }

    renderCardPicker() {
        let selectedCardDivs = [];
        let unSelectedCardDivs = [];

        let selectedCards = this.state.cardRules[this.state.pickingCardsId].cards;
        let cardValueTableCopy = this.getCardValueClone();
        for (let i = 0; i < selectedCards.length; i++) {
            selectedCardDivs.push(<div key={'carp' + i} className='picked-card' onClick={() => this.unSelectCardById(i)}>{cardLookupTable[selectedCards[i].suit][selectedCards[i].value]}</div>)
            cardValueTableCopy[selectedCards[i].suit][selectedCards[i].value] = null;
        }
        for (let i = 0; i < cardValueTableCopy.length; i++) {
            for (let j = 0; j < cardValueTableCopy[i].length; j++) {
                if (cardValueTableCopy[i][j] !== null) {
                    unSelectedCardDivs.push(<div key={'cardc' + i + j} className='unpicked-card' onClick={() => this.selectCardById({suit: i, value: j})}>{cardLookupTable[i][j]}</div>)
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
                <div className='ruleset-info'>
                    <div className='ruleset-name'>Name:</div>
                    <input className="ruleset-name-input" placeholder="Name" value={this.state.name} onChange={this.handleNameChange}></input>
                    <div className='save-error'>{this.state.error}</div>
                </div>
                <div className='win-rule'>
                    <div className='win-title'>Win rule:</div>
                    <div className='win-desc'>When a player has no more cards in his hand he or she wins</div>
                </div>
                <div className='card-rules'>
                    <div className='card-rules-title'>Card rules</div>
                    <div className='card-rules-desc'>If a rule is above another rule, <br /> it means that rule will occur before the rules below it</div>
                    {this.renderCurrentRules()}
                </div>
                <div className='save-div'>
                    <button onClick={this.saveRuleSet} className='save-button'>Save</button>
                </div>
                {(this.state.pickingCardsId !== null) ? this.renderCardPicker(): <div></div>}
            </div>
        )
    }
}
