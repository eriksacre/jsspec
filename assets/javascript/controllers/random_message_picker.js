protime360.controllers.randomMessagePicker = (function(msgWrapper) {
  "use strict";

  var pub = {}
  var MESSAGES = [
    'Welcome to the house of fun',
    'I come from a land down under',
    'The time has come to talk of many things',
    'I feel like going home',
    'Is there life on Mars?'
  ];
  var lastMessageIndex = null;

  pub.initialize = function() {
    msgWrapper.onUserRequestsNewMessage(newMessage);
    promptForAction();
  }

  pub.destroy = function() {
    msgWrapper.offUserRequestsNewMessage();
  }

  function promptForAction() {
    msgWrapper.setMessage('Please click "New" to get a new message.');
  }

  function newMessage() {
    msgWrapper.setMessage(pickRandomMessage());
  }

  function pickRandomMessage() {
    return MESSAGES[newRandomPickIndex()];
  }

  function newRandomPickIndex() {
    do {
      var pick = Math.floor(Math.random() * nrOfMessages());
    } while(pick === lastMessageIndex);
    lastMessageIndex = pick;
    return lastMessageIndex;
  }

  function nrOfMessages() {
    return MESSAGES.length;
  }
  
  return pub;
}(protime360.dom.messageWrapper));
