import React, { Component } from 'react'
import './UserGames.scss'

export default class Usergames extends Component {
    constructor(props) {
        super(props);

        this.state = {
            games: [], 
            hostGameId: null,
            screenName: ''
        }

        this.createNewGame = this.createNewGame.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.closeWindow = this.closeWindow.bind(this);
    }

    componentDidMount() {
        var games = [{id: 2, name: 'CardGame 1'}, {id: 5, name: 'CardGame 2'}, {id: 9, name: 'CardGame 3'}]

        this.setState({games});
    }

    removeGame(id) {
        //todo add remove function
        console.log('removed card game id: ' + id + ' in the future')
    }

    setHostGameId(id) {
        this.setState({hostGameId: id});
    }

    createNewGame() {
        this.props.history.push('/userGames/create');
    }

    createGameBoxesAndButton(){
        var boxes = [];

        for (let i = 0; i < this.state.games.length; i++) {
            boxes.push(
                <div key={'gb' + i} className='game-box'>
                    <b className='game-name'>{this.state.games[i].name}</b>
                    <button className='remove-button' onClick={() => this.hostGame(this.state.games[i].id)}>Host</button>
                    <button className='remove-button' onClick={() => this.removeGame(this.state.games[i].id)}>Remove</button>
                </div>
                );
        }
        
        boxes.push(<div key='crBox' className='create-game-box' onClick={this.createNewGame}><b>+</b></div>)

        return boxes;
    }

    handleNameChange(event){
        this.setState({screenName: event.target.value});
    }

    hostGame(){
        //todo start sockets and stuff
    }

    closeWindow(event) {
        if (event.target.className === 'click-lock-div') this.setState({hostGameId: null})
    }

    render() {
        return (
            <div className='user-games'>
                {this.createGameBoxesAndButton()}
                {(this.state.hostGameId !== null) ? <div className='click-lock-div' onClick={this.closeWindow}><div className='host-input-div' onClick={null}><b className='screen-name-title'>Fill in your screen name and click host:</b><input className="screen-name-input" type="text" placeholder="Screen name" value={this.state.screenName} onChange={this.handleNameChange}></input><button>Host</button></div></div> : <div></div>}
            </div>
        )
    }
}
