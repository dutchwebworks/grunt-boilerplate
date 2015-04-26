# Dutchwebworks Grunt Boilerplate

*By Dennis Burger, april 2015*

This is a **starter web boilerplate** using Grunt as a build system. It contains the following components: 

* A static local **webserver** (NodeJS `browserSync`) that is **preconfigured to serve the current directory**. But can be configured to **proxy requests** to another (local) Apache/IIS webserver when using PHP / Ruby / Python / .NET like server-side-languages.
* The (faster but less feature rich) version of **libsass** for fast Sass compilation. 
* **Uglify** (minify) Javascript files.
* **Concatenation** of (minified) Css and Javascript files.
* A **JSHint** task for linting (debugging) Javascript.
* **Image and SVG** optimization task.
* A Grunt **watcher** to automatically **(re)compile Sass** on the fly and (Css inject) **refresh the connected browsers** using NodeJS `browserSync`.
* A Grunt **cleanup** task, to remove intermediate reduntant build files.

This can also be used to connect **multiple webbrowsers and mobile / tablet devices**. Thanks to NodeJS `browserSync` all connected (device) webbrowsers, on the same local (or wifi) network, will refresh automatically. **Scroll- link- and click-actions are synced** between the connected devices and webbrowsers.

### Github issue tracking

Issue's and questions can be reported and tracked on the [Github issue page](https://github.com/dutchwebworks/grunt-boilerplate/issues).

## One-time setup

* Make sure [NodeJS](http://nodejs.org) is installed
* And install the global [Grunt command-line interface](http://gruntjs.com/getting-started) (grunt-cli) 

### Download boilerplate files

Download the files from this boilerplate and place them in the root of the (local) destination project folder.

### Install the required Grunt plugins on the local machine

Open a **Terminal** (MS-Dos) command-line window. Then `cd` into the **project root directory** (where the `package.json` file resides). Then run the command below, which will read the `package.json` file, and install the required `devDependencies` for this Grunt boilerplate.

*On Windows, omit the `sudo` part.*

	sudo npm install	

### Version-control

After the installation is done the familiar `node_modules/` directory will appear. These are the Grunt plugins used by this boilerplate setup. This directory **must be ignored by the version-control** system (SVN / Git). On another machine one can **easily reinstall** these required Grunt plugins by running the **one-time setup described above** on that machine. 

Only the `Gruntfile.js`, `.jshintrc`, `.jshintignore` and the `package.json` file must travel with the other project files in version-control systems. Not the `node_modules/` directory.

## Configure the basic paths

In the `Gruntfile.js` are predefined paths to basic `sass/`, `css/` and `js/` etc. directories. The `grunt concat` task has some sample paths to Javascript libraries (not included in this boilerplate) for a concatenation example.

Please **configure**, and read the inline **documentation**, for these paths and files accordingly to the **destination project setup** before using the Grunt tasks.

## Local development

Writing **HTML/Css and Javascript** is usually **the bulk of local web development**. Use the optional Grunt task below to run a (static) local webserver with a **watch task** to automatically **(re)compile Sass** and **refresh** (connected) webbrowsers. 

Open a **Terminal** (MS-Dos) command-line window, then `cd` into the root directory of the project (where the `Gruntfile.js` resides) and run:

	grunt serve
	
The **default webbrowser will open** and one can also use this **IP address** (and port number) on **other browsers, computers or mobile / tablet devices**, running on the same (local / wifi) network, for debugging and browser testing (note firewall settings of the local machine).

### Proxy

This (local) webserver can also be configured (see `Gruntfile.js` section `browserSync`) to **proxy requests** to another (local) Apache/IIS webserver. This way one can use a **real webserver** to run for example `.shtml`, PHP / Ruby / Python / .NET like server-side-languages. Such as (local) **Wordpress websites**. And still benefit from **Grunt watch**, automatic **Sass compilaton** and **browser refresh** accross (connected) browsers and devices using this Grunt setup.

### Optimization tasks

The **preconfigured Grunt** (aliased) **tasks** are defined at the bottom of the `Gruntfile.js` file and can be used to optimize and prepare various files before committing everything to version-control. And finally to a production (live) server.

The `grunt serve` task above also compiles Sass to Css. But one can also call this **Sass compilation** task manually by running this command. This Grunt task will also **minify the Css files**.

	grunt build-sass	

For **image and SVG optimization** run the command below. The images and SVG files are **optimized in place**. Meaning they will be overwritten by the optimized version.

	grunt build-img

To **uglify** (minify) and **concatenate** Javascript files run the command blow. Please configure the paths and desired concatenated versions first in the `Gruntfile.js`.

	grunt build-js
	
To **lint** (debug) Javascript files run the task below. The JSHint Grunt task reads its configuration from the `.jshintrc` and `.jshintignore` files. See [online documentation](http://jshint.com/docs/).

	grunt jshint
	
### Run everything in one go

One can also run the **default Grunt task** to run every task (except for the JSHint task) in one sweet go.

	grunt

All configured Grunt tasks (see `grunt.inifConfig`section in the `Gruntfile.js`) can also be called individually from the command-line.

## Easy trigger files to run Grunt tasks

Use the `_run_grunt_####` file (for Windows or Mac) to easily run the `grunt serve` or default `grunt` task from the Windows Explorer or Mac Finder by **simply double-clicking it**.

On **Mac** make sure the `_run_grunt_Mac.command` and `_run_grunt_serve_Mac.command` files have **Unix executable permissions**. Open a **Terminal** window, then `cd` into the project root directory and run:

	chmod ugo+x *.command