import React, { Component } from 'react'
import HeroOne from './Hero/HeroOne'
import FeaturesOne from './Features/FeaturesOne'
import AboutOne from './About/AboutOne'
import ServiceOne from './Service/ServiceOne'
import ClientLogos from './ClientLogos'
import ServiceData from './Data/ServiceData';
import FeaturesData from './Data/FeaturesData';

class HomeOne extends Component {
    render() {
        return (
            <React.Fragment>
                <HeroOne />
                <FeaturesOne FeaturesData={FeaturesData} />
                <AboutOne />
                <ServiceOne ServiceData={ServiceData} />
                <ClientLogos />
            </React.Fragment>
        )
    }
}

export default HomeOne
