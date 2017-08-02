var messagerouter = require('express').Router();
require('dotenv').config({
    silent: true
});
var _ = require('underscore');
var watson = require('watson-developer-cloud'); // watson sdk
var conversation = watson.conversation({
    //url: 'https://gateway.watsonplatform.net/conversation/api',
    username: process.env.CONVERSATION_USERNAME || '<username>',
    password: process.env.CONVERSATION_PASSWORD || '<password>',
    version_date: '2016-07-11',
    version: 'v1'
});
messagerouter.post('/:lang',function(req,res){
switch(req.params.lang){
  case 'chi':
  var workspace = process.env.WORKSPACE_CHI_ID ;
  break;
  case 'mandarin':
  var workspace = process.env.WORKSPACE_MAN_ID;
  break;
  default:
  var workspace =process.env.WORKSPACE_ID;
}
    if (!workspace || workspace === '<workspace-id>') {
        return res.json({
            'output': 'Please Check Workspace configuration'

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
            console.log(data);
        } else {
            console.log(data);
        }

      //  return res.json(updateMessage(payload, data));
    });


})
module.exports=messagerouter;
