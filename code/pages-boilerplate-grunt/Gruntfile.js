// 实现这个项目的构建任务




module.exports = grunt => {
  const sass = require('node-sass');
  const mozjpeg = require('imagemin-mozjpeg');
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    sass: {
      options: {
        implementation: sass,
        sourceMap: true
      },
      dist: {
        files:{
          './dist/assets/styles/main.css': './src/assets/styles/main.scss'
        }
      }
    },
    swig: {
      development: {
        init: {
          autoescape: true
        },
        dest: 'dist/',
        src: ['src/*.html'],
        // generateSitemap: true,
        // generateRobotstxt: true,
        // siteUrl: 'http://mydomain.net/',
        production: false,
        // fb_appid: '1349v',
        // ga_account_id: 'UA-xxxxxxxx-1',
        // robots_directive: 'Disallow /',
        // sitemap_priorities: {
        //   '_DEFAULT_': '0.5',
        //   'index.html': '0.8',
        //   'subpage.html': '0.7'
        // }
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env']
      },
      dist: {
        files: {
          'dist/assets/scripts/*.js': 'src/assets/scripts/*.js'
        }
      }
    },
    imagemin: {
      static: {
        options: {
          optimizationLevel: 3,
          svgoPlugins: [{ removeViewBox: false }],
          use: [mozjpeg()] // Example plugin usage
        },
        files: {
          'dist/img.png': 'src/img.png',
          'dist/img.jpg': 'src/img.jpg',
          'dist/img.gif': 'src/img.gif'
        }
      },
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/'
        }]
      }
    }
  })

  grunt.registerTask('compile', ['sass', 'swig', 'babel','imagemin']);

}