#!/bin/sh
# Runs grunt server with browserSync and watch tasks

CURRENT_DIR=$(dirname $_)
cd $CURRENT_DIR
if [ ! -d node_modules ];then
	sudo npm install
fi
ulimit -n 8192
grunt serve