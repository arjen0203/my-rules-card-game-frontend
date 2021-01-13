import React from 'react';
import './GlobalStyle.scss';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import UserGames from './pages/userGames/UserGames';
import JoinGame from './pages/joinGame/JoinGame';
import Lobby from './pages/lobby/Lobby';
import Game from './pages/game/Game';
import { UserContext } from './UserContext';
import autobind from 'class-autobind';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {userId: 0, username: "Guest", getToken: function () {return null;}}
        }

        autobind(this);
    }

    async componentDidMount() {
        let user = await this.getUserContext();
        this.setState({user});
    }

    async getUserContext() {
        const GuestUser = {userId: 0, username: "Guest", getToken: function () {return null;}};

        if (localStorage.getItem("token") === null) {
            return GuestUser;
        }

        let user;
        user = await this.getUserInfo();
        if (user !== null && user !== undefined) return user;
        

        localStorage.removeItem("token");
        return GuestUser;
    }

    async getUserInfo() {
        let user;
        await fetch('http://localhost:8080/api/user/profile', {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token")}
        })
            .then(res => {
                if (!res.ok) throw new Error(res.text());
                return res.json();
            })
            .then(data => {
                user = {userId: data.id, username: data.username, getToken: function () {return localStorage.getItem("token")}};
            }).catch(error => {
            console.error('Could not get user', error);
            return null;
        });
        return user;
    }

    async loginUser(token) {
        await localStorage.setItem("token", token);
        await this.setState({user: this.getUserInfo()});
    }

    async logoutUser() {
        await localStorage.removeItem("token");
        let user = await this.getUserContext();
        this.setState( {user});
    }

    render() {
        const value = {
            user: this.state.user,
            logoutUser: this.logoutUser,
            loginUser: this.loginUser
        }

        return (
            <UserContext.Provider value={value}>
                <Router className="router">
                    <nav>
                        <ul className="router-list">
                            <li><Link to={'/home'}>Home</Link></li>
                             {this.state.user.userId !== 0 ? (<li><Link to={'/userGames'}>Games</Link></li>) : <div></div>}
                            <li><Link to={'/joinGame'}>Find game</Link></li>
                            {this.state.user.userId !== 0 ? (<li className="login-button"><div className="logout-button" onClick={this.logoutUser}>Logout</div></li>) : <li className="login-button"><Link to={'/login'}>Login</Link></li>}
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/register' component={Register}/>

                        <Route exact path='/userGames' component={UserGames}/>
                        <Route exact path='/userGames/create' component={Home}/>

                        <Route exact path='/joinGame' component={JoinGame}/>
                        <Route exact path='/lobby' component={Lobby}/>
                        <Route exact path='/game' component={Game}/>

                        <Route exact path='/home' component={Home}/>
                        <Route path='/' component={Home}/>
                    </Switch>
                </Router>
            </UserContext.Provider>
        )
    }
}

export default App;
