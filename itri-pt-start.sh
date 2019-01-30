#!/bin/bash
#Change directory
cd ~/itri-pt-develop/
#start msfrpc
msfrpcd -S -U msf -p 55552 -P abc
#start yarn
yarn dev || firefox
