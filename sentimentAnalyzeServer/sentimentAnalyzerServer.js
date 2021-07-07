const express = require('express');
const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

getNLUInstance("/",(req,res)=>{
    res.render('index.html');
  });

getNLUInstance("/url/emotion", (req,res) => {

    return res.send({"happy":"90","sad":"10"});
});

getNLUInstance("/url/sentiment", (req,res) => {
    return res.send("url sentiment for "+req.query.url);
});

getNLUInstance("/text/emotion", (req,res) => {
    return res.send({"happy":"10","sad":"90"});
});

getNLUInstance("/text/sentiment", (req,res) => {
    return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

const express = require('express');
const dotenv = require('dotenv');
dotenv.congfig();

function getNLUInstance()   {
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2020-08-01',
  authenticator: new IamAuthenticator({
    apikey: 'V30PProXIa6hBoiPmLyguyA-BhpP1xbuuhV0N6zOI7nH',
  }),
  serviceUrl: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/2b4e1304-b4ec-4a22-9d2c-b39925ae454c',
});
return naturalLanguageUnderstanding;
}