#!/bin/sh
# Use this command file to install all required NPM packages, read from the package.json

CURRENT_DIR=$(dirname $_)
cd $CURRENT_DIR
if [ ! -d node_modules ];then
	sudo npm install
fi
ulimit -n 8192
grunt