module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    //pfad zur package
    pkg: grunt.file.readJSON('package.json'),

    //Überwacht alle .less dateien, und führt bei Änderung den Less Task aus
    watch: {
      files: ["../source/assets/less/*.less"],
      tasks: ["less:development"]
    },

    //kompiliert alle .less dateien aus angegebenem Verzeichnis ins .css dateien
    less : {

      development: {
        options: {
          paths: ["../source/assets/less"]
        },
        files: {
          "../source/assets/css/style.css" : "../source/assets/less/style.less"
        }
      },


    }

  });

  // Load tasks from "grunt-contrib" grunt plugin installed via Npm.

grunt.loadNpmTasks("grunt-contrib-watch");
grunt.loadNpmTasks("grunt-contrib-less");



  // Default task.
  grunt.registerTask("default", "watch");


};