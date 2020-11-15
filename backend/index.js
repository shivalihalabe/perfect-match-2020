var express = require("express")
var app = express()
var bodyParser = require('body-parser')
const path = require('path');
var mongo = require('mongodb');
var mongoClient = mongo.MongoClient
var url = "mongodb://localhost:27017/";
var { google } = require('googleapis');
var OAuth2 = google.auth.OAuth2;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoClient.connect(url, function (err, db) {
    if (err) {
        console.log(err)
    };
    console.log("connected to db");
    this.runApp(db.db("pm20"))
}.bind(this));

//database schema: 
//email 
//token 
//survey data
//date created 
//date token submitted
//date last submitted
//has submitted
function createNewUser(request) {
    return {
        email: request.email,
        token: request.token,
        data: "",
        date_created: "",
        date_token_submitted: "",
        date_last_submitted: "",
        has_submitted: "false"
    }
}

//takes token from frontend, takes email, and verifies it. Takes success and 
//failure callbacks
function authenticateGoogleToken(token, email, success, failure) {
    var oauth2Client = new OAuth2();
    oauth2Client.setCredentials({ access_token: token });
    var oauth2 = google.oauth2({
        auth: oauth2Client,
        version: 'v2'
    });
    oauth2.userinfo.get(
        function (err, res) {
            if (err) {
                console.log(err);
                failure()
            } else {
                if (res.data.email == email && email.includes("@cornell.edu")) {
                    success()
                } else {
                    failure()
                }
            }
        });

    return true
}

this.runApp = function (db) {

    //authenticates token and stores user email, token, and date in the database
    //params are email, token
    //returns schema object. With have submitted, and if applicable, response
    app.post("/api/authenticate_login_token", function (req, postResponse) {
        //console.log("yeet")
        //console.log(req.body.token)
        authenticateGoogleToken(req.body.token, req.body.email, function () {
            //success callback

            //check if email exists already in db as user 
            db.collection("users").findOne({ email: req.body.email }, function (err, result) {
                if (err) {
                    console.log(err)
                }
                //if yes, create record for email and insert token 
                if (result == null) {
                    console.log("User " + req.body.email + " does not already exist. creating record")
                    
                    var record = createNewUser(req.body)


                    db.collection("users").insertOne(record, function (err, res) {
                        if (err) {
                            console.log(err);
                        }
                        console.log("record created");
                        postResponse.send(JSON.stringify({
                            has_submitted: false
                        }))
                    });
                }
                //if no, update the token and return previous value if submitted
                else {
                    console.log("User " + req.body.email + " exists. updating record")
                    db.collection("users").findOneAndUpdate({ email: req.body.email }, { $set: { token: req.body.token } }, { returnOriginal: false }, function (err, res) {
                        if (err) {
                            console.log(err);
                        }
                        console.log("record updated");
                        var sendObj = {}
                        if (res.value.has_submitted == true) {
                            sendObj = {
                                has_submitted: true,
                                data: res.value.data,
                                results: global.obj[req.body.email.replace("@cornell.edu","")]
                                //results: global.obj['zmf3']
                            }
                        }
                        else {
                            sendObj = { has_submitted: false }
                        }
                        postResponse.send(sendObj)
                    });
                }

            })
        }, function () {
            postResponse.status(401).send()
        })

    })
    //checks that token is authenticated, then stores 
    //returns an http success or failure 
    app.post("/api/submit_survey", function (req, res) {
        //checks that user exists and retreives token
        db.collection("users").findOne({ email: req.body.email }, function (err, result) {
            if (err) {
                res.status(500).send()
            }
            else if (result) {
                //checks that token is authenticated 
                if (result.token.toString() === req.body.token.toString()) {
                    //if so, updates database with survey response
                    db.collection("users").updateOne({ email: req.body.email }, { $set: { has_submitted: true, data: req.body.data } }, function (err, result) {
                        if (err) {
                            res.status(500).send()
                        }
                        //if a result is returned (e.g. the updated record), success
                        else if (result) {
                            console.log("survey submitted")
                            res.send()
                        }
                        else {
                            res.status(500).send()
                        }
                    })
                //if token not auth, send error
                } else {
                    res.status(401).send()
                }
            }
            else {
                res.status(401).send()
            }
        })
    })
    //submit the followup survey
    app.post("/api/submit_followup_survey", function (req, res) {
        //checks that user exists and retreives token
        db.collection("users").findOne({ email: req.body.email }, function (err, result) {
            if (err) {
                res.status(500).send()
            }
            else if (result) {
                //checks that token is authenticated 
                if (result.token.toString() === req.body.token.toString()) {
                    //if so, updates database with survey response
                    db.collection("users").updateOne({ email: req.body.email }, { $set: { has_submitted_followup: true, data_followup: req.body.data } }, function (err, result) {
                        if (err) {
                            res.status(500).send()
                        }
                        //if a result is returned (e.g. the updated record), success
                        else if (result) {
                            console.log("survey submitted")
                            res.send()
                        }
                        else {
                            res.status(500).send()
                        }
                    })
                //if token not auth, send error
                } else {
                    res.status(401).send()
                }
            }
            else {
                res.status(401).send()
            }
        })
    })
    //gets and returns the count of responses
    app.get("/api/get_count", function (req, res) {
        var query = { "has_submitted": true }
        db.collection("users").find(query).toArray(function (err, result) {
            if (err) {
                console.log(err)
            }
            res.send((result.length).toString())
        })
    })

    //if production mode, load prod built react app 
    if (process.env.NODE_ENV == "production") {
        app.use(express.static(path.join(__dirname, '../frontend/build')));

    }
    //if prod, return return react build index.html 
    app.get("/*", function (req, res) {
        if (process.env.NODE_ENV == "production") {
            res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
        } else {
            res.send("this is where the react app will get returned")
        }
    })

    //listen for connections 
    var port = 4000
    if (process.env.NODE_ENV == "production") {
        port = 3000
    }
    app.listen(port, function () {
        global.obj = require('./answer.json');
        console.log("listening")
    })
}