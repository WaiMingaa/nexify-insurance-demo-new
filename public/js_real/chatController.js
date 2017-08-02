//var socket = io();
var chatapp = angular.module('chatApp', ['ngFileUpload']);
chatapp.controller('ChatController', function ($scope, $http, TimeHandler, RespondCondtionHandler,ConversationHandler, UrlHandler, Upload, $q) {
    //init soundRecorder
    soundRecorder.init(function (rate) {
        $scope.rate = rate;
    }, function (media) {
        $scope.media = media ? true : false;
    });
    $scope.showRecording = true;
    var langcode = 'yue-Hant-HK';
    //update display message
    function updateMessage(word, from) {
        if (from == 'bot') {
            li = '<div class="row"> <div class="col-md-7"><li class=\"self-left\"><img style="width:49x;height:35px" src="./img/powerby.png" aria-hidden="true"></img><div class="bubble-left">' + '<p align=\"left\">' + word + '</p></div><span class="timetext-left">' +
                TimeHandler.getCurrentTime() + '</span></li></div></div>';
        } else {
            li = '<div class="row"> <div class="col-md-7 col-md-offset-5"><li class=\"self-right\"><span class="timetext-right">' +
                TimeHandler.getCurrentTime() + '</span><div class="bubble-right">' + word + '</div><i class="fa fa-user-circle fa-2x" aria-hidden="true"></i></li></div></div>';
        }
        $('#displaymessage').append(li);
        $("#displaymessage").scrollTop($("#displaymessage")[0].scrollHeight);
    }
    $scope.send = function () {
        UrlHandler.genthumbnail($('#sendmessage').val()).then(function (r) {
            if (r.data) {
                html = '<a target="_blank" href="' + r.data.url + '"><div class="thumbnail" style="max-width:300px;max-height:300px;"><img src="' + r.data.img + '" /><div class="caption"><h5>' + r.data.title + '</h5></div></div></a>'
                ConversationHandler.setRequestParam($('#sendmessage').val().replace(r.data.url, '') + html);
                sendMessage();
            } else {
                ConversationHandler.setRequestParam($('#sendmessage').val());
                sendMessage();
            }
        })
    }
    //send message
    sendMessage = function (arg, textstring) {
        if (arg == "init") {
            //
        } else {
            if (!$('.message_input').prop('disabled')) {
                // if (!isSwitchOn())
                updateMessage(ConversationHandler.getRequestParam().input.text, 'user');
            }
        }
        $http({
            method: 'POST',
            url: (langcode == "en-US") ? '/api/message' : (langcode == "cmn-Hans-HK") ? '/api/message/mandarin' : '/api/message/chi',
            data: ConversationHandler.getRequestParam(),
            headers: {
                'Cache-Control': 'no-cache'
            }
        }).then(function successCallback(response) {
            ConversationHandler.setResponseParam(response);
            var listOfServiceCalls = [];
            ConversationHandler.getResponseParam().output.text.forEach(function (restext) {
                listOfServiceCalls.push(UrlHandler.genthumbnail(restext))
            });
            $q.all(listOfServiceCalls).then(function (r) {
                var i = 0
                r.forEach(function (r) {
                    if (r.data) {
                        html = '<a target="_blank" href="' + r.data.url + '"><div class="thumbnail" style="max-width:300px;max-height:300px;"><img src="' + r.data.img + '" /><div class="caption"><h5>' + r.data.title + '</h5></div></div></a>'
                        updateMessage(ConversationHandler.getResponseParam().output.text[i].replace(r.data.url, '') + html, 'bot');
                        if (isSwitchOn()) {
                            if (langcode == 'en-US')
                                responsiveVoice.speak(ConversationHandler.getResponseParam().output.text[i].replace(r.data.url, ''))
                            if (langcode == 'cmn-Hans-HK')
                                responsiveVoice.speak(ConversationHandler.getResponseParam().output.text[i].replace(r.data.url, ''), 'Chinese Female');
                            if (langcode == 'yue-Hant-HK')
                                responsiveVoice.speak(ConversationHandler.getResponseParam().output.text[i].replace(r.data.url, ''), 'Chinese (Hong Kong) Female');
                        }
                    } else {
                        updateMessage(ConversationHandler.getResponseParam().output.text[i], 'bot');
                        if (isSwitchOn()) {
                          var bar=""
                          var speechtext =ConversationHandler.getResponseParam().output.text[i];
                            if (langcode == 'en-US')
                             bar =   "<input id='playaudio' onclick='responsiveVoice.speak(''"+speechtext+"');' ng-show='false' type='button' value='🔊 Play' \/>"
                            if (langcode == 'cmn-Hans-HK')
                               bar =   "<input id='playaudio' onclick='responsiveVoice.speak('"+speechtext+"', 'Chinese Female');' ng-show='false' type='button' value='🔊 Play' \/>"
                            if (langcode == 'yue-Hant-HK')
                            bar =   "<input id=\"playaudio\" onclick='responsiveVoice.speak(" +"\""+speechtext+"\""+",\"Chinese (Hong Kong) Female\");' type='button' value='🔊 Play' \/>"
                            console.log(bar);
                            $("#hidethis").append(bar);
                            $("#playaudio").click();
                              $("#playaudio").remove();
                        }
                    }
                    i = i + 1;
                })
            })
            setTimeout(function () {
                RespondCondtionHandler.responseByCond(sendMessage,updateMessage,ConversationHandler.getResponseParam().context);
            }, 500);
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
        $('#sendmessage').val('');
    };
    // init
    sendMessage("init");
    //enter to send
    $scope.enterSend = function (event) {
        if (event.keyCode == 13) {
            $scope.send();
        }
    }
    $scope.reset = function () {
        $('#displaymessage').empty();
        ConversationHandler.reset();
        sendMessage("init");
    }
    $scope.startRecord = function () {
        soundRecorder.startRecording();
        $scope.showRecording = false;
        setTimeout(function () {
            if (!$scope.showRecording)
                $('.stop_voice').click();
        }, 10000);
    }
    sendvoice = function (blob, text) {
        // if (isSwitchOn())
        //   updateMessage(text, 'user');
        var form = new FormData();
        $http({
            method: 'POST',
            url: '/api/speechtotext',
            data: {
                'blob': blob,
                'lang': langcode,
                'rate': $scope.rate
            },
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            if (response.data.text == '') {
                if (!isSwitchOn())
                    updateMessage('**nothing**', 'user');
                updateMessage('Please Speak clear. We cannot understand what you speak.', 'bot');
                return;
            } else {
                ConversationHandler.setRequestParam(response.data.text);
                sendMessage();
            }
        }, function errorCallback(response) {});
    }
    $scope.stopRecord = function () {
        soundRecorder.stopRecording(sendvoice);
        $scope.showRecording = true;
        $('.send_message').prop('disabled', false);
    }
    $scope.setlang = function (lang) {
        switch (lang) {
            case 'CAN':
                langcode = 'yue-Hant-HK';
                break;
            case 'ENG':
                langcode = 'en-US';
                break;
            case 'MAN':
                langcode = 'cmn-Hans-HK'
                break;
            default:
                langcode = 'yue-Hant-HK';
        }
        $scope.reset();
    }
    $scope.getlang = function () {
        if (!$scope.media)
            return 'voice not supported'
        if (langcode == "en-US")
            return "English 英文"
        if (langcode == "cmn-Hans-HK")
            return "Mandrian 普通话"
        else
            return "Cantonese 廣東話"
    }
    var isSwitchOn = function () {
        return ($('#voice_switch_t').prop("checked") == $('#voice_switch_b').prop("checked")) ? false : true;
    }
    var genURL = function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
        str = 'http://10.68.24.124:9080/IMCreateCaseService/im/CreateCase?IM_Name=' + encodeURI(arg0) + '&IM_Amount=' + arg1 + '&IM_Gender=' + arg2 + '&IM_Age=' + arg3 + '&IM_Job=' + encodeURI(arg4) + '&IM_Smoker=' + encodeURI(arg5) + '&IM_Height=' + arg6 + '&IM_Weight=' + arg7 + '&IM_Married=' + arg8;
        $http({
            method: 'POST',
            url: '/opencase',
            data: {
                url: str
            },
            headers: {
                'Cache-Control': 'no-cache',
            }
        }).then(function successCallback(response) {
            console.log(response.data.body);
            result = false;
            if (response.data.body) {
                result = JSON.parse(response.data.body)
                result = JSON.parse(result)
            }
            if (result || result.err == "0") {
                updateMessage('Your Case No: ' + result.caseNo + '', 'bot');
            } else {
                updateMessage('Your Case No: ' + 16868 + '', 'bot');
            }
        }, function errorCallback(response) {
            console.log(response)
        });
    };

    $scope.add = function () {
        $("#file").click();
    }
    $scope.upload = function (file) {
		claimmap = new Map();
		claimmap.set("Car Accident", ["交通意外", "交通意外"])
		claimmap.set("Minor Injury", ["輕傷", "轻伤"])
        landmarkmap = new Map();
        landmarkmap.set("Chicago Cloud Gate", ["芝加哥雲門", "芝加哥云门"])
        landmarkmap.set("Eiffel Tower", ["巴黎鐵塔", "巴黎铁塔"])
        landmarkmap.set("Empire State Building", ["紐約帝國大廈", "纽约帝国大厦"])
        landmarkmap.set("London Big Ben", ["倫敦大笨鐘", "伦敦大笨钟"])
        landmarkmap.set("San Giorgio Maggiore", ["威尼斯聖喬治馬焦雷島", "威尼斯圣乔治马焦雷岛"])
        landmarkmap.set("Shanghai Pudong", ["上海浦東", "上海浦东"])
        landmarkmap.set("Sydney Opera House", ["悉尼歌劇院", "悉尼歌剧院"])
        landmarkmap.set("Tokyo Tower", ["東京鐵塔", "东京铁塔"])
        landmarkmap.set("Vancouver Olympic Cauldron", ["溫哥華奧運聖火盆", "温哥华奥运圣火盆"])
        if (file && !file.$error) {
            $scope.f = file;
            Upload.dataUrl($scope.f, true).then(function (url) {
                var imgtag = '<img src="' + url + '" height="100" width="100">'
                updateMessage(imgtag)
            });
            var uploadurl = '/default'
            if (ConversationHandler.getResponseParam().context.landmark) {
                var uploadurl = '/uploadlandmark'
            }
            if (ConversationHandler.getResponseParam().context.claim_pic) {
                var uploadurl = '/uploadclaim'
            }
            Upload.upload({
                url: uploadurl,
                data: {
                    file: $scope.f
                }
            }).then(function (resp) {
                len = resp.data.images[0].classifiers.length
                if (len > 0) {
                    c = ""
                    score = 0
                    resp.data.images[0].classifiers[0].classes.forEach(function (r) {
                        tempscore = r.score
                        if (tempscore > 0.5 && tempscore > score) {
                            score = tempscore
                            c = r.class
                        }
                    });
                } else {
                    score = 0;
                    c = 0;
                }
                if (score > 0.5) {
					if(uploadurl=='/default'){
                        ConversationHandler.setRequestParam(c);
					sendMessage('init');
				return;
					}
                    if (uploadurl == '/uploadlandmark' && langcode == "yue-Hant-HK")
                        ConversationHandler.setRequestParam(landmarkmap.get(c)[0]);
                    if (uploadurl == '/uploadlandmark' && langcode == "cmn-Hans-HK")
                        ConversationHandler.setRequestParam(landmarkmap.get(c)[1]);
                    if (uploadurl == '/uploadlandmark' && langcode == "en-US")
                        ConversationHandler.setRequestParam(c);
					if (uploadurl == '/uploadclaim' && langcode == "yue-Hant-HK")
                        ConversationHandler.setRequestParam(claimmap.get(c)[0]);
                    if (uploadurl == '/uploadclaim' && langcode == "cmn-Hans-HK")
                        ConversationHandler.setRequestParam(claimmap.get(c)[1]);
                    if (uploadurl == '/uploadclaim' && langcode == "en-US")
                        ConversationHandler.setRequestParam(c);
                    sendMessage('init');
                }else {
                    ConversationHandler.setRequestParam('No Picture');
                    sendMessage('init');
                }
            }, function (resp) {}, function (evt) {});
        }
    };
});
chatapp.service('TimeHandler', function () {
    var TimeHandler = {};
    paddingZero = function (int, str) {
        s = String(str)
        while (s.length < int) {
            s = "0" + str;
        }
        return s;
    }
    TimeHandler.getCurrentTime = function () {
        var currentdate = new Date();
        return currentdate.getHours() + ":" + paddingZero(2, currentdate.getMinutes());
    }
    return TimeHandler;
})
chatapp.service('ConversationHandler', function () {
    this.reqpayload = {
        context: {},
        input: {
            text: ''
        }
    }
    this.respayload = {
        context: {},
        output: {}
    };
    this.getNewReqPayload = function () {
        return {
            context: {},
            input: {}
        };
    }
    this.setRequestParam = function (textstring) {
        reqpayload = this.getNewReqPayload();
        reqpayload.input = {
            text: textstring
        };
        this.reqpayload = reqpayload;
    }
    this.getRequestParam = function () {
        //   reqpayload = this.getNewReqPayload();
        this.reqpayload.context = this.getResponseParam().context;
        return this.reqpayload;
    }
    this.setResponseParam = function (res) {
        payload = this.getResponseParam();
        payload.context = res.data.context;
        payload.output = res.data.output;
    }
    this.getResponseParam = function () {
        return this.respayload;
    }
    this.reset = function () {
        this.respayload = {
            context: {},
            output: {}
        }
      this.reqpayload=  this.getNewReqPayload();
    }
})
chatapp.service('UrlHandler', function ($http, $q) {
    this.checkcontainurl = function (stri) {
        const regex = /[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
        var stri = stri;
        let m;
        if ((m = regex.exec(stri)) !== null) {
            // The result can be accessed through the `m`-variable.
            return m[0];
        } else {
            return false;
        }
    }
    this.genthumbnail = function (url) {
        var deferred = $q.defer();
        booleanurl = this.checkcontainurl(url);
        if (!booleanurl) {
            deferred.resolve(url)
        } else {
            booleanurl = 'http://' + booleanurl;
            return $http({
                method: 'GET',
                url: '/geturl?url=' + encodeURI(booleanurl),
                headers: {
                    'Cache-Control': 'no-cache'
                }
            })
        }
        return deferred.promise;
    }
})



chatapp.directive('uploadfile', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            element.bind('click', function (e) {
                $('#file').click();
            });
        }
    };
});
