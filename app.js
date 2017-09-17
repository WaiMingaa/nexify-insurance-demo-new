/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
require('dotenv').config({
    silent: true
});

var express = require('express'); // app server
var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser'); // parser for post requests
var watson = require('watson-developer-cloud'); // watson sdk
// The following requires are needed for logging purposes
var uuid = require('uuid');
var fs = require('fs');
var cheerio = require('cheerio');
var logger = require('./logger/logger');
var httplogger =require('./logger/http-logger');
//var morgan = require('morgan');
//var winston = require('winston');
var request = require('request');
var vcapServices = require('vcap_services');
var basicAuth = require('basic-auth-connect');
//var dateFormat = require('dateformat');
var urltool = require('url');
var _ = require('underscore');
var fileUploader = require('express-fileupload');
var message_router = require('./routers/message-router');
var img_upload_router=require('./routers/upload-img-router');
var form_router = require('./routers/form-router');

// The app owner may optionally configure a cloudand db to track user input.
// This cloudand db is not required, the app will operate without it.
// If logging is enabled the app must also enable basic auth to secure logging
// endpoints
/*var cloudantCredentials = vcapServices.getCredentials('cloudantNoSQLDB');
var cloudantUrl = null;
if (cloudantCredentials) {
    cloudantUrl = cloudantCredentials.url;
}
cloudantUrl = cloudantUrl || process.env.CLOUDANT_URL; // || '<cloudant_url>';
var logs = null;*/
var app = express();
/*
var logger = new(winston.Logger)({
    level :'debug',
    transports: [
           new(winston.transports.Console)({
            timestamp: function () {
                return dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT");
            }
        }),
      new(winston.transports.File)({
            json: false,
            filename: 'server.log',
            timestamp: function () {
                return dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT");
            }
        })
    ]
});
*/
//logging
app.use(httplogger);

// Bootstrap application settings
app.use(express.static('./public')); // load UI from public folder
app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(fileUploader());
app.use('/api/message',message_router);
// submit form
app.use('/form',form_router);
// Create the service wrapper
/*var conversation = watson.conversation({
    username: process.env.CONVERSATION_USERNAME || '<username>',
    password: process.env.CONVERSATION_PASSWORD || '<password>',
    version_date: '2016-07-11',
    version: 'v1'
});
var visual_recognition_landmark = watson.visual_recognition({
    api_key: process.env.VISUAL_RECOGNITION_API_KEY_LANDMARK|| '{api_key}',
    version: 'v3',
    version_date: '2016-05-19'
});

var visual_recognition = watson.visual_recognition({
    api_key: process.env.VISUAL_RECOGNITION_API_KEY_CLAIM|| '{api_key}',
    version: 'v3',
    version_date: '2016-05-19'
});*/

//Endpoint on service file
app.use('/upload',img_upload_router);
app.get("/template", express.static('./templatepage/template.html'));
//app.post('/default',imgUpoader);
//app.post('uploadclaim',imgUpoader);

/*
// Endpoint on service file
app.post('/uploadclaim', function (req, res) {
    var pic = req.files.file
    var dir = './service/';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
    pic.mv('./service/' + pic.name, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send(err);
        }
        var params = {
            classifier_ids: process.env.CLAIM_CLASSIFIER,
            images_file: fs.createReadStream('./service/' + pic.name)
        };
        visual_recognition.classify(params, function (err, response) {
            if (err)
                console.log(err);
            else
                res.send(JSON.stringify(response, null, 2));
        });
    });
})
app.use("/template", express.static('./templatepage/template.html'));
/!*
app.get('/template',function(req,res){
    var dir = './img/';
    if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

    var img ='price_list.png'
	      var respjson = '<!DOCTYPE html><html><head><meta name="description" content="Latest Travel Insurance Offer by Nexify"><title>Travel Insurance</title></head><body><img src="'+img+'"></body></html>'
        ;
	res.send(respjson)

})
*!/

// Endpoint on service default
app.post('/default', function (req, res) {
    var pic = req.files.file
        var dir = './default/';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
    pic.mv('./default/' + pic.name, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send(err);
        }
        var params = {
            images_file: fs.createReadStream('./default/' + pic.name)
        };
        visual_recognition_landmark.classify(params, function (err, response) {
            if (err)
                console.log(err);
            else
				logger.debug('visual : '+ JSON.stringify(response, null, 2))
                res.send(JSON.stringify(response, null, 2));
        });
    });
})

// Endpoint on service landmark
app.post('/uploadlandmark', function (req, res) {
        var pic = req.files.file
        var dir = './uploadlandmark/';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
    pic.mv('./uploadlandmark/' + pic.name, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send(err);
        }
        var params = {
            classifier_ids: process.env.LANDMARK_CLASSIFIER,
            images_file: fs.createReadStream('./uploadlandmark/' + pic.name)
        };
        visual_recognition_landmark.classify(params, function (err, response) {
            if (err)
                console.log(err);
            else
				console.log(JSON.stringify(response, null, 2))
                res.send(JSON.stringify(response, null, 2));
        });
    });
})
*/

