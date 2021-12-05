import React, { Component } from 'react';
import Axios from 'axios';
import Select from 'react-select';
import Banner from '../Banner';
import validator from 'validator';
// import DoctorTable from '../DoctorsList/DoctorTable';
// import { confirmAlert } from 'react-confirm-alert'; 
// import 'react-confirm-alert/src/react-confirm-alert.css';

export default class AdminCreatePage extends Component {
    constructor(props) {
        super(props);
    
        this.state ={
            typing: false,
            typingTimeout: 0,

            // confirm logged-in
            // userLoggedIn: this.props.location.state.userLoggedIn,

            type: this.props.location.state.type,
            facilitiesList:[],
            facilityOptions: [],

            username: null,
            ifUserNameExist: false,
            firstName: null,
            lastName: null,
            name: null,
            email: null,
            ifEmailFormat: true,
            phone: null,
            address: null,
            city: null,
            state: null,
            zipcode: null,
            services: [],
            title: null,
            facility: null,

            buttonEnabled: false,
            createSuccess: false

        };
    }

    componentDidMount() {
        if(this.props.location.state.type==='Doctor'){
            fetch('http://localhost:3000/facilities/')
            .then(res => res.json())
            .then((data) => {
                const activeFacilityList = [];
                const activeFacilityOptions = [];
                data.forEach((facility)=>{
                    if (facility.status === 'active') {
                        activeFacilityList.push(facility);
                        activeFacilityOptions.push({ value: facility._id, label: facility.name })
                    }
                })
                this.setState({ 
                    facilitiesList: activeFacilityList,
                    facilityOptions: activeFacilityOptions
                })
            })
            .catch(console.log)
        }
    }
    
    setUsername = (event) => {
        let usernameValue = event.target.value
        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
         }
     
