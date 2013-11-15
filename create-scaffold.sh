#!/bin/bash

# Creates a scaffolded project in the provided directory

DEFAULT_DIR='/Users/derryl/Desktop'
DEFAULT_NAME='scaffold'

DIR=${1:-$DEFAULT_DIR}
NAME=${2:-$DEFAULT_NAME}

cd ~/repos/Grunt-Scaffold
git archive --format zip --output $DIR/$NAME.zip master
cd $1
unzip $NAME.zip -d $NAME
rm $NAME.zip
cd $NAME && touch weareinside.txt