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
        // this.mapFacilityInfoIntoDoctor = this.mapFacilityInfoIntoDoctor.bind(this);
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

    onFilterChange = (filterValue) => {
        var doctorFiltered = [];
        this.state.doctors.forEach((doctor)=>{
            if (filterValue==="All"){
                doctorFiltered = this.state.doctors
            } else{
                if (doctor.title === filterValue){
                    doctorFiltered.push(doctor);
                }
            }
        });
        this.setState({
            titleFilter: filterValue,
            filteredList: doctorFiltered,
        });
    }

    onSearchChange = (searchText) => {
        var doctorFiltered = [];
        if(!searchText.length && this.state.titleFilter==='All'){
            doctorFiltered = this.state.doctors
        } else if(!searchText.length && this.state.titleFilter!=='All'){
            this.state.doctors.forEach((doctor)=>{
                if (doctor.title === this.state.titleFilter){
                    doctorFiltered.push(doctor);
                }
            });
        }
        else{
            this.state.filteredList.forEach((doctor)=>{
            if (doctor.fullName.toLowerCase().includes(searchText.toLowerCase())){
                doctorFiltered.push(doctor);
            }
        });
        }

        this.setState({
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
                        onSearchChange={this.onSearchChange}
                        onFilterChange={this.onFilterChange}
                        failitiesFilterOption={this.state.facilities}
                    />
                    <DoctorTable
                        doctors={this.state.filteredList}
                        facilities={this.state.facilities}
                        doctorDetails={this.state.doctorDetails}
                        admin={false}
                    />
                </div>
            </React.Fragment>
        )
    }
}

