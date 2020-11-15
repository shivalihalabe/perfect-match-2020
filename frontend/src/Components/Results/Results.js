import React from "react";
import Navbar from "../NavigationBar/NavigationBar";
import { GoogleLogin } from 'react-google-login';
import App from "../../App.js"
import State from "../../State.js"
import classes from "./Results.module.css";

import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
  } from "react-device-detect";

class Results extends React.Component {

    componentWillUnmount() {
        this.props.setState({
          state: Object.assign(this.props.state.state, {
            isSurveyPage:false
          })
        })
      }
      componentWillMount(){
          this.sampleJSON = {
              list: this.props.state.state.results
          }
          if(this.sampleJSON==null){
              this.sampleJSON = []
          }
      }


  render() {
    
    var html = ""
    for (var i = 0; i < this.sampleJSON.list.length; i++) {
        if(this.sampleJSON.list[i].crush!=null){
            html+="❤️❤️ ";
        }
        html+= "Match " + (i+1) + ":<br>"
        html += this.sampleJSON.list[i].name + " (" + this.sampleJSON.list[i].netid + ")" + "<br>"
        if(this.sampleJSON.list[i].fb==""){
            html+= "Facebook: " + "No Facebook profile provided" + "<br><br>"
        }else{
        html+= "Facebook: " + this.sampleJSON.list[i].fb + "<br><br>"
        }
      }
      console.log(html)
    if (this.props.state.state.loggedIn != true && !App.noServer) {
        return (
          <div>
           <br></br>
           <br></br>
           <br></br>
           <br></br>
           <br></br>
            <h1>Please sign in to see your results</h1>
          </div>
        );
    }

    return (
      <div className={classes.mainResults}>
        <BrowserView>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <h1 className={classes.resultsHeader}>Results!</h1>
        <br></br>
        <br></br>
        <div className={classes.resultsBox}>
        <div className={classes.resultsInnerBox}>
        <br></br>
            <span className = {classes.resultsText}>Matches</span> <br></br>
            <span style = {{fontSize:"15px"}}>❤️❤️ indicates a Crush Match</span><br></br>

            <div style = {{textAlign:"left",fontSize:"18px"}} dangerouslySetInnerHTML={{ __html: html }}></div>
<br></br>
        </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div className={classes.resultsBox}>
        <div className={classes.resultsInnerBox}>
        <br></br>
        <span className = {classes.resultsText}>Not sure how to reach out?</span> <br></br><br></br>
        <div style = {{textAlign:"left"}}>
        <span className = {classes.smallText}>
        We suggest messaging your matches over email or social media. Last year, those who reached out had a 70% response rate. Don't be shy! 
        <br></br>
        <br></br>
        Feel free to use this template:
        <br></br>
        <br></br>
        Hi [name],
        <br></br>
        <br></br>
        I'm [name], and I saw that we were matched through Perfect Match. I was wondering if you'd like to grab coffee some time this week. Let me know what works for you! 
        <br></br>
        <br></br>
        Best,
        <br></br>
        [name]

        </span>
        </div>
            </div>
            <br></br>
            </div>
            <br></br>
        <br></br>
        <br></br>
        <div className={classes.resultsBox}>
        <div className={classes.resultsInnerBox}>
        <br></br>
        <span className = {classes.resultsText}>Not sure what to do next?</span> <br></br><br></br>
        <div style = {{textAlign:"left"}}>
        <span className = {classes.smallText}>
        Perfect Match Trivia Event: RSVP <a href="https://www.facebook.com/events/226636071675601/" target="_blank">here!</a>
        <br></br>
        Utea: 15% off for participants on Valentine's day!
        </span>
        </div>
            </div>
            <br></br>
            </div>
            <br></br>
        <br></br>
        <br></br>
        <div className={classes.resultsBox}>
        <div className={classes.resultsInnerBox}>
        <br></br>
        <span className = {classes.resultsText}>Some cool statistics</span> <br></br><br></br>
        <div style = {{textAlign:"left"}}>
        <span className = {classes.smallText}>
        Number of participants: 5618
        <br></br>
        Increase over last year: 37%
        <br>
        </br>
        Participants who submitted crushes: 2176
        <br>
        </br>
        Number of successful crush matches: 226
        <br></br>
        Most crushed on person: 7 crushes
        <br></br>
        Total number of matches generated: 20866
        </span>
        </div>
            </div>
            <br></br>
            </div>
            <br></br>
        <br></br>
        <br></br>
        <div className={classes.resultsBox}>
        <div className={classes.resultsInnerBox}>
        <br></br>
        <span className = {classes.resultsText}>Thank You!</span> <br></br><br></br>
        <div style = {{textAlign:"left"}}>
        <span className = {classes.smallText}>
            From the Perfect Match team, thank you so much for participating in this year's survey! This was our second year hosting the service, and we were blown away by all the support. If you have any questions or feeback about the process, don't hesitate to reach out to us at cornell.perfectmatch@gmail.com. If you would like to join the team for next year, check back in the Fall for details!
        </span>
        </div>
            </div>
            <br></br>
            </div>
<br></br>
<br></br>
<br></br>

            <p id="disclaimer" style = {{marginLeft:"300px",marginRight:"300px",fontSize:"12px"}}>
              Cornell Business Analytics, Perfect Match, and Cornell University shall not be held responsible or liable for any distress,
              harm,
              injury or property damage caused by the use of our service Perfect Match. The intent of this email is limited
              to
              informing participants of Perfect Match about their match. Cornell Business Analytics, Perfect Match, Cornell University,
              its’
              trustees, officers, agents, volunteers, and employees, shall not be held responsible or liable for any future
              action taken by the matched individuals. Cornell Business Analytics and Cornell University does not imply that
              the
              matched individuals meet and has no role in any meetings or activities between matched individuals. Perfect Match takes precautions to protect your privacy and keep your information secure. We strive to be
        transparent in the way we process your data and will be sharing our project’s process with you soon!<br></br>
            </p>
            </BrowserView>
            <MobileView>


            <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <h1 className={classes.resultsHeader}>Results!</h1>
        <br></br>
        <br></br>
        <div className={classes.resultsBox}>
        <div className={classes.resultsInnerBox}>
        <br></br>
            <span className = {classes.resultsText}>Matches</span> <br></br>
            <span style = {{fontSize:"15px"}}>❤️❤️ indicates a Crush Match</span><br></br>

            <div style = {{textAlign:"left",fontSize:"18px"}} dangerouslySetInnerHTML={{ __html: html }}></div>
<br></br>
        </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div className={classes.resultsBox}>
        <div className={classes.resultsInnerBox}>
        <br></br>
        <span className = {classes.resultsText}>Not sure how to reach out?</span> <br></br><br></br>
        <div style = {{textAlign:"left"}}>
        <span className = {classes.smallText}>
        We suggest messaging your matches over email or social media. Last year, those who reached out had a 70% response rate. Don't be shy! 
        <br></br>
        <br></br>
        Feel free to use this template:
        <br></br>
        <br></br>
        Hi [name],
        <br></br>
        <br></br>
        I'm [name], and I saw that we were matched through Perfect Match. I was wondering if you'd like to grab coffee some time this week. Let me know what works for you! 
        <br></br>
        <br></br>
        Best,
        <br></br>
        [name]

        </span>
        </div>
            </div>
            <br></br>
            </div>
            <br></br>
        <br></br>
        <br></br>
        <div className={classes.resultsBox}>
        <div className={classes.resultsInnerBox}>
        <br></br>
        <span className = {classes.resultsText}>Not sure what to do next?</span> <br></br><br></br>
        <div style = {{textAlign:"left"}}>
        <span className = {classes.smallText}>
        Perfect Match Trivia Event: RSVP <a href="https://www.facebook.com/events/226636071675601/" target="_blank">here!</a>
        <br></br>
        Utea: 15% off for participants on Valentine's day!
        </span>
        </div>
            </div>
            <br></br>
            </div>
            <br></br>
        <br></br>
        <br></br>
        <div className={classes.resultsBox}>
        <div className={classes.resultsInnerBox}>
        <br></br>
        <span className = {classes.resultsText}>Some cool statistics</span> <br></br><br></br>
        <div style = {{textAlign:"left"}}>
        <span className = {classes.smallText}>
        Number of participants: 5618
        <br></br>
        Increase over last year: 37%
        <br>
        </br>
        Participants who submitted crushes: 2176
        <br>
        </br>
        Number of successful crush matches: 226
        <br></br>
        Most crushed on person: 7 crushes
        <br></br>
        Total number of matches generated: 20866
        </span>
        </div>
            </div>
            <br></br>
            </div>
            <br></br>
        <br></br>
        <br></br>
        <div className={classes.resultsBox}>
        <div className={classes.resultsInnerBox}>
        <br></br>
        <span className = {classes.resultsText}>Thank You!</span> <br></br><br></br>
        <div style = {{textAlign:"left"}}>
        <span className = {classes.smallText}>
            From the Perfect Match team, thank you so much for participating in this year's survey! This was our second year hosting the service, and we were blown away by all the support. If you have any questions or feeback about the process, don't hesitate to reach out to us at cornell.perfectmatch@gmail.com. If you would like to join the team for next year, check back in the Fall for details!
        </span>
        </div>
            </div>
            <br></br>
            </div>
<br></br>
<br></br>
<br></br>

            <p id="disclaimer" style = {{marginLeft:"50px",marginRight:"50px",fontSize:"12px"}}>
              Cornell Business Analytics, Perfect Match, and Cornell University shall not be held responsible or liable for any distress,
              harm,
              injury or property damage caused by the use of our service Perfect Match. The intent of this email is limited
              to
              informing participants of Perfect Match about their match. Cornell Business Analytics, Perfect Match, Cornell University,
              its’
              trustees, officers, agents, volunteers, and employees, shall not be held responsible or liable for any future
              action taken by the matched individuals. Cornell Business Analytics and Cornell University does not imply that
              the
              matched individuals meet and has no role in any meetings or activities between matched individuals. Perfect Match takes precautions to protect your privacy and keep your information secure. We strive to be
        transparent in the way we process your data and will be sharing our project’s process with you soon!<br></br>
            </p>



            </MobileView>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default Results;
