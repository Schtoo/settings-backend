"use strict"

let express = require('express');
let app = express();
let Settings = require('./setingsFactory.js');
let bodyParser = require('body-parser');
let settingsInstance = Settings();
let costs = 0;
let costsTotal = 0;
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.render('home', {
    });
});

app.post('/settings', function(req, res){
  const {callCost, smsCost, warningValue, criticalValue} = req.body;
    costs = {
        call: callCost,
        sms: smsCost,
        warning: warningValue,
        critical: criticalValue
    };
    // you never send any data in the factory function..
    // you have the values but you do nothing with them...
    
    res.render('home', {
        costs,
    });
});
app.post('/action', function(req, res){
    console.log(req.body);
    let item = req.body.billItemTypeWithSettings;
    settingsInstance.WhichType(item);

    costsTotal = {
        calls: settingsInstance.Calls(),
        text: settingsInstance.Sms(),
        total: settingsInstance.BothEqual(),
        screen: settingsInstance.totalAlert()
    }
    console.log(costsTotal);  

    res.render('home', {
        costsTotal
    });
});
let PORT = process.env.PORT || 3010;

app.listen(PORT, function(){
    console.log('App starting on port', PORT);
});

    // settingsInstance.UpdateValues(callCost, smsCost);
    // settingsInstance.UpdateAlerts(warningValue, criticalValue);
    // settingsInstance.totalAlert();

            // let fetchCosts = {
    //     forCalls: settingsInstance.UpdateCalls(call),
    //     forSms: settingsInstance.UpdatingSms(sms),
    //     warningColor: settingsInstance.UpdateWarning(warning),
    //     criticalColor: settingsInstance.UpdateCritical(critical)
    // }

     // let updatedCosts = {
    //     callCost: settingsInstance.UpdateCalls(),
    //     smsCost: settingsInstance.UpdatingSms(),
    //     warningValue: settingsInstance.UpdateWarning(),
    //     criticalValue: settingsInstance.UpdateCritical()
    // }

    // updatedCosts,