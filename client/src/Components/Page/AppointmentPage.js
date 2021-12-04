import React, { Component } from 'react';
import Axios from 'axios';
import Banner from '../Banner';

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

export default class AppointmentPage extends Component {
    constructor(props) {
        super(props);
    
        this.state ={
            // confirm logged-in
            userLoggedIn: this.props.location.state.userLoggedIn,

            doctor: this.props.location.state.doctor,
            hours: null,
            existedAppointments: [],
            displayedAppointments: [],

            serviceSelected: this.props.location.state.doctor.services[0],
            dateSelected: null,
            availableTimeList: [],
            timeSelected: null,
            buttonEnabled: false,
            createAppointmentSuccess: false,

            weekendsVisible: true,
            currentEvents: []
        };
        
        this.getWorkHours();
    }

    async componentDidMount(){
        const doctorID = this.state.doctor._id;
        const response = await fetch('http://localhost:3000/appointments/doctor/'+ doctorID)
        const data = await response.json();
        
        this.setState({
            existedAppointments: data
        });
        this.displayAppointments(data);
    }

    getWorkHours=()=>{
        const dateList = [];
        Object.keys(this.state.doctor.detail.facilities.availability).forEach((day)=>{
            let hours = this.state.doctor.detail.facilities.availability[day]
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
                title: 'Appointment time taken',
                start: new Date(appointment.date).toISOString().replace(/T.*$/, '') + 'T' + appointment.time // YYYY-MM-DD
            }
            appointmentEvents.push(event);
        });
        this.setState({
            displayedAppointments: appointmentEvents
        });
    }



    serviceChange =(e)=>{
        this.setState({
            serviceSelected: e.target.value
        }, this.checkIfEnableButton());
    }

    dateChange=(date)=> {
        this.setState({
          dateSelected: date
        }, this.checkIfEnableButton());
        this.loadTimeSlots(date);
        
    }

    timeChange =(e)=>{
        this.setState({
            timeSelected: e.target.value
        }, this.checkIfEnableButton());
    }

    loadTimeSlots=(date)=>{
        let dayOfWeek = weekday[date.getDay()]
        let index = this.state.hours.findIndex((day) => day.day === dayOfWeek);
        let hours = index>=0? this.state.hours[index].hours : null;
        if (hours){
            let startTime = new Date(date.toLocaleDateString('en-US') + ' ' + hours[0]);
            let endTime = new Date(date.toLocaleDateString('en-US') + ' ' + hours[1]);
            
            let timeSlotArray=['Select Time'];
            let timeSlot = startTime;
            while (timeSlot.getTime()< endTime.getTime()){
        
                timeSlotArray.push(timeSlot.toLocaleTimeString('it-IT'));
                timeSlot.setHours( timeSlot.getHours() + 1 );
            }
            this.filterOutExistedAppointment(date, timeSlotArray);
        }
    }

    filterOutExistedAppointment = (date, timeSlotArray) => {
        let existedAppointmentTime = [];
        this.state.existedAppointments.forEach((appointment)=>{
            if(date.getTime() === new Date(appointment.date).getTime()){
                existedAppointmentTime.push(appointment.time);
            }
        })
        const filteredArray = timeSlotArray.filter(value => !existedAppointmentTime.includes(value));

        // console.log(filteredArray);
        this.setState({
            availableTimeList: filteredArray,
            timeSelected: timeSlotArray[0]
        })
        this.checkIfEnableButton();
    }

    checkIfEnableButton=()=>{
        if (this.state.serviceSelected && this.state.dateSelected && this.state.timeSelected){
            this.setState({buttonEnabled: true});
        } else{
            this.setState({buttonEnabled: false});
        }
    }

    onSumbit = () => {
        // console.log('submit')
        Axios({
          method: 'POST',
          data: {
            doctorID: this.state.doctor._id,
            doctorName: this.state.doctor.firstName + ' ' + this.state.doctor.lastName,
            facilityID: this.state.doctor.detail.facilities.facilityID,
            facilityName: this.state.doctor.detail.facilities.facilityName,
            patientID: this.state.userLoggedIn._id,
            patientName: this.state.userLoggedIn.firstName + ' ' + this.state.userLoggedIn.lastName,
            date: this.state.dateSelected,
            time: this.state.timeSelected,
            procedure: this.state.serviceSelected,
            status: 'active'
          },
          url: 'http://localhost:3000/appointments/create',
        }).then((res) => {
            if(res.data){
                this.setState({
                    createAppointmentSuccess: true
                })
            }
        });
    };

    render() {
        // console.log(this.state);
        return (
            <React.Fragment>
                <Banner pageTitle='Schedule an Appointment' />
                <div className="contact-form-wraper">
                    <div className='container new-container'>
                        
                    
                        <h2>Schedule an Appointment with Dr. {this.state.doctor.firstName} {this.state.doctor.lastName}</h2>
                    <div>
                                <div className='col-lg-6 col-md-6 col-12'>
                            <label>Procedure: </label>
                            <select 
                                value={this.state.serviceSelected} 
                                onChange={this.serviceChange}
                            >
                                {this.state.doctor.services.map((service) => 
                                    (<option value={service}>{service}</option>))
                                }
                            </select>
                            </div>

                            <div className='col-lg-6 col-md-6 col-12 date-field'>
                            <label>Date: </label>
                            <DatePicker
                                selected={ this.state.dateSelected }
                                onChange={ this.dateChange }
                                name='date'
                                dateFormat='MM/dd/yyyy'
                                minDate={new Date()}
                            />
                            </div>

                            {this.state.dateSelected && 
                                <div className='col-lg-6 col-md-6 col-12'>
                                <label>Time: </label>
                                <select 
                                    value={this.state.timeSelected} 
                                    onChange={this.timeChange}
                                >
                                    {this.state.availableTimeList.map((time) => 
                                        (<option value={time}>{time}</option>))
                                    }
                                </select>
                                </div>
                            }

                            {this.state.buttonEnabled &&
                                <button className='contact-submit-btn' onClick={this.onSumbit}>Submit</button>
                            }   
                            {!this.state.buttonEnabled &&
                                <button className='contact-submit-btn-disabled' disabled={true}>Submit</button>
                            }   

                        </div>

                        {this.state.createAppointmentSuccess && <span className="error-msg">Appointment created</span>}
                    {/* </form> */}
                </div>
                </div>
                
                {this.state.displayedAppointments.length &&
                <div className='container new-container'>
                    <h2>Availability Calendar for Dr. {this.state.doctor.firstName} {this.state.doctor.lastName}</h2>                
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
                </div>}
            </React.Fragment>
        )
    }


