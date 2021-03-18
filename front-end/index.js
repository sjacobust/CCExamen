const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const request = require('request');
const app = express();

const port = 3000;

// Engine

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

// Express JSON Parser

app.use('/', express.json());
app.use(express.urlencoded({
    extended: true
}))

// Serve Static Files

app.use('/assets', express.static(path.join(__dirname, 'assets')));


// Routing

app.get('/', (req, res) => {
    res.render('message', {
        message: 'Tone Analyzer Response'
    })
});

app.post('/', (req, res) => {
    console.log(req.body);
    if (req.body.message) {
        request.post(
            'https://toneanalyzer-examen1-sjacobus-fantastic-wolverine-kq.mybluemix.net/',
            {
                json: {
                    message: req.body.message,
                },
            },
            (error, response, body) => {
                if (error) {
                    console.error(error)
                    return
                }
                console.log(`statusCode: ${response.statusCode}`)
                res.render('message', {
                    message: JSON.stringify(body)
                })            
            }
        )
        
    } else {
        res.render('message', {
            message: 'Message Not Sent'
        })
    }
});

app.listen(port, () => {
    console.log(`App listening in port ${port}`);
});