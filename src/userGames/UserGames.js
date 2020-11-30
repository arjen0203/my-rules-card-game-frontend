import React, { Component } from 'react'
import './UserGames.scss'

export default class Usergames extends Component {
    constructor(props) {
        super(props);

        this.state = {games: []}

        this.createNewGame = this.createNewGame.bind(this);
    }

    componentDidMount() {
        var games = [{id: 2, name: 'CardGame 1'}, {id: 5, name: 'CardGame 2'}, {id: 9, name: 'CardGame 3'}]

        this.setState({games});
    }

    removeGame(id) {
        //todo add remove function
        console.log('removed card game id: ' + id + 'in the future')
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
                    <button className='remove-button' onClick={(id) => this.removeGame(this.state.games[i].id)}>Remove</button>
                </div>
                );
        }
        
        boxes.push(<div className='create-game-box' onClick={this.createNewGame}><b>+</b></div>)

        return boxes;
    }

    render() {
        return (
            <div className='user-games'>
                {this.createGameBoxesAndButton()}
            </div>
        )
    }
}
