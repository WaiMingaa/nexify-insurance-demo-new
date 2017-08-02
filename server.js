#!/usr/bin/env node

'use strict';

var server = require('./app');
var ssl = require('./sslLicense');
var https = require('https');
var httpport = process.env.PORT || process.env.VCAP_APP_PORT || 8080;
var httpsport =8081;

server.listen(httpport, function() {
  console.log('Http Server running on port: %d', httpport);
});

var httpsapp = https.createServer(ssl.options, server);
/* 
var io = require('socket.io')(httpsapp);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
}); */
    

httpsapp.listen(httpsport,function(){
	 console.log('Https Server running on port: %d', httpsport);
});

