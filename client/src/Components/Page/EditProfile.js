import React, { Component } from 'react';
import Banner from '../Banner';


export default class EditProfile extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            user: this.props.location.state.user
        };
        
        // this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        // this.handleInStockChange = this.handleInStockChange.bind(this);
        // this.fetchDoctorDetail = this.fetchDoctorDetail.bind(this);
        // this.mapFacilityInfoIntoDoctor = this.mapFacilityInfoIntoDoctor.bind(this);
    }

    render() {
        return (
            <React.Fragment>
                <Banner pageTitle='Update Profile' />
                <div className="container new-container">
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
                </div>
            </React.Fragment>
        )
    }
}
