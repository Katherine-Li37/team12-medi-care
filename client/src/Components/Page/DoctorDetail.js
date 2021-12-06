import React, { Component } from 'react';
import Banner from '../Banner';
import { Link } from 'react-router-dom';


export default class DoctorDetail extends Component {
    constructor(props) {
        super(props);
        this.state ={
            doctor: this.props.doctor,
            facilityInfo: this.props.facilityInfo
        }
    }

    render() {
        let doctor = this.state.doctor;
        return (
            <React.Fragment>
                    <Banner pageTitle='Doctor Profile / Details' />
                    <div className="container new-container">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Information</h5>
                                <div className="row">
                                    <div className="col-sm-3"><h6 className="mb-0">Full Name</h6></div>
                                    <div className="col-sm-9 text-secondary"> {doctor.firstName} {doctor.lastName}</div>
                                </div>
                                
                                    <div className="row">
                                        <div className="col-sm-3"><h6 className="mb-0">Title</h6></div>
                                        <div className="col-sm-9 text-secondary"> {doctor.title}</div>
                                    </div>

                                <div className="row">
                                    <div className="col-sm-3"><h6 className="mb-0">Email</h6></div>
                                    <div className="col-sm-9 text-secondary"> {doctor.email}</div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3"><h6 className="mb-0">Phone Number</h6></div>
                                    <div className="col-sm-9 text-secondary"> {doctor.phone}</div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3"><h6 className="mb-0">Address</h6></div>
                                    <div className="col-sm-9 text-secondary"> {doctor.address}, {doctor.city}, {doctor.state} {doctor.zipcode}</div>
                                </div>

                                
                                    <div className="row">
                                        <div className="col-sm-3"><h6 className="mb-0">Service</h6></div>
                                        <div className="col-sm-9 ">
                                            {doctor.services.map((service) => (
                                                <li key={service}>{service}</li>
                                            ))}
                                        </div>
                                    </div>
                                
                                {/* <button type="button"> 
                                    <Link to={{
                                        pathname: `/ProfileEdit/${user._id}`,
                                        state: { user: user }
                                    }}>
                                    Edit
                                    </Link>
                                </button> */}
                            </div>
                        </div>
                           <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Facility</h5>
                                <div className="row">
                                        <div className="col-sm-3"><h6 className="mb-0">Name</h6></div>
                                        <div className="col-sm-9 text-secondary"> {doctor.facility.name}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3"><h6 className="mb-0">Email</h6></div>
                                        <div className="col-sm-9 text-secondary"> {doctor.facility.email}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3"><h6 className="mb-0">Phone Number</h6></div>
                                        <div className="col-sm-9 text-secondary"> {doctor.facility.phone}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3"><h6 className="mb-0">Address</h6></div>
                                        <div className="col-sm-9 text-secondary"> {doctor.facility.address}, {doctor.facility.city}, {doctor.facility.state} {doctor.facility.zipcode}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3"><h6 className="mb-0">Service</h6></div>
                                            <div className="col-sm-9 ">
                                                {doctor.facility.services.map((service) => (
                                                    <li key={service}>{service}</li>
                                                ))}
                                            </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3"><h6 className="mb-0">Availabilty</h6></div>
                                        <div className="col-sm-9 ">
                                            {Object.entries(doctor.detail.facilities.availability).map((day) => {
                                                if (day[1].length >0){
                                                    return <li key={day[0]}>{day[0]} {day[1][0]} - {day[1][1]}</li>
                                                } else{
                                                    return <li key={day[0]}></li>
                                                }
                                            })}
                                        </div>
                                    </div>
                                    <div>
                                        <Link to={{
                                            pathname: '/ScheduleAppointment',
                                            state: { 
                                                doctor: doctor,
                                                userLoggedIn: this.props.userLoggedIn
                                            }
                                        }}>
                                        Schedule Appointment
                                        </Link>
                                    </div>

                                </div>
                            </div>
                    </div>
                </React.Fragment>
        )
    }
}