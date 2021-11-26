import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class DoctorTable extends Component {
    render() {
        // const filterText = this.props.filterText;
        // const availableOnly = this.props.availableOnly;
  
        const rows = [];
      
        this.props.doctors.forEach((doctor) => {
            // if (doctor.firstName.indexOf(filterText) === -1 && doctor.lastName.indexOf(filterText) === -1) {
            //     return;
            // }
            // if (availableOnly && !doctor.available) {
            //     return;
            // }
        
            var index = this.props.doctorDetails.findIndex(detail => detail.userID.toString() === doctor._id.toString());
            if (index !== -1 ){
                doctor.detail = this.props.doctorDetails[index];
                    rows.push(
                    <DoctorRow
                        // doctor={this.state.doctorDetails.find( ({ _id }) => _id.toString() === doctor._id.toString() )}
                        doctor={doctor}
                        admin={this.props.admin}
                        // key={video.name}
                    />
                );
            }

        });
  
        return (
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Title</th>
                    <th>Service</th>
                    <th>Facility</th>
                    {!this.props.admin && <th>Availablility</th>}
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
        // console.log(doctor.detail)
        // const name = video.available ?
        //   video.title :
        //   <span style={{color: 'red'}}>
        //     {video.title}
        //   </span>;

        return (
            <tr>
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
                {!this.props.admin && <td>Availablility</td>}
                {this.props.admin && <td>Delete</td>}
            </tr>

        );
    }
}