//Endpoint to open case
app.post('/opencase', function (req, res) {
    var options = {
        uri: req.body.url,
        method: 'GET'
    };
    request(options, function (error, response, body) {
        res.send(response);
    });

});

// Endpoint to convert speech to text
app.post('/api/speechtotext', function (req, res) {
    var postData = {
        "config": {
            "encoding": "FLAC",
            "sampleRateHertz": req.body.rate,
            "languageCode": req.body.lang
        },
        "audio": {
            "content": req.body.blob
        }
    }
    var options = {
        uri: 'https://speech.googleapis.com/v1/speech:recognize?key=' + process.env.GOOGLE_API_KEY,
        method: 'POST',
        json: postData
    };

    request(options, function (error, response, body) {
        logger.debug('Speech : ' + JSON.stringify(body));
        var respjson = {
            'text': ''
        };
        if (Object.keys(body).length == 0 || body.results[0].alternatives[0].confidence < 0.50) {
            res.send(respjson);
        } else {
            var tran = body.results[0].alternatives[0].transcript;
            respjson = {
                'text': tran
            };
            res.send(respjson);
        }
    });

})

app.get('/geturl', function (req, res) {
    var url = req.query.url
    request(url, function (error, response, body) {
        var $ = cheerio.load(body);
        var respjson = {
            'url':req.query.url,
            'title': $('title').text(),
            'des': $('meta[name=description]').attr("content"),
            'img': urltool.resolve(req.query.url, ($('img').first().attr('src'))?$('img').first().attr('src'):'')
        };
        console.log(respjson);
        res.send(respjson);
    });

})
/*
app.post('/api/message/chi', function (req, res) {
    var workspace = process.env.WORKSPACE_CHI_ID || '<workspace-id>';
    if (!workspace || workspace === '<workspace-id>') {
        return res.json({
            'output': {
                'text': 'The app has not been configured with a <b>WORKSPACE_ID</b> environment variable. Please refer to the ' +
                    '<a href="https://github.com/watson-developer-cloud/conversation-simple">README</a> documentation on how to set this variable. <br>' +
                    'Once a workspace has been defined the intents may be imported from ' +
                    '<a href="https://github.com/watson-developer-cloud/conversation-simple/blob/master/training/car_workspace.json">here</a> in order to get a working application.'
            }
        });
    }
    var payload = {
        workspace_id: workspace,
        context: {},
        input: {}
    };
    if (req.body) {
        if (req.body.input) {
            payload.input = req.body.input;
        }
        if (req.body.context) {
            // The client must maintain context/state
            payload.context = req.body.context;
        }
    }
    // Send the input to the conversation service
    conversation.message(payload, function (err, data) {
        if (err) {
            return res.status(err.code || 500).json(err);
        }
        if (data.input.text == "" || _.isUndefined(data.input.text)) {
            logger.debug('----------------LINE BREAK-----------------');
            logger.debug('CONVERSATION START');
            logger.debug('ChatBot Response :' + data.output.text);
            logger.debug(data);
        } else {
            logger.debug('User input :' + data.input.text || 'init');
            logger.debug('ChatBot Response :' + data.output.text);
            logger.debug(data);
        }

        return res.json(updateMessage(payload, data));
    });

});
*/
/*
app.post('/api/message/mandarin', function (req, res) {
    var workspace = process.env.WORKSPACE_MAN_ID || '<workspace-id>';
    if (!workspace || workspace === '<workspace-id>') {
        return res.json({
            'output': {
                'text': 'The app has not been configured with a <b>WORKSPACE_ID</b> environment variable. Please refer to the ' +
                    '<a href="https://github.com/watson-developer-cloud/conversation-simple">README</a> documentation on how to set this variable. <br>' +
                    'Once a workspace has been defined the intents may be imported from ' +
                    '<a href="https://github.com/watson-developer-cloud/conversation-simple/blob/master/training/car_workspace.json">here</a> in order to get a working application.'
            }
        });
    }
    var payload = {
        workspace_id: workspace,
        context: {},
        input: {}
    };
    if (req.body) {
        if (req.body.input) {
            payload.input = req.body.input;
        }
        if (req.body.context) {
            // The client must maintain context/state
            payload.context = req.body.context;
        }
    }
    // Send the input to the conversation service
    conversation.message(payload, function (err, data) {
        if (err) {
            return res.status(err.code || 500).json(err);
        }
        if (data.input.text == "" || _.isUndefined(data.input.text)) {
            logger.debug('----------------LINE BREAK-----------------');
            logger.debug('CONVERSATION START');
            logger.debug('ChatBot Response :' + data.output.text);
            logger.debug(data);
        } else {
            logger.debug('User input :' + data.input.text || 'init');
            logger.debug('ChatBot Response :' + data.output.text);
            logger.debug(data);
        }

        return res.json(updateMessage(payload, data));
    });

});
*/

