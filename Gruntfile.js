//包装函数
module.exports = function(grunt) {
  //定义时间
  var t = new Date();
  var timestamp = t.getTime().toString();

  //任务配置,所有插件的配置信息
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	myVar: timestamp,

    //clean 清除目录 dist 与 临时文件
    clean: {
      folders: ['dist/**', 'temporary-files/**']
    },

    //htmlmin 压缩并复制 HTML 文件
    htmlmin: {
      main: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: ['./**/*.html'],
          dest: 'temporary-files/html/'
        }]
      }
    },

    //ES6转换ES5（插件uglify3.0.1不支持ES6）
    // babel: {
    //   options: {
    //     sourceMap: false,
    //     presets: ['babel-preset-es2015'],
    //     plugins: ["transform-remove-strict-mode"]
    //   },
    //   dist: {
    //     files: [{
    //       expand: true,
    //       cwd: 'src/js-6/', //js目录下
    //       src: ['**/*.js'], //所有js文件
    //       dest: 'temporary-files/js-5' //输出到此目录下
    //     }]
    //   }
    // },


    //查检
    jshint: {
      files: ['Gruntfile.js', 'src/js/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        esversion: 5,
        globals: {
          jQuery: false
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },

    //uglify js压缩合并与压缩
    uglify: {
      options: {
        screwIE8: false,
        compress: {
          drop_console: false
        }
      },
      uglifyJS: {
        files: [{
          expand: true,
          src: ['src/js/**/*.js', '!*.min.js'],
          dest: 'dist/js/main.min.js',
          cwd: '.',
          rename: function(dest, src) {//重命名 js：添加时间戳
            //srcPath = src.replace('.js', '.' + timestamp + '.js');
            //distPath = srcPath.replace('src/temp-js-5/', 'dist/js/');
			distPath = dest.replace('.js', '.' + timestamp + '.js');
            return distPath;
          }
        }]
      }
    },

    //less转css（压缩）
    less: {
      production: {
        options: {
          compress: true
        },
        files: {
          'temporary-files/css/main.min.css': 'src/less/main.less'
        }
      }
    },

    //copy 复制文件
    copy: {
      main: {
        expand: true,
        cwd: 'src/',
        src: [
          '**/*.json',
          '**/*.jpg',
          '**/*.png',
          '**/*.gif',
          '**/*.ico',
		  '**/*.config'
        ],
        dest: 'dist/'
      },
      htmlFile: {
        expand: true,
        cwd: 'temporary-files/html',
        src: '**/*.html',
        dest: 'dist/',
        options: {
          encoding: 'utf-8',
          process: function(content, srcpath) {
            return content.replace(/\.--timestamp--\.(css|js)/g, '.' + timestamp + '.$1');
          }
        }
      }
    },
	//concat 借用，用于重命名 css 文件
	concat: {
		basic: {
		  src: ['temporary-files/css/main.min.css'],
		  dest: 'dist/css/main.min.<%= myVar %>.css',
		}
	}

  });

  //告诉grunt我们将使用插件
  // grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-concat');


  //告诉grunt当我们在终端中输入grunt时需要做些什么(注意先后顺序)
  grunt.task.registerTask('default', ['clean', 'htmlmin', 'jshint', 'uglify', 'less', 'copy', 'concat']);

};
