#!/bin/bash
# Find XML file in Output Directory
# Path: ~/itri-pt-develop/public/output
# Using xsltproc conver XML to HTML on Desktop 
for file in ~/itri-pt-develop/public/output/*.xml; do
  xsltproc $file -o ./"$(basename "${file%.*}")".html
done
