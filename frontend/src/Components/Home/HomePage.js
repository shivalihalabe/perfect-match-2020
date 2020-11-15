import React from "react";
import classes from "./HomePage.module.css";
import { GoogleLogin } from "react-google-login";
import Fade from 'react-reveal/Fade';
import App from "../../App.js";
import State from "../../State.js";
import Button from "react-bootstrap/Button"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Timer from "react-compound-timer"

import gloginimage from "../../Assets/web/2x/btn_google_signin_light_normal_web@2x.png";
import logo from "../../Assets/logo.png";
import Networks from "../../Assets/Networks.png";
import logoWhite from "../../Assets/Perfect_Match_Icon_white.png"
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

class HomePage extends React.Component {

  componentWillMount() {
    //sets counter to loading 
    this.setState({
      count: "loading"
    });
    //fetches count and updates page in callback 
    fetch(App.backendURL + "get_count", {
      method: "get"
    })
      .then(function (resp) {
        if (resp.ok) {
          return resp.text();
        } else {
          throw "shit";
        }
      })
      .then(
        function (resp) {
          this.setState({
            count: resp
          });
        }.bind(this)
      );
  }
  //to make sure the heart logo is the same height as the content on its left in the flex box
  componentDidMount() {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.innerHTML = "document.getElementById(\"mainflex\").style.height=document.getElementById(\"mainhome\").clientHeight+\"px\"";
    //console.log(document.getElementById("mainflex").style)
    if (isBrowser) {
      document.body.appendChild(s);
    }
  }

  googleFail(resp) {
    console.log(resp)
  }

