import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Banner from '../Banner';
import DoctorTable from '../DoctorsList/DoctorTable';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class AdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state ={
            users:[],
            patients: [],
            doctors: [],
            facilities: [],
            doctorDetails: []
        }
    }

    componentDidMount() {
        this.fetchUsers();
        this.fetchFacilities();
    }

    fetchUsers = () =>{
        fetch('http://localhost:3000/users/')
        .then(res => res.json())
        .then((data) => {
            const activeUserList = [];
            data.forEach((user)=>{
                if (user.status === 'active') {
                    activeUserList.push(user);
                }
            })
            this.setState({ users: activeUserList })
            this.splitDataGroups();
        })
        .catch(console.log)
    }

    fetchFacilities = () => {
        fetch('http://localhost:3000/facilities/')
        .then(res => res.json())
        .then((data) => {
            const activeFacilityList = [];
            data.forEach((facility)=>{
                if (facility.status === 'active') {
                    activeFacilityList.push(facility);
                }
            });
            this.setState({ facilities: activeFacilityList })
        })
        .catch(console.log)
    }

    splitDataGroups(){
        var doctorsList = [];
        var patientsList = [];
        this.state.users.forEach((user) =>{
            if(user.type==='Doctor'){
                doctorsList.push(user);
            }else if (user.type === 'Patient'){
                patientsList.push(user);
            }
        });
        this.setState({doctors: doctorsList});
        this.fetchDoctorDetail(doctorsList);
        this.setState({patients: patientsList});
    }

    async fetchDoctorDetail(doctor) {
        let newDoctorDetails=[]
        for(let i = 0 ;i< doctor.length;i++){
            const response = await fetch('http://localhost:3000/doctor_details/'+ doctor[i]._id.toString())
            const data = await response.json();
            newDoctorDetails.push(data);
            this.setState({ doctorDetails: newDoctorDetails });
            this.mapFacilityInfoIntoDoctor();
        }
    }

    mapFacilityInfoIntoDoctor(){
        var doctorUpdated = [];
        this.state.doctors.forEach((doctor)=>{
            var newDoctor = doctor;
             if (doctor.detail){
                 var index = this.state.facilities.findIndex(facility => facility._id.toString() === doctor.detail.facilities.facilityID.toString());
                newDoctor.facility = this.state.facilities[index];
                doctorUpdated.push(newDoctor);
            }
        });
        this.setState({doctor: doctorUpdated});
    }

    confirmDeletePatient = (patient) => {
        // console.log(appointment);
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui'>
                  <h1>Confirm to delete patient</h1>
                  <p>Are you sure to delete this patient?</p>
                  <button onClick={() => {
                      this.handleDeletePatient(patient)
                      onClose()
                  }}>Yes</button>
                  <button onClick={onClose}>No</button>
                </div>
              )
            }
        })
    }

    handleDeletePatient=(patient)=>{
        Axios({
            method: 'POST',
            data: {
                firstName: patient.firstName,
                lastName: patient.lastName,
                email: patient.email,
                phone: patient.phone,
                address: patient.address,
                city: patient.city,
                state: patient.state,
                zipcode: patient.zipcode,
                status: 'inactive',
                title: patient.title,
                services: patient.services,
            },
            url: 'http://localhost:3000/users/update/' + patient._id,
          }).then((res) => {
              if(res.data){
                  this.fetchUsers();
              }
          });
    }

    confirmDeleteFacility = (facility) => {
        // console.log(appointment);
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui'>
                  <h1>Confirm to delete facility</h1>
                  <p>Are you sure to delete this facility?</p>
                  <button onClick={() => {
                      this.handleDeleteFacility(facility)
                      onClose()
                  }}>Yes</button>
                  <button onClick={onClose}>No</button>
                </div>
              )
            }
        })
    }

    handleDeleteFacility=(facility)=>{
        Axios({
            method: 'POST',
            data: {
                name: facility.name,
                email: facility.email,
                phone: facility.phone,
                address: facility.address,
                city: facility.city,
                state: facility.state,
                zipcode: facility.zipcode,
                services: facility.services,
                status: 'inactive'
            },
            url: 'http://localhost:3000/facilities/update/' + facility._id,
          }).then((res) => {
              if(res.data){
                  this.fetchFacilities();
              }
          });
    }

    render() {
        const patientRows = [];
        this.state.patients.forEach((patient) => {       
            patientRows.push(
                <tr>
                    <td>{ patient.username }</td>
                    <td>
                        { patient.firstName } { patient.lastName }
                    </td>
                    <td>{ patient.email }</td>
                    <td>{ patient.phone }</td>
                    <td>{ patient.address}, {patient.city}, {patient.state} {patient.zipcode}</td>
                    <td>
                        <button>
                            <Link to={{
                                    pathname: `/AdminUpdate`,
                                    state: { type: 'Patient', savedObj: patient}
                                }}>
                                <i className="fa fa-edit fa-2x"></i>
                            </Link>
                        </button>
                        <button onClick={() => this.confirmDeletePatient(patient)}>
                            <i className="fa fa-trash fa-2x"></i>
                        </button>
                    </td>
                </tr>
            );
        });

        const facilityRows = [];
        this.state.facilities.forEach((facility) => {       
            facilityRows.push(
                <tr>
                    <td>{ facility.name }</td>
                    <td>{ facility.email }</td>
                    <td>{ facility.phone }</td>
                    <td>{ facility.address}, {facility.city}, {facility.state} {facility.zipcode}</td>
                    <td>                      
                        {facility.services.map((service,index) => (<li key={index}>{service}</li>))}
                    </td>
                    <td>
                        <button>
                            <Link to={{
                                    pathname: `/AdminUpdate`,
                                    state: { type: 'Facility', savedObj: facility }
                                }}>
                                <i className="fa fa-edit fa-2x"></i>
                            </Link>
                        </button>
                        <button onClick={() => this.confirmDeleteFacility(facility)}>
                            <i className="fa fa-trash fa-2x"></i>
                        </button>
                    </td>
                </tr>
            );
        });

        return (
            <React.Fragment>
                <Banner pageTitle='List of Users' />
                <div className="container new-container">
                    <div className="row">
                        <div className="col-lg-9 col-md-9 col-12">
                            <h1>Doctors</h1>
                        </div>
                        <div className="col-lg-3 col-md-3 col-12">
                            <Link to={{
                                    pathname: `/AdminCreate`,
                                    state: { type: 'Doctor' }
                                }}>
                                Add New Doctor
                            </Link>
                        </div>
                        <DoctorTable
                            doctors={this.state.doctors}
                            filterText={this.state.filterText}
                            availableOnly={this.state.availableOnly}
                            facilities={this.state.facilities}
                            doctorDetails={this.state.doctorDetails}
                            admin={true}
                        />
                    </div>
                    <br/>

                    <div className="row">
                        <div className="col-lg-9 col-md-9 col-12">
                            <h1>Facilities</h1>
                        </div>
                        <div className="col-lg-3 col-md-3 col-12">
                            <Link to={{
                                    pathname: `/AdminCreate`,
                                    state: { type: 'Facility' }
                                }}>
                                Add New Facility
                            </Link>
                        </div>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Services</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                                {facilityRows}
                            </tbody>
                        </table>
                    </div>
                    <br/>

                    <div className="row">
                        <div className="col-lg-9 col-md-9 col-12">
                            <h1>Patients</h1>
                        </div>
                        {/* <div className="col-lg-3 col-md-3 col-12">
                            <Link to={{
                                    pathname: `/AdminCreate`,
                                    state: { type: 'Patient' }
                                }}>
                                Add New Patient
                            </Link>
                        </div> */}
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                                {patientRows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}