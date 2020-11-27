import React from 'react';
import './GlobalStyle.scss';
import Home from './home/Home';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './login/Login';

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
          <Route exact path='/register' component={Home}/>

          <Route exact path='/userGames' component={Home}/>
          <Route exact path='/userGames/create' component={Home}/>

          <Route exact path='/joinGame' component={Home}/>
          <Route exact path='/lobby' component={Home}/>
          <Route exact path='/game' component={Home}/>

          <Route exact path='/home' component={Home}/>
          <Route path='/' component={Home}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
