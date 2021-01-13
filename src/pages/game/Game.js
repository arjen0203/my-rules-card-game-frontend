import React, { Component } from 'react';
import { cardLookupTable, cardValueEnum, suitEnum } from './../../cards/CardLookupTable.js';
import './Game.scss';
import autobind from 'class-autobind';
import Socket from '../../Sockets';

export default class Game extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentCard: {suit: suitEnum.SPADES, value: cardValueEnum.TWO},
            messages: [],
            sendMessage: '',
            players: [],
            isTurn: true,
            cards: [],
            selectedIndex: null,
            pickCard: false
        }

        autobind(this);
    }

    componentDidMount() {
        Socket.on('gameState', (data) => {
            var cards = this.getFilteredCards(data.cards, data.currentCard);
            this.setState({cards, isTurn: data.isTurn, players: data.players, currentCard: data.currentCard, selectedIndex: null});
        });

        Socket.on('message', (data) => {
            var messages = this.state.messages.slice();
            messages.push(data);
            this.setState({messages});
        });

        Socket.emit('getGameState');
    }

    componentWillUnmount() {
        Socket.off('gameState');
        Socket.off('message');
    }

    handleMessageChange(event) {
        this.setState({sendMessage: event.target.value});
    }

    renderCurrentCard() {
        return cardLookupTable[this.state.currentCard.suit][this.state.currentCard.value]
    }

    renderMessages() {
        var messages = [];
        for (let i = 0; i < this.state.messages.length; i++) {
            var message;
            if (this.state.messages[i].isServerMessage) message = <div key={'smsg'+ i} className='server-message'>{this.state.messages[i].message}</div>;
            else message = <div key={'umsg'+ i} className='user-message'>{this.state.messages[i].message}</div>
            messages.push(message);
        }
        return messages;
    }

    renderTurnOrder() {
        var playerDivs = [];

        for (let i = 0; i < this.state.players.length; i++) {
            if (this.state.players[i].isTurn) playerDivs.push(
                <div key={'cpt' + i} className='current-player-div'>
                    <div className='player-name'>{this.state.players[i].name}</div>
                    <div className='player-cards'>Cards left: {this.state.players[i].cardAmount}</div>
                </div>);
            else playerDivs.push(
                <div key={'pt' + i} className='player-div'>
                    <div className='player-name'>{this.state.players[i].name}</div>
                    <div className='player-cards'>Cards left: {this.state.players[i].cardAmount}</div>
                </div>);
        }

        return playerDivs;
    }

    renderCards() {
        var cardDivs = [];

        for (let i = 0; i < this.state.cards.length; i++) {
            var cardDiv;
            if (this.state.cards[i].isSelected) cardDiv = <div key={'scrd' + i} className='selected-card-div'>{cardLookupTable[this.state.cards[i].suit][this.state.cards[i].value]}</div>;
            else cardDiv = <div key={'crd' + i} className='card-div' onClick={() => this.clickCard(i)}>{cardLookupTable[this.state.cards[i].suit][this.state.cards[i].value]}</div>;
            var greyDiv = <div></div>;
            if (!this.state.cards[i].playable) greyDiv = <div className='greyed-card'></div>;

            cardDivs.push(<div key={'ck' + i}>{cardDiv}{greyDiv}</div>);
        }

        return cardDivs;
    }

    getFilteredCards(cards, currentCard) {
        var filteredCards = [];
        var notPlayableCounter = 0;
        for(let i = 0; i < cards.length; i++) {
            var playable = this.isCardPlayable(cards[i], currentCard);
            filteredCards.push({suit: cards[i].suit, value: cards[i].value, playable})
            if (!playable) notPlayableCounter++;
        }
        if (notPlayableCounter === cards.length) this.setState({pickCard: true});
        else this.setState({pickCard: false});
        return this.sortCards(filteredCards);
    }

    isCardPlayable(card, currentCard) {
        if (currentCard.suit === suitEnum.JOKER) return true;
        if (card.suit === suitEnum.JOKER) return true;
        if (card.suit === currentCard.suit) return true;
        if (card.value === currentCard.value) return true;
        return false;
    }

    sortCards(cards) {
        cards.sort((a, b) => a.value - b.value);
		cards.sort((a, b) => a.suit - b.suit);
		cards.sort((a, b) => b.playable - a.playable);

		return cards;
	}

    sendMessage() {
        var message = this.state.sendMessage;
        if (this.state.sendMessage === '') return;
        Socket.emit("message", {message: message});
        this.setState({sendMessage: ''});
    }

    playCard() {
        if (this.state.selectedIndex === null) return;
        var card = {suit: this.state.cards[this.state.selectedIndex].suit, value: this.state.cards[this.state.selectedIndex].value};
        if (card.suit === null || card.value === null) return;

        Socket.emit('playCard', card);
    }

    pickCard() {
        Socket.emit('pickCard');
    }

    clickCard(i) {
        var cards = this.state.cards.slice();

        cards[i].isSelected = true;
        if (this.state.selectedIndex !== null) cards[this.state.selectedIndex].isSelected = false;

        this.setState({cards, selectedIndex: i});
    }

    render() {
        return (
            <div className='game-main-div'>
                <div className='current-card-box'>
                    <b className='above-card-text'>Current card on top:</b>
                    <div className='current-card'>{this.renderCurrentCard()}</div>
                </div>
                <div className='chat'>
                    <div className='messages'>{this.renderMessages()}</div>
                    <div className='send-messages'>
                        <input value={this.state.sendMessage} onChange={this.handleMessageChange} className='message-input'></input>
                        <button onClick={this.sendMessage}>Send</button>
                    </div>
                </div>
                <div className='turn-order'><div className='order-title'>Turn order</div><div className='order-players'>{this.renderTurnOrder()}</div></div>
                <div className='card-select-box'>
                    {this.state.isTurn && this.state.pickCard ? <div className='your-turn-div'><div className='turn-text'>Its your turn, but you can't play any card, so pick a card!</div><button className='play-card' onClick={this.pickCard}>Pick card</button></div> : <div></div>}
                    {this.state.isTurn && !this.state.pickCard ? <div className='your-turn-div'><div className='turn-text'>Its your turn, select and play a card!</div><button className='play-card' onClick={this.playCard}>Play card</button></div> : <div></div>}
                    {!this.state.isTurn ? <div className='cards-title'>Your cards:</div> : <div></div>}
                    <div className='cards-amount'>Card amount: {this.state.cards.length}</div>
                    <div className='all-cards'>{this.renderCards()}</div>
                </div>
            </div>
        )
    }
}
