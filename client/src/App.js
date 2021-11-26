import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeOne from './Components/HomeOne';
import Header from './Components/Header/Header';
import FooterOne from './Components/Footer/FooterOne';
import About from './Components/Page/About';
import ServiceDetails from './Components/Page/ServiceDetails';
import DoctorsList from './Components/Page/DoctorsList';
import ProfileDetails from './Components/Page/ProfileDetails';
import Contact from './Components/Page/Contact';
import FooterData from './Components/Data/FooterData';
import LogIn from './Components/Page/LogIn';
import './App.css';

function App() {
  return (
    <div className="main-wrapper">
      <Router>
        <Header />
        
        <Route exact path='/' render={props => (
          <React.Fragment>
            <HomeOne />
          </React.Fragment>
        )} />
        
        <Route path='/About' component={About} />
        <Route path='/ServiceDetails' component={ServiceDetails} />
        <Route path='/Doctors' component={DoctorsList} />
        <Route path='/Profile/:id' component={ProfileDetails} />
        <Route path='/Contact' component={Contact} />
        <Route path='/LogIn' component={LogIn} />

		    <FooterOne FooterData={FooterData} />
      </Router>
    </div>
  );
}

export default App;
