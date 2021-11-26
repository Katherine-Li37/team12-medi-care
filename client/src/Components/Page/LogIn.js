import React, { Component } from 'react';
import Axios from 'axios';
import Banner from '../Banner';


export default class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state ={
            registerUsername: "",
            registerPassword: "",
            loginUsername: "",
            loginPassword: "",
            data: null
        }       
    }

    register = () => {
        Axios({
          method: "POST",
          data: {
            username: this.state.registerUsername,
            password: this.state.registerPassword,
          },
          withCredentials: true,
          url: "http://localhost:3000/register",
        }).then((res) => console.log(res));
      };
    login = () => {
        Axios({
          method: "POST",
          data: {
            username: this.state.loginUsername,
            password: this.state.loginPassword,
          },
          withCredentials: true,
          url: "http://localhost:3000/login",
        }).then((res) => console.log(res));
      };
    getUser = () => {
        Axios({
          method: "GET",
          withCredentials: true,
          url: "http://localhost:3000/user",
        }).then((res) => {
            this.setState({
                data: res.data
            })
          console.log(res.data);
        });
      };

    setRegisterUsername = (event) => {
        this.setState({
            registerUsername: event.target.value
        })
    }
    setRegisterPassword = (event) => {
        this.setState({
            registerPassword: event.target.value
        })
    }
    setLoginUsername = (event) => {
        this.setState({
            loginUsername: event.target.value
        })
    }
    setLoginPassword = (event) => {
        this.setState({
            loginPassword: event.target.value
        })
    }

    render() {
        return (
            <React.Fragment>
                <Banner pageTitle='Sign Up / Log In' />
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-lg-8">
                            <div className="section-title-one">
                                <h1>Register</h1>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <input placeholder="username" onChange={this.setRegisterUsername}/>
                                    <input placeholder="password" onChange={this.setRegisterPassword}/>
                                </div>
                                <button onClick={this.register}>Submit</button>
                            </div>
                            <div className="section-title-one">
                                <h1>Login</h1>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <input placeholder="username" onChange={this.setLoginUsername}/>
                                    <input placeholder="password" onChange={this.setLoginPassword}/>
                                </div>
                                <button onClick={this.login}>Submit</button>
                            </div>
                            <div className="section-title-one">
                                <h1>Get User</h1>
                                <button onClick={this.getUser}>Submit</button>
                                {this.state.data ? <h1>Welcome Back {this.state.data.username}</h1> : null}
                            </div>
                        </div>
                    </div>    
                </div>
            </React.Fragment>
        )
    }
}