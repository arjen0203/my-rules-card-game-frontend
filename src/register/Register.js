import React, {Component} from 'react';
import './RegisterStyle.scss';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            passwordRepeat: ""
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordRepChange = this.handlePasswordRepChange.bind(this);
        this.tryRegistrating = this.tryRegistrating.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
    }

    tryRegistrating(){
        if (!this.legalInput()) return;

        let user = { username: this.state.username, password: this.state.password };

        console.log(user);

        this.setState({loginError: "Could not communicate with server"});
    }

    legalInput(){
        if (this.state.username.length === "" || this.state.password === "" || this.state.passwordRepeat === "") {
            this.setState({registerError: "Fill in all fields"})
            return false;
        }

        if (this.state.username.length < 4) {
            this.setState({registerError: "Username too short"})
            return false;
        }

        if (this.state.username.length > 32) {
            this.setState({registerError: "Username too long"})
            return false;
        }

        if (this.state.password.length < 6) {
            this.setState({registerError: "Password to short"})
            return false;
        }

        if (this.state.password.length > 64) {
            this.setState({registerError: "Password to long"})
            return false;
        }

        if (this.state.password !== this.state.passwordRepeat) {
            this.setState({registerError: "Passwords do match"})
            return false;
        }
        return true;
    }

    handleNameChange(event){
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event){
        this.setState({password: event.target.value});
    }

    handlePasswordRepChange(event){
        this.setState({passwordRepeat: event.target.value});
    }

    goToLogin(){
        this.props.history.push("/login")
    }

    render() {
        return (
            <div className="center">
                <div className="register-fields">
                    <b className="register-title">Register:</b>
                    <label htmlFor="username">Username:</label>
                    <input id="username" className="register-username-input" type="text" placeholder="Username" value={this.state.username} onChange={this.handleNameChange}></input>
                    <label htmlFor="password">Password:</label>
                    <input id="password" className="register-password-input" type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}></input>
                    <label htmlFor="passwordRep">Password repeat:</label>
                    <input id="passwordRep" className="register-password-input" type="password" placeholder="Password repeat" value={this.state.passwordRepeat} onChange={this.handlePasswordRepChange}></input>
                    <button className="register-submit-button" onClick={this.tryRegistrating}>Register</button>
                    <b className="register-error">{this.state.registerError}</b>

                    <div onClick={this.goToLogin} className="to-login-link">Already have an account? Login here.</div>
                </div>
            </div>
        );
    }
}

export default Register;