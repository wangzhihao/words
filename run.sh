#!/bin/sh

echo start the mongo db

ROOT_DIR=/Users/wangzhihao/Workspace/words

SERVER_DIR=$ROOT_DIR/site/remember-your-words/server

echo start the database
cd $ROOT_DIR
# run it in background(&) and redirect the output to logs(>>)
mongod --dbpath $ROOT_DIR/database/ >> $ROOT_DIR/logs/db.log &


echo start the server
cd $SERVER_DIR
# run it in background(&) and redirect the output to logs(>>)
slc run >> $ROOT_DIR/logs/server.log &

#wait the database and server background processes compelte
wait