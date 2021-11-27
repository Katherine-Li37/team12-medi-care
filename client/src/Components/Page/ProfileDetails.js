import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../Banner';
import AdminPanel from './AdminPanel';

export default class ProfileDetails extends Component {
    constructor(props) {
        super(props);
        this.state ={
            user: this.props.location.state.user,
            facilityInfo: this.props.location.state.facility? null: this.props.location.state.facility
        }       
    }

    openUpdateInfoModal(user){

    }

    render() {
        let user = this.state.user;
        if (user.detail){
            Object.entries(user.detail.facilities.availability).map((day) => (
                console.log(day)
            ))
        }

        if (user.type==="Admin"){
            return <AdminPanel/>
        } else{
            return (
                <React.Fragment>
                    <Banner pageTitle='Profile / Details' />
                    <div className="container new-container">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Information</h5>
                                <div className="row">
                                    <div className="col-sm-3"><h6 className="mb-0">Full Name</h6></div>
                                    <div className="col-sm-9 text-secondary"> {user.firstName} {user.lastName}</div>
                                </div>
                                {user.type === "Doctor" &&
                                    <div className="row">
                                        <div className="col-sm-3"><h6 className="mb-0">Title</h6></div>
                                        <div className="col-sm-9 text-secondary"> {user.title}</div>
                                    </div>
                                }
                                <div className="row">
                                    <div className="col-sm-3"><h6 className="mb-0">Email</h6></div>
                                    <div className="col-sm-9 text-secondary"> {user.email}</div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3"><h6 className="mb-0">Phone Number</h6></div>
                                    <div className="col-sm-9 text-secondary"> {user.phone}</div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3"><h6 className="mb-0">Address</h6></div>
                                    <div className="col-sm-9 text-secondary"> {user.address}, {user.city}, {user.state} {user.zipcode}</div>
                                </div>

                                {user.type === "Doctor" &&
                                    <div className="row">
                                        <div className="col-sm-3"><h6 className="mb-0">Service</h6></div>
                                        <div className="col-sm-9 ">
                                            {user.services.map((service) => (
                                                <li key={service}>{service}</li>
                                            ))}
                                        </div>
                                    </div>
                                }
                                {/* <button type="button"> */}
                                    <Link to={{
                                        pathname: `/ProfileEdit/${user._id}`,
                                        state: { user: user }
                                    }}>
                                    Edit
                                    </Link>
                                {/* </button> */}
                            </div>
                        </div>
                        {user.type === "Doctor" &&
                            <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Facility</h5>
                                <div className="row">
                                        <div className="col-sm-3"><h6 className="mb-0">Name</h6></div>
                                        <div className="col-sm-9 text-secondary"> {user.facility.name}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3"><h6 className="mb-0">Email</h6></div>
                                        <div className="col-sm-9 text-secondary"> {user.facility.email}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3"><h6 className="mb-0">Phone Number</h6></div>
                                        <div className="col-sm-9 text-secondary"> {user.facility.phone}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3"><h6 className="mb-0">Address</h6></div>
                                        <div className="col-sm-9 text-secondary"> {user.facility.address}, {user.facility.city}, {user.facility.state} {user.facility.zipcode}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3"><h6 className="mb-0">Service</h6></div>
                                            <div className="col-sm-9 ">
                                                {user.facility.services.map((service) => (
                                                    <li key={service}>{service}</li>
                                                ))}
                                            </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3"><h6 className="mb-0">Availabilty</h6></div>
                                        <div className="col-sm-9 ">
                                            {Object.entries(user.detail.facilities.availability).map((day) => {
                                                if (day[1].length >0){
                                                    return <li key={day[0]}>{day[0]} {day[1][0]} - {day[1][1]}</li>
                                                }
                                            })}
                                        </div>
                                    </div>

                                    {/* <a className="btn btn-info " target="__blank" href="">Edit</a> */}
                                </div>
                            </div>
                        }
                        {/* {user.type === "Doctor" &&
                            <div className="card">
                            <   div className="card-body">
                                <h5 className="card-title">Apponintment Calender</h5>
                                
                                </div>
                            </div>
                        } */}
                    </div>
                </React.Fragment>
            )
        }

    }
}