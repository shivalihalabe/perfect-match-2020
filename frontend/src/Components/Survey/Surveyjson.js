module.exports = {
  json: {
    "title": "Perfect Match Survey!",
    "completedHtml": "<div style = \"text-align:center\">Submitting...<br>If it is taking too long, close this page and sign in again<br><br><div>",
    "pages": [
     {
      "name": "aboutyou",
      "elements": [
       {
        "type": "text",
        "name": "first_name",
        "title": "First Name",
        "isRequired": true
       },
       {
        "type": "text",
        "name": "last_name",
        "title": "Last Name",
        "isRequired": true
       },
       {
        "type": "text",
        "name": "facebook",
        "title": "Please provide a link to your Facebook profile"
       },
       {
        "type": "radiogroup",
        "name": "gender",
        "title": "What gender do you identify as?",
        "isRequired": true,
        "hasOther": true,
        "choices": [
         {
          "value": "male",
          "text": "Male"
         },
         {
          "value": "female",
          "text": "Female"
         }
         /*,
         {
          "value": "transmale",
          "text": "Transgender Male"
         },
         {
          "value": "transfemale",
          "text": "Transgender Female"
         }*/
        ]
       },
       {
        "type": "checkbox",
        "name": "genderpref",
        "title": "What genders would you like to be matched with? (check all that apply)",
        "isRequired": true,
        "hasOther": true,
        "choices": [
         {
          "value": "male",
          "text": "Male"
         },
         {
          "value": "female",
          "text": "Female"
         }
         /*,
         {
          "value": "transmale",
          "text": "Transgender Male"
         },
         {
          "value": "transfemale",
          "text": "Transgender Female"
         }*/
        ]
       },
       {
        "type": "text",
        "name": "age",
        "title": "What is your age?",
        "isRequired": true,
        "inputType": "number",
        "maxLength": 2
       },
       {
        "type": "multipletext",
        "name": "agepref",
        "title": "What age range would you like to be matched with?",
        "items": [
         {
          "name": "youngest",
          "title": "Youngest"
         },
         {
          "name": "oldest",
          "title": "Oldest"
         }
        ]
       },
       {
        "type": "text",
        "name": "height",
        "title": "How tall are you? (inches)",
        "isRequired": true,
        "inputType": "number",
        "maxLength": 2
       },
       {
        "type": "radiogroup",
        "name": "ethnicity",
        "title": "What is your ethnicity?",
        "isRequired": true,
        "hasOther": true,
        "choices": [
         {
          "value": "white",
          "text": "White"
         },
         {
          "value": "black",
          "text": "Black"
         },
         {
          "value": "eastasian",
          "text": "East Asian"
         },
         {
          "value": "southasian",
          "text": "South Asian"
         },
         {
          "value": "latino",
          "text": "Hispanic/Latino"
         }
        ]
       },
       {
        "type": "rating",
        "name": "politics",
        "title": "What are your political tendencies?",
        "isRequired": true,
        "minRateDescription": "Left",
        "maxRateDescription": "Right"
       },
       {
        "type": "radiogroup",
        "name": "year",
        "title": "What year are you?",
        "isRequired": true,
        "choices": [
         {
          "value": "freshman",
          "text": "Freshman"
         },
         {
          "value": "sophomore",
          "text": "Sophomore"
         },
         {
          "value": "junior",
          "text": "Junior"
         },
         {
          "value": "senior",
          "text": "Senior"
         },
         {
          "value": "masters",
          "text": "Masters Student"
         },
         {
          "value": "phd",
          "text": "PhD Student"
         },
         {
          "value": "faculty",
          "text": "Faculty/Staff"
         }
        ]
       },
       {
        "type": "checkbox",
        "name": "activities",
        "title": "Check all that apply to you",
        "isRequired": true,
        "choices": [
         {
          "value": "athlete",
          "text": "Student Athlete"
         },
         {
          "value": "greeklife",
          "text": "Greek Life"
         },
         {
          "value": "proffrat",
          "text": "Professional Fraternity"
         },
         {
          "value": "profclub",
          "text": "Professional Club"
         },
         {
          "value": "projectteam",
          "text": "Project Team"
         },
         {
          "value": "clubsports",
          "text": "Club Sports"
         },
         {
          "value": "socialclub",
          "text": "Social Club"
         },
         {
          "value": "culturalclub",
          "text": "Cultural Club"
         },
         {
          "value": "otherclub",
          "text": "Other Club"
         },
         {
          "value": "ra",
          "text": "RA"
         },
         {
          "value": "ta",
          "text": "TA"
         }
        ],
        "hasNone": true
       },
       {
        "type": "radiogroup",
        "name": "college",
        "title": "Which college are you affiliated with?",
        "isRequired": true,
        "choices": [
         {
          "value": "engineering",
          "text": "Engineering"
         },
         {
          "value": "arts",
          "text": "Arts and Sciences"
         },
         {
          "value": "cals",
          "text": "CALS"
         },
         {
          "value": "ilr",
          "text": "ILR"
         },
         {
          "value": "hotel",
          "text": "Hotel"
         },
         {
          "value": "humec",
          "text": "Human Ecology"
         },
         {
          "value": "aap",
          "text": "AAP"
         }
        ]
       },
       {
        "type": "text",
        "name": "major",
        "title": "What is your major?",
        "isRequired": true
       }
      ],
      "title": "Let's learn a little bit about you!"
     },
     {
      "name": "tendencies",
      "elements": [
       {
        "type": "radiogroup",
        "name": "friday",
        "title": "What would an average Friday night look like?",
        "isRequired": true,
        "choices": [
         {
          "value": "pjsnetflix",
          "text": "PJs & Netflix"
         },
         {
          "value": "netflixchill",
          "text": "Netflix & Chill"
         },
         {
          "value": "annex",
          "text": "Sticky Annex in Ctown "
         },
         {
          "value": "study",
          "text": "Studying"
         },
         {
          "value": "mixer",
          "text": "Mixer/Date Night"
         },
         {
          "value": "bars",
          "text": "Bar hopping from Rulloffs to Fishbowls (to Moonies)"
         }
        ]
       },
       {
        "type": "radiogroup",
        "name": "date",
        "title": "Where would you go on a first date?",
        "isRequired": true,
        "choices": [
         {
          "value": "coffee",
          "text": "Coffee on campus"
         },
         {
          "value": "starbucks",
          "text": "Starbucks in Ctown"
         },
         {
          "value": "ctb",
          "text": "CTB"
         },
         {
          "value": "commons",
          "text": "Restaurant in the Commons"
         },
         {
          "value": "dininghall",
          "text": "Dining Hall"
         },
         {
          "value": "fratparty",
          "text": "Meet up at a frat party "
         },
         {
          "value": "ctowndinner",
          "text": "Nice dinner at Ctown"
         },
         {
          "value": "bubbletea",
          "text": "Bubble Tea"
         }
        ]
       },
       {
        "type": "radiogroup",
        "name": "work",
        "title": "At what time of day are you most productive?",
        "isRequired": true,
        "choices": [
         {
          "value": "morning",
          "text": "Morning"
         },
         {
          "value": "afternoon",
          "text": "Afternoon"
         },
         {
          "value": "evening",
          "text": "Evening"
         },
         {
          "value": "nocturnal",
          "text": "Nocturnal"
         }
        ]
       },
       {
        "type": "multipletext",
        "name": "sleephabits",
        "title": "Sleep Habits",
        "items": [
         {
          "name": "sleeptime",
          "isRequired": true,
          "title": "On average, what time do you sleep?"
         },
         {
          "name": "waketime",
          "isRequired": true,
          "title": "On average, what time do you wake up?"
         }
        ]
       },
       {
        "type": "radiogroup",
        "name": "plans",
        "title": "Your plans get messed up for the day. You would...?",
        "isRequired": true,
        "choices": [
         {
          "value": "shift",
          "text": "Shift your day’s schedule"
         },
         {
          "value": "flow",
          "text": "Go with the flow"
         },
         {
          "value": "cancel",
          "text": "Cancel all your plans"
         },
         {
          "value": "new",
          "text": "Contact someone to make entirely new plans"
         }
        ]
       },
       {
        "type": "radiogroup",
        "name": "meal",
        "title": "Who would you most want to have a meal with?",
        "isRequired": true,
        "choices": [
         {
          "value": "political",
          "text": "Your favorite political leader"
         },
         {
          "value": "artist",
          "text": "Your favorite artist/musician"
         },
         {
          "value": "athlete",
          "text": "Your favorite athlete"
         },
         {
          "value": "scientist",
          "text": "Your favorite scientist"
         },
         {
          "value": "entrepreneur",
          "text": "Your favorite entrepreneur"
         },
         {
          "value": "actor",
          "text": "Your favorite actor/actress"
         }
        ]
       },
       {
        "type": "radiogroup",
        "name": "perfectday",
        "title": "What would your perfect day look like?",
        "isRequired": true,
        "choices": [
         {
          "value": "outdoor",
          "text": "Going on an outdoor adventure"
         },
         {
          "value": "netflix",
          "text": "Watching Netflix"
         },
         {
          "value": "newppl",
          "text": "Meeting new people"
         },
         {
          "value": "newfood",
          "text": "Trying new cuisines"
         },
         {
          "value": "museums",
          "text": "Visiting museums"
         },
         {
          "value": "gaming",
          "text": "Playing video games"
         },
         {
          "value": "sleep",
          "text": "Sleeping"
         },
         {
          "value": "friends",
          "text": "Hanging out with close friends"
         },
         {
          "value": "city",
          "text": "Exploring a city"
         },
         {
          "value": "study",
          "text": "Studying"
         }
        ]
       },
       {
        "type": "text",
        "name": "desscribeyou",
        "title": "Choose the best three words to describe your personality (funny, smart, charming, etc.)",
        "isRequired": true
       },
       {
        "type": "text",
        "name": "describepartner",
        "title": "Choose the best three words to describe your ideal partner",
        "isRequired": true
       },
       {
        "type": "radiogroup",
        "name": "todolist",
        "title": "Do you keep a formal Todo list?",
        "isRequired": true,
        "choices": [
         {
          "value": "yes",
          "text": "Yes"
         },
         {
          "value": "no",
          "text": "No"
         }
        ]
       },
       {
        "type": "radiogroup",
        "name": "startover",
        "title": "If you could start college all over again, would you?",
        "isRequired": true,
        "choices": [
         {
          "value": "yes",
          "text": "Yes"
         },
         {
          "value": "no",
          "text": "No"
         }
        ]
       },
       {
        "type": "radiogroup",
        "name": "timeormoney",
        "title": "Would you rather...?",
        "isRequired": true,
        "choices": [
         {
          "value": "time",
          "text": "Have more time"
         },
         {
          "value": "money",
          "text": "Have more money"
         }
        ]
       },
       {
        "type": "radiogroup",
        "name": "quality",
        "title": "What quality do you value most?",
        "isRequired": true,
        "choices": [
         {
          "value": "reliability",
          "text": "Reliability"
         },
         {
          "value": "humor",
          "text": "Humor"
         },
         {
          "value": "thoughtfulness",
          "text": "Thoughtfulness"
         },
         {
          "value": "independence",
          "text": "Independence"
         }
        ]
       }
      ],
      "title": "Let's have a look at some of your tendencies "
     },
     {
      "name": "personality",
      "elements": [
       {
        "type": "rating",
        "name": "p1",
        "title": "Most of my time is spent with the same group of friends",
        "isRequired": true,
        "rateValues": [
         "Strongly Disagree",
         "Disagree",
         "Sort of Agree",
         "Agree",
         "Strongly Agree"
        ]
       },
       {
        "type": "rating",
        "name": "p2",
        "title": "I like people who always seek adventure",
        "isRequired": true,
        "rateValues": [
         "Strongly Disagree",
         "Disagree",
         "Sort of Agree",
         "Agree",
         "Strongly Agree"
        ]
       },
       {
        "type": "rating",
        "name": "p3",
        "title": "I am more of an improvisor than a planner",
        "isRequired": true,
        "rateValues": [
         "Strongly Disagree",
         "Disagree",
         "Sort of Agree",
         "Agree",
         "Strongly Agree"
        ]
       },
       {
        "type": "rating",
        "name": "p4",
        "title": "I don’t mind being the center of attention",
        "isRequired": true,
        "rateValues": [
         "Strongly Disagree",
         "Disagree",
         "Sort of Agree",
         "Agree",
         "Strongly Agree"
        ]
       },
       {
        "type": "rating",
        "name": "p5",
        "title": "I find it easy to talk about emotions",
        "isRequired": true,
        "rateValues": [
         "Strongly Disagree",
         "Disagree",
         "Sort of Agree",
         "Agree",
         "Strongly Agree"
        ]
       },
       {
        "type": "rating",
        "name": "p6",
        "title": "I tend to put myself first and others second",
        "isRequired": true,
        "rateValues": [
         "Strongly Disagree",
         "Disagree",
         "Sort of Agree",
         "Agree",
         "Strongly Agree"
        ]
       },
       {
        "type": "rating",
        "name": "p7",
        "title": "If I had a business, I would find it difficult to fire loyal but underperforming employees",
        "isRequired": true,
        "rateValues": [
         "Strongly Disagree",
         "Disagree",
         "Sort of Agree",
         "Agree",
         "Strongly Agree"
        ]
       },
       {
        "type": "rating",
        "name": "p8",
        "title": "I see myself as more of a compromiser than a fighter",
        "isRequired": true,
        "rateValues": [
         "Strongly Disagree",
         "Disagree",
         "Sort of Agree",
         "Agree",
         "Strongly Agree"
        ]
       },
       {
        "type": "rating",
        "name": "p9",
        "title": "I would describe my friends as imaginative and creative",
        "isRequired": true,
        "rateValues": [
         "Strongly Disagree",
         "Disagree",
         "Sort of Agree",
         "Agree",
         "Strongly Agree"
        ]
       },
       {
        "type": "rating",
        "name": "p10",
        "title": "Winning an argument matters more to me than making sure no one is upset",
        "isRequired": true,
        "rateValues": [
         "Strongly Disagree",
         "Disagree",
         "Sort of Agree",
         "Agree",
         "Strongly Agree"
        ]
       },
       {
        "type": "rating",
        "name": "p11",
        "title": "I like it when people always say what’s on their mind",
        "isRequired": true,
        "rateValues": [
         "Strongly Disagree",
         "Disagree",
         "Sort of Agree",
         "Agree",
         "Strongly Agree"
        ]
       },
       {
        "type": "rating",
        "name": "p12",
        "title": "I get anxious right before exams",
        "isRequired": true,
        "rateValues": [
         "Strongly Disagree",
         "Disagree",
         "Sort of Agree",
         "Agree",
         "Strongly Agree"
        ]
       },
       {
        "type": "rating",
        "name": "p13",
        "title": "I have the ability to change my mood quickly",
        "isRequired": true,
        "rateValues": [
         "Strongly Disagree",
         "Disagree",
         "Sort of Agree",
         "Agree",
         "Strongly Agree"
        ]
       },
       {
        "type": "rating",
        "name": "p14",
        "title": "I'd take a challenging (but interesting) class over an easy (but boring) class",
        "isRequired": true,
        "rateValues": [
         "Strongly Disagree",
         "Disagree",
         "Sort of Agree",
         "Agree",
         "Strongly Agree"
        ]
       },
       {
        "type": "rating",
        "name": "p15",
        "title": "When a friend is sad, I am more likely to offer solutions to the problem rather than emotional support",
        "isRequired": true,
        "rateValues": [
         "Strongly Disagree",
         "Disagree",
         "Sort of Agree",
         "Agree",
         "Strongly Agree"
        ]
       },
       {
        "type": "rating",
        "name": "p16",
        "title": "When I have a personal problem, I try to solve it on my own rather than talk to others",
        "isRequired": true,
        "rateValues": [
         "Strongly Disagree",
         "Disagree",
         "Sort of Agree",
         "Agree",
         "Strongly Agree"
        ]
       },
       {
        "type": "rating",
        "name": "p17",
        "title": "I enjoy debating with other people",
        "isRequired": true,
        "rateValues": [
         "Strongly Disagree",
         "Disagree",
         "Sort of Agree",
         "Agree",
         "Strongly Agree"
        ]
       },
       {
        "type": "rating",
        "name": "p18",
        "title": "I spend time exploring unrealistic, intriguing ideas",
        "isRequired": true,
        "rateValues": [
         "Strongly Disagree",
         "Disagree",
         "Sort of Agree",
         "Agree",
         "Strongly Agree"
        ]
       },
       {
        "type": "rating",
        "name": "introvert",
        "title": "Rate your introverted/extrovertedness on a scale from 1-10",
        "isRequired": true,
        "rateValues": [
         {
          "value": "1",
          "text": "Very Introverted 1"
         },
         "2",
         "3",
         "4",
         "5",
         "6",
         "7",
         "8",
         "9",
         {
          "value": "10",
          "text": "10 Very Extroverted"
         }
        ]
       }
      ],
      "title": "Let's learn about your personality"
     },
     {
      "name": "finalqs",
      "elements": [
       {
        "type": "text",
        "name": "numdated",
        "title": "How many people have you dated in the last 5 years?"
       },
       {
        "type": "text",
        "name": "longestrelationship",
        "title": "How many months was your longest relationship?"
       },
       {
        "type": "radiogroup",
        "name": "commitment",
        "title": "What are you looking for by taking this survey?",
        "isRequired": true,
        "choices": [
         {
          "value": "plantomeet",
          "text": "I plan to meet my matches"
         },
         {
          "value": "willsee",
          "text": "I will potentially meet with my matches"
         },
         {
          "value": "meetfriends",
          "text": "I just want to meet new people"
         },
         {
          "value": "fun",
          "text": "I am taking this for fun and will probably not make an effort to meet"
         }
        ]
       },
       {
        "type": "html",
        "name": "disregard1",
        "html": "Disclaimer: <br><i>Cornell Business Analytics does not take any responsibility and is not liable for any distress caused through the use of our service Perfect Match. By responding to this form, you are giving Cornell Business Analytics the right to process your data and match you with another individual at Cornell. Cornell Business Analytics takes precautions to protect your privacy, and to keep your information secure. We strive to be transparent in the way we process your data and will be sharing our project’s process with you soon!</i>"
       }
      ],
      "title": "Some final questions"
     },
     {
      "name": "crushmatch",
      "elements": [
       {
        "type": "html",
        "name": "disregard2",
        "html": "Crush Match is a newly added optional feature that allows you to indicate a Crush (or Crushes) to our algorithm by use of their NetID. If your Crush is crushing on you as well, the quiz will pair you together and deem you a <strong>Perfect Match</strong>! And if not, don’t worry— no one will ever know your secret.\n"
       },
       {
        "type": "text",
        "name": "crushmatchIDs",
        "title": "List the NetIDs of people who you would want to be matched with, comma separated (maximum 3)"
       }
      ],
      "title": "Crush Match!"
     }
    ]
   }

}