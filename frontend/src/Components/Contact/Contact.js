import React from "react";
import Navbar from "../NavigationBar/NavigationBar";
import { GoogleLogin } from 'react-google-login';
import App from "../../App.js"
import State from "../../State.js"
import classes from "./Contact.module.css";


class Contact extends React.Component {

  render() {
    return (
      <div className={classes.mainAbout}>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <h1 className={classes.aboutHeader}>Contact</h1>
        <br></br>
        <br></br>
        <div className={classes.aboutText}>
          <p>
            Want to share your thoughts, ask a question, or just say hi? We’d love to hear from you!
</p>
          <a class = {classes.cbaHover} href="mailto:cornell.perfectmatch@gmail.com">cornell.perfectmatch@gmail.com</a>
          <br></br>
          <br></br>

          <p>Want to learn more about or apply to Cornell Business Analytics?</p>
          <a class = {classes.cbaHover} href="http://www.cornellbusinessanalytics.com/apply" target="_blank">cornellbusinessanalytics.com</a>

          <br></br>
          <br></br>

          <p>Have any burning questions? Check out our Reddit AMA.</p>
          <a class = {classes.cbaHover} href="https://www.reddit.com/r/Cornell/comments/ey6kiu/perfect_match_ama_v20/" target="_blank">Reddit AMA</a>

          <br></br>
          <br></br>

          <p>Share the link with your friends, and help bring some joy back to Valentine's Day!</p>
        </div>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default Contact;
