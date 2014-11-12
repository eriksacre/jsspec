/* global protime360 */

protime360.dom.messageWrapper = (function($) {
  "use strict";

  var pub = {};

  pub.onUserRequestsNewMessage = function(callback) {
    $(document).on('click', '#new-message', function() {
      callback();
      return false;
    });
  };

  pub.offUserRequestsNewMessage = function() {
    $(document).off('click', '#new-message');
  };

  pub.setMessage = function(text) {
    $('#message').text(text);
  };

  return pub;
}(jQuery));