         this.setState({
            username: usernameValue,
            typing: false,
            typingTimeout: setTimeout(() => {
                this.checkIfUsernameExists(usernameValue);
            }, 1000)
         });
    }
    checkIfUsernameExists = usernameValue => {
        fetch('http://localhost:3000/users/register/' + usernameValue)
          .then(res => res.json())
          .then((data) => {
            if (data.length!==0){
                this.setState({ifUserNameExist: true});
                this.checkIfEnableButton();
            } else {
                this.setState({ifUserNameExist: false});
                this.checkIfEnableButton();
            }
          })
          .catch(console.log)
        
    }

    setFirstname = (event) => {
        this.setState({ firstName: event.target.value });
        this.checkIfEnableButton();
    }

    setLastname = (event) => {
        this.setState({ lastName: event.target.value });
        this.checkIfEnableButton();
    }

    setTitle = (event) => {
        this.setState({ title: event.value });
        this.checkIfEnableButton();
    }

    setFacility = (event) => {
        let facilitySelcted = this.state.facilitiesList.find((facility) => facility._id === event.value );
        this.setState({ facility: facilitySelcted });
        this.checkIfEnableButton();
    }

    setName = (event) => {
        this.setState({ name: event.target.value });
        this.checkIfEnableButton();
    }

    setEmail=(event)=>{
        let emailValue = event.target.value;
        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
         }
     
        this.setState({
            typing: false,
            typingTimeout: setTimeout(() => {
                this.checkIfEmailFormat(emailValue);
            }, 1000),
            email: emailValue
        });
    }

    checkIfEmailFormat =(email)=>{
        if (validator.isEmail(email)) {
            this.setState({ ifEmailFormat: true });
        } else {
            this.setState({ ifEmailFormat: false });
        }
        this.checkIfEnableButton();
    }

    setPhone = (event) => {
        this.setState({ phone: event.target.value });
        this.checkIfEnableButton();
    }

    setAddress = (event) => {
        this.setState({ address: event.target.value });
        this.checkIfEnableButton();
    }

    setCity = (event) => {
        this.setState({ city: event.target.value });
        this.checkIfEnableButton();
    }

    setStateValue = (event) => {
        this.setState({ state: event.target.value });
        this.checkIfEnableButton();
    }

    setZipCode = (event) => {
        this.setState({ zipcode: event.target.value });
        this.checkIfEnableButton();
    }

    setServices = (event) => {
        let serviceArray = [];
        event.forEach((service)=>{
            serviceArray.push(service.value)
        })
        this.setState({ services: serviceArray });
        this.checkIfEnableButton();
    }

    checkIfEnableButton=()=>{
        if(this.state.type==='Facility'){
            if ((this.state.name && this.state.email && this.state.ifEmailFormat && this.state.phone
                && this.state.address && this.state.city && this.state.state && this.state.zipcode
                && this.state.services.length)){
                this.setState({buttonEnabled: true});
            } else{
                this.setState({buttonEnabled: false});
            }
        } else { // type === 'Doctor'
            if ((this.state.username && !this.state.ifUserNameExist && this.state.email && this.state.ifEmailFormat 
                && this.state.firstName && this.state.lastName && this.state.title && this.state.facility 
                && this.state.services.length)){
                this.setState({buttonEnabled: true});
            } else{
                this.setState({buttonEnabled: false});
            }
        }
    }

    createNewFacility = () => {
        Axios({
        method: 'POST',
        data: {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zipcode: this.state.zipcode,
            services: this.state.services,
            status: 'active'
        },
        withCredentials: true,
        url: 'http://localhost:3000/facilities/create',
        }).then((res) => {
            if(res.data){
                this.setState({
                    createSuccess: true
                })
            }
        });
    };

    createNewDoctor = () => {
        Axios({
            method: 'POST',
            data: {
                username: this.state.username,
                type: 'Doctor',
                password: 'DefaultPW',
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                phone: this.state.phone,
                address: this.state.address,
                city: this.state.city,
                state: this.state.state,
                zipcode: this.state.zipcode,
                services: this.state.services,
                title: this.state.title
            },
            withCredentials: true,
            url: 'http://localhost:3000/register',
        }).then((res) => {
            if(res.data.message==='User Created'){
                this.addDoctorDetail(res.data.user);
            }
        });
    }

    addDoctorDetail=(doctor)=>{
        Axios({
            method: 'POST',
            data: {
                userID: doctor._id,
                facilityID: this.state.facility._id,
                facilityName: this.state.facility.name,
            },
            withCredentials: true,
            url: 'http://localhost:3000/doctor_details/create',
        }).then((res) => {
            if(res.data){
                this.setState({
                    createSuccess: true
                })
            }
        });
    }


    render() {
        const serviceOptions =[
            { value: 'Teeth Cleaning', label: 'Teeth Cleaning' },
            { value: 'Dental Fillings', label: 'Dental Fillings' },
            { value: 'Emergency Tooth Extraction', label: 'Emergency Tooth Extraction' },
            { value: 'Root Canal Treatment', label: 'Root Canal Treatment' },
            { value: 'Braces and Orthodontics', label: 'Braces and Orthodontics' }
        ];
        const titleOptions =[
            { value: 'Dentist', label: 'Dentist' },
            { value: 'Orthodontist', label: 'Orthodontist' }
        ];
        return (
            <React.Fragment>
                <Banner pageTitle='Add New' />

                <div className="user-form-wrapper">
                    <div className="container">
                        <div className="user-form-one">
                            <h1>Add New {this.state.type}</h1>

                            {this.state.type === 'Facility' && 
                                <div className="row">
                                    <input placeholder="Name" onChange={this.setName}/>
                                    <input placeholder="Email" onChange={this.setEmail}/>
                                    <input placeholder="Phone" onChange={this.setPhone}/>
                                    <input placeholder="Address" onChange={this.setAddress}/>
                                    <input placeholder="City" onChange={this.setCity}/>
                                    <input placeholder="State" onChange={this.setStateValue}/>
                                    <input placeholder="Zip Code" onChange={this.setZipCode}/>
                                    <div className="col-lg-12 col-md-12 col-12">
                                        <label>Services</label>
                                        <Select 
                                            isMulti
                                            name="Services"
                                            options={serviceOptions}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={this.setServices}
                                        />
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-12">
                                    {this.state.buttonEnabled &&
                                        <button className="contact-submit-btn" onClick={this.createNewFacility}>Submit</button>
                                    }   
                                    {!this.state.buttonEnabled &&
                                        <button className="contact-submit-btn-disabled" disabled={true}>Submit</button>
                                    } 
                                    {this.state.createSuccess===true && <span className="error-msg">New Facility added</span>}
                                    </div>
                                </div>  
                            }

                            {this.state.type === 'Doctor' && 
                                <div className="row">
                                    <input placeholder="Username" onChange={this.setUsername}/>
                                    {this.state.ifUserNameExist && <span className="error-msg">Username exists</span>}  
                                    <input placeholder="Firstname" onChange={this.setFirstname}/>
                                    <input placeholder="Lastname" onChange={this.setLastname}/>
                                    <div className="col-lg-12 col-md-12 col-12">
                                        <label>Title</label>
                                        <Select 
                                            name="Title"
                                            options={titleOptions}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={this.setTitle}
                                        />
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-12">
                                        <label>Facility</label>
                                        <Select 
                                            name="Facility"
                                            options={this.state.facilityOptions}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={this.setFacility}
                                        />
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-12">
                                        <label>Services</label>
                                        <Select 
                                            isMulti
                                            name="Services"
                                            options={serviceOptions}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={this.setServices}
                                        />
                                    </div>
                                    <input placeholder="Email" onChange={this.setEmail}/>
                                    {!this.state.ifEmailFormat && <span className="error-msg">Not valid email</span>}
                                    <input placeholder="Phone" onChange={this.setPhone}/>
                                    <input placeholder="Address" onChange={this.setAddress}/>
                                    <input placeholder="City" onChange={this.setCity}/>
                                    <input placeholder="State" onChange={this.setStateValue}/>
                                    <input placeholder="Zip Code" onChange={this.setZipCode}/>

                                    <div className="col-lg-12 col-md-12 col-12">
                                    {this.state.buttonEnabled &&
                                        <button className="contact-submit-btn" onClick={this.createNewDoctor}>Submit</button>
                                    }   
                                    {!this.state.buttonEnabled &&
                                        <button className="contact-submit-btn-disabled" disabled={true}>Submit</button>
                                    } 
                                    {this.state.createSuccess===true && <span className="error-msg">New Doctor added</span>}
                                    </div>
                                </div>  
                            }                                         
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}
