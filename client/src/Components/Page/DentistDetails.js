import React, { Component } from 'react';
import Banner from '../Banner';


export default class DentistDetails extends Component {
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
            const data = await response.json()
            newDoctorDetails.push(data)
            // console.log({newDoctorDetails})
            this.setState({ doctorDetails: newDoctorDetails })
        }
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
                    />
                </div>
            </React.Fragment>
        )
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);        
        
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }
    
    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }
    
    handleInStockChange(e) {
        this.props.onInStockChange(e.target.checked);
    }
    
    render() {
      return (
        <form>
            <input
                type="text"
                placeholder="Search..."
                value={this.props.filterText}
                onChange={this.handleFilterTextChange}
            />
            <p>
            <input
                type="checkbox"
                checked={this.props.availableOnly}
                onChange={this.handleInStockChange}
            />
            {' '} 
            Only show available doctors
            </p>
        </form>
      );
    }
  }

  class DoctorTable extends React.Component {
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
                        // key={video.name}
                    />
                );
            }

        });
  
        return (
            <table class="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Title</th>
                    <th>Service</th>
                    <th>Facility</th>
                    <th>Availablility</th>
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
        console.log(doctor.detail)
        // const name = video.available ?
        //   video.title :
        //   <span style={{color: 'red'}}>
        //     {video.title}
        //   </span>;

        return (
            <tr>
                <td>{ doctor.firstName } { doctor.lastName }</td>
                <td>{doctor.title}</td>
                <td>{doctor.services}</td>
                <td>{doctor.detail.facilities.facilityIName}</td>
                <td>Availablility</td>
            </tr>

        );
    }
}