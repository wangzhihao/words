/*
	Execute this script via:
		$bash: mongo
		> use words
		> load('data-backup/mongoScript.js');
*/
db.word.ensureIndex({
  "$**": "text"
}, {
  name: "TextIndex"
});
