# words
This is a web site which helps your store your new words(vocabulary) and remember these words more efficiently and easily.
It will adopt some learning techinques as Spaced_repetition.

**The demo of this site is already deployed in http://youaccomplish.com/ell/**

<img src="https://www.diigo.com/file/image/qdrsesezcesscbaodzbpqaapbq/Contexter.jpg" alt="alt text" height="800px">

##Installation
1. Clone this repo into your computer, namely `words/`
>git clone https://github.com/wangzhihao/words.git
>
>cd words

2. Install mongodb and strongloop
>
> On Mac: brew install mongodb
> On Unbuntu: https://docs.mongodb.org/v3.0/tutorial/install-mongodb-on-ubuntu/
>
> npm install -g strongloop

3. The backend database is mongodb. create a database directory inside `words/`, the directory name should be `database/`. Also add a `logs/` directory
>mkdir -p database/db
>
>mkdir logs

4. Install node dependent packages
> npm install

5. Start the database and web server via shell script, you can shut down the site via `shutdown.sh` 
> cd words
>

6. Run the database scripts(Mainly to create some indexes. ) Execute the following script:
>	$bash: mongo
>
> \> use words
>
> \> load('databaseScripts/mongoScript.js');

7. Run the app.
> run.sh

8. visit the site via 0.0.0.0/3010 (You can check the listening URL in logs file.)