app.post('/gencase',function(req,res){

 var data =req.body;
 console.log(data);
var url='http://161.202.198.106:9080/ChatAcmService/acm/StartCaseWf?to='+data.location+'&dpt='+data.dpt+'&rtn='+data.rtn+'&adult='+data.adult+'&child='+data.kid+'&seat='+data.seat+'&hotel='+data.hotel+'&in='+data.dpt+'&out='+data.rtn+'&hadt='+data.adult+'&hchd='+data.kid+'&room='+data.room

  var options = {
        uri: encodeURI(url),
        method: 'GET'
    };

    request(options, function (error, response, body) {
		res.send({'casenumber':body});
    });
})

/*
// Endpoint to be call from the client side
app.post('/api/message', function (req, res) {
    var workspace = process.env.WORKSPACE_ID || '<workspace-id>';
    if (!workspace || workspace === '<workspace-id>') {
        return res.json({
            'output': {
                'text': 'The app has not been configured with a <b>WORKSPACE_ID</b> environment variable. Please refer to the ' +
                    '<a href="https://github.com/watson-developer-cloud/conversation-simple">README</a> documentation on how to set this variable. <br>' +
                    'Once a workspace has been defined the intents may be imported from ' +
                    '<a href="https://github.com/watson-developer-cloud/conversation-simple/blob/master/training/car_workspace.json">here</a> in order to get a working application.'
            }
        });
    }
    var payload = {
        workspace_id: workspace,
        context: {},
        input: {}
    };
    if (req.body) {
        if (req.body.input) {
            payload.input = req.body.input;
        }
        if (req.body.context) {
            // The client must maintain context/state
            payload.context = req.body.context;
        }
    }
    // Send the input to the conversation service
    conversation.message(payload, function (err, data) {
        if (err) {
            return res.status(err.code || 500).json(err);
        }
        if (data.input.text == "" || _.isUndefined(data.input.text)) {
            logger.debug('----------------LINE BREAK-----------------');
            logger.debug('CONVERSATION START');
            logger.debug('ChatBot Response :' + data.output.text);
            logger.debug(data);
        } else {
            logger.debug('User input :' + data.input.text || 'init');
            logger.debug('ChatBot Response :' + data.output.text);
            logger.debug(data);
        }
        return res.json(updateMessage(payload, data));
    });
});
*/
/**
 * Updates the response text using the intent confidence
 * @param  {Object} input The request to the Conversation service
 * @param  {Object} response The response from the Conversation service
 * @return {Object}          The response with the updated message
 */
