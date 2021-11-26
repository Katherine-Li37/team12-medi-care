import React, { Component } from 'react';
import Banner from '../Banner';
import SearchBar from './SearchBar';
import DoctorTable from './DoctorTable';

export default class DoctorsList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          filterText: '',
          availableOnly: false,
          doctors: [],
          facilities: [],
          doctorDetails: []
        };
        
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
        this.fetchDoctorDetail = this.fetchDoctorDetail.bind(this);
        this.mapFacilityInfoIntoDoctor = this.mapFacilityInfoIntoDoctor.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:3000/users/doctors')
        .then(res => res.json())
        .then((data) => {
          this.setState({ doctors: data })
          this.fetchDoctorDetail(data);
        })
        .catch(console.log)

        fetch('http://localhost:3000/facilities/')
        .then(res => res.json())
        .then((data) => {
          this.setState({ facilities: data })
        })
        .catch(console.log)
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
        console.log(this.state);
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

    handleFilterTextChange(filterText) {
        this.setState({
          filterText: filterText
        });
    }
      
    handleInStockChange(availableOnly) {
        this.setState({
          availableOnly: availableOnly
        })
    }
    
    render() {
        return (
            <React.Fragment>
                <Banner pageTitle='Doctors & Orthodontists' />
                <div class="container">
                    <SearchBar
                        filterText={this.state.filterText}
                        availableOnly={this.state.availableOnly}
                        onFilterTextChange={this.handleFilterTextChange}
                        onInStockChange={this.handleInStockChange}
                        failitiesFilterOption={this.state.facilities}
                    />
                    <DoctorTable
                        doctors={this.state.doctors}
                        filterText={this.state.filterText}
                        availableOnly={this.state.availableOnly}
                        facilities={this.state.facilities}
                        doctorDetails={this.state.doctorDetails}
                        admin={false}
                    />
                </div>
            </React.Fragment>
        )
    }
}

