import React from 'react';
import './GlobalStyle.scss';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import UserGames from './pages/userGames/UserGames';
import JoinGame from './pages/joinGame/JoinGame';
import Lobby from './pages/lobby/Lobby';

class App extends React.Component {



  render() {
    return (
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
          <Route exact path='/game' component={Home}/>

          <Route exact path='/home' component={Home}/>
          <Route path='/' component={Home}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
