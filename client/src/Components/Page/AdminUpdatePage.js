import React, { Component } from 'react';
import Axios from 'axios';
import Select from 'react-select';
import Banner from '../Banner';
import validator from 'validator';

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

export default class AdminUpdatePage extends Component {
    constructor(props) {
        super(props);
    
        const serviceSelectedList = [];
        if (this.props.location.state.savedObj.services && this.props.location.state.savedObj.services.length){
            this.props.location.state.savedObj.services.forEach((service) => {
                let index = serviceOptions.findIndex((option) => option.value === service);
                serviceSelectedList.push(serviceOptions[index]);
            })
        }
        let titleSelected = null;
        if (this.props.location.state.savedObj.title === "Dentist"){
            titleSelected = titleOptions[0]
        } else{
            titleSelected = titleOptions[1]
        }
        this.state ={
            typing: false,
            typingTimeout: 0,
            // loading: true,

            // confirm logged-in
            // userLoggedIn: this.props.location.state.userLoggedIn,

            type: this.props.location.state.type,
            savedObj: this.props.location.state.savedObj,

            facilitiesList:[],
            facilityOptions: [],

            username: this.props.location.state.savedObj.username? this.props.location.state.savedObj.username:null,
            firstName: this.props.location.state.savedObj.firstName? this.props.location.state.savedObj.firstName:null,
            lastName: this.props.location.state.savedObj.lastName? this.props.location.state.savedObj.lastName:null,
            name: this.props.location.state.savedObj.name? this.props.location.state.savedObj.name:null,
            email: this.props.location.state.savedObj.email? this.props.location.state.savedObj.email:null,
            ifEmailFormat: true,
            phone: this.props.location.state.savedObj.phone? this.props.location.state.savedObj.phone:null,
            address: this.props.location.state.savedObj.address? this.props.location.state.savedObj.address:null,
            city: this.props.location.state.savedObj.city? this.props.location.state.savedObj.city:null,
            state: this.props.location.state.savedObj.state? this.props.location.state.savedObj.state:null,
            zipcode: this.props.location.state.savedObj.zipcode? this.props.location.state.savedObj.zipcode:null,
            image: this.props.location.state.savedObj.image? this.props.location.state.savedObj.image:null,
            
            servicesSelected: this.props.location.state.savedObj.services,
            serviceOptionSelected: serviceSelectedList,
            titleSelected: this.props.location.state.savedObj.title,
            titleOptionSelected: titleSelected,

            facilitySelected: this.props.location.state.savedObj.facility,
            facilityOptionSelected: null,
            ifFacilityChanged: false,

            buttonEnabled: false,
            updateSuccess: false

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
                this.loadFacilitySelected(activeFacilityOptions);
            })
            .catch(console.log)
        }
    }

    loadFacilitySelected=(options)=>{
        let index = options.findIndex((option) => option.value === this.state.facilitySelected._id);
        this.setState({
            facilityOptionSelected: options[index]
        });

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
        this.setState({ titleSelected: event.value });
        this.checkIfEnableButton();
    }

    setFacility = (event) => {
        let facilitySelected = this.state.facilitiesList.find((facility) => facility._id === event.value );
        if (facilitySelected._id === this.props.location.state.savedObj.facility._id) {  // no facility change compare to the saved data
            this.setState({ facilitySelected: facilitySelected });
        } else {
            this.setState({ 
                facilitySelected: facilitySelected,
                ifFacilityChanged: true
            });
        }
        
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
        this.setState({ servicesSelected: serviceArray });
        this.checkIfEnableButton();
    }

    setImage = (event) => {
        this.setState({
            image: event.target.files[0].name
        });
    }

    checkIfEnableButton=()=>{
        if(this.state.type==='Facility'){
            if ((this.state.name && this.state.email && this.state.ifEmailFormat && this.state.phone
                && this.state.address && this.state.city && this.state.state && this.state.zipcode
                && this.state.servicesSelected.length)){
                this.setState({buttonEnabled: true});
            } else{
                this.setState({buttonEnabled: false});
            }
        } else if (this.state.type==='Doctor'){ 
            if ((this.state.email && this.state.ifEmailFormat && this.state.firstName && this.state.lastName
                && this.state.titleSelected && this.state.facilitySelected && this.state.servicesSelected.length)){
                this.setState({buttonEnabled: true});
            } else{
                this.setState({buttonEnabled: false});
            }
        } else {// type === 'Patient'
            if ((this.state.email && this.state.ifEmailFormat)){
                this.setState({buttonEnabled: true});
            } else{
                this.setState({buttonEnabled: false});
            }
        }
    }

    updateFacility = () => {
        Axios({
        method: "POST",
        data: {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zipcode: this.state.zipcode,
            services: this.state.servicesSelected,
            status: 'active'
        },
        withCredentials: true,
        url: "http://localhost:3000/facilities/update/" + this.state.savedObj._id ,
        }).then((res) => {
            if(res.data){
                this.setState({
                    updateSuccess: true
                })
            }
        });
    };

    updatePatient = () => {
        if (this.state.image !== this.props.location.state.savedObj.image){
            this.updateUserImage();
        }
        Axios({
        method: "POST",
        data: {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zipcode: this.state.zipcode,
            status: 'active',
            title: "",
            services: [],
        },
        withCredentials: true,
        url: "http://localhost:3000/users/update/" + this.state.savedObj._id ,
        }).then((res) => {
            if(res.data){
                this.setState({
                    updateSuccess: true
                })
            }
        });
    };

    updateDoctor = () => {
        if (this.state.image !== this.props.location.state.savedObj.image){
            this.updateUserImage();
        }
        Axios({
            method: "POST",
            data: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                phone: this.state.phone,
                address: this.state.address,
                city: this.state.city,
                state: this.state.state,
                zipcode: this.state.zipcode,
                services: this.state.servicesSelected,
                title: this.state.titleSelected,
                status: 'active'
            },
            withCredentials: true,
            url: "http://localhost:3000/users/update/" + this.state.savedObj._id ,
        }).then((res) => {
            if(res.data){
                if(this.state.ifFacilityChanged){
                    this.updateDoctorDetail(this.state.savedObj.detail._id);
                } else {
                    this.setState({ updateSuccess: true})
                }
            }
        });
    }

    updateDoctorDetail=(doctorDetailID)=>{
        Axios({
            method: "POST",
            data: {
                facilityID: this.state.facilitySelected._id,
                facilityName: this.state.facilitySelected.name,
            },
            withCredentials: true,
            url: "http://localhost:3000/doctor_details/update/" + doctorDetailID,
        }).then((res) => {
            if(res.data){
                this.setState({
                    updateSuccess: true
                })
            }
        });
    }

    updateUserImage =()=>{
        Axios({
            method: "POST",
            data: {
                image: this.state.image
            },
            withCredentials: true,
            url: "http://localhost:3000/users//imageUpload/" + this.state.savedObj._id,
        }).then((res) => {
            if(res.data){
                console.log('Image uploaded.')
            }
        });
    }


    render() {
        return (
            <React.Fragment>
                <Banner pageTitle='Update' />

                <div className="user-form-wrapper">
                    <div className="container">
                        <div className="user-form-one">
                            <h1>Update {this.state.type}</h1>

                            {this.state.type === 'Facility' && 
                                <div className="row">
                                    <input placeholder="Name" value={this.state.name} onChange={this.setName}/>
                                    <input placeholder="Email" value={this.state.email} onChange={this.setEmail}/>
                                    <input placeholder="Phone" value={this.state.phone} onChange={this.setPhone}/>
                                    <input placeholder="Address" value={this.state.address} onChange={this.setAddress}/>
                                    <input placeholder="City" value={this.state.city} onChange={this.setCity}/>
                                    <input placeholder="State" value={this.state.state} onChange={this.setStateValue}/>
                                    <input placeholder="Zip Code" value={this.state.zipcode} onChange={this.setZipCode}/>
                                    <div className="col-lg-12 col-md-12 col-12">
                                        <label>Services</label>
                                        <Select 
                                            isMulti
                                            defaultValue={this.state.serviceOptionSelected}
                                            name="Services"
                                            options={serviceOptions}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={this.setServices}
                                        />
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-12">
                                    {this.state.buttonEnabled &&
                                        <button className="contact-submit-btn" onClick={this.updateFacility}>Submit</button>
                                    }   
                                    {!this.state.buttonEnabled &&
                                        <button className="contact-submit-btn-disabled">Submit</button>
                                    } 
                                    {this.state.updateSuccess===true && <span className="error-msg">Facility Updated</span>}
                                    </div>
                                </div>  
                            }

                            {this.state.type === 'Doctor' && 
                                <div className="row">
                                    {this.state.image && <img alt="profile" src={this.state.image}/>}
                                    <input type="file" onChange={this.setImage}/>
                                    <input className="input-disabled" placeholder="Username" value={this.state.username} disabled={true}/>
                                    <input placeholder="Firstname" value={this.state.firstName} onChange={this.setFirstname}/>
                                    <input placeholder="Lastname" value={this.state.lastName} onChange={this.setLastname}/>
                                    <div className="col-lg-12 col-md-12 col-12">
                                        <label>Title</label>
                                        <Select 
                                            name="Title"
                                            defaultValue={this.state.titleOptionSelected}
                                            options={titleOptions}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={this.setTitle}
                                        />
                                    </div>
                                    {this.state.facilityOptionSelected && <div className="col-lg-12 col-md-12 col-12">
                                        <label>Facility</label>
                                        <Select 
                                            name="Facility"
                                            defaultValue={this.state.facilityOptionSelected}
                                            options={this.state.facilityOptions}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={this.setFacility}
                                        />
                                    </div>}
                                    <div className="col-lg-12 col-md-12 col-12">
                                        <label>Services</label>
                                        <Select 
                                            isMulti
                                            defaultValue={this.state.serviceOptionSelected}
                                            name="Services"
                                            options={serviceOptions}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={this.setServices}
                                        />
                                    </div>
                                    <input placeholder="Email" value={this.state.email} onChange={this.setEmail}/>
                                    {!this.state.ifEmailFormat && <span className="error-msg">Not valid email</span>}
                                    <input placeholder="Phone" value={this.state.phone} onChange={this.setPhone}/>
                                    <input placeholder="Address" value={this.state.address} onChange={this.setAddress}/>
                                    <input placeholder="City" value={this.state.city} onChange={this.setCity}/>
                                    <input placeholder="State" value={this.state.state} onChange={this.setStateValue}/>
                                    <input placeholder="Zip Code" value={this.state.zipcode} onChange={this.setZipCode}/>

                                    <div className="col-lg-12 col-md-12 col-12">
                                    {this.state.buttonEnabled &&
                                        <button className="contact-submit-btn" onClick={this.updateDoctor}>Submit</button>
                                    }   
                                    {!this.state.buttonEnabled &&
                                        <button className="contact-submit-btn-disabled">Submit</button>
                                    } 
                                    {this.state.updateSuccess===true && <span className="error-msg">Doctor updated</span>}
                                    </div>
                                </div>  
                            }        


                            {this.state.type === 'Patient' && 
                                <div className="row">
                                    {this.state.image && <img alt="profile" src={this.state.image}/>}
                                    <input type="file" onChange={this.setImage}/>
                                    <input className="input-disabled" placeholder="Username" value={this.state.username} disabled={true}/>
                                    <input placeholder="Firstname" value={this.state.firstName} onChange={this.setFirstname}/>
                                    <input placeholder="Lastname" value={this.state.lastName} onChange={this.setLastname}/>
                                    <input placeholder="Email" value={this.state.email} onChange={this.setEmail}/>
                                    {!this.state.ifEmailFormat && <span className="error-msg">Not valid email</span>}
                                    <input placeholder="Phone" value={this.state.phone} onChange={this.setPhone}/>
                                    <input placeholder="Address" value={this.state.address} onChange={this.setAddress}/>
                                    <input placeholder="City" value={this.state.city} onChange={this.setCity}/>
                                    <input placeholder="State" value={this.state.state} onChange={this.setStateValue}/>
                                    <input placeholder="Zip Code" value={this.state.zipcode} onChange={this.setZipCode}/>

                                    <div className="col-lg-12 col-md-12 col-12">
                                    {this.state.buttonEnabled &&
                                        <button className="contact-submit-btn" onClick={this.updatePatient}>Submit</button>
                                    }   
                                    {!this.state.buttonEnabled &&
                                        <button className="contact-submit-btn-disabled">Submit</button>
                                    } 
                                    {this.state.updateSuccess===true && <span className="error-msg">Patient updated</span>}
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
