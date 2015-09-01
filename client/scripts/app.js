// YOUR CODE HERE:

//Display messages retrieved from parse server.
var displayedMessages = {};
var messageProperties = {};
var roomsList = {};

$(document).ready(function(){

  //Continually refresh page with new messages from Parse
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
          if (displayedMessages[msgObject.objectId] === undefined) {
            if (roomsList[msgObject.roomname] === undefined && msgObject.roomname !== undefined) {
              roomsList[msgObject.roomname] = msgObject.roomname;
              var $roomNode = $('<option></option>');
              $roomNode.addClass("room");
              $roomNode.text(msgObject.roomname);
              $("#roomSelector").append($roomNode);
            }
            displayedMessages[msgObject.objectId] = msgObject;
            var node = $("<div></div>");
            node.addClass("chat");
            node.attr("id", msgObject.objectId);
            node.text("User " + msgObject.username + 
              " message: " + msgObject.text + " created: "
               + msgObject.createdAt
               + " room " + msgObject.roomname);
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

  //Create new message and send to Parse
  $('button').click(function() {
    // debugger;
    // console.log("clicked");
    var $input = $('#sendMessage :input');
    var message = {
      username: (prompt('What is your name?') || 'anonymous'),
      text: $input.val(),
      roomname:"room"
    };

    // alert($input.val());
    // alert(message);
    // console.log($input.text());

    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        alert("passed");
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        alert("failed");
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  });
  function changeRoom() {
    var currentRoom = $( "#roomSelector option:selected" ).text();
    //Display all if currentRoom === home
    $(".chat").each(function(index, element) {
      
    });
  }
});
