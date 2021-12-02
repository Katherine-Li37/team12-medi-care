import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../Banner';
import AdminPanel from './AdminPanel';
import DoctorDetail from './DoctorDetail';

import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const weekday = new Array(7);
weekday[0] = 'Sunday';
weekday[1] = 'Monday';
weekday[2] = 'Tuesday';
weekday[3] = 'Wednesday';
weekday[4] = 'Thursday';
weekday[5] = 'Friday';
weekday[6] = 'Saturday';

let eventGuid = 0;

export default class ProfileDetails extends Component {
    constructor(props) {
        super(props);
        this.state ={
            user: this.props.location.state.user,
            userLoggedIn: this.props.location.state.userLoggedIn,
            facilityInfo: this.props.location.state.facility? null: this.props.location.state.facility,
            
             // For doctor's profile
            doctorDetails: null,
            hours: null,
            existedAppointments: [],
            displayedAppointments: [],
            weekendsVisible: true,
            currentEvents: []
        }       
    }

    componentDidMount() {
        if (this.state.userLoggedIn.type === "Doctor"){
            fetch('http://localhost:3000/doctor_details/' + this.state.userLoggedIn._id.toString())
            .then(res => res.json())
            .then((data) => {
                this.setState({ doctorDetails: data });
                this.getWorkHours();
            })
            .catch(console.log)

            fetch('http://localhost:3000/appointments/doctor/' + this.state.userLoggedIn._id.toString())
            .then(res => res.json())
            .then((data) => {
                this.setState({ existedAppointments: data });
                this.displayAppointments(data);
            })
            .catch(console.log)
        }
    }

    getWorkHours=()=>{
        const dateList = [];
        Object.keys(this.doctorDetails.facilities.availability).forEach((day)=>{
            let hours = this.doctorDetails.facilities.availability[day]
            if (hours.length){
                dateList.push({day, hours});
            }
        });
        this.state.hours=dateList
        // this.setState({hours: dateList});
    }

    createEventId = () => {
        return String(eventGuid++)
    }
    
    displayAppointments=(appointments)=>{
        let appointmentEvents =[];
        appointments.forEach((appointment)=>{
            let event = {
                id: this.createEventId(),
                title: appointment.patientName + ' - ' + appointment.procedure,
                start: new Date(appointment.date).toISOString().replace(/T.*$/, '') + 'T' + appointment.time // YYYY-MM-DD
            }
            appointmentEvents.push(event);
        });
        console.log(appointmentEvents);
        this.setState({
            displayedAppointments: appointmentEvents
        });
        
    }

    renderEventContent=(eventInfo)=> {
        return (
          <>
            {/* <b>{eventInfo.timeText}</b> */}
            <i>{eventInfo.event.title}</i>
          </>
        )
      }
      
       renderSidebarEvent=(event)=> {
        return (
          <li key={event.id}>
            <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
            <i>{event.title}</i>
          </li>
        )
      }


    render() {
        console.log(this.state);
        let user = this.state.user;
        let userLoggedIn = this.state.userLoggedIn;

        if (user && user.type==="Doctor") {  // view doctor's page via doctor list
            return <DoctorDetail doctor={user} facilityInfo={this.state.facilityInfo} userLoggedIn={userLoggedIn}/>
        } else if (userLoggedIn.type==="Admin"){
            return <AdminPanel/>
        } else { // user view own profile page
            return (
                <React.Fragment>
                    <Banner pageTitle='Profile / Details' />
                    <div className="container new-container">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Information</h5>
                                <div className="row">
                                    <div className="col-sm-3"><h6 className="mb-0">Full Name</h6></div>
                                    <div className="col-sm-9 text-secondary"> {userLoggedIn.firstName} {userLoggedIn.lastName}</div>
                                </div>
                                {userLoggedIn.type === "Doctor" &&
                                    <div className="row">
                                        <div className="col-sm-3"><h6 className="mb-0">Title</h6></div>
                                        <div className="col-sm-9 text-secondary"> {userLoggedIn.title}</div>
                                    </div>
                                }
                                <div className="row">
                                    <div className="col-sm-3"><h6 className="mb-0">Email</h6></div>
                                    <div className="col-sm-9 text-secondary"> {userLoggedIn.email}</div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3"><h6 className="mb-0">Phone Number</h6></div>
                                    <div className="col-sm-9 text-secondary"> {userLoggedIn.phone}</div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3"><h6 className="mb-0">Address</h6></div>
                                    <div className="col-sm-9 text-secondary"> {userLoggedIn.address}, {userLoggedIn.city}, {userLoggedIn.state} {userLoggedIn.zipcode}</div>
                                </div>

                                {userLoggedIn.type === "Doctor" &&
                                    <div className="row">
                                        <div className="col-sm-3"><h6 className="mb-0">Service</h6></div>
                                        <div className="col-sm-9 ">
                                            {userLoggedIn.services.map((service) => (
                                                <li key={service}>{service}</li>
                                            ))}
                                        </div>
                                    </div>
                                }
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
                        {userLoggedIn.type === "Doctor" && this.state.doctorDetails && 
                            <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Facility</h5>
                                <div className="row">
                                        <div className="col-sm-3"><h6 className="mb-0">Name</h6></div>
                                        <div className="col-sm-9 text-secondary"> {this.state.doctorDetails.facilities.facilityIName}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3"><h6 className="mb-0">Availabilty</h6></div>
                                        <div className="col-sm-9 ">
                                            {Object.entries(this.state.doctorDetails.facilities.availability).map((day) => {
                                                if (day[1].length >0){
                                                    return <li key={day[0]}>{day[0]} {day[1][0]} - {day[1][1]}</li>
                                                }
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {userLoggedIn.type === "Doctor" && this.state.doctorDetails && this.state.displayedAppointments.length &&
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Appointment Calendar</h5>
                                    <div className="row">
                                        <div className='container new-container'>    
                                            <div className='demo-app'>
                                                {/* {this.renderSidebar()} */}
                                                <div className='demo-app-main'>
                                                <FullCalendar
                                                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                                    headerToolbar={{
                                                    left: 'prev,next today',
                                                    center: 'title',
                                                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                                                    }}
                                                    initialView='timeGridWeek'
                                                    editable={false}
                                                    selectable={false}
                                                    selectMirror={false}
                                                    dayMaxEvents={true}
                                                    weekends={this.state.weekendsVisible}
                                                    initialEvents={this.state.displayedAppointments} // alternatively, use the `events` setting to fetch from a feed
                                                    // select={this.handleDateSelect}
                                                    eventContent={this.renderEventContent} // custom render function
                                                    // eventClick={this.handleEventClick}
                                                    // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                                                    /* you can update a remote database when these fire:
                                                    eventAdd={function(){}}
                                                    eventChange={function(){}}
                                                    eventRemove={function(){}}
                                                    */
                                                />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </React.Fragment>
            )
        }
    }
}