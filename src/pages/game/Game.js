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
            players: [{name: 'Rens', cardAmount: 12, isTurn: true}, {name: 'Freek', cardAmount: 8, isTurn: false}, {name: 'Sjaakie van de chocofabriek', cardAmount: 8, isTurn: false}],
            isTurn: true,
            cards: [{suit: suitEnum.SPADES, value: cardValueEnum.FOUR, isSelected: false}, {suit: suitEnum.HEARTHS, value: cardValueEnum.TWO, isSelected: false},
                {suit: suitEnum.DIAMONDS, value: cardValueEnum.TEN, isSelected: false}, {suit: suitEnum.HEARTHS, value: cardValueEnum.QUEEN, isSelected: false},
                {suit: suitEnum.JOKER, value: cardValueEnum.JOKER1, isSelected: false}, {suit: suitEnum.CLUBS, value: cardValueEnum.JACK, isSelected: false}],
            selectedIndex: null
        }

        autobind(this);
    }

    componentDidMount() {
        Socket.on('gameState', (data) => {
            console.log(data);
            this.setState({cards: data.cards, isTurn: data.isTurn, players: data.players, currentCard: data.currentCard});
        });

        Socket.emit('getGameState');
    }

    componentWillUnmount() {
        Socket.off('gameState');
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
            if (this.state.cards[i].isSelected) cardDivs.push(<div key={'scrd' + i} className='selected-card-div'>{cardLookupTable[this.state.cards[i].suit][this.state.cards[i].value]}</div>);
            else cardDivs.push(<div key={'crd' + i} className='card-div' onClick={() => this.clickCard(i)}>{cardLookupTable[this.state.cards[i].suit][this.state.cards[i].value]}</div>);
        }

        return cardDivs;
    }

    sendMessage() {
         var messages = this.state.messages.slice();
         messages.push({isServerMessage: false, message: '[Rens] ' + this.state.sendMessage});

         var messageBody = document.querySelector('.messages');
         this.setState({messages}, () => (messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight));
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
                    {this.state.isTurn ? <div className='your-turn-div'><div className='turn-text'>Its your turn, select and play a card!</div><button className='play-card'>Play card</button></div> : <div className='cards-title'>Your cards:</div>}
                    <div className='cards-amount'>Card amount: {this.state.cards.length}</div>
                    <div className='all-cards'>{this.renderCards()}</div>
                </div>
            </div>
        )
    }
}
