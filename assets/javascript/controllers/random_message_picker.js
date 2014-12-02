/* global protime360 */

protime360.controllers.randomMessagePicker = (function(msgWrapper) {
  "use strict";

  var MESSAGES = [
    'Welcome to the house of fun',
    'I come from a land down under',
    'The time has come to talk of many things',
    'I feel like going home',
    'Is there life on Mars?'
  ];
  var lastMessageIndex = null;

  return {
    initialize: function() {
      msgWrapper.onUserRequestsNewMessage(newMessage);
      promptForAction();
    },

    destroy: function() {
      msgWrapper.offUserRequestsNewMessage();
    }
  };

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
    var pick;
    do {
      pick = Math.floor(Math.random() * nrOfMessages());
    } while(pick === lastMessageIndex);
    lastMessageIndex = pick;
    return lastMessageIndex;
  }

  function nrOfMessages() {
    return MESSAGES.length;
  }
}(protime360.dom.messageWrapper));
