#!/bin/bash

# Kills the 'grunt connect' process so we can safely restart the server

PORT=${1:-8797}

PID=$(lsof -i:$PORT | grep 'node' | awk '{print $2}')

if [ $PID ]; then
    kill $PID;
fi