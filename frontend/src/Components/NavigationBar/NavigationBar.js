import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown"
import { Button } from 'react-bootstrap';

import { GoogleLogin } from "react-google-login";
import classes from "./NavigationBar.module.css";
import App from "../../App.js";
import browserHistory from "react-router";
import gloginimage from "../../Assets/web/2x/btn_google_signin_light_normal_web@2x.png";
import fflogo from "../../Assets/logo.png";
import thclogo from "../../Assets/THClogo.png"
import cbalogo from "../../Assets/cbalogo.png";
import cbafull from "../../Assets/CBAFull.png";
import perfMatchLogo from "../../Assets/Perfect_Match_Logo.png"
class NavigationBar extends React.Component {

  responseGoogleSuccess(response) {
    App.googleResponseSuccess(response);
  }

  render() {
    var decide = function () {
      if (this.props.state.loggedIn != true) {
        return (
          <GoogleLogin
            clientId="29949178420-0opvqqshb6ltbdmhceqgcout83b7s5i2.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.props.googleCallBack}
            onFailure={this.responseGoogleSuccess}
            cookiePolicy={"single_host_origin"}
            render={renderProps => (
              <Nav.Link className={classes.nlink}
                onClick={renderProps.onClick}>
                <p >Login </p>
              </Nav.Link>
            )}
          />
        )
      }
      else {
        return (
          <Nav.Link
            className={classes.nlink}
            onClick={function () {
              //console.log("yayeet")
              this.props.setState({
                state: Object.assign(this.props.state, {
                  isSurveyPage:true

                })
              })
              this.props.history.push("/results");
            }.bind(this)}
          >
            <p>View Results</p>
          </Nav.Link>
        )
      }
    }.bind(this)

    return (
      <Navbar fixed="top" className={classes.MainNavbar} expand="md">
        <Navbar.Brand href="">
          <div className={classes.brandBox}>


            <img className={classes.fflogo} src={perfMatchLogo} />

          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <div style={{ paddingRight: "15px" }}>
            <Nav className={classes.collapseStyle}>
              <Nav.Link
                className={classes.nlink}
                onClick={function () {
                  this.props.history.push("/");
                }.bind(this)}
              >
                <p>Home</p>
              </Nav.Link>
              <Nav.Link
                className={classes.nlink}
                onClick={function () {
                  this.props.history.push("/about");
                }.bind(this)}
              >
                <p>FAQ</p>
              </Nav.Link>
              <Nav.Link
                className={classes.nlink}
                onClick={function () {
                  this.props.history.push("/stats");
                }.bind(this)}
              >
                <p>Statistics</p>
              </Nav.Link>
              <Nav.Link
                className={classes.nlink}
                onClick={function () {
                  this.props.history.push("/contact");
                }.bind(this)}
              >
                <p>Contact</p>
              </Nav.Link>
              {decide()} 
            </Nav>
          </div>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}


export default NavigationBar; 