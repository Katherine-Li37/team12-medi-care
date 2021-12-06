import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class DoctorTable extends Component {
    constructor(props) {
        super(props);
    
        this.state ={
            // confirm logged-in
            userID: null,
            username: null,
            userLoggedIn: null
        }  
    }

    async componentDidMount(){
        const user = localStorage.getItem('username');
        if(user && user!=='null'){
            const userID = user.split(',')[1];
            const response = await fetch('http://localhost:3000/users/'+ userID)
            const data = await response.json();
            this.setState({
                userID: userID,
                username: user.split(',')[0],
                userLoggedIn: data
            });
        }
    }

    confirmDeleteDoctor = (doctor) => {
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui'>
                  <h1>Confirm to delete doctor</h1>
                  <p>Are you sure to delete this doctor?</p>
                  <button className='delete-modal-button' onClick={() => {
                      this.handleDeleteDoctor(doctor)
                      onClose()
                  }}>Yes</button>
                  <button className='delete-modal-button' onClick={onClose}>No</button>
                </div>
              )
            }
        })
    }

    handleDeleteDoctor=(doctor)=>{
        Axios({
            method: 'POST',
            data: {
                firstName: doctor.firstName,
                lastName: doctor.lastName,
                email: doctor.email,
                phone: doctor.phone,
                address: doctor.address,
                city: doctor.city,
                state: doctor.state,
                zipcode: doctor.zipcode,
                status: 'inactive',
                title: doctor.title,
                services: doctor.services,
            },
            url: 'http://localhost:3000/users/update/' + doctor._id,
          }).then((res) => {
                // if(res.data){
                //     this.props.rerenderDoctorList();
                // }
          });
    }

    render() {
        const rows = [];
      
        this.props.doctors.forEach((doctor) => {
            let imagesrc;
            if (doctor.image){
                imagesrc =  '/images/users/' + doctor.image;
            } else {
                imagesrc =  '/images/users/default.png';
            }

            var index = this.props.doctorDetails.findIndex(detail => detail.userID.toString() === doctor._id.toString());
            if (index !== -1 ){
                doctor.detail = this.props.doctorDetails[index];
                    rows.push(
                        <tr>
                        <td>
                            <p><img src={imagesrc} alt="profile" style={{width:'150px',height:'150px'}}/></p>
                        </td>
                        <td>
                            <Link to={{
                                pathname: `/Profile/${doctor._id}`,
                                state: { user: doctor, userLoggedIn: this.props.userLoggedIn }
                            }}>
                            { doctor.firstName } { doctor.lastName }
                            </Link>
                        </td>
                        <td>{ doctor.title }</td>
                        <td>                      
                            {doctor.services.map((service,index) => (<li key={index}>{service}</li>))}
                        </td>
                        <td>{ doctor.detail.facilities.facilityName }</td>
                        {!this.props.admin && <td>                    
                            <Link to={{
                                pathname: '/ScheduleAppointment',
                                state: { 
                                    doctor: doctor,
                                    userLoggedIn: this.props.userLoggedIn
                                }
                            }}>
                            Schedule Appointment
                            </Link></td>}
                        {this.props.admin && <td>
                            <button>
                                <Link to={{
                                        pathname: `/AdminUpdate`,
                                        state: { type: 'Doctor', savedObj: doctor  }
                                    }}>
                                    <i className="fa fa-edit fa-2x"></i>
                                </Link>
                            </button>
                            <button onClick={() => this.confirmDeleteDoctor(doctor)}>
                                <i className="fa fa-trash fa-2x"></i>
                            </button>
                        </td>}
                    </tr>
                );
            }
        });
  
        return (
            <table className="table">
                <thead>
                <tr>
                    <th>Picture</th>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Service</th>
                    <th>Facility</th>
                    {!this.props.admin && <th></th>}
                    {this.props.admin && <th>Actions</th>}
                </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
  }