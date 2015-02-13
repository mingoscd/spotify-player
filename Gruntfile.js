module.exports = function(grunt) {

  // 1. All configuration goes here 
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

    //Concatena
    concat: {
      dist: {
        src: [
            'src/js/*.js', // All JS in the libs folder
        ],
        dest: 'build/js/application.js',
      } 
    },

    //Minifica
    uglify: {
      build: {
        src: 'build/js/application.js',
        dest: 'build/js/application.min.js'
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'build/css/style.css': 'src/css/style.scss'
        }
      } 
    },

    processhtml: {
      dist: {
        options: {
          process: true,
          data: {
            title: 'My SpotifyPlayer',
            message: 'Just learning!'
          }
        },
        files: {
          'build/index.html': ['src/index.html']
        }
      }
    },

    //Automate el save
    watch: {

      livereload: {
        files: ['build/**/*'],
        options: {
          livereload: true,
        },
      },

      html: {
        files: ['src/index.html'],
        tasks: ['processhtml'],
        options: {
          spawn: false,
        },
      },

      css: {
        files: ['src/css/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
        }
      },

      scripts: {
        files: ['src/js/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        },
      }


    }


  });

  // 3. Where we tell Grunt we plan to use this plug-in.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-processhtml');

  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.


  grunt.registerTask('default', ['watch']);

};