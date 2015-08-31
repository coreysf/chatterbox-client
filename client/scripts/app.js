// YOUR CODE HERE:

//Display messages retrieved from parse server.
var message = ("message");
var messages = {};

$(document).ready(function(){
  // $.ajax({
  //   url: 'https://api.parse.com/1/classes/chatterbox',
  //   type: 'GET',
  //   // data: JSON.stringify(message),
  //   contentType: 'application/json',
  //   success: function (data) {
  //     //data:  { results:[Objects] }
  //     //results: array of message objects
  //     //  { createdAt, objectId, roomname, text, updatedAt, username };
  //     console.log('chatterbox: Message received');
  //     console.log(data.results);
  //     messages = data.results;
  //     _.each(messages, function(msgObject) {
  //       var node = $("<div></div>");
  //       node.addClass("chat");
  //       node.text("User " + msgObject.username + 
  //         " message: " + msgObject.text);
  //       $("#chats").append(node);
  //     });
  //   },
  //   error: function (data) {
  //     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
  //     console.error('chatterbox: Failed to acquire message');
  //   }

  // });


  setInterval(function() {
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      // data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        //data:  { results:[Objects] }
        //results: array of message objects
        //  { createdAt, objectId, roomname, text, updatedAt, username };
        console.log('chatterbox: Message received');
        _.each(data.results.reverse(), function(msgObject) {
          if (messages[msgObject.objectId] === undefined) {
            messages[msgObject.objectId] = msgObject.objectId;
            var node = $("<div></div>");
            node.addClass("chat");
            node.text("User " + msgObject.username + 
              " message: " + msgObject.text + " created: " + msgObject.createdAt);
            $("#chats").prepend(node);
         }
        });
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to acquire message');
      }
  });

  },1000);

});
