import React, { Component } from 'react';
import Banner from '../Banner';
import SearchBar from './SearchBar';
import DoctorTable from './DoctorTable';

export default class DoctorsList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          searchText: '',
          titleFilter: 'All',
          filteredList: [],
          doctors: [],
          facilities: [],
          doctorDetails: []
        };
        
        this.fetchDoctorDetail = this.fetchDoctorDetail.bind(this);
    }

    componentDidMount() {
        this.fetchDoctors();
        this.fetchFacilities();
    }

    fetchDoctors = () => {
        fetch('http://localhost:3000/users/doctors')
        .then(res => res.json())
        .then((data) => {
            const activeDoctorList = [];
            data.forEach((doctor)=>{
                if (doctor.status === 'active') {
                    activeDoctorList.push(doctor);
                }
            })
            this.setState({
                doctors: activeDoctorList,
                filteredList: activeDoctorList
            });
          this.fetchDoctorDetail(data);
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
            })
            this.setState({ facilities: activeFacilityList })
        })
        .catch(console.log)
    }

    async fetchDoctorDetail(doctors) {
        let newDoctorDetails=[]
        for(let i = 0 ;i< doctors.length;i++){
            const response = await fetch('http://localhost:3000/doctor_details/'+ doctors[i]._id.toString())
            const data = await response.json();
            newDoctorDetails.push(data);
            this.setState({ doctorDetails: newDoctorDetails });
        }
        this.mapFacilityInfoIntoDoctor();
    }

    mapFacilityInfoIntoDoctor = ()=>{
        var doctorUpdated = [];
        this.state.doctors.forEach((doctor)=>{
            var newDoctor = doctor;
             if (doctor.detail){
                var index = this.state.facilities.findIndex(facility => facility._id.toString() === doctor.detail.facilities.facilityID.toString());
                newDoctor.facility = this.state.facilities[index];
                newDoctor.fullName = doctor.firstName + ' ' + doctor.lastName;
                doctorUpdated.push(newDoctor);
            }
        });
        this.setState({
            doctors: doctorUpdated,
            filteredList: doctorUpdated
        });
    } 

    onFilterSearchChange = (titleFilter, searchText) =>{
        var doctorFiltered = [];

        if (!searchText.length){// No search
            if (titleFilter==='All'){ // No filter
                doctorFiltered = this.state.doctors
            } else { // has filter
                this.state.doctors.forEach((doctor)=>{
                    if (doctor.title === titleFilter)
                        doctorFiltered.push(doctor);
                });
            }
        } else { // has search
            if (titleFilter==='All'){ // No filter
                this.state.doctors.forEach((doctor)=>{
                    if (doctor.fullName.toLowerCase().includes(searchText.toLowerCase()))
                        doctorFiltered.push(doctor);
                });
            } else {
                this.state.doctors.forEach((doctor)=>{
                    if (doctor.title === titleFilter && doctor.fullName.toLowerCase().includes(searchText.toLowerCase()))
                        doctorFiltered.push(doctor);
                });
            }
        }
        this.setState({
            titleFilter: titleFilter,
            searchText: searchText,
            filteredList: doctorFiltered,
        });
    }
    
    render() {
        return (
            <React.Fragment>
                <Banner pageTitle='Doctors & Orthodontists' />
                <div className="container new-container">
                    <SearchBar
                        onFilterSearchChange={this.onFilterSearchChange}
                        failitiesFilterOption={this.state.facilities}
                    />
                    <DoctorTable
                        doctors={this.state.filteredList}
                        facilities={this.state.facilities}
                        userLoggedIn={this.props.location.state.userLoggedIn}
                        doctorDetails={this.state.doctorDetails}
                        admin={false}
                    />
                </div>
            </React.Fragment>
        )
    }
}