// renderSidebar=()=> {
//     return (
//       <div className='demo-app-sidebar'>
//         <div className='demo-app-sidebar-section'>
//           <h2>Instructions</h2>
//           <ul>
//             <li>Select dates and you will be prompted to create a new event</li>
//             <li>Drag, drop, and resize events</li>
//             <li>Click an event to delete it</li>
//           </ul>
//         </div>
//         <div className='demo-app-sidebar-section'>
//           <label>
//             <input
//               type='checkbox'
//               checked={this.state.weekendsVisible}
//               onChange={this.handleWeekendsToggle}
//             ></input>
//             toggle weekends
//           </label>
//         </div>
//         <div className='demo-app-sidebar-section'>
//           <h2>All Events ({this.state.currentEvents.length})</h2>
//           <ul>
//             {this.state.currentEvents.map(this.renderSidebarEvent)}
//           </ul>
//         </div>
//       </div>
//     )
//   }

//   handleWeekendsToggle = () => {
//     this.setState({
//       weekendsVisible: !this.state.weekendsVisible
//     })
//   }

//   handleDateSelect = (selectInfo) => {
//     let title = prompt('Please enter a new title for your event')
//     let calendarApi = selectInfo.view.calendar

//     calendarApi.unselect() // clear date selection

//     if (title) {
//       calendarApi.addEvent({
//         id: this.createEventId(),
//         title,
//         start: selectInfo.startStr,
//         end: selectInfo.endStr,
//         allDay: selectInfo.allDay
//       })
//     }
//   }

//   handleEventClick = (clickInfo) => {
//       console.log(clickInfo);
//     // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
//     //   clickInfo.event.remove()
//     // }
//   }

//   handleEvents = (events) => {
//     this.setState({
//       currentEvents: events
//     })
//   }


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
}