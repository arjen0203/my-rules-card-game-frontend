import React, { Component } from 'react'
import './JoinGame.scss';

export default class Joingame extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 code: '',
                 name: '',
                 errorMessage: ''
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.joinLobby = this.joinLobby.bind(this);
    }

    componentDidMount() {
        const params = new URL(window.location).searchParams;
        let code = params.get('code');
        
        this.setState({code});
    }

    joinLobby(){
        var data = {playerName: this.state.name, code: this.state.code};

        console.log(data);

        this.setState({errorMessage: 'feature not implemented yet'});
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleCodeChange(event) {
        this.setState({code: event.target.value});
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
