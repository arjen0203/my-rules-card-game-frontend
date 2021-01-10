import React, {Component} from 'react';
import './Login.scss';
import autobind from 'class-autobind';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
        }

        autobind(this);
    }

    handleNameChange(event){
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }

    login() {
        if (this.state.username === "" || this.state.password === "") {
            this.setState({loginError: "Please fill in all fields"})
            return;
        }

        var credentials = { username:this.state.username, password:this.state.password };
        fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        })
            .then((res) => {
                if(res.ok){
                    const token = res.headers.get("Authorization").replace("Bearer ","");
                    console.log(token);

                    this.props.history.push('/');
                }
                else{
                    this.setState({loginError: "Could not login, credientials are incorrect" });
                }
            }).catch(() => this.setState({loginError: "Could not communicate with server"}));
    }

    toRegiter(){
        this.props.history.push("/register");
    }

    render() {
        return (
            <div className="center">
                <div className="login-fields">
                    <b className="login-title">Login</b>

                    <label htmlFor="username">Username:</label>
                    <input id="username" className="login-username-input" type="text" placeholder="Username" value={this.state.username} onChange={this.handleNameChange}></input>

                    <label htmlFor="password">Password:</label>
                    <input id="password" className="login-username-input" type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}></input>

                    <button className="login-submit-button" onClick={this.login}>Login</button>
                    <b className="login-error">{this.state.loginError}</b>

                    <div className="to-register-link" onClick={this.toRegiter}>Don't have an account yet? Register here.</div>
                </div>
            </div>
        );
    }
}

export default Login;