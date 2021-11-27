import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
        if(user && user!=="null"){
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

    render() {
        const rows = [];
      
        this.props.doctors.forEach((doctor) => {
            var index = this.props.doctorDetails.findIndex(detail => detail.userID.toString() === doctor._id.toString());
            if (index !== -1 ){
                doctor.detail = this.props.doctorDetails[index];
                    rows.push(
                    <DoctorRow doctor={doctor} userLoggedIn={this.state.userLoggedIn} admin={this.props.admin}/>
                );
            }
        });
  
        return (
            <table className="table">
                <thead>
                <tr>
                    <th>Photo</th>
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


  class DoctorRow extends React.Component {
    render() {
        const doctor = this.props.doctor;
        return (
            <tr>
                <td></td>
                <td>
                    <Link to={{
                        pathname: `/Profile/${doctor._id}`,
                        state: { user: doctor }
                    }}>
                    { doctor.firstName } { doctor.lastName }
                    </Link>
                </td>
                <td>{ doctor.title }</td>
                <td>                      
                    {doctor.services.map((service) => (<li>{service}</li>))}
                </td>
                <td>{ doctor.detail.facilities.facilityIName }</td>
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
                {this.props.admin && <td><i className="fa fa-trash fa-2x" ></i></td>}
            </tr>

        );
    }
}