"use strict"

let express = require('express');
let app = express();
let Settings = require('./setingsFactory');
let bodyParser = require('body-parser');
let settingsInstance = Settings();

const exphbs  = require('express-handlebars');
let costs = 0;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.render('home');
});
// app.get('/action', function(req, res){
//     let CheckedBill = req.body.WhichType(checkedBill);
//     res.render('main');
// });
app.post('/settings', function(req, res){
  let {callCost, smsCost, warningValue, criticalValue} = req.body;
    // settingsInstance.UpdateValues(callCost, smsCost);
    // settingsInstance.UpdateAlerts(warningValue, criticalValue);
    // settingsInstance.totalAlert();
    costs = {
        call: callCost,
        sms: smsCost,
        warning: warningValue,
        critical: criticalValue
    };
    res.render('home', {
        costs
    });
});

let PORT = process.env.PORT || 3010;

app.listen(PORT, function(){
    console.log('App starting on port', PORT);
});
