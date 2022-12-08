#!/bin/sh

echo "Stppping MySQL docker container..."
docker stop mysql > /dev/null 2>&1

echo "Removing MySQL docker container..."
docker rm mysql > /dev/null 2>&1

echo "Done!"
