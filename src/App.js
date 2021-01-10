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

class App extends React.Component {

    async componentDidMount() {
        let user = await this.getUserContext();
        this.setState({user});
    }

    async getUserContext() {
        const tokenDate = new Date(localStorage.getItem("tokenTimestamp"));
        const today = new Date();

        const GuestUser = {userId: 0, username: "Guest", getToken: function () {return null;}};

        if (tokenDate === null | localStorage.getItem("token") === null) {
            return GuestUser;
    }

    console.log(today);

    if (today.getDate() - tokenDate.getDate > 7) {
        localStorage.removeItem("tokenTimestamp");
        localStorage.removeItem("token");
        return GuestUser;
    } else {
        localStorage.setItem('tokenTimestamp', today);
        let user;
        user = await this.getUserInfo();
        if (user !== null) return user;
    }
    return GuestUser;
    }

    async getUserInfo() {
        let user;
        await fetch('https://nonograms.nl/api/user/profile', {
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
        const today = new Date();
        await localStorage.setItem("token", token);
        await localStorage.setItem("tokenTimestamp", today.toString());
        await this.setState({user: this.getUserInfo()});
    }

    async logoutUser() {
        await localStorage.removeItem("token");
        await localStorage.removeItem("tokenTimestamp")
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
                            <li><Link to={'/userGames'}>Games</Link></li>
                            <li><Link to={'/joinGame'}>Find game</Link></li>
                            <li className="login-button"><Link to={'/login'}>Login</Link></li>
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
