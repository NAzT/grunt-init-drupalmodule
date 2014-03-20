/*
 * grunt-init-gruntfile
 * https://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create a basic drupal module.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'This template tries to guess file and directory paths, but ' +
  'you will most likely need to edit the generated Gruntfile.js file before ' +
  'running grunt. _If you run grunt after generating the Gruntfile, and ' +
  'it exits with errors, edit the file!_';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({}, [
    init.prompt('name'),
    init.prompt('description'),
    init.prompt('package', "Opendream"),
    init.prompt('drupal_core_version', "7.x"),
    init.prompt('module_version', "0.1"),
    init.prompt('drupal_dependecies', ""),
    {
      name: 'has_admin',
      message: 'Including file admin.inc?',
      default: 'Y/n',
      warning: 'If selected, blah blah blah'
    },
  ], function(err, props) {
    props.has_admin = /y/i.test(props.has_admin);

    // Find the first `preferred` item existing in `arr`.
    function prefer(arr, preferred) {
      for (var i = 0; i < preferred.length; i++) {
        if (arr.indexOf(preferred[i]) !== -1) {
          return preferred[i];
        }
      }
      return preferred[0];
    }

    // Guess at some directories, if they exist.
    var dirs = grunt.file.expand({filter: 'isDirectory'}, '*').map(function(d) { return d.slice(0, -1); });

    // Files to copy (and process).
    var files = init.filesToCopy(props);
    if (!props.has_admin) { delete files['my_module.inc']; }

    // Actually copy (and process) files.
    init.copyAndProcess(files, props); 

    // All done!
    done();
  });

};
