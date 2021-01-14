import React, { Component } from 'react'
import Socket from '../../Sockets';
import './Lobby.scss';
import autobind from 'class-autobind';
import { REACTURL } from '../../Constants';

export default class Lobby extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 players: [],
                 code: '',
                 isHost: false
        }

        autobind(this);
    }

    componentDidMount() {
        Socket.on('lobbyData', (data) => {
            this.setState({players: data.players, code: data.code, isHost: data.isHost});
        });

        Socket.on('lobbyEnded', () => {
            this.props.history.push('/');
            console.log('yes?');
        });

        Socket.on('kicked', () => {
            this.props.history.push('/');
        });

        Socket.on('gameStarted', () => {
            this.props.history.push('/game');
        })

        Socket.emit('getLobby');
    }

    componentWillUnmount() {
        Socket.off('lobbyData');
        Socket.off('lobbyEnded');
        Socket.off('kicked');
        Socket.off('gameStarted');
    }

    quickLInkToClipboard() {
        navigator.clipboard.writeText(REACTURL + '/joinGame?code=' + this.state.code);
    }

    kickPlayer(id) {
        Socket.emit('kickPlayer', {uuid: id});
    }

    addBot() {
        //change to adding bot in socket

        var players = this.state.players.slice();

        players.push({id: 69, name: 'BOT'})

        this.setState({players});
    }

    startGame() {
        Socket.emit('startGame');
    }

    renderPlayers() {
        var playerDivs = [];
        
        for (let i = 0; i < this.state.players.length; i++) {
            if (this.state.isHost) playerDivs.push(<div key={'LP' + i} className='player-box-host' onClick={() => this.kickPlayer(this.state.players[i].uuid)}>{this.state.players[i].name}</div>);
            else playerDivs.push(<div key={'LP' + i} className='player-box'>{this.state.players[i].name}</div>)
        }

        return playerDivs;
    }

    render() {
        return (
            <div className='center'>
                <div className='lobby-info-box'>
                    <b className='lobby-title'>Lobby</b>
                    <div className='lobby-info-text'>Use the following code to join a lobby:</div>
                    <div className='lobby-code'>{this.state.code}</div>
                    <div className='lobby-copy-link' onClick={this.quickLInkToClipboard}>Click here to copy a quick join link to the clipboard</div>
                </div>

                <div className='lobby-players-box'>
                    <b className='player-amount'>Players in lobby {this.state.players.length}/12</b>
                    <div className='players-container'>
                        {this.renderPlayers()}
                    </div>
                    {/* {this.state.players.length < 12 && this.state.isHost ? <button className='add-bot-button' onClick={this.addBot}>Add bot</button> : <div></div> } */}
                    {this.state.isHost ? <div className='kick-text'>Click on a player or bot to kick them</div> : <div></div> }
                    {this.state.isHost && this.state.players.length > 1 ? <button className='start-button' onClick={this.startGame}>Start</button> : <div></div>}
                </div>
            </div>
        )
    }
}
