# words
This is a web site which helps your store your new words(vocabulary) and remember these words more efficiently and easily.
It will adopt some learning techinques as Spaced_repetition.

##Installation
1. Clone this repo into your computer, namely `words/`
>git clone https://github.com/wangzhihao/words.git
>
>cd words

2. Install mongodb and strongloop
>brew install mongodb
>
> npm install -g strongloop

3. The backend database is mongodb. create a database directory inside words, the directory name should be `database/`
>mkdir -p ./database/db

4. Install node dependent packages
> cd remember-your-words
>
> npm install

4. Start the database and web server via shell script, you can shut down the site via `shutdown.sh` 
> cd words
>
>run.sh

5. visit the site via 0.0.0.0/3000 (You can check the listening URL in logs file.)
