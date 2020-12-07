import React, { Component } from 'react'
import { cardLookupTable, cardValueEnum, suitEnum } from './../../cards/CardLookupTable.js'
import './Game.scss'

export default class Game extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentCard: {suit: suitEnum.SPADES, value: cardValueEnum.TWO},
            messages: [],
            sendMessage: ''
        }

        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
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

    }

    sendMessage() {
         var messages = this.state.messages.slice();
         messages.push({isServerMessage: false, message: '[Rens] ' + this.state.sendMessage});

         var messageBody = document.querySelector('.messages');
         this.setState({messages}, () => (messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight));
    }

    pushTestServerMessage() {
        var messages = this.state.messages.slice();

        messages.push({isServerMessage: true, message: '[SERVER] THIS IS THE BIGGG serve message test'});

        var messageBody = document.querySelector('.messages');
        
        this.setState({messages}, () => (messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight));
    }

    pushTestMessage() {
        var messages = this.state.messages.slice();

        messages.push({isServerMessage: false, message: '[Rens] normal message test'});

        var messageBody = document.querySelector('.messages');
        this.setState({messages}, () => (messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight));
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
                <div className='turn-order'>{this.renderTurnOrder()}</div>
                <div className='card-select-box'></div>
            </div>
        )
    }
}
