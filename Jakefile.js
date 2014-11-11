(function() {
  'use strict';

  var path = require("path");
  var runner = require("karma/lib/runner");
  var CONFIG = { configFile: path.resolve("karma.config.js") };

  task("default", ["spec"], function() {
  });

  desc("Start Karma server");
  task("karma", function() {
    jake.exec("node_modules/karma/bin/karma start karma.config.js", function() {
      complete();
    });
  }, {async: true});

  desc("Run specs");
  task("spec", function() {
    runner.run(CONFIG, function(exitCode) {
      if(exitCode) fail("Specs failed -- be sure to jake karma");
    });
  });
})();
