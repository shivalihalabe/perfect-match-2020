import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
//import { Provider } from 'react-redux'
//import { createStore } from 'redux'
//import start from "./leaves/leaves.js"
//require('./leaves/leaves.js')
import classes from "./index.module.css";
// import App from "./App";
import HomePage from "./Components/Home/HomePage";
import Contact from "./Components/Contact/Contact";
import About from "./Components/About/About";
import Survey from "./Components/Survey/Survey.js";
import FollowupSurvey from "./Components/Survey/FollowupSurvey.js";
import Results from "./Components/Results/Results.js";

import Statistics from "./Components/Statistics/Statistics.js";
import State from "./State.js";
import Navbar from "./Components/NavigationBar/NavigationBar"
import NavbarBottom from "./Components/NavigationBar/NavigationBarBottom"

import App from "./App"
import * as serviceWorker from "./serviceWorker";
import { isMobile } from "react-device-detect";




class Wrapper extends React.Component {
  //start the leaf scene falling leaves animation 
  componentDidMount() {
    //console.log(this.state.loggedIn)

  }
  componentWillMount() {
    //if there is already a state in the location (e.g. after a reload), use it. or else make a new one 
    if (this.props.location.state == null) {
      this.setState({
        state: new State()
      });
    } else {
      this.setState({
        state: this.props.location.state.state
      });
    }

    //if on iphone or ipad, beforeunload does not work, so use pagehide
    var isOnIOS = navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i);
    var eventName = isOnIOS ? "pagehide" : "beforeunload";
    //save the state in the location history on a reload 
    window.addEventListener(eventName, function (event) {
      this.props.history.replace(window.location.pathname, { state: this.state.state });
    }.bind(this));

    //IF YOU DONT DO THIS, YOU GET A WHITE SCREEN ON MOBILE BUT IT WORKS ON DESKTOP
    /*if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Mobile|Silk|Opera Mini/i.test(navigator.userAgent)) {

      document.getElementsByTagName("body")[0].style.height="100%"
      document.getElementsByTagName("body")[0].style.width="100%"
      document.getElementsByTagName("html")[0].style.height="100%"
      document.getElementsByTagName("html")[0].style.width="100%"
    }*/
  }

  //function to pass as setState to child components to set the global state
  setStatePass(object) {
    //console.log(object)
    this.setState(object)
  }

  render() {
    var windowSize = window.innerHeight
    var innerSize = windowSize-70
    //outer div is leaves
    //inside the routes, enclose divs to make it work well with xleaves. custom one alreadu in survey prop
    //inside routes, pass state and setstate bound to this into props of component
    var decision = (<NavbarBottom/>)
    //console.log(this.state.state.isSurveyPage)
    if(this.state.state.isSurveyPage && isMobile){
      //console.log("offit")
      decision=(<div></div>)
    }

    //FFE1E1
    return (
      <div style = {{overflow:"visible", backgroundColor:"#FFFFFF", minHeight:"100%"}}>
        <Navbar
          history={this.props.history}
          state={this.state.state}
          googleCallBack={App.googleResponseSuccess.bind(this)}
          setState={this.setStatePass.bind(this)}
        />
        
        <Route exact path="/" render={(props) => 
        (<HomePage {...props} state={this.state} setState={this.setStatePass.bind(this)} parent ={this} /> )} />
        <Route path="/about" render={(props) => (<About {...props} state={this.state} setState={this.setStatePass.bind(this)} /> )} />
        <Route path="/contact" render={(props) => (<Contact {...props} state={this.state} setState={this.setStatePass.bind(this)} />)} />
        <Route path="/survey" render={(props) => <Survey {...props} state={this.state} setState={this.setStatePass.bind(this)} />} />
        <Route path="/followup" render={(props) => <FollowupSurvey {...props} state={this.state} setState={this.setStatePass.bind(this)} parent ={this}/>} />
        <Route path="/results" render={(props) => <Results {...props} state={this.state} setState={this.setStatePass.bind(this)} />} />
        <Route path="/stats" render={(props) => <Statistics {...props} state={this.state} setState={this.setStatePass.bind(this)} />} />
          {decision}
      </div>
    )
  }
}


//this werid route inception is just so we have access to the props.location used above in the reload code that react router so nicely provides to us 

const root = (<Router><Route path="/" component={Wrapper} /></Router>)
ReactDOM.render(root, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

