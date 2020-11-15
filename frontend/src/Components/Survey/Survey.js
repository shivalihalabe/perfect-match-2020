import React from "react";
import Navbar from "../NavigationBar/NavigationBar";
import { GoogleLogin } from "react-google-login";
import App from "../../App.js";
import State from "../../State.js";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import "survey-react/survey.react";
import classes from "./Survey.module.css";
import Surveyjson from "./Surveyjson.js"

class SurveyClass extends React.Component {
  //save their responses and page number if they navigate to any other page
  componentWillUnmount() {
    this.props.setState({
      state: Object.assign(this.props.state.state, {
        response: this.survey.data,
        currentPage: this.survey.currentPageNo,
        isSurveyPage:false
      })
    })
  }
 componentWillMount(){
  /*this.props.setState({
    state: Object.assign(this.props.state.state, {
      //isSurveyPage:true

    })
  })*/
 }
  //code to be run when survey is submitted 
  onCompleteFollowup = function (result) {
    fetch(App.backendURL + "submit_survey", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.props.state.state.email,
        token: this.props.state.state.accessToken,
        data: result.data
      })
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
          this.survey.completedHtml = "<div style = \"text-align:center\"><span style = 'font-size:20px'>Submitted!<br>You can reload the page or log in again later to change your answers.<br><br>While you wait for results, share the Perfect Match link with your friends, and consider applying to <a href = 'http://www.cornellbusinessanalytics.com/apply' target = '_blank'>CBA!</a></span></div>"
          //sets the dont reload flag to true. this is so render doesn't update on the state change and try to make a new survey

          this.dontReload = true
          this.props.setState({
            state: Object.assign(this.props.state.state, {
              hasTaken: true,
              response: result.data
            })
          });
        }.bind(this)).catch(function (err) {
          console.log(err)
          this.survey.completedHtml = "<div style = \"text-align:center\">Oops! Something went wrong :/<br><br></div>"
        }.bind(this))
  };

  render() {
    let json = Surveyjson.json
    //if coming off a submit, don't reload the survey 
    if (this.dontReload != true) {
      this.survey = new Survey.Model(json);
      var survey = this.survey
      //set tonthe current page number 
      survey.currentPageNo = this.props.state.state.currentPage
      //autofill in name if first time taking
      if (this.props.state.state.hasTaken != true) {
        survey.data = {
          first_name: this.props.state.state.firstName,
          last_name: this.props.state.state.lastName
        };
      }
     //auto fill previous submission if have taken before
     if(this.props.state.state.response){
      survey.data = this.props.state.state.response
     }
      
    }

    var survey = this.survey
    
    var defaultThemeColors = Survey
    .StylesManager
    .ThemeColors["default"];
defaultThemeColors["$main-color"] = "#FB6466";
defaultThemeColors["$main-hover-color"] = "#6fe06f";
defaultThemeColors["$text-color"] = "#4a4a4a";
defaultThemeColors["$header-color"] = "#4a4a4a";

defaultThemeColors["$header-background-color"] = "#FFFFFF";
defaultThemeColors["$body-container-background-color"] = "#fff2f2";
Survey.StylesManager.applyTheme("default");
    var myCss = {
      footer: classes.footer,
      navigation: {
        complete: "btn btn-success " + classes.padding,
        next: "btn " + classes.padding
      },
      radiogroup: "button btn-lg ",
      pageTitle: classes.pageTitle
    };

    //if they are accessing without logging in
    if (this.props.state.state.loggedIn != true && !App.noServer && false) {
      return (
        <div>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
         <br></br>
          <h1>Please sign in to take the survey</h1>
        </div>
      );
    }
    //return survey
    {/*div className={classes.surveyPage}>*/}
      
        {/*<div style={{ height: "auto", marginLeft: "15px", marginRight: "15px", marginBottom: "200px", backgroundColor: "rgba(255, 255, 255, 0.85)" }}>*/}
    return (
        <div className={classes.surveyWrapper} >
          <p style={{ position: "absolute", zIndex: "-1", fontSize: "40px", opacity: "0" }}>If the survey hasn't loaded, simply reload the page</p>
          <div style = {{height:"80px"}}></div>

          <Survey.Survey
            model={survey}
            onComplete={this.onCompleteFollowup.bind(this)}
          />
          <br></br>
          <br></br>
          <br></br>

</div>
      
    );
  }
}

export default SurveyClass;