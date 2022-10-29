import React, { Component } from 'react'

export class FooterOne extends Component {
    render() {
        let FooterData = this.props.FooterData;
        return (
            <footer className="footer-wrapper footer-one">
                <div className="footer-widgets-wrapper section-bg text-white">
                    <div className="container">
                        <div className="row">

                            {
                                FooterData.singleWidget.map( (widget, index) => {
                                    return (
                                        index < 3 ?
                                        <div className={`col-sm-6 col-lg-2 col-12 ${widget.id > 1 ? ' offset-lg-1' : '' }`} key={widget.id} >
                                            <div className="single-footer-widget">
                                                <div className="f-widget-title">
                                                    <h2 key={widget.id}>{widget.title}</h2>
                                                </div>
                                                <div className="widegts-content">
                                                    {
                                                        widget.menuItems.map(item => {
                                                            return (
                                                                <a href={item.url} key={item.id}>{item.title}</a>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        ''
                                    )
                                })
                            }

                            <div className="col-sm-6 col-lg-3 offset-lg-1 col-12">
                                <div className="single-footer-widget">
                                    <div className="f-widget-title">
                                        <h2>About Us</h2>
                                    </div>
                                    <div className="widegts-content">
                                        <p>CS 6326 Team 12
                                        <br /> University of Texas at Dallas</p>
                                        <p>800 W Campbell Rd 
                                        <br />Richardson, TX 75080</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright-wrapper text-center">
                    <p>&copy; {FooterData.copyright}</p>
                </div>
            </footer>
        )
    }
}

export default FooterOne
