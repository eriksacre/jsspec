/* global protime360 */

protime360.dom.messageWrapper = (function($) {
  "use strict";

  return {
    onUserRequestsNewMessage: function(callback) {
      $(document).on('click', '#new-message', function() {
        callback();
        return false;
      });
    },

    offUserRequestsNewMessage: function() {
      $(document).off('click', '#new-message');
    },

    setMessage: function(text) {
      $('#message').text(text);
    }
  };
}(jQuery));
