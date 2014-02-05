#!/bin/bash

# Creates a scaffolded project in the provided directory

DEFAULT_DIR='/Users/derryl/Desktop'
DEFAULT_NAME='scaffold'

DESTINATION=${1:-$DEFAULT_DIR}
PROJECT_NAME=${2:-$DEFAULT_NAME}

cd ~/repos/Grunt-Scaffold
git archive --format zip --output $DESTINATION/$PROJECT_NAME.zip master
cd $DESTINATION
unzip $PROJECT_NAME.zip -d $PROJECT_NAME
rm $PROJECT_NAME.zip
cd $PROJECT_NAME && touch weareinside.txt