  render() {
    //if not logged in, show google sign in. if so, show take survey button
    var decision = (
      <GoogleLogin
        clientId="29949178420-0opvqqshb6ltbdmhceqgcout83b7s5i2.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={App.googleResponseSuccess.bind(this.props.parent)}
        onFailure={this.googleFail}
        cookiePolicy={"single_host_origin"}
        render={renderProps => (
          <div>
            {/* <button className={[classes.loginButton, classes.googleLogo].join(' ')} onClick={renderProps.onClick}>
              <p>Sign in with Google</p>
            </button> */}
            <button variant="basic" className={classes.btnxl} onClick={renderProps.onClick}>
              <span style={{ color: "#FB6466", fontFamily: "Inter", fontWeight: "bold" }}>Login</span>
            </button>
          </div>
        )}
      />
    );
    if (this.props.state.state.loggedIn) {
      decision = (
        <div>

          <button className={classes.btnxl} onClick={function () {
            this.props.setState({
              state: Object.assign(this.props.state.state, {
                isSurveyPage: true

              })
            })
            this.props.history.push("/results");
          }.bind(this)}>
            <span style={{ color: "#FB6466", fontFamily: "Inter", fontWeight: "bold" }}>View Results</span>
          </button>
        </div>

      );
    }

    var date1 = new Date();
    var date2 = new Date("Feb 11, 2020 23:59:59 EST");
    var seconds = Math.abs(date1 - date2) / 1000;

    return (
      <div style={{ height: "100%" }}>
        <BrowserView style={{ height: "100%" }}>
          <div className={classes.mainHome} id="mainhome">

            <div className={classes.mainFlex} id="mainflex">

              <div className={classes.mainFlexContent} style={{ textAlign: "left" }}>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <div style={{ paddingLeft: "15%" }}>
                  <div style={{ textAlign: "left", display: "inline-block", fontFamily: "InterMedium", fontSize: "80px", fontWeight: "bold" }}>
                    See Your
                <div style={{ margin: "-20px" }}></div>
                    Perfect Match
              </div>
                  <br></br>
                  <br></br>
                  {/* <div style={{ textAlign: "left", display: "inline-block", fontFamily: "Inter", fontSize: "30px" }}>
                    Let our algorithm play cupid, and <br></br>you're in for a Valentine's Day you'll <br></br>never forget. </div>*/}

                  <div style={{ fontSize: "25px" }}>
                    {/* <p>Thank you so much to everyone who participated!
                        We had {this.state.count} submissions this year!</p>
                        <p>Log in again on February 12 at 6:00pm to view your results: matches and crush matches, their contact information, cool statistics, and follow-up Perfect Match events.</p> */}
                    <p>Thank you to all 5618 of you for participating! Log in to view your results.</p>

                  </div>
                  <br></br>
                  <br></br>

                  {/* <button className={classes.btnxl} onClick={function () {
            this.props.setState({
              state: Object.assign(this.props.state.state, {
                isSurveyPage: true

              })
            })
            this.props.history.push("/stats");
          }.bind(this)}>
            <span style={{ color: "#FB6466", fontFamily: "Inter", fontWeight: "bold" }}>Stats</span>
          </button> */}

                  {decision}
                  <br></br>
                  <br></br>
                  <div>

                    <button className={classes.btnxl} onClick={function () {
                      this.props.setState({
                        state: Object.assign(this.props.state.state, {
                          isSurveyPage: true

                        })
                      })
                      this.props.history.push("/followup");
                    }.bind(this)}>
                      <span style={{ color: "#FB6466", fontFamily: "Inter", fontWeight: "bold" }}>Followup Survey</span>
                    </button>
                  </div>
                  {/*
                  <br></br>
                  <h4 className={classes.pplCount}>{this.state.count} participants and counting</h4> */}
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                </div>
              </div>
              <div className={classes.mainFlexContent} style={{ textAlign: "right" }}>
                <div style={{ backgroundImage: "url(\"Networks.png\")", height: "100%", backgroundSize: "cover" }}></div>
              </div>
            </div>


          </div>
        </BrowserView>
        <MobileView style={{ height: "100%" }}>
          <div className={classes.mainHomeMobile}>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <img className={classes.logo} src={logoWhite} id="logo" />
            <br></br>
            <br></br>

            <br></br>
            <p style={{ textAlign: "center", fontFamily: "InterMedium", fontSize: "27px", fontWeight: "bold", color: "white" }}>
              See Your Perfect Match
              </p>
            {/* <p style={{ textAlign: "center", fontFamily: "Inter", fontSize: "20px", color: "white", marginTop: "-15px" }}>
            Get started with our survey
              </p> */}
            <div style={{ textAlign: "center", fontFamily: "Inter", fontSize: "20px", color: "white", marginTop: "-15px" }}>
              <p>Thank you to all 5618 of you for participating! Log in to view your results.</p>
              {/* <p>Log in again on February 12 at 6:00pm to view your results: matches and crush matches, their contact information, cool statistics, and follow-up Perfect Match events.</p>             */}
              {/* <button className={classes.btnxl} onClick={function () {
            this.props.setState({
              state: Object.assign(this.props.state.state, {
                isSurveyPage: true

              })
            })
            this.props.history.push("/stats");
          }.bind(this)}>
            <span style={{ color: "#FB6466", fontFamily: "Inter", fontWeight: "bold" }}>Stats</span>
          </button> */}

            </div>

            {/* <div style={{ fontSize: "20px",color:"white"}}>

              <Timer
                initialTime={(seconds) * 1000}
                direction="backward"
              >
                Only&nbsp;
     <Timer.Hours /> hours&nbsp;
 <Timer.Minutes /> minutes&nbsp;
 <Timer.Seconds /> seconds left to sign up!
      </Timer>
      <br>
      </br>
      <p>Results to be released Feb 12, 6:00 pm</p>
            </div>
             */}
            <br></br>
            {decision}
            <br></br>
            <br></br>
            <button className={classes.btnxl} onClick={function () {
                      this.props.setState({
                        state: Object.assign(this.props.state.state, {
                          isSurveyPage: true

                        })
                      })
                      this.props.history.push("/followup");
                    }.bind(this)}>
                      <span style={{ color: "#FB6466", fontFamily: "Inter", fontWeight: "bold" }}>Followup Survey</span>
                    </button>
            {/* 
            <br></br>
            <p className={classes.pplCount} style={{ color: "white" }}>{this.state.count} participants and counting</p> */}

            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </div>

        </MobileView>
      </div >
    );

    return (
      <div className={classes.mainHome}>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className={classes.mainFlex}>
          <div className={classes.mainFlexContent} id="content">
            <div style={{ textAlign: "left", display: "inline-block" }}>
              <span style={{ fontSize: "40px", display: "block", marginBottom: "-20px" }}>Find your</span>
              <span style={{ fontSize: "80px", fontFamily: "Poppins", color: "#ff2a4d" }}>Perfect Match</span>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>

            </div>
          </div>
          <div className={classes.mainFlexLogo} >
            <img className={classes.logo} src={logo} id="logo" />
          </div>
        </div>
      </div>
    );
    return (
      <div className={classes.mainHome}>


        <Fade>
          <br></br>

          <h1>Perfect Match</h1>

          <img className={classes.logo} src={logo} />
        </Fade>
        <br></br>
        <Fade delay={500}>
          <h3>Start the year off right. Meet someone new.</h3>
          <br></br>
          <div className={classes.homeDecBtn}> {decision}</div>
        </Fade>
        <br></br>
        <br></br>



        <Fade delay={1000}>
          <h4 className={classes.pplCount}>{this.state.count} participants and counting</h4>
          <br></br>

          <h4 className={classes.pplCount}>Survey closes Feb 12</h4>
        </Fade>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default HomePage;
