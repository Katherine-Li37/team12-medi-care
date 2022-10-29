import React, { Component } from 'react'
import GoogleMapReact from "google-map-react";
import Banner from './Banner';
// import FeaturesOne from './Features/FeaturesOne'
// import ServiceOne from './Service/ServiceOne'
// import ServiceData from './Data/ServiceData';
// import FeaturesData from './Data/FeaturesData';

const Marker = ({ text, tooltip }) => (
  <div className="circle">
    <span className="circleText" title={tooltip}>
      {text}
    </span>
  </div>
);

export default class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        centerLat: 32.985771,
        centerLng: -96.750003,
        seachZipCode: '',
        clinicList: []
      }       
    }

    setSearchZipCode = (event) => {
      this.setState({
        seachZipCode: event.target.value
      })
    }

    search = () => {
        fetch('http://localhost:3000/clinics')
        .then(res => res.json())
        .then((data) => {
            const clinics = [];
            data.forEach((clinic, index)=>{
                clinic.id = index + 1
                clinics.push(clinic);
            })
            this.setState({
              clinicList: clinics,
            });
        })
        .catch(console.log)
    }

    computeDistance = (lat, lng) => {
        // The math module contains a function named toRadians which converts from degrees to radians.
        var lon1 = this.state.centerLng * Math.PI / 180;
        var lon2 = lng * Math.PI / 180;
        var lat1 = this.state.centerLat * Math.PI / 180;
        var lat2 = lat * Math.PI / 180;
   
        // Haversine formula
        let dlon = lon2 - lon1;
        let dlat = lat2 - lat1;
        let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2),2);
        let c = 2 * Math.asin(Math.sqrt(a));
   
        // Radius of earth in miles
        let r = 3956;
   
        // calculate the result
        return(c * r).toFixed(2);
    }


    render() {
        return (
            <React.Fragment>
                <Banner pageTitle='Home' />
                {/* 
                <FeaturesOne FeaturesData={FeaturesData} />
                <ServiceOne ServiceData={ServiceData} />
                */}
                
                <div className="container">
                    <div className="col-lg-12 col-md-12 col-12"> 
                        <input placeholder="Search by zip code" onChange={this.setSearchZipCode}/>
                        <button onClick={this.search}>Search</button>
                    </div>
                    
                    <div className='map-container'>
                        <div className="map-section">
                            <GoogleMapReact  className="map-section"
                              bootstrapURLKeys={{
                                  key: "AIzaSyDibkcWH_CpqYF3-GDROBfGov220vWRfew",
                                  language: 'en'
                              }}
                              defaultCenter={{lat: this.state.centerLat, lng: this.state.centerLng}}
                              defaultZoom={14}
                              // onChildMouseEnter={this.onChildMouseEnter}
                              // onChildMouseLeave={this.onChildMouseLeave}
                            >
                              {this.state.clinicList.map(({ lat, lng, id, name }) => {
                                return (
                                  <Marker key={id} lat={lat} lng={lng} text={id} tooltip={name} />
                                )
                              })}
                            </GoogleMapReact>
                        </div>

                        <div>
                            {this.state.clinicList.map(({ id, name, lat, lng, rating }) => {
                              return (
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{id}: {name}</h5>
                                        <div className="row">
                                            <div><p className="mb-0">Distance: {this.computeDistance(lat, lng)} miles</p></div>
                                            <div><p className="mb-0">Rating: {rating} / 5</p></div>
                                        </div>
                                        {/* <button type="button"> 
                                            <Link to={{
                                                pathname: `/ProfileEdit/${user._id}`,
                                                state: { user: user }
                                            }}>
                                            Edit
                                            </Link>
                                        </button> */}
                                    </div>
                                </div>
                              )
                            })}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}