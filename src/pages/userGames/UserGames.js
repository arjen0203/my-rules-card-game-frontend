import React, { Component } from 'react'
import './UserGames.scss'
import Socket from './../../Sockets.js';
import autobind from 'class-autobind';
import {UserContext} from "../../UserContext";

export default class Usergames extends Component {
    constructor(props) {
        super(props);

        this.state = {
            games: [], 
            hostGameId: null,
            screenName: '',
            errorMessage: ''
        }

        autobind(this);
    }

    componentDidMount() {
        var games = [{id: 16, name: 'CardGame 1'}, {id: 5, name: 'CardGame 2'}, {id: 9, name: 'CardGame 3'}]

        this.setState({games});

        Socket.on('hostSucces', () => {
            this.props.history.push('/lobby');
        });
    }

    componentWillUnmount() {
        Socket.off('hostSucces');
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
                    <button className='remove-button' onClick={() => this.setHostGameId(this.state.games[i].id)}>Host</button>
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
        if (this.state.screenName.length < 3) {
            this.setState({errorMessage: 'Name must contain atleast 3 charachters'});
            return;
        }

        if (this.state.screenName.length > 20) {
            this.setState({errorMessage: 'Name can\'t contain more then 20 charachters'});
            return;
        }

        Socket.emit('hostGame', {gameId: this.state.hostGameId, hostName: this.state.screenName})
    }

    closeWindow(event) {
        if (event.target.className === 'click-lock-div') this.setState({hostGameId: null})
    }

    render() {
        return (
            <div className='user-games'>
                {this.createGameBoxesAndButton()}
                {(this.state.hostGameId !== null) ? 
                <div className='click-lock-div' onClick={this.closeWindow}>
                    <div className='host-input-div' onClick={null}>
                        <b className='screen-name-title'>Fill in your screen name and click host:</b>
                        <input className="screen-name-input" type="text" placeholder="Screen name" value={this.state.screenName} onChange={this.handleNameChange}></input>
                        <div className='hosting-error'>{this.state.errorMessage}</div>
                        <button onClick={this.hostGame}>Host</button>
                    </div>
                </div> : 
                <div></div>
                }
                <UserContext.Consumer>
                    {({user, logoutUser, loginUser}) => {if (user.userId === 0) this.props.history.push('/')}}
                </UserContext.Consumer>
            </div>
        )
    }
}
