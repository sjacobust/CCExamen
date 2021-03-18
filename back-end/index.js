const express = require('express');
const dotenv = require('dotenv');
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');

const app = express();

dotenv.config();

const port = process.env.PORT || 3000;

// IBM Tone Analyzer APIKEY AND URL

const apikey = process.env.TONE_ANALYZER_APIKEY;
const taURL = process.env.TONE_ANALYZER_URL

// Initializing ToneAnalyzer

const toneAnalyzer = new ToneAnalyzerV3({
    version: '2017-09-21',
    iam_apikey: apikey,
    url: taURL
});

// Express JSON Parser

app.use('', express.json());


// Routing

/**
 * GET Route, every get request to the API, will get the response
 * of who made the app, for what and when
 */
app.get('*', (req, res) => {
    res.json({
        Autor: 'sjacobus',
        Materia: 'Cloud Computing',
        examen: 'Examen Parcial 1',
        fecha: '17/03/2021'
    });
});


/**
 * POST Route, every request to the API, will try to send the
 * message to the Tone Analyzer, if it can't it will return a JSON
 * specifying why the delivery failed.
 */
app.post('*', (req, res) => {
    if (req.body.message) {
        const toneParams = {
            toneInput: { 'text': req.body.message },
            content_type: 'application/json',
            };
        toneAnalyzer.tone(toneParams)
            .then(toneAnalysis => {
                console.log(JSON.stringify(toneAnalysis, null, 2));
                res.json(toneAnalysis);
            })
            .catch(err => {
                console.error('error:', err);
                res.json({error: err})
            });

    } else {
        res.json({
            Error: 'Message not recieved'
        });
    }
});

app.listen(port, () => {
    console.log(`App listening in port ${port}`);
});