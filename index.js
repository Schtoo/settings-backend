"use strict"

let express = require('express');
let app = express();
let Settings = require('./setingsFactory.js');
let bodyParser = require('body-parser');
let settingsInstance = Settings();
const exphbs = require('express-handlebars');
let costs = 0;
let costsTotal = 0;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/', function(req, res){
    
    costs = {
        call:settingsInstance.getCallValue(),
        sms: settingsInstance.getSmsValue(),
        warning: settingsInstance.getWarningValue(),
        critical: settingsInstance.getCriticalValue() //This is how I send the data to my factory
    };
    costsTotal = {
        callCost: settingsInstance.Calls(),
        smsCost: settingsInstance.Sms(),
        total: settingsInstance.BothEqual(),
        screen: settingsInstance.totalAlert()
    };
    
    res.render('home', {
        costs,
        costsTotal
    });
});

app.post('/settings', function(req, res){
    const {callCost, smsCost, warningValue, criticalValue} = req.body;
     
    costsTotal = {
        callCost: settingsInstance.Calls(),
        smsCost: settingsInstance.Sms(),
        total: settingsInstance.BothEqual(),
        screen: settingsInstance.totalAlert()
    };
    
    costs = {
        call:settingsInstance.UpdateCalls(callCost),
        sms: settingsInstance.UpdatingSms(smsCost),
        warning: settingsInstance.UpdateWarning(warningValue),
        critical: settingsInstance.UpdateCritical(criticalValue) //This is how I send the data to my factory
    };
  
    // you never send any data in the factory function..
    // you have the values but you do nothing with them...
    
    res.render('home', {
        costs,
        costsTotal
    });
});
app.post('/action', function(req, res){
  
    let item = req.body.billItemTypeWithSettings;
    settingsInstance.WhichType(item);
    costs = {
        call:settingsInstance.getCallValue(),
        sms: settingsInstance.getSmsValue(),
        warning: settingsInstance.getWarningValue(),
        critical: settingsInstance.getCriticalValue()
    };
    costsTotal = {
        callCost: settingsInstance.Calls(),
        smsCost: settingsInstance.Sms(),
        total: settingsInstance.BothEqual(),
        screen: settingsInstance.totalAlert()
    }
    

    res.render('home', {
        costs,
        costsTotal
    });
});
let PORT = process.env.PORT || 3002;

app.listen(PORT, function(){
    console.log('App starting on port', PORT);
});
