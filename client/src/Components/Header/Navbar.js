import React, { Component } from 'react'
import {Link} from 'react-router-dom';


export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state ={
            userID: null,
            username: null,
            userLoggedIn: null
        }       
    }
    async componentDidMount(){
        const user = sessionStorage.getItem('username').split(',');
        const userID = user[1];
        const response = await fetch('http://localhost:3000/users/'+ userID)
        const data = await response.json();
        this.setState({
            userID: userID,
            username: user[0],
            userLoggedIn: data
        });
    }

    // getUser() {
    //     const user = sessionStorage.getItem('username').split(',');

    //     this.setState({
    //         userID: user[1],
    //         username: user[0]
    //     });
    // }

    render() {
        
        return (
            <header className="header-one">
                <div className="main-menu">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-3 col-lg-2 d-flex col-5">
                                <Link className="navbar-brand logo" to='/'>
                                    <img src={require("../../assets/img/logo.png") } alt="donto" />
                                </Link>
                            </div>
                            <div className="col-lg-10 col-md-9 d-none d-lg-block text-lg-right">
                                <nav id="responsive-menu" className="menu-style-one">
                                    <ul className="menu-items">
                                        <li><Link to='/'>home</Link></li>
                                        <li><Link to='/About'>about</Link></li>
                                        <li><Link to='/ServiceDetails'>Services</Link></li>
                                        <li><Link to='/Doctors'>Doctors</Link></li>
                                        <li><Link to='/Contact'>Contact</Link></li>
                                        {!this.state.username && <li><Link to='/LogIn'>Sign up/ Log in</Link></li>}
                                        {this.state.username && 
                                            <Link to={{
                                                pathname: `/Profile/${this.state.userID}`,
                                                state: { user: this.state.userLoggedIn }
                                            }}>{this.state.username}
                                            </Link>}
                                        {/* <li><Link to='/Admin'>Admin</Link></li> */}
                                    </ul>
                                </nav>
                            </div>
                            <div className="col-md-9 col-sm-7  col-6 d-block d-lg-none">
                                <nav className="navbar navbar-expand-lg text-right navbar-light mobile-nav">
                                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobilenav">
                                        <span className="fal fa-bars" />
                                    </button>
                                </nav>
                            </div>
                            <div className="collapse navbar-collapse mobile-menu" id="mobilenav">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active">
                                        <Link className="nav-link" to='/'>Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/About'>about</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/ServiceDetails'>Services</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/Doctors'>Doctors</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/Contact'>Contact</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/Admin'>Admin</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>            
        )
    }
}
