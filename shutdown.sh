#!/bin/sh

ROOT_DIR=$( cd "$( dirname "$0" )" && pwd )

echo shut down the mongo db

kill $(cat $ROOT_DIR/logs/db.pid)


echo shut down the web server

kill $(cat $ROOT_DIR/logs/server.pid)

