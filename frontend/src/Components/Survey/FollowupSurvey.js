import React from "react";
import Navbar from "../NavigationBar/NavigationBar";
import { GoogleLogin } from "react-google-login";
import App from "../../App.js";
import State from "../../State.js";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import "survey-react/survey.react";
import classes from "./Survey.module.css";
import Surveyjson from "./FollowupSurveyJson.js"


class FollowupSurvey extends React.Component {
    //save their responses and page number if they navigate to any other page
    componentWillUnmount() {
        this.props.setState({
            state: Object.assign(this.props.state.state, {
                //response: this.survey.data,
                //currentPage: this.survey.currentPageNo,
                isSurveyPage: false
            })
        })
    }
    componentWillMount() {

    }
    //code to be run when survey is submitted 
    onCompleteFollowup = function (result) {
        fetch(App.backendURL + "submit_followup_survey", {
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
                    this.survey.completedHtml = "<div style = \"text-align:center\"><span style = 'font-size:20px'>Submitted!<br>Thank you so much for participating in Perfect Match!</span></div>"

                    //sets the dont reload flag to true. this is so render doesn't update on the state change and try to make a new survey
                    this.dontReload = true
                    this.setState({ state: this.state });
                    //   this.props.setState({
                    //     state: Object.assign(this.props.state.state, {
                    //       //hasTaken: true,
                    //       //response: result.data
                    //     })
                    //   });
                }.bind(this)).catch(function (err) {
                    console.log(err)
                    this.survey.completedHtml = "<div style = \"text-align:center\">Oops! Something went wrong :/<br><br>Please try again</div>"
                }.bind(this))
    };
    googleFail(resp) {
        console.log(resp)
      }
    render() {

        let result = this.props.state.state.results

        //let json = Surveyjson.json
        //if coming off a submit, don't reload the survey 
        if (this.dontReload != true) {
            console.log(Surveyjson.buildSurvey(result))
            this.survey = new Survey.Model(Surveyjson.buildSurvey(result));
            var survey = this.survey
            //set tonthe current page number 
            survey.currentPageNo = this.props.state.state.currentPage
            //autofill in name if first time taking
            //   if (this.props.state.state.hasTaken != true) {
            //     survey.data = {
            //       first_name: this.props.state.state.firstName,
            //       last_name: this.props.state.state.lastName
            //     };
            //   }
            //auto fill previous submission if have taken before
            /*if (this.props.state.state.response) {
                survey.data = this.props.state.state.response
            }*/


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


        //if they are accessing without logging in
        if (this.props.state.state.loggedIn != true && !App.noServer) {
            return (
                <div style={{ backgroundColor: "#FB6466", height: "100%", textAlign: "center", color: "white", fontFamily: "Inter" }}>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h1>Please sign in to take the follow-up survey!</h1>
                    <br></br>
                    <br></br>
                    <GoogleLogin
                        clientId="29949178420-0opvqqshb6ltbdmhceqgcout83b7s5i2.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={App.googleResponseSuccess.bind(this.props.parent)}
                        onFailure={this.googleFail}
                        cookiePolicy={"single_host_origin"}
                        render={renderProps => (
                            <div>
                                <button variant="basic" className={classes.btnxl} onClick={renderProps.onClick}>
                                    <span style={{ color: "#FB6466", fontFamily: "Inter", fontWeight: "bold" }}>Login</span>
                                </button>
                            </div>
                        )}
                    />
                </div>
            );
        }
        //return survey
        {/*div className={classes.surveyPage}>*/ }

        {/*<div style={{ height: "auto", marginLeft: "15px", marginRight: "15px", marginBottom: "200px", backgroundColor: "rgba(255, 255, 255, 0.85)" }}>*/ }
        return (
            <div className={classes.surveyWrapper} >
                <p style={{ position: "absolute", zIndex: "-1", fontSize: "40px", opacity: "0" }}>If the survey hasn't loaded, simply reload the page</p>
                <div style={{ height: "80px" }}></div>

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

export default FollowupSurvey;