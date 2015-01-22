var _ = require("underscore");
var moment = require('moment');

module.exports = function(Word) {

	/**
	 * See https://groups.google.com/forum/#!topic/loopbackjs/chL8tp1NBX8
	 * 		 http://docs.mongodb.org/manual/reference/operator/query/text/#op._S_text"
	 */
	Word.search = function(text, records, cb){
		var wordCollection = Word.getDataSource().connector.collection(Word.modelName);
		wordCollection.find(
	   	{ $text: { $search: text } },
	   	{ score: { $meta: "textScore" } }
		)
		.sort( { score: { $meta: "textScore" } } )
		.limit(records)
		.toArray(function(err, words){
	  	//console.log(words);
	    cb(err, words);
		});
	}

	Word.remoteMethod(
	    'search', 
	    {
	      accepts: [
	      	{arg: 'text', type: 'string', required:true, description:'search text'},
	      	{arg: 'records', type: 'number', required:true, description:'the number of the records to return.'}
	      ],
	      returns: {arg: 'words', type: ['object']},
	      http: 	 {verb: 'get'},
	      description: "Full-text search on words. Mulitple search criteria are supported." 
	    }
	);

  /*
   * Extend the API by creating a new remote method.
   * More information see http://docs.strongloop.com/display/public/LB/Remote+methods
   * 
   * The following doc can help to manipulate data in NodeJs.
   * http://docs.strongloop.com/display/public/LB/Querying+data
   */
		Word.random = function(number, cb) {

			//If this is a first request in today, or the request number is changed.
			if(!Word.now || Word.now.diff(moment(), 'days') < 0 || !Word.list || number != Word.list.length){
				Word.now = moment();
				//console.log(Word.now);
				Word.count(function(err, count){
					//console.log(count);
					Word.list = _randomList(count, number);
		  		cb(null, Word.list);
				});
			}else{
				console.log('reuse random list');
				cb(null, Word.list);
			}
		}
	
		/**
     * Pick up n integers from [0, total) randomly.
     */
    function _randomList(total, n){
      var array = [];
      for(var i = total - 1; i >= 0; i--){
        array[i] = i;
      }
      return _.sample(array, n);
    }

		Word.remoteMethod(
		    'random', 
		    {
		      accepts: {arg: 'number', type: 'number'},
		      returns: {arg: 'list', type: ['number']},
		      http: 	 {verb: 'get'},
		      description: "Randomly pick up a list."
		    }
		);
};
