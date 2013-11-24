module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    //pfad zur package
    pkg: grunt.file.readJSON('package.json'),

    //Überwacht alle .less dateien, und führt bei Änderung den Less Task aus
    watch: {
      files: ["../source/assets/less/*.less"],
      tasks: ["less:development", "autoprefixer"]
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
      }

    },

    autoprefixer: {

      target : {
        src: "../source/assets/css/style.css"
      },
      options: {
        browsers: ["last 2 versions"]
      }

    }

  });

  // Load tasks from "grunt-contrib" grunt plugin installed via Npm.

grunt.loadNpmTasks("grunt-contrib-watch");
grunt.loadNpmTasks("grunt-contrib-less");
grunt.loadNpmTasks("grunt-autoprefixer");



  // Default task.
  grunt.registerTask("default", "watch");


};