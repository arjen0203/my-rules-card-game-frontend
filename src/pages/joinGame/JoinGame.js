import autobind from 'class-autobind';
import React, { Component } from 'react'
import Socket from './../../Sockets.js';
import './JoinGame.scss';

export default class Joingame extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 code: '',
                 name: '',
                 errorMessage: ''
        }

        autobind(this);
    }

    componentDidMount() {
        const params = new URL(window.location).searchParams;
        let code = params.get('code');
        
        if (!code) code = '';

        this.setState({code});

        Socket.on('lobbyJoined', () => {
            this.props.history.push('/lobby');
        })

        Socket.on('joinFailed', (data) => {
            this.setState({errorMessage: data.message})
        })
    }

    componentWillUnmount() {
        Socket.off('lobbyJoined');

        Socket.off('joinFailed');
    }

    joinLobby(){
        if (this.state.name.length < 3) {
            this.setState({errorMessage: 'name must be atleast 3 charachters long'})
            return;
        }

        if (this.state.name.length > 20) {
            this.setState({errorMessage: 'name can\'t be longer than 20 charachters'})
            return;
        }

        var data = {screenName: this.state.name, code: this.state.code};

        Socket.emit('joinLobby', data)
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleCodeChange(event) {
        this.setState({code: event.target.value.toUpperCase()});
    }

    render() {
        return (
            <div className='center'>
                <div className='join-game-box'>
                    <label htmlFor="name">Player name:</label>
                    <input id='name' className="player-name-input" placeholder="Player name" value={this.state.name} onChange={this.handleNameChange}></input>
                    <label htmlFor="code">Lobby code:</label>
                    <input id="code" className="lobby-code-input" placeholder='Lobby code' value={this.state.code} onChange={this.handleCodeChange}></input>
                    <b className='join-error'>{this.state.errorMessage}</b>
                    <button onClick={this.joinLobby}>Join lobby</button>
                </div>
            </div>
        )
    }
}
