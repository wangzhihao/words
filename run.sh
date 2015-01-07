#!/bin/sh

echo start the mongo db

WORD_DIR=/Users/wangzhihao/Workspace/words/site

SERVER_DIR=$WORD_DIR/remember-your-words/server

echo start the database
cd $WORD_DIR
# run it in background(&) and redirect the output to logs(>>)
mongod --dbpath ./database/ >> $WORD_DIR/logs/db.log &


echo start the server
cd $SERVER_DIR
# run it in background(&) and redirect the output to logs(>>)
slc run >> $WORD_DIR/logs/server.log &

#wait the database and server background processes compelte
wait