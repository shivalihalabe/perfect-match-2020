
module.exports = {

    buildSurvey: function (results) {

        let replaceObj = function (object, result, num) {

            Object.keys(object).forEach(function (key, index) {
                if (typeof object[key] === 'string' || object[key] instanceof String) {
                    object[key] = object[key].replace(/<Match Num>/g, num + "")
                    object[key] = object[key].replace(/<Match Name>/g, result.name + "")
                }
            });

            return object
        }
        let label = function (result, num) {
            let ret = {
                "type": "html",
                "name": "match_<Match Num>_label",
                "html": "<span style = \"font-size:16px\"><strong><br>Match <Match Num>, <Match Name>:</strong></span> \n"
            }
            return replaceObj(ret, result, num + 1)

        }
        let connect = function (result, num) {
            let ret = {
                "type": "radiogroup",
                "name": "match_<Match Num>_connect",
                "title": "Did you and <Match Name> connect?",
                "choices": [
                    {
                        "value": "they_replied",
                        "text": "Yes, I reached out and they replied"
                    },
                    {
                        "value": "i_replied",
                        "text": "Yes, they reached out and I replied"
                    },
                    {
                        "value": "they_didnt_reply",
                        "text": "No, I reached out and they did not reply"
                    },
                    {
                        "value": "i_didnt_reply",
                        "text": "No, they reached out and I did not reply"
                    },
                    {
                        "value": "no_attempt",
                        "text": "No, neither of us reached out"
                    }
                ]
            }
            return replaceObj(ret, result, num)
        }
        let noRelpyComment = function (result, num) {
            /*let ret = {
                "type": "comment",
                "name": "match_<Match Num>_connect_noreply_comment",
                "visibleIf": "{match_<Match Num>_connect} = 'i_didnt_reply'",
                "title": "Why did you not reply? (optional)"
            }*/

            let ret = {
                "type": "radiogroup",
                "name": "match_<Match Num>_connect_noreply_comment",
                "title": "Why did you not reply?",
                "visibleIf": "{match_<Match Num>_connect} = 'i_didnt_reply'",
                "hasOther": true,
                "choices": [
                    {
                     value: "busy",
                     text: "I was too busy"
                    },
                    {
                     value: "nervous",
                     text: "I was too nervous to reply to them"
                    },
                    {
                     value: "unattracted",
                     text: "I was not physically attracted to them"
                    },
                    {
                        value: "other_blank",
                        text: "Other"
                    }
                   ]
            }

            return replaceObj(ret, result, num)
        }
        let noAttemptComment = function (result, num) {
            // let ret = {
            //     "type": "comment",
            //     "name": "match_<Match Num>_connect_attempt_comment",
            //     "visibleIf": "{match_<Match Num>_connect} = 'no_attempt'",
            //     "title": "Why did you not reach out? (optional)"
            // }
            let ret = {
                "type": "radiogroup",
                "name": "match_<Match Num>_connect_attempt_comment",
                "title": "Why did you not reach out?",
                "visibleIf": "{match_<Match Num>_connect} = 'no_attempt'",
                "hasOther": true,
                "choices": [
                    {
                     value: "busy",
                     text: "I was too busy"
                    },
                    {
                     value: "nervous",
                     text: "I was too nervous to contact them"
                    },
                    {
                     value: "unattracted",
                     text: "I was not physically attracted to them"
                    },
                    {
                        value: "other_blank",
                        text: "Other"
                    }
                   ]
            }
            return replaceObj(ret, result, num)
        }
        let meet = function (result, num) {
            let ret = {
                "type": "radiogroup",
                "name": "match_<Match Num>_meet",
                "visibleIf": "{match_<Match Num>_connect} anyof ['they_replied', 'i_replied']",
                "title": "Did you and <Match Name> meet in person?",
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
            }
            return replaceObj(ret, result, num)
        }

        let whereMeet = function (result, num) {
            let ret = {
                "type": "text",
                "name": "match_<Match Num>_wheremeet",
                "visibleIf": "{match_<Match Num>_meet} = 'yes' and {match_<Match Num>_connect} anyof ['they_replied', 'i_replied']",
                "title": "Where did you first meet?",
                "description": "E.g. Utea, CTB, Dining hall, Duffield, etc"
            }
            return replaceObj(ret, result, num)
        }

        let whyNotMeet = function (result, num) {
            let ret = {
                "type": "comment",
                "name": "match_<Match Num>_whynotmeet",
                "visibleIf": "{match_<Match Num>_meet} = 'no' and {match_<Match Num>_connect} anyof ['they_replied', 'i_replied']",
                "title": "Why did you not meet? (optional)"
            }
            return replaceObj(ret, result, num)
        }

        let status = function (result, num) {
            let ret = {
                "type": "radiogroup",
                "name": "match_<Match Num>_status",
                "visibleIf": "{match_<Match Num>_meet} = 'yes' and {match_<Match Num>_connect} anyof ['they_replied', 'i_replied']",
                "title": "Which of the following is closest to your current status with <Match Name>?",
                "choices": [
                    {
                        "value": "dating",
                        "text": "We are dating"
                    },
                    {
                        "value": "moredates",
                        "text": "We are planning to go on more dates"
                    },
                    {
                        "value": "friends",
                        "text": "We have decided to be just friends"
                    },
                    {
                        "value": "multidate",
                        "text": "We went on multiple dates but decided not to go further"
                    },
                    {
                        "value": "onedate",
                        "text": "We went on one date but decided not to go further"
                    }
                ]
            }
            return replaceObj(ret, result, num)
        }
        let success = function (result, num) {
            let ret = {
                "type": "radiogroup",
                "name": "match_<Match Num>_success",
                "visibleIf": "{match_<Match Num>_status} = 'dating' and {match_<Match Num>_connect} anyof ['they_replied', 'i_replied']",
                "title": "That's great! Would you be willing to potentially be used as a success story?",
                "choices": [
                    {
                        "value": "yes",
                        "text": "Yes"
                    },
                    {
                        "value": "no",
                        "text": "No"
                    },
                    {
                        "value": "maybe",
                        "text": "Maybe"
                    }
                ]
            }
            return replaceObj(ret, result, num)
        }
        let fizzleComment = function (result, num) {
            let ret = {
                "type": "comment",
                "name": "match_<Match Num>_status_comment",
                "visibleIf": "({match_<Match Num>_status} = 'multidate' or {match_<Match Num>_status} = 'onedate') and {match_<Match Num>_connect} anyof ['they_replied', 'i_replied']",
                "title": "Why not? (optional)"
            }
            return replaceObj(ret, result, num)
        }
        
        let crushMatchQuestion = function (result, num) {
            let ret = {
                "type": "radiogroup",
                "name": "match_<Match Num>_crush_info",
                "title": "This was a Crush Match! It was:",
                "hasOther": true,
                "choices": [
                    {
                        "value": "troll",
                        "text": "Me and a friend or existing significant other knowingly putting each other"
                    },
                    {
                        "value": "real",
                        "text": "A true crush of yours that had a crush on you too!"
                    }
                ]
            }
            return replaceObj(ret, result, num)
        }
        let json = {
            "title": "Perfect Match Follow-Up Survey!",
            "completedHtml": "<div style = \"text-align:center\">Submitting...<br>If this is taking too long, close this page and try again<br><br><div>",
            "pages": [
                {
                    "name": "matches_outcomes",
                    "elements": [
                        {
                            "type": "html",
                            "name": "disclaimer",
                            "html": "<span style = \"font-size:14px\"><strong><i>Perfect Match takes your privacy very seriously, and all answers submitted through this follow-up survey will be completely anonymized and never linked to you. Answers about matches will be used only for algorithmic training, and all other answers will only be used for feedback on how we can improve for next year.</i></strong></span> \n"
                        }
                    ],
                    "title": "Match Outcomes"
                },
                {
                    "name": "general_questions",
                    "elements": [
                        {
                            "type": "rating",
                            "name": "rating",
                            "title": "How would you rate your Perfect Match experience this year?",
                            "isRequired": true,
                            "rateMax": 10,
                            "minRateDescription": "Terrible",
                            "maxRateDescription": "Great"
                        },
                        {
                            "type": "checkbox",
                            "name": "hear",
                            "title": "How did you hear about Perfect Match? (check all that apply)",
                            "isRequired": true,
                            "hasOther": true,
                            "choices": [
                                {
                                    "value": "lastyear",
                                    "text": "Last year's survey"
                                },
                                {
                                    "value": "quartercard",
                                    "text": "Flyer/Quartercard"
                                },
                                {
                                    "value": "friend",
                                    "text": "From a friend"
                                },
                                {
                                    "value": "class",
                                    "text": "From a class"
                                },
                                {
                                    "value": "email",
                                    "text": "From an email"
                                },
                                {
                                    "value": "socialmedia",
                                    "text": "Through social media"
                                },
                                {
                                    "value": "newspaper",
                                    "text": "Through a school newspaper or publication"
                                }
                            ]
                        },
                        {
                            "type": "rating",
                            "name": "participate_spring",
                            "title": "If you are single and at Cornell next Valentine's Day, how likely would you be to participate again?",
                            "rateMax": 10,
                            "minRateDescription": "Unlikely",
                            "maxRateDescription": "Likely"
                        },
                        {
                            "type": "rating",
                            "name": "participate_fall",
                            "title": "If you are single and at Cornell next semester, how likely would you be to participate in a fall iteration of Perfect Match?",
                            "rateMax": 10,
                            "minRateDescription": "Unlikely",
                            "maxRateDescription": "Likely"
                        },
                        {
                            "type": "radiogroup",
                            "name": "platonic",
                            "title": "Do you think we should include a option to search for platonic relationships?",
                            "choices": [
                                {
                                    "value": "yes",
                                    "text": "Yes"
                                },
                                {
                                    "value": "no",
                                    "text": "No"
                                },
                                {
                                    "value": "indifferent",
                                    "text": "Indifferent"
                                }
                            ]
                        },
                        {
                            "type": "comment",
                            "name": "events",
                            "title": "What events would you be interested in potentially going to with a match? (optional)",
                            "description": "E.g. Ice skating, A cappella, Movie, Bowling, etc"
                        },
                        {
                            "type": "comment",
                            "name": "new_features",
                            "title": "Are there any additional features or ideas you would like to see implemented next year? (optional)"
                        },
                        {
                            "type": "rating",
                            "name": "questions_rating",
                            "title": "What would you rate our survey questions this year?",
                            "description": "You can see them again at www.perfectmatch2020.com/survey",
                            "rateMax": 10,
                            "minRateDescription": "Terrible",
                            "maxRateDescription": "Great"
                        },
                        {
                            "type": "comment",
                            "name": "additional_comments",
                            "title": "Is there any additional feedback you have for us? We’d love to hear anything, such as what we did well, what we could add/remove/improve, or how your overall experience was. Please share whatever comes to mind!"
                            //"title": "Is there any additional feedback you have for us? We’d love to hear anything ranging from what we did well, what we could have improved on, your overall experience, what we could add/remove, or anything else that comes to your mind!"
                        }
                    ],
                    "title": "General Questions"
                }
            ]
        }

        for (var i = 0; i < results.length; i++) {

            json.pages[0].elements.push(label(results[i], i))
            if (results[i].crush != null) {
                json.pages[0].elements.push(crushMatchQuestion(results[i], i))
            }
                json.pages[0].elements.push(connect(results[i], i))
                json.pages[0].elements.push(noRelpyComment(results[i], i))
                json.pages[0].elements.push(noAttemptComment(results[i], i))
                json.pages[0].elements.push(meet(results[i], i))
                json.pages[0].elements.push(whereMeet(results[i], i))
                json.pages[0].elements.push(whyNotMeet(results[i], i))
                json.pages[0].elements.push(status(results[i], i))
                json.pages[0].elements.push(success(results[i], i))
                json.pages[0].elements.push(fizzleComment(results[i], i))
            
           
        }

        return json

    }
}