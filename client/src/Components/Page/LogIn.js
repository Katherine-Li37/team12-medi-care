import React, { Component } from 'react';
import Axios from 'axios';
import Banner from '../Banner';
import validator from 'validator';

export default class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state ={
            typing: false,
            typingTimeout: 0,
            
                registerUsername: "",
                ifUserNameExist: false,
                registerPassword: "",
                ifStrongPassword: true,
                registerRepeatPassword: "",
                ifPasswordMatch: true,
                registerEmail:"",
                ifEmailFormat:true,
                registerSuccess: null,

                loginUsername: "",
                loginPassword: "",
                loginSuccess: null,

            data: null,

        }       
    }



    register = () => {
        Axios({
          method: "POST",
          data: {
            username: this.state.registerUsername,
            password: this.state.registerPassword,
            email: this.state.registerEmail,
          },
          withCredentials: true,
          url: "http://localhost:3000/register",
        }).then((res) => {
            if(res.data==="User Created"){
                this.setState({
                    registerSuccess: true
                })
            }
        });
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
        }).then((res) => {
            if(res.data.success){
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('username', res.data.username);
                this.setState({
                    loginSuccess: true
                })
                window.location.reload(false);
            }else {
                this.setState({
                    loginSuccess: false
                })
            }
        });
    };

    setRegisterUsername = (event) => {
        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
         }
     
         this.setState({
            registerUsername: event.target.value,
            typing: false,
            typingTimeout: setTimeout(() => {
                this.checkIfUsernameExists();
            }, 1000)
         });
    }

    checkIfUsernameExists = () => {
        // console.log(this.state.registerUsername);
        fetch('http://localhost:3000/users/register/' + this.state.registerUsername)
          .then(res => res.json())
          .then((data) => {
            if (data.length!==0){
                this.setState({ifUserNameExist: true});
            } else {
                this.setState({ifUserNameExist: false});
            }
          })
          .catch(console.log)
    }

    setRegisterPassword = (event) => {
        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
         }
     
         this.setState({
            registerPassword: event.target.value,
            typing: false,
            typingTimeout: setTimeout(() => {
                this.checkPasswordStrength();
            }, 1000)
         });
    }

    checkPasswordStrength = () => {
        if (validator.isStrongPassword(this.state.registerPassword, {
              minLength: 8, minLowercase: 1,
              minUppercase: 1, minNumbers: 1, minSymbols: 1
            })) {
              this.setState({ifStrongPassword:true});
            } else {
              this.setState({ifStrongPassword:false});
            }
    }

    setRegisterRepeatPassword = (event) => {
        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
         }
     
         this.setState({
            registerRepeatPassword: event.target.value,
            typing: false,
            typingTimeout: setTimeout(() => {
                this.checkIfPasswordMatch();
            }, 1000)
         });
    }

    checkIfPasswordMatch=()=>{
        if(this.state.registerPassword === this.state.registerRepeatPassword){
            this.setState({ifPasswordMatch: true })
        } else{
            this.setState({ifPasswordMatch: false })
        }
    }

    setRegisterEmail=(event)=>{
        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
         }
     
         this.setState({
            registerEmail: event.target.value,
            typing: false,
            typingTimeout: setTimeout(() => {
                this.checkIfEmailFormat();
            }, 1000)
         });
    }

    checkIfEmailFormat =()=>{
        if (validator.isEmail(this.state.registerEmail)) {
            this.setState({ifEmailFormat:true});
          } else {
            this.setState({ifEmailFormat:false});
          }
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
        // console.log(this.state);
        return (
            <React.Fragment>
                <Banner pageTitle='Sign Up / Log In' />
                <div className="user-form-wrapper">
                    <div className="container">
                        <div className="user-form-one">
                            <h1>Register</h1>
                            <div className="col-lg-6 col-md-6 col-12">
                                <input placeholder="username" onChange={this.setRegisterUsername}/>
                            </div>  
                            {this.state.ifUserNameExist && <span className="error-msg">Username exists</span>}  
                            <div className="col-lg-6 col-md-6 col-12">
                                <input placeholder="password" onChange={this.setRegisterPassword}/>
                            </div>
                            {!this.state.ifStrongPassword && <span className="error-msg">Password need to be with minimum length 8, containing at least 1 lowercase, 1 uppercase, 1 number and 1 symbol</span>}  
                            <div className="col-lg-6 col-md-6 col-12">
                                <input placeholder="confirm password" onChange={this.setRegisterRepeatPassword}/>
                            </div>  
                            {!this.state.ifPasswordMatch && <span className="error-msg">Password not match</span>}
                            <div className="col-lg-6 col-md-6 col-12">
                                <input placeholder="email" onChange={this.setRegisterEmail}/>
                            </div>  
                            {!this.state.ifEmailFormat && <span className="error-msg">Not valid email</span>}

                            {(this.state.registerUsername.length && !this.state.ifUserNameExist 
                            && this.state.registerPassword.length && this.state.ifStrongPassword
                            && this.state.registerRepeatPassword.length && this.state.ifPasswordMatch
                            && this.state.registerEmail.length && this.state.ifEmailFormat) &&
                                <button className="contact-submit-btn" onClick={this.register}>Submit</button>
                            }   
                            {(!this.state.registerUsername.length || this.state.ifUserNameExist 
                            || !this.state.registerPassword.length || !this.state.ifStrongPassword
                            || !this.state.registerRepeatPassword.length || !this.state.ifPasswordMatch
                            || !this.state.registerEmail.length || !this.state.ifEmailFormat )&&
                                <button onClick={this.register} disabled={true}>Submit</button>
                            }   
                            {this.state.registerSuccess===true && <span className="error-msg">New User created</span>}
                            
                        </div>
                    
                        <div className="user-form-one">
                            <h1>Login</h1>
                            <div className="col-lg-6 col-md-6 col-12">
                                <input placeholder="username" onChange={this.setLoginUsername}/>
                            </div>
                            <div className="col-lg-6 col-md-6 col-12">
                                <input placeholder="password" onChange={this.setLoginPassword}/>
                            </div>
                            {this.state.loginSuccess===false && <span className="error-msg">Log in failed</span>}
                            <button className="contact-submit-btn" onClick={this.login}>Submit</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}