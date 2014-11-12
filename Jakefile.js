(function() {
  'use strict';

  var path = require("path");
  var runner = require("karma/lib/runner");
  var CONFIG = { configFile: path.resolve("karma.config.js") };
  var jshint = require("jshint").JSHINT;
  var fs = require("fs");

  task("default", ["lint", "spec"], function() {
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
      if(exitCode) fail("Specs failed");
    });
  });

  desc("Lint source code and specs");
  task("lint", function() {
    var passed = validateFileList(filesToLint(), lintOptions(), lintGlobals());
    if(!passed) fail("Lint failed");
  });

  function filesToLint() {
    var files = new jake.FileList();
    files.include("assets/**/*.js");
    files.include("jsspecs/**/*.js");
    files.exclude("jsspecs/vendor/**/*.js");
    return files.toArray();
  }

  function lintOptions() {
    return {
      bitwise: true,
      curly: false,
      eqeqeq: true,
      forin: true,
      immed: true,
      latedef: false,
      newcap: true,
      noarg: true,
      noempty: true,
      nonew: true,
      regexp: true,
      undef: true,
      strict: true,
      trailing: true,
      browser: true,
      jquery: true
    };
  }

  function lintGlobals() {
    return {
    };
  }

  function validateSource(sourceCode, options, globals, description) {
    description = description ? description + " " : "";
    var pass = jshint(sourceCode, options, globals);
    if(pass) {
      console.log(description + "ok");
    } else {
      console.log(description + "failed");
      jshint.errors.forEach(function(error) {
        console.log(error.line + ": " + error.evidence.trim());
        console.log("   " + error.reason);
      });
    }
    return pass;
  }

  function validateFile(filename, options, globals) {
    var sourceCode = fs.readFileSync(filename, "utf8");
    return validateSource(sourceCode, options, globals, filename);
  }

  function validateFileList(fileList, options, globals) {
    var pass = true;
    fileList.forEach(function(filename) {
      pass = validateFile(filename, options, globals) && pass;
    });
    return pass;
  }
})();
