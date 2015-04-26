/*
	Dutchwebworks Grunt boilerplate, april 2015
	https://github.com/dutchwebworks/grunt-boilerplate
*/

module.exports = function(grunt) {

	/**********************************************************************
	1. Load all Grunt dependency NPM packages listed in `package.json`
	**********************************************************************/

	// Grunt load tasks https://www.npmjs.org/package/load-grunt-tasks
	require('load-grunt-tasks')(grunt, {
		config: './package.json',
		scope: 'devDependencies'
	});

	// Display the elapsed execution time of grunt tasks
	require('time-grunt')(grunt);
	
	/**********************************************************************
	2. Configure Grunt tasks and their targets
	**********************************************************************/

	grunt.initConfig({
		pkg: grunt.file.readJSON('./package.json'),
		meta: {
			banner: '/*!\n' +
				' * ' + 'Name: <%= pkg.name %>\n' +
				' * ' + 'Author: <%= pkg.author %>\n' +
				' * ' + 'Version: <%= pkg.version %>\n' +
				' * ' + 'Date: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
				' */'
			,
		},

		// Grunt watch https://www.npmjs.org/package/grunt-contrib-watch
		watch: {
			scss: {
				options: {
					spawn: false
				},
				files: './sass/**/*.scss',
				tasks: ['newer:sass:dev']
			}
		},

		// Grunt libsass https://www.npmjs.org/package/grunt-sass
		sass: {
			dev: {
				options: {
					outputStyle: 'expanded',
					sourceMap: true,
				},
				files: [{
					expand: true,
					cwd: './sass',
					src: ['*.scss'],
					dest: './css',
					ext: '.css',
				}]
			},
			dist: {
				options: {
					outputStyle: 'expanded',
					sourceMap: false,
				},
				files: [{
					expand: true,
					cwd: './sass',
					src: ['*.scss'],
					dest: './css',
					ext: '.css',
				}]
			}
		},

		// Grunt contrib cssmin https://www.npmjs.org/package/grunt-contrib-cssmin
		cssmin: {
			style: {
				files: {
					'./css/style.min.css': [
						'./css/style.css'
						// './css/another.css'
					]
				}
			}
		},

		// Grunt imagemin https://www.npmjs.org/package/grunt-contrib-imagemin
		imagemin: {
			dynamic: {
				options: {
					optimizationLevel: 3
				},
				files: [{
					expand: true,
					cwd: './img',
					src: ['./**/*.{png,jpg,gif}'],
					dest: './img'
				}]				
			}
		},

		// Grunt svgmin https://www.npmjs.org/package/grunt-svgmin
		svgmin: {
			options: {
				plugins: [{
					removeViewBox: false,
					removeUselessStrokeAndFill: false
				}]
			},
			dist: {
				files: [{
					expand: true,
					cwd: './img',
					src: ['./**/*.svg'],
					dest: './img'
					// ext: '.min.svg'
				}]
			}
		},

		// Grunt jshint https://www.npmjs.org/package/grunt-contrib-jshint
		jshint: {
			options: {
				jshintrc: ".jshintrc"
			},
			target: {
				src: './js/*.js'
			}
		},

		// Grunt concat https://www.npmjs.org/package/grunt-contrib-concat
		concat: {
			options: {
				separator: ';'
			},
			js: {
				src: [
					'./js/libs/jquery-2.1.0.js',
					'./js/libs/modernizr-2.7.1.js',
					'./js/common.js'
				],
				dest: './js/common.concat.js'
			}
		},

		// Grunt uglify https://www.npmjs.org/package/grunt-contrib-uglify
		uglify: {
			options: {
				banner: '<%= meta.banner %>'
			},
			common: {
				options: {
					// sourceMap: true,
					sourceMapName: './js/common.js.map'
				},
				src: './js/common.concat.js',
				dest: './js/common.min.js',	
			}
		},

		// Grunt banner https://www.npmjs.com/package/grunt-banner
		usebanner: {
			banner: {
				options: {
					position: 'top',
					banner: '<%= meta.banner %>',
					linebreak: true
				},
				files: {
					src: ['./css/style.min.css']
				}
			}
		},
		// Grunt browser-sync https://www.npmjs.org/package/grunt-browser-sync
		browserSync: {
			dev: {
				options: {
					watchTask: true,
					debugInfo: true,
					excludedFileTypes: ["map"],
					ghostMode: {
						clicks: false,
						scroll: false,
						links: false,
						forms: false
					},
					// Use either the proxy or server setting
					// proxy: 'grunt-test.local.cassius.nl'
					server: {
						baseDir: './'
					}
				},	
				bsFiles: {
					src: [
						'./css/**/*.css',
						'./js/**/*.js',
						'**/*.html',
						'**/*.shtml'
					]	
				}				
			}
		},

		// Grunt clean https://www.npmjs.org/package/grunt-contrib-clean
		clean: {
			cssmap: {
				src: ['./css/**/*.map'],
				filter: 'isFile'
			},
			jsmap: {
				src: ['./js/**/*.map'],
				filster: 'isFile'
			},
			jsconcat: {
				src: ['./js/**/*.concat.js'],
				filter: 'isFile'
			}
		}
	});

	/**********************************************************************
	3. Registered Grunt tasks
	**********************************************************************/

	grunt.registerTask('serve', [
		'browserSync',
		 'watch'
	]);

	grunt.registerTask('build-sass', [
		'sass:dist',
		'newer:cssmin',
		'usebanner'
	]);

	grunt.registerTask('build-js', [
		'newer:concat',
		'newer:uglify',
		'clean:jsconcat'
	]);

	grunt.registerTask('build-img', [
		'newer:imagemin',
		'newer:svgmin'
	]);

	grunt.registerTask('default', [
		'build-sass',
		'build-js',
		'build-img',
		'clean'
	]);
};