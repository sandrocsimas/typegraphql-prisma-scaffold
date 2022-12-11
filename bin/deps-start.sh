#!/bin/sh

export $(xargs < .env)

echo "Creating MySQL docker container..."
docker run -d -p 3306:3306 -e MYSQL_ROOT_USER=$DB_USER -e MYSQL_ROOT_PASSWORD=$DB_PASSWORD --name mysql mysql > /dev/null 2>&1

sleep 2
while ! docker exec mysql mysql --user=$DB_USER --password=$DB_PASSWORD --execute "show databases;" > /dev/null 2>&1 ; do
    echo "Waiting for database connection..."
    sleep 2
done

echo "Creating database schema $DB_SCHEMA..."
docker exec -i mysql mysql --user=$DB_USER --password=$DB_PASSWORD --execute "create schema $DB_SCHEMA;" > /dev/null 2>&1

echo "Creating database structure..."
npm run prisma-push

echo "Done!"
