import React from "react";
import Navbar from "../NavigationBar/NavigationBar";
import { GoogleLogin } from "react-google-login";
import App from "../../App.js";
import State from "../../State.js";
import classes from "./Statistics.module.css";

import renderHTML from 'react-render-html';

import { isMobile } from "react-device-detect";
class About extends React.Component {
  componentWillMount() {
    this.setState({
      year: "2019"
    })
  }
  rerenderJS() {
    if (true) {
      if (document.getElementById("d3script") != null) {
        document.body.removeChild(document.getElementById("d3script"));
        console.log("removing")

      }
      else{
        console.log("unfound")
      }
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.id = "d3script"
      if(this.state.year=="2019"){
      s.src = "/index2.js"
      }
      else{
        s.src = "/index3.js"

      }
      document.body.appendChild(s);
    }

  }
  componentDidMount() {
    //console.log(document.getElementById("mainflex").style)
    this.rerenderJS()
  }

  componentDidUpdate() {
    if(this.state.year=="2019"){
    this.rerenderJS()
    }
    else{
      this.rerenderJS()
    }
  }
  render() {

    var template = { __html: '<svg id="bar" height="400" width="710"/>' };
    var template2 = { __html: '<svg id="bar_rel" height="400" width="710"/>' };
    var template3 = { __html: '<svg id="stats" height="250" width="800"/>' };
    var template4 = { __html: '<div style="margin: 0 auto; width: 800; font-family: "Montserrat", sans-serif; font-size: 0.9vw;"><div style="display: inline-flex; color: #505050; width: 500px; flex-direction: row; justify-content: space-between;  font-family: "Inconsolata"; margin: 0 auto;">	<div class="toggle" id="toggle_budget" style="text-align: center; color: black; background: #FFD1AD; border-width: 2px; border-style: solid; border-color: #FFD1AD; margin: 10px; border-radius: 5px;"><p style = "color:#2c2c2c;margin-top:12px;margin-left:12px;margin-right:12px;">you\'re on a budget</p></div><div class="toggle" id="toggle_friday" style="text-align: center; background: #f8f8f8; border-width: 2px; border-style: solid; border-color: #f8f8f8; margin: 10px; border-radius: 5px;"><p style = "color:#2c2c2c;margin-top:12px;margin-left:12px;margin-right:12px;">it\'s nighttime</p></div><div class="toggle" id="toggle_first" style="text-align: center; background: #f8f8f8; border-width: 2px; border-style: solid; border-color: #f8f8f8; margin: 10px; border-radius: 5px;"><p style = "color:#2c2c2c;margin-top:12px;margin-left:12px;margin-right:12px;">it\'s your first date</p></div></div>' }
    var template5 = { __html: '<svg class="bar" height="500" width="870"/>' };

    var color19 = "white"
    var color20 = "white"
    var tabDecision = (
      <div>
      </div>
    )

    if (this.state.year == "2019") {
      color20 = "#DDDDDD"
      tabDecision = (
        <div>
        <br></br>
          <h3>In 2019, 4097 people participated in the Perfect Match survey. <br></br>Let's take a look at the breakdown:</h3>
          <div style={{ textAlign: "center" }} dangerouslySetInnerHTML={template} />
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h3 style={{ fontFamily: "Montserrat", fontSize: "20", fontWeight: "bold" }}>What types of relationships were people looking for last year?</h3>
          <div style={{ textAlign: "center" }} dangerouslySetInnerHTML={template2} />
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h3>Need to plan a date but...</h3>

          <div style={{ textAlign: "center", flex: 1, flexDirection: 'row', justifyContent: 'space-between' }} dangerouslySetInnerHTML={template4} />
          <h3>Not to worry, participants have voted on their favorite locations:</h3>
          <div style={{ textAlign: "center" }} dangerouslySetInnerHTML={template3} />
        </div>
      )
    }
    else {
      color19 = "#DDDDDD"
      tabDecision = (
        <div>
                  <div style={{ textAlign: "center" }} dangerouslySetInnerHTML={template5} />

        </div>
      )
    }

    var decision = (
      <div>
        <div>

          <button className={classes.btnleft} style={{ backgroundColor: color19 }} onClick={() => {
            if(this.state.year!="2019"){
            this.setState({ year: "2019" })
            }
            //console.log("forcing")
          }}>
            <span style={{ color: "#FB6466", fontFamily: "Inter", fontWeight: "bold", fontSize: "15px" }}>2019</span>
          </button>
          <button className={classes.btnright} style={{ backgroundColor: color20 }} onClick={() => this.setState({ year: "2020" })}>
            <span style={{ color: "#FB6466", fontFamily: "Inter", fontWeight: "bold", fontSize: "15px" }}>2020</span>
          </button>
          <br></br>
          <br></br>
          {tabDecision}
        </div>

      </div>)
    if (isMobile) {
      decision = (<div><h3 style = {{fontSize:"20px"}}>Check out our desktop site to see the statistics page</h3><br></br>
        <br></br>
       </div>)
    }
    return (
      <div className={classes.mainAbout}>




        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className={classes.aboutText}>

          <br></br>
          <br></br>
          {decision}

          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          {/* <div style = {{position: "relative"}}>
            <p className={classes.aboutName} style={{fontFamily: 'Inconsolata', position: "absolute", bottom: 0, right: 5}}>made with 💖 and 🍵 by lh</p>
          </div> */}

          <br></br>
          <br></br>
        </div>
      </div>
    );
  }
}

export default About;
