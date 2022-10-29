import React, { Component } from 'react';
import Axios from 'axios';
import Banner from '../Banner';
import {Link} from 'react-router-dom';

export default class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state ={
            loginEmail: '',
            loginPassword: '',
            loginSuccess: null,
        }       
    }

    setLoginEmail = (event) => {
        this.setState({
            loginEmail: event.target.value
        })
    }
    setLoginPassword = (event) => {
        this.setState({
            loginPassword: event.target.value
        })
    }

    login = () => {
        Axios({
          method: 'POST',
          data: {
            username: this.state.loginEmail,
            password: this.state.loginPassword,
          },
          withCredentials: true,
          url: 'http://localhost:3000/login',
        }).then((res) => {
            if(res.data.success){
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('username', res.data.username);
                this.setState({
                    loginSuccess: true
                })
                this.props.history.push("/");
                window.location.reload(true);
            } else {
                this.setState({
                    loginSuccess: false
                })
            }
        });
    };

    render() {
        return (
            <React.Fragment>
                <Banner pageTitle='Log In' />
                <div className="user-form-wrapper">
                    <div className="container">
                        <div className="user-form-one">
                            <h1>Login</h1>
                            <li><Link to='/Register'>New to here? Register</Link></li>
                            
                            <div className="col-lg-6 col-md-6 col-12">
                                <input placeholder="Email" onChange={this.setLoginEmail}/>
                            </div>
                            <div className="col-lg-6 col-md-6 col-12">
                                <input type="Password" placeholder="password" onChange={this.setLoginPassword}/>
                            </div>
                            {this.state.loginSuccess===false && <span className="error-msg">Log in failed</span>}
                            <div>
                                <button className="contact-submit-btn" onClick={this.login}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}