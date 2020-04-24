#!/bin/bash
set -e

SERVER="kalambury_database_server";
PW="razdwa34";
DB="kalambury_database";

echo "echo stop & remove old docker [$SERVER] and starting new fresh instance of [$SERVER]"
(docker kill $SERVER || :) && \
  (docker rm $SERVER || :) && \
  docker run -d \
  --name $SERVER \
  -e POSTGRES_PASSWORD=$PW \
  -p 5433:5432 \
  postgres
#  -e PGPASSWORD=$PW \ this goes over '-p 5433:5432'

# wait for pg to start
echo "sleep wait for pg-server [$SERVER] to start";
sleep 3;

# create the db
echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres
echo "\l" | docker exec -i $SERVER psql -U postgres
