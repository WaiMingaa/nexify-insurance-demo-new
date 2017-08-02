
chatapp.service('RespondCondtionHandler', function (ConversationHandler) {
this.responseByCond = function (sendMessage,updateMessage,cot) {
    var index = 0;
    switch (cot.condition) {
      case 'restaurant':
      updateMessage((function(){
        return "<div class=\"ui fluid card\" data-html=\"<div class='header'>User Rating<\/div><div class='content'><div class='ui star rating'><i class='active icon'><\/i><i class='active icon'><\/i><i class='active icon'><\/i><i class='icon'><\/i><i class='icon'><\/i><\/div><\/div>\">   <div class=\"image\">     <img src=\".\/img\/r1.jpg\">   <\/div>   <div class=\"content\">     <div class=\"header\">Ronero<\/div>     <div class=\"description\">738 W Randolph St, Chicago, IL 60661<\/div>   <\/div>   <\/div> <div class=\"ui fluid card\" data-html=\"<div class='header'>User Rating<\/div><div class='content'><div class='ui star rating'><i class='active icon'><\/i><i class='active icon'><\/i><i class='active icon'><\/i><i class='icon'><\/i><i class='icon'><\/i><\/div><\/div>\">   <div class=\"image\">     <img src=\".\/img\/r2.jpg\">   <\/div>   <div class=\"content\">     <div class=\"header\">Smyth<\/div>     <div class=\"description\">177 N Ada St #101, Chicago, IL 60607<\/div>   <\/div>   <\/div> <div class=\"ui fluid card\" data-html=\"<div class='header'>User Rating<\/div><div class='content'><div class='ui star rating'><i class='active icon'><\/i><i class='active icon'><\/i><i class='active icon'><\/i><i class='icon'><\/i><i class='icon'><\/i><\/div><\/div>\">   <div class=\"image\">     <img src=\".\/img\/r3.jpg\">   <\/div>   <div class=\"content\">     <div class=\"header\">Kitsune<\/div>     <div class=\"description\">4229 N Lincoln Ave, Chicago, IL 60618<\/div>   <\/div>   <\/div>"
      })(),'bot')
      updateMessage("<div class=\"ui vertical buttons\"><button id=\"Ronero\" class=\"ui secondary button\">Ronero</button><button id=\"Smyth\" class=\"ui secondary button\">Smyth</button><button id=\"Kitsune\" class=\"ui secondary button\">Kitsune</button><button id=\"nothanks\" class=\"ui button\">不用了，謝謝</button></div>",'user');
      $("#Ronero, #Smyth, #Kitsune, #nothanks").on('click', function () {
        console.log('clicked')
   var value = $(this).text();
  ConversationHandler.setRequestParam(value)
  $(this).parent().parent().remove();
  sendMessage();
});

      break;
        case 'startchoice':
            updateMessage(
            (function(){
                return  '<div id="choice"  class=\"ui vertical buttons\" ><button id="travela" class="ui mini labeled icon button"><i class="flag outline icon"></i>旅行團</button>'+'<button id="indv" class="ui mini labeled icon button"><i class="camera retro icon"></i>自由行</button>'
            +'<button id="flightticket" class="ui mini labeled icon button"><i class="plane icon"></i>機票</button>'+'<button id="ship" class="ui mini labeled icon button"><i class="ship icon"></i>郵輪</button>'+'<button id="hotel" class="ui mini labeled icon button"><i class="hotel icon"></i>酒店</button></div>'
            })(), 'user');
            $('#travela').on('click',function(){
                ConversationHandler.setRequestParam('旅行團');
                sendMessage();
                $('#choice').parent().parent().remove();
            })
            $('#indv').on('click',function(){
                ConversationHandler.setRequestParam('自由行');
                sendMessage();
              $('#choice').parent().parent().remove();
            })
            $('#flightticket').on('click',function(){
                ConversationHandler.setRequestParam('機票');
                sendMessage();
                $('#choice').parent().parent().remove();
            })
            $('#ship').on('click',function(){
                ConversationHandler.setRequestParam('郵輪');
                sendMessage();
                $('#choice').parent().parent().remove();
            })
            $('#hotel').on('click',function(){
                ConversationHandler.setRequestParam('酒店');
                sendMessage();
                $('#choice').parent().parent().remove();
            })
            break;
        case 'travela':
          updateMessage((function(){
            var strVar="";
          strVar += "<div class=\"ui fluid card\" data-html=\"<div class='header'>User Rating<\/div><div class='content'><div class='ui star rating'><i class='active icon'><\/i><i class='active icon'><\/i><i class='active icon'><\/i><i class='icon'><\/i><i class='icon'><\/i><\/div><\/div>\">   <div class=\"image\">     <img src=\".\/img\/sing.jpg\">   <\/div>   <div class=\"content\">     <div class=\"header\">新加坡+馬來西亞5天皇牌之旅<\/div>     <div class=\"description\">     HKD2,499+     <\/div>   <\/div>   <\/div> <div class=\"ui fluid card\" data-html=\"<div class='header'>User Rating<\/div><div class='content'><div class='ui star rating'><i class='active icon'><\/i><i class='active icon'><\/i><i class='active icon'><\/i><i class='icon'><\/i><i class='icon'><\/i><\/div><\/div>\">   <div class=\"image\">     <img src=\".\/img\/thai.jpg\">   <\/div>   <div class=\"content\">     <div class=\"header\">曼谷+芭堤雅5天抵玩之旅<\/div>     <div class=\"description\">     HKD2,499+     <\/div>   <\/div>   <\/div> <div class=\"ui fluid card\" data-html=\"<div class='header'>User Rating<\/div><div class='content'><div class='ui star rating'><i class='active icon'><\/i><i class='active icon'><\/i><i class='active icon'><\/i><i class='icon'><\/i><i class='icon'><\/i><\/div><\/div>\">   <div class=\"image\">     <img src=\".\/img\/taw.jpg\">   <\/div>   <div class=\"content\">     <div class=\"header\">台北4天超值之旅<\/div>     <div class=\"description\">     HKD1,999+     <\/div>   <\/div><\/div>";
          return strVar;
          })()
, 'bot');
updateMessage("<div class=\"ui vertical buttons\"><button id=\"sing\" class=\"ui secondary button\">新加坡+馬來西亞5天皇牌之旅</button><button id=\"thai\" class=\"ui secondary button\">曼谷+芭堤雅5天抵玩之旅</button><button id=\"taw\" class=\"ui secondary button\">曼谷+芭堤雅5天抵玩之旅</button><button id=\"nothanks\" class=\"ui button\">不用了，謝謝</button></div>",'user');
$("#sing, #thai ,#taw, #nothanks").on('click',function(){
        ConversationHandler.setRequestParam($(this).text());
        sendmessage();
})
          break;
        case 'feedback':
            updateMessage('<div class=\"ui large star rating data-rating="3"\"><i class=\"icon\"></i><i class=\"icon\"></i><i class=\"icon\"></i><i class=\"icon\"></i><i class=\"icon\"></i></div>', 'user');
            $('.ui.rating').rating('setting', 'onRate', function (value) {
                ConversationHandler.setRequestParam(value.toString());
                sendMessage('init');
                $('.ui.rating').rating('disable')
            });
            break;
            case 'form':
            updateMessage((function(){
              var Str="";
        Str += "      <div class=\"ui selection dropdown\">";
        Str += "          <input type=\"hidden\" name=\"noofadult\">";
        Str += "          <i class=\"dropdown icon\"><\/i>";
        Str += "          <div class=\"default text\">成人人數<\/div>";
        Str += "          <div class=\"menu\">";
        Str += "			<div class=\"item\" data-value=\"0\">0<\/div>";
        Str += "			<div class=\"item\" data-value=\"1\">1<\/div>";
        Str += "			<div class=\"item\" data-value=\"2\">2<\/div>";
        Str += "			<div class=\"item\" data-value=\"3\">3<\/div>";
        Str += "			<div class=\"item\" data-value=\"4\">4<\/div>";
        Str += "			<div class=\"item\" data-value=\"5\">5<\/div>";
        Str += "			<div class=\"item\" data-value=\"6\">6<\/div>";
        Str += "			<div class=\"item\" data-value=\"7\">7<\/div>";
        Str += "			<div class=\"item\" data-value=\"8\">8<\/div>";
        Str += "			<div class=\"item\" data-value=\"9\">9<\/div>";
        Str += "      <\/div>";
        Str += "  <\/div>";
        Str += "      <div class=\"ui selection dropdown\">";
        Str += "          <input type=\"hidden\" name=\"noofchild\">";
        Str += "          <i class=\"dropdown icon\"><\/i>";
        Str += "          <div class=\"default text\">小童人數<\/div>";
        Str += "          <div class=\"menu\">";
        Str += "			<div class=\"item\" data-value=\"0\">0<\/div>";
        Str += "			<div class=\"item\" data-value=\"1\">1<\/div>";
        Str += "			<div class=\"item\" data-value=\"2\">2<\/div>";
        Str += "			<div class=\"item\" data-value=\"3\">3<\/div>";
        Str += "			<div class=\"item\" data-value=\"4\">4<\/div>";
        Str += "			<div class=\"item\" data-value=\"5\">5<\/div>";
        Str += "			<div class=\"item\" data-value=\"6\">6<\/div>";
        Str += "			<div class=\"item\" data-value=\"7\">7<\/div>";
        Str += "			<div class=\"item\" data-value=\"8\">8<\/div>";
        Str += "			<div class=\"item\" data-value=\"9\">9<\/div>";
        Str += "          <\/div>";
        Str += "      <\/div>";
        Str += "      <div class=\"ui selection dropdown\">";
        Str += "          <input type=\"hidden\" name=\"noofchild\">";
        Str += "          <i class=\"dropdown icon\"><\/i>";
        Str += "          <div class=\"default text\">客艙級別<\/div>";
        Str += "          <div class=\"menu\">";
        Str += "			<div class=\"item\" data-value=\"頭等客艙\">頭等客艙<\/div>";
        Str += "			<div class=\"item\" data-value=\"商務客艙\">商務客艙<\/div>";
        Str += "			<div class=\"item\" data-value=\"特選經濟客艙\">特選經濟客艙<\/div>";
        Str += "			<div class=\"item\" data-value=\"經濟客艙\">經濟客艙<\/div>";
        Str += "          <\/div>";
        Str += "      <\/div>";
               var strVar="";
strVar += "<span class=\"ui labeled input\"><span class=\"ui label\">FROM<\/span><input onfocus=\"blur()\"  style=\"width:120px\" id=\"from\" type=\"text\" placeholder=\"離港日期\"><\/span><span class=\"ui labeled input\"><span class=\"ui label\">TO<\/span><input onfocus=\"blur()\" id=\"to\"  style=\"width:120px\" type=\"text\" placeholder=\"回港日期\"><\/span>";
var sub="";
sub += "<div><button id=\"subtravel\" class=\"ui button\">";
sub += "  Submit";
sub += "<\/button></div>";
return '<div class=\"ui segment\">'+strVar+Str+sub+'</div>';
            })(),'user')
            $('.ui.dropdown').dropdown();
            $("#subtravel").on("click",function(){
              $("#subtravel").parent().parent().html("Hello World");
              ConversationHandler.setRequestParam("send");
              sendMessage("init");
            })
            $( function() {
var dateFormat = "mm/dd/yy",
 from = $( "#from" )
   .datepicker({
     defaultDate: "+1w",
     changeMonth: true,
     numberOfMonths: 1
   })
   .on( "change", function() {
     to.datepicker( "option", "minDate", getDate( this ) );
   }),
 to = $( "#to" ).datepicker({
   defaultDate: "+1w",
   changeMonth: true,
   numberOfMonths: 1
 })
 .on( "change", function() {
   from.datepicker( "option", "maxDate", getDate( this ) );
 });

function getDate( element ) {
 var date;
 try {
   date = $.datepicker.parseDate( dateFormat, element.value );
 } catch( error ) {
   date = null;
 }

 return date;
}
} );
              break;
        case 'casenumber':
            url = genURL(cot.array[0], cot.amount, cot.array[1], cot.array[4], cot.array[5], cot.array[6], cot.array[2], cot.array[3], cot.array[7])
            /*                            updateMessage('I have create a case and our customer agnet will follow you request immediately. Please leave your phone number'+'<p>Case No: '+url +'</p>', 'bot');*/
            break;
            case 'sellplan':
            updateMessage("<div class=\"ui fluid card\" data-html=\"<div class='header'>User Rating<\/div><div class='content'><div class='ui star rating'><i class='active icon'><\/i><i class='active icon'><\/i><i class='active icon'><\/i><i class='icon'><\/i><i class='icon'><\/i><\/div><\/div>\">   <div class=\"image\">     <img src=\".\/img\/chi.jpg\">   <\/div>   <div class=\"content\">     <div class=\"header\">The Combined Lake and River Tour<\/div>     <div class=\"description\">HKD2,499+     <\/div>   <\/div>   <\/div>",'bot');
              updateMessage("<button id=\"okay\" class=\"ui secondary button\">Yes I want this.</button><button id=\"nothanks\" class=\"ui button\">不用了，謝謝</button>",'user');
              $("#okay").on("click",function(){
                $("#okay").parent().parent().remove();
              ConversationHandler.setRequestParam("YES");
              sendMessage();
              })
              $("#nothanks").on("click",function(){
                $("#nothanks").parent().parent().remove();
                ConversationHandler.setRequestParam("NO");
                sendMessage();
              })
              break;
              case 'listofhotel':
              updateMessage((function(){
                var strVar = "<div class=\"ui fluid card\" data-html=\"<div class='header'>User Rating<\/div><div class='content'><div class='ui star rating'><i class='active icon'><\/i><i class='active icon'><\/i><i class='active icon'><\/i><i class='icon'><\/i><i class='icon'><\/i><\/div><\/div>\">   <div class=\"image\">     <img src=\".\/img\/hotel1.jpg\">   <\/div>   <div class=\"content\">     <div class=\"header\">Omni Chicago Hotel<\/div>     <div class=\"description\">4 星級飯店近北區, 芝加哥壯麗大道<\/div>   <\/div>   <\/div> <div class=\"ui fluid card\" data-html=\"<div class='header'>User Rating<\/div><div class='content'><div class='ui star rating'><i class='active icon'><\/i><i class='active icon'><\/i><i class='active icon'><\/i><i class='icon'><\/i><i class='icon'><\/i><\/div><\/div>\">   <div class=\"image\">     <img src=\".\/img\/hotel2.jpg\">   <\/div>   <div class=\"content\">     <div class=\"header\">Loews Chicago Hotel<\/div>     <div class=\"description\">4 星級飯店斯崔特維爾, 芝加哥壯麗大道<\/div>   <\/div>   <\/div> <div class=\"ui fluid card\" data-html=\"<div class='header'>User Rating<\/div><div class='content'><div class='ui star rating'><i class='active icon'><\/i><i class='active icon'><\/i><i class='active icon'><\/i><i class='icon'><\/i><i class='icon'><\/i><\/div><\/div>\">   <div class=\"image\">     <img src=\".\/img\/hotel3.jpg\">   <\/div>   <div class=\"content\">     <div class=\"header\">Sheraton Grand Chicago<\/div>     <div class=\"description\">4 星級飯店斯崔特維爾, 芝加哥壯麗大道<\/div>   <\/div>   <\/div>";
                  return strVar;
                })(),'bot')

              updateMessage(( function(){ var Str="";
        Str += "      <div class=\"ui selection dropdown\">";
        Str += "          <input type=\"hidden\" name=\"hotelname\">";
        Str += "          <i class=\"dropdown icon\"><\/i>";
        Str += "          <div class=\"default text\">入住酒店<\/div>";
        Str += "          <div class=\"menu\">";
        Str += "			<div class=\"item\" data-value=\"Omni\">Omni Chicago Hotel<\/div>";
        Str += "			<div class=\"item\" data-value=\"Loews\">Loews Chicago Hotel<\/div>";
        Str += "			<div class=\"item\" data-value=\"Sheraton\">Sheraton Grand Chicago<\/div>";
        Str += "  <\/div>";
        Str += "<\/div>";
        Str += "      <div class=\"ui selection dropdown\">";
        Str += "          <input type=\"hidden\" name=\"noofadult\">";
        Str += "          <i class=\"dropdown icon\"><\/i>";
        Str += "          <div class=\"default text\">成人人數<\/div>";
        Str += "          <div class=\"menu\">";
        Str += "			<div class=\"item\" data-value=\"0\">0<\/div>";
        Str += "			<div class=\"item\" data-value=\"1\">1<\/div>";
        Str += "			<div class=\"item\" data-value=\"2\">2<\/div>";
        Str += "			<div class=\"item\" data-value=\"3\">3<\/div>";
        Str += "			<div class=\"item\" data-value=\"4\">4<\/div>";
        Str += "			<div class=\"item\" data-value=\"5\">5<\/div>";
        Str += "			<div class=\"item\" data-value=\"6\">6<\/div>";
        Str += "			<div class=\"item\" data-value=\"7\">7<\/div>";
        Str += "			<div class=\"item\" data-value=\"8\">8<\/div>";
        Str += "			<div class=\"item\" data-value=\"9\">9<\/div>";
        Str += "  <\/div>";
        Str += "<\/div>";
        Str += "      <div class=\"ui selection dropdown\">";
        Str += "          <input type=\"hidden\" name=\"noofchild\">";
        Str += "          <i class=\"dropdown icon\"><\/i>";
        Str += "          <div class=\"default text\">小童人數<\/div>";
        Str += "          <div class=\"menu\">";
        Str += "			<div class=\"item\" data-value=\"0\">0<\/div>";
        Str += "			<div class=\"item\" data-value=\"1\">1<\/div>";
        Str += "			<div class=\"item\" data-value=\"2\">2<\/div>";
        Str += "			<div class=\"item\" data-value=\"3\">3<\/div>";
        Str += "			<div class=\"item\" data-value=\"4\">4<\/div>";
        Str += "			<div class=\"item\" data-value=\"5\">5<\/div>";
        Str += "			<div class=\"item\" data-value=\"6\">6<\/div>";
        Str += "			<div class=\"item\" data-value=\"7\">7<\/div>";
        Str += "			<div class=\"item\" data-value=\"8\">8<\/div>";
        Str += "			<div class=\"item\" data-value=\"9\">9<\/div>";
        Str += "  <\/div>";
        Str += "<\/div>";
        Str += "      <div class=\"ui selection dropdown\">";
        Str += "          <input type=\"hidden\" name=\"b\">";
        Str += "          <i class=\"dropdown icon\"><\/i>";
        Str += "          <div class=\"default text\">床位級別<\/div>";
        Str += "          <div class=\"menu\">";
        Str += "			<div class=\"item\" data-value=\"2\">2 張雙人床 (2 double bed)<\/div>";
        Str += "			<div class=\"item\" data-value=\"1\">1 張床間 (extra-large double bed)<\/div>";
        Str += "          <\/div>";
        Str += "      <\/div>";
       var strVar="";
strVar += "<span class=\"ui labeled input\"><span class=\"ui label\">FROM<\/span><input onfocus=\"blur()\" style=\"width:120px\" id=\"from\" type=\"text\" placeholder=\"入住日期\"><\/span><span class=\"ui labeled input\"><span class=\"ui label\">TO<\/span><input onfocus=\"blur()\" id=\"to\"  style=\"width:120px\" type=\"text\" placeholder=\"退房日期\"><\/span>";
var sub="";
sub += "<div><button id=\"subhotel\" class=\"ui button\">";
sub += "  Submit";
sub += "<\/button></div>";

return '<div class=\"ui segment\">'+strVar+Str+sub+'</div>';
})(),'user'
              )
              $('.ui.dropdown').dropdown();
              $( function() {
 var dateFormat = "mm/dd/yy",
   from = $( "#from" )
     .datepicker({
       defaultDate: "+1w",
       changeMonth: true,
       numberOfMonths: 1
     })
     .on( "change", function() {
       to.datepicker( "option", "minDate", getDate( this ) );
     }),
   to = $( "#to" ).datepicker({
     defaultDate: "+1w",
     changeMonth: true,
     numberOfMonths: 1

   })
   .on( "change", function() {
     from.datepicker( "option", "maxDate", getDate( this ) );
   });

 function getDate( element ) {
   var date;
   try {
     date = $.datepicker.parseDate( dateFormat, element.value );
   } catch( error ) {
     date = null;
   }

   return date;
 }
} );
$("#subhotel").on('click',function(){
ConversationHandler.setRequestParam("Submit");
$("#subhotel").parent().parent().parent().parent().remove();
sendMessage();
}
)
              break;
              case 'bookhotel':
                updateMessage("<button id=\"okhotel\" class=\"ui secondary button\">Yes</button><button id=\"nohotel\" class=\"ui button\">No</button>",'user');
                $("#okhotel").on("click",function(){
                  $("#okhotel").parent().parent().remove();
                ConversationHandler.setRequestParam("我要Book 酒店");
                sendMessage();
                })
                $("#nohotel").on("click",function(){
                  $("#nohotel").parent().parent().remove();
                ConversationHandler.setRequestParam("唔洗，我唔需要酒店");
                sendMessage();
                })
                break;
        default:
            break;
    }
}
})
