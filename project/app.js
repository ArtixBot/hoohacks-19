'use strict';

const express = require('express');
const path = require('path')

var app = express();
app.use(express.static('public'))


app.get('/', function(req,res){
    //res.status(200).send('Hello from the yeet boi bitch');
    res.sendFile(path.join(__dirname, '/index.html'));
});


app.get('/account.html', function(req,res){
    //res.status(200).send('Hello from the yeet boi bitch');
    res.sendFile(path.join(__dirname, '/account.html'));
});

app.use(express.static(path.join(__dirname, 'styles')));


var server = app.listen(process.nextTick.PORT || '8080', function(){
    console.log('App listening on port %s', server.address().port);
    console.log('Press Ctrl+C to quit yeet');
});