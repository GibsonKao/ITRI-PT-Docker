#!/bin/bash
set -e

if [ "$1" = 'Meow' ]; then
    echo $TARGET > target.txt
    python collect.py &> /dev/null
    cat /app/result/audit/html/*
else
    exec "$@"
fi
