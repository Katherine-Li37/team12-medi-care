import React, { Component } from 'react';
import Banner from '../Banner';


export default class AppointmentPage extends Component {
    constructor(props) {
        super(props);
    
        this.state ={
            // confirm logged-in
            userID: null,
            username: null,
            userLoggedIn: null
        }  
    }

    // async componentDidMount(){
    //     const user = localStorage.getItem('username');
    //     console.log(user)
    //     if(user && user!=="null"){
    //         const userID = user.split(',')[1];
    //         const response = await fetch('http://localhost:3000/users/'+ userID)
    //         const data = await response.json();
    //         this.setState({
    //             userID: userID,
    //             username: user.split(',')[0],
    //             userLoggedIn: data
    //         });
    //     }
    // }

    render() {
        console.log(this.props);
        return (
            <React.Fragment>
                <Banner pageTitle='Schedule an Appointment' />
                {/* <div className="container new-container">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Information</h5>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group"> 
                                    <label>Description: </label>
                                    <input  type="text"
                                        required
                                        className="form-control"
                                        value={this.state.description}
                                        onChange={this.onChangeDescription}
                                    />
                                </div>
                            
                                <div className="form-group">
                                    <input type="submit" value="Update" className="btn btn-primary" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div> */}
            </React.Fragment>
        )
    }
}