/*function updateMessage(input, response) {
    var responseText = null;
    var id = null;
    if (!response.output) {
        response.output = {};
    } else {
        if (logs) {
            // If the logs db is set, then we want to record all input and responses
            id = uuid.v4();
            logs.insert({
                '_id': id,
                'request': input,
                'response': response,
                'time': new Date()
            });
        }
        return response;
    }
    if (response.intents && response.intents[0]) {
        var intent = response.intents[0];
        // Depending on the confidence of the response the app can return different messages.
        // The confidence will vary depending on how well the system is trained. The service will always try to assign
        // a class/intent to the input. If the confidence is low, then it suggests the service is unsure of the
        // user's intent . In these cases it is usually best to return a disambiguation message
        // ('I did not understand your intent, please rephrase your question', etc..)
        if (intent.confidence >= 0.75) {
            responseText = 'I understood your intent was ' + intent.intent;
        } else if (intent.confidence >= 0.5) {
            responseText = 'I think your intent was ' + intent.intent;
        } else {
            responseText = 'I did not understand your intent';
        }
    }
    response.output.text = responseText;
    if (logs) {
        // If the logs db is set, then we want to record all input and responses
        id = uuid.v4();
        logs.insert({
            '_id': id,
            'request': input,
            'response': response,
            'time': new Date()
        });
    }
    return response;
}*/

/*if (cloudantUrl) {
    // If logging has been enabled (as signalled by the presence of the cloudantUrl) then the
    // app developer must also specify a LOG_USER and LOG_PASS env vars.
    if (!process.env.LOG_USER || !process.env.LOG_PASS) {
        throw new Error('LOG_USER OR LOG_PASS not defined, both required to enable logging!');
    }
    // add basic auth to the endpoints to retrieve the logs!
    var auth = basicAuth(process.env.LOG_USER, process.env.LOG_PASS);
    // If the cloudantUrl has been configured then we will want to set up a nano client
    var nano = require('nano')(cloudantUrl);
    // add a new API which allows us to retrieve the logs (note this is not secure)
    nano.db.get('car_logs', function (err) {
        if (err) {
            console.error(err);
            nano.db.create('car_logs', function (errCreate) {
                console.error(errCreate);
                logs = nano.db.use('car_logs');
            });
        } else {
            logs = nano.db.use('car_logs');
        }
    });

    // Endpoint which allows deletion of db
    app.post('/clearDb', auth, function (req, res) {
        nano.db.destroy('car_logs', function () {
            nano.db.create('car_logs', function () {
                logs = nano.db.use('car_logs');
            });
        });
        return res.json({
            'message': 'Clearing db'
        });
    });

    // Endpoint which allows conversation logs to be fetched
    app.get('/chats', auth, function (req, res) {
        logs.list({
            include_docs: true,
            'descending': true
        }, function (err, body) {
            console.error(err);
            // download as CSV
            var csv = [];
            csv.push(['Question', 'Intent', 'Confidence', 'Entity', 'Output', 'Time']);
            body.rows.sort(function (a, b) {
                if (a && b && a.doc && b.doc) {
                    var date1 = new Date(a.doc.time);
                    var date2 = new Date(b.doc.time);
                    var t1 = date1.getTime();
                    var t2 = date2.getTime();
                    var aGreaterThanB = t1 > t2;
                    var equal = t1 === t2;
                    if (aGreaterThanB) {
                        return 1;
                    }
                    return equal ? 0 : -1;
                }
            });
            body.rows.forEach(function (row) {
                var question = '';
                var intent = '';
                var confidence = 0;
                var time = '';
                var entity = '';
                var outputText = '';
                if (row.doc) {
                    var doc = row.doc;
                    if (doc.request && doc.request.input) {
                        question = doc.request.input.text;
                    }
                    if (doc.response) {
                        intent = '<no intent>';
                        if (doc.response.intents && doc.response.intents.length > 0) {
                            intent = doc.response.intents[0].intent;
                            confidence = doc.response.intents[0].confidence;
                        }
                        entity = '<no entity>';
                        if (doc.response.entities && doc.response.entities.length > 0) {
                            entity = doc.response.entities[0].entity + ' : ' + doc.response.entities[0].value;
                        }
                        outputText = '<no dialog>';
                        if (doc.response.output && doc.response.output.text) {
                            outputText = doc.response.output.text.join(' ');
                        }
                    }
                    time = new Date(doc.time).toLocaleString();
                }
                csv.push([question, intent, confidence, entity, outputText, time]);
            });
            res.csv(csv);
        });
    });
}*/

module.exports = app;
