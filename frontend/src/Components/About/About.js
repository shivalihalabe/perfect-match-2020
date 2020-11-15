import React from "react";
import Navbar from "../NavigationBar/NavigationBar";
import { GoogleLogin } from "react-google-login";
import App from "../../App.js";
import State from "../../State.js";
import classes from "./About.module.css";
import Faq from 'react-faq-component';

class About extends React.Component {

  render() {

    const data = {
      title: `FAQ`,
      rows: [
        {
          title: "What is Perfect Match?",
          content: `Perfect Match is a Valentine’s Day matchmaking quiz ideated by Cornell Business Analytics in 2019. Using a machine learning algorithm, we use your survey to pair you with other Cornell students— your Perfect Matches! Last year we garnered over 4,000 participants. Share the link with your friends and help bring some joy back to Valentine's Day!`
        },
        {
          title: "What is the timeline of Perfect Match?",
          content: "The quiz closes at 11:59PM EST on February 11. Results will be released soon after the deadline passes."
        },/*
        {
          title: "What is Crush Match?",
          content: "Crush Match is a newly added feature that allows you to indicate a Crush (or Crushes) to our algorithm by use of their NetID. If your Crush is crushing on you as well, the quiz will pair you together! And if not, don’t worry— no one will ever know your secret."
        },*/
        {
          title: "Can I change my answers after I submit the survey?",
          content: "Yes! Just log back into the site at any time, and you will be able to edit your answers."
        },
        {
          title: "How many matches will I get?",
          content: "Most participants get between 3 and 5 matches."
        },
        {
          title: "What should I do when I receive my Matches?",
          content: `It’s up to you! Contact your Matches in any way you’d like. Perfect Match will host a special meet-up event for our participants on February 14, but feel free to also connect in a setting of your choice.`
        },
        {
          title: "What algorithm does Perfect Match use?",
          content: `The Perfect Match algorithm can be broken into two parts: rankings and matching. First, we use a machine learning algorithm to rank a participant against all other participants who satisfy their main criteria. We then use a variant of the Gale-Shapley algorithm to generate stable matches for the participant based on those rankings.`
        },
        {
          title: "What happens to my data?",
          content: `Your data is safe with us! We will never share your data with a third party, and we will only interact with your information as needed to resolve user issues. We may collect anonymous statistics to improve our algorithm, but your identity will always be separated from such reports.`
        },
        {
          title: "Can I help out with Perfect Match?",
          content: `We will be accepting applications to join the team in the Fall. Stay tuned!`
        },
        {
          title: "Where can I get more information?",
          content: `Don't hesitate to visit the contact page and send us an email. We'd love to hear from you! We also have a Reddit AMA to answer any other questions you may have. Check it out here: <a href = "https://www.reddit.com/r/Cornell/comments/ey6kiu/perfect_match_ama_v20/" style = "color: #2c2c2c;" target = "_blank">Reddit AMA.</a>`
        }
      ]
    }

    const styles = {
      bgColor: '#FB6466',
      titleTextColor: 'white',
      rowTitleColor: 'white',
      rowContentColor: 'white'
    }
    return (
      <div className={classes.mainAbout}>



        <br></br>

        {/* <h1 className={classes.aboutHeader}>About</h1> */}
        <br></br>
        <br></br>
        <br></br>
        <div className={classes.aboutText}>
          <br></br>
          <Faq data={data} styles={styles} />
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default About;
