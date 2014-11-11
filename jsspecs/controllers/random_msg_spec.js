(function() {
  "use strict";

  describe("Random message controller", function() {
    var domMessage;
    var domLink;
    var PROMPT = /Please/;

    beforeEach(function() {
      domMessage = $("<div id='message'></div>");
      domLink = $("<a href='#' id='new-message'>New</a>"); 
      $(document.body).append(domMessage);
      $(document.body).append(domLink);
      protime360.controllers.randomMessagePicker.initialize();
    });

    afterEach(function() {
      protime360.controllers.randomMessagePicker.destroy();
      domMessage.remove();
      domLink.remove();
    });

    it("prompt user for action upon startup", function() {
      expect(messageText()).toMatch(PROMPT);
    });

    it("shows a random message upon the user clicking the new-link", function() {
      clickNewMessage();
      expect(messageText()).not.toMatch(PROMPT);
    });

    it("shows a different message upon clicking the new-link repeatedly", function() {
      clickNewMessage();
      var firstMessage = messageText();
      clickNewMessage();
      expect(messageText()).not.toEqual(firstMessage);
    });

    function clickNewMessage() {
      $('#new-message').trigger('click');
    }

    function messageText() {
      return $('#message').text();
    }
  });
})();