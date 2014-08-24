/*
	Dutchwebworks Grunt boilerplate (2014)
*/

module.exports = function(grunt) {

	/**********************************************************************
	1. Load all Grunt dependency NPM packages listed in `package.json`
	**********************************************************************/

	require('load-grunt-tasks')(grunt, {
		config: './package.json',							// Json file to read
		scope: 'devDependencies'							// Only autoload Grunt tasks inside `devDependencies`
	});

	/**********************************************************************
	2. Configure Grunt tasks
	**********************************************************************/

	grunt.initConfig({
		pkg: grunt.file.readJSON('./package.json'),			// Json file to read
		meta: {												// List of meta-data used by other tasks like file banners
			banner: '/*!\n' +								// Banner info prefixed to minified files (see `package.json`)
				' * ' + 'Name: <%= pkg.name %>\n' +
				' * ' + 'Author: <%= pkg.author %>\n' +
				' * ' + 'Version: <%= pkg.version %>\n' +
				' * ' + 'Date: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
				' */\n'
			,
		},
		watch: {
			scss: {
				options: {
					spawn: false
				},
				files: './sass/**/*.scss',					// `Watch` *.scss files, when changes are detected run the task(s) below
				tasks: ['sass:dev']							// Using the `newer` (plugin) as prefix: it; only (re)compiles files that have actually changed
			}
		},
		sass: {
			dev: {											// For local debug development with Css sourcemap
				options: {
					outputStyle: 'expanded',				// Sass output style
					sourceMap: true,						// Enable Css sourcemaps
				},
				files: [{
					expand: true,							// Enable dynamic directory expansion
					cwd: './sass',							// Change to this working directory
					src: ['*.scss'],						// Globbing pattern to match files
					dest: './css',							// Destination directory
					ext: '.css',							// Destination files will have this extension
				}]
			},
			dist: {											// For distribution to production server, no Css sourcemap
				options: {
					outputStyle: 'expanded',				// Sass output style
					sourceMap: false,						// Enable Css sourcemaps
				},
				files: [{
					expand: true,							// Enable dynamic directory expansion
					cwd: './sass',							// Change to this working directory
					src: ['*.scss'],						// Globbing pattern to match files
					dest: './css',							// Destination directory
					ext: '.css',							// Destination files will have this extension
				}]
			}
		},
		cssmin: {
			combine: {
				options: {
					banner: '<%= meta.banner %>'
				},
				files: {
					'./css/min/style.css': [				// First list the single destination minified output filename, then list the files to be combined (in order) into this minfied filename
						'./css/style.css'
						// './css/another.css'
					]
				}
			}
		},
		imagemin: {
			dynamic: {
				options: {
					optimizationLevel: 3
				},
				files: [{
					expand: true,							// Enable dynamic directory expansion
					cwd: './img',							// Change to this working directory
					src: ['./**/*.{png,jpg,gif}'],			// Globbing pattern to match files
					dest: './img'							// Destination directory
				}]				
			}
		},
		svgmin: {
			options: {
				plugins: [{
					removeViewBox: false,
					removeUselessStrokeAndFill: false
				}]
			},
			dist: {
				files: [{
					expand: true,							// Enable dynamic directory expansion
					cwd: './img',							// Change to this working directory
					src: ['./**/*.svg'],					// Globbing pattern to match files
					dest: './img'							// Destination directory
					// ext: '.min.svg'						// Destination file extension
				}]
			}
		},
		jshint: {
			options: {
				jshintrc: ".jshintrc"						// Use the `.jshintrc` file for reading settings for Javascript linting
			},
			target: {
				src: './js/*.js'							// ... also uses `.jshintignore` file for ignored Javascript files like libraries
			}
		},
		concat: {
			options: {
				separator: ';'
			},
			js: {
				src: [										// List of files, in order, to be combined to output file
					'./js/libs/jquery-2.1.0.js',
					'./js/libs/modernizr-2.7.1.js',
					'./js/common.js'
				],
				dest: './js/min/common.concat.js'			// The output filename
			}
		},
		uglify: {
			options: {
				banner: '<%= meta.banner %>'
			},
			common: {
				options: {
					// sourceMap: true,						// Output sourcemap
					sourceMapName: './js/common.js.map'		// Sourcemap filename
				},
				src: './js/min/common.concat.js',			// Usually the output file of the `concat` task above
				dest: './js/min/common.js',					// The output file
			}
		},
		browserSync: {
			dev: {
				options: {
					watchTask: true,						// When using other Grunt `watch` tasks, don't let browserSync stop Grunt here, continue to other Grunt tasks
					debugInfo: true,
					excludedFileTypes: ["map"],
					ghostMode: {							// Sync. these events to all connected webbrowsers
						clicks: true,
						scroll: true,
						links: true,
						forms: false
					},
					// proxy: 'grunt-test.local.cassius.nl'	// Proxy requests to locally configured webserver vhost (like Apache / IIS)
					server: {								// Use either a `server` or `proxy`
						baseDir: './'						// Directory to serve to the webbrowsers
					}
				},	
				bsFiles: {									// 'Watch' these files for changes, then reload connected webbrowsers
					src: [
						'./css/**/*.css',
						'./js/**/*.js',
						'**/*.html',
						'**/*.shtml'
					]	
				}				
			}
		},
		clean: {											// Remove these (dev / obsolete) files
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

	// Server (proxy) and file `watcher` livereload for local development
	grunt.registerTask('serve', ['browserSync', 'watch']);

	// Aliasses, sub-tasks
	grunt.registerTask('build-sass', ['sass:dist', 'cssmin']);
	grunt.registerTask('build-js', ['concat', 'uglify', 'clean:jsconcat']);
	grunt.registerTask('build-img', ['imagemin', 'svgmin']);

	// Run once for deployment, build everything using above aliasses and run a cleanup task
	grunt.registerTask('default', ['build-sass', 'build-js', 'build-img', 'clean']);
};