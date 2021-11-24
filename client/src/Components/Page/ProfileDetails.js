import React, { Component } from 'react';
// import { useParams } from "react-router-dom";
import Banner from '../Banner';


export default class ProfileDetails extends Component {
    constructor(props) {
        super(props);
        this.state ={
            user: this.props.location.state.user,
            facilityInfo: this.props.location.state.facility
        }       
    }

    render() {
        let user = this.state.user;
        console.log(user);
        Object.entries(user.detail.facilities.availability).map((day) => (
            console.log(day)
        ))
        
        return (
            <React.Fragment>
                <Banner pageTitle='Profile / Details' />
                <div class="container">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Information</h5>
                            <div class="row">
                                    <div class="col-sm-3"><h6 class="mb-0">Full Name</h6></div>
                                    <div class="col-sm-9 text-secondary"> {user.firstName} {user.lastName}</div>
                                </div>
                                {user.type === "Doctor" &&
                                    <div class="row">
                                        <div class="col-sm-3"><h6 class="mb-0">Title</h6></div>
                                        <div class="col-sm-9 text-secondary"> {user.title}</div>
                                    </div>
                                }
                                <div class="row">
                                    <div class="col-sm-3"><h6 class="mb-0">Email</h6></div>
                                    <div class="col-sm-9 text-secondary"> {user.email}</div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-3"><h6 class="mb-0">Phone Number</h6></div>
                                    <div class="col-sm-9 text-secondary"> {user.phone}</div>
                                </div>


                                {user.type === "Doctor" &&
                                    <div class="row">
                                        <div class="col-sm-3"><h6 class="mb-0">Service</h6></div>
                                        <div class="col-sm-9 ">
                                            {user.services.map((service) => (
                                                <li key={service}>{service}</li>
                                            ))}
                                        </div>
                                    </div>
                                }

                                {/* <a class="btn btn-info " target="__blank" href="">Edit</a> */}
                        </div>
                    </div>
                    {user.type === "Doctor" &&
                        <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Facility</h5>
                            <div class="row">
                                    <div class="col-sm-3"><h6 class="mb-0">Name</h6></div>
                                    <div class="col-sm-9 text-secondary"> {user.facility.name}</div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-3"><h6 class="mb-0">Email</h6></div>
                                    <div class="col-sm-9 text-secondary"> {user.facility.email}</div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-3"><h6 class="mb-0">Phone Number</h6></div>
                                    <div class="col-sm-9 text-secondary"> {user.facility.phone}</div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-3"><h6 class="mb-0">Address</h6></div>
                                    <div class="col-sm-9 text-secondary"> {user.facility.address}, {user.facility.city}, {user.facility.state} {user.facility.zipcode}</div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-3"><h6 class="mb-0">Service</h6></div>
                                        <div class="col-sm-9 ">
                                            {user.facility.services.map((service) => (
                                                <li key={service}>{service}</li>
                                            ))}
                                        </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-3"><h6 class="mb-0">Availabilty</h6></div>
                                    <div class="col-sm-9 ">
                                        {Object.entries(user.detail.facilities.availability).map((day) => {
                                            if (day[1].length >0){
                                                return <li key={day[0]}>{day[0]} {day[1][0]} - {day[1][1]}</li>
                                            }
                                        })}
                                    </div>
                                </div>

                                {/* <a class="btn btn-info " target="__blank" href="">Edit</a> */}
                            </div>
                        </div>
                    }
                    {/* {user.type === "Doctor" &&
                        <div class="card">
                        <   div class="card-body">
                            <h5 class="card-title">Apponintment Calender</h5>
                            
                            </div>
                        </div>
                    } */}
                </div>
            </React.Fragment>
        )
    }
}