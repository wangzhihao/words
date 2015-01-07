#!/bin/sh

ROOT_DIR=/Users/wangzhihao/Workspace/words

SERVER_DIR=$ROOT_DIR/site/remember-your-words/server

echo start the database
cd $ROOT_DIR
# run it in background(&) and redirect the output to logs(>>)
mongod --dbpath $ROOT_DIR/database/ &> $ROOT_DIR/logs/db.log &
# save the pid of database.
echo $! > $ROOT_DIR/logs/db.pid

echo start the server
cd $SERVER_DIR
# run it in background(&) and redirect the output to logs(>>)
slc run &> $ROOT_DIR/logs/server.log &
# save the pid of the server.
echo $! > $ROOT_DIR/logs/server.pid

echo the site started!
