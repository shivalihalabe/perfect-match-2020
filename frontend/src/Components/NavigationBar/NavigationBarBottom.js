
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import classes from "./NavigationBar.module.css";
import { isMobile } from "react-device-detect";
import cbalogo from "../../Assets/cbalogo.png"
import instalogo from "../../Assets/instalogo.png"

class NavigationBarBottom extends React.Component {
    render() {
        var decision = (
            <Navbar.Collapse className = "justify-content-end">

                <Nav className = {classes.collapseStyle} id="basic-navbar-nav">

                <a className={classes.cbaHover} href="http://www.cornellbusinessanalytics.com/apply" target="_blank">
                <p><span style={{paddingRight:"20px", fontSize: "20px" }}>Cornell Business Analytics</span></p>

            </a>
                </Nav>
                </Navbar.Collapse>
            
        )
        if (isMobile) {
            decision = (
                <a className={classes.cbaHoverMobile} href="http://www.cornellbusinessanalytics.com/apply" target="_blank">
                    <img src={cbalogo} style={{ maxHeight: "50px", paddingRight:"10px" }}></img>
                    
                </a>
            )
        }
        return (
            <Navbar fixed="bottom" className={classes.bottomNav + " " } expand="md" >
                <Navbar.Brand href="">
                <a className={classes.cbaHoverMobile} href="https://instagram.com/cornellperfectmatch?igshid=ma6juy2b4g2l" target="_blank">
                    <img src={instalogo} style={{ paddingLeft:"10px",maxHeight: "50px" }}></img>

                </a>
                </Navbar.Brand>
                {decision}
            </Navbar>
        );
    }
}

export default NavigationBarBottom