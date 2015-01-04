(function(angular){
	angular.module('wordsApp')
	.controller('wordsCtrl', wordsCtrl);

	wordsCtrl.$inject = ['wordsService'];

	function wordsCtrl(wordsService){
		var ctrl = this;

		ctrl.words = {};
		ctrl.newWord = initialWord();
		ctrl.saveFlag = 0;
		ctrl.tab = 0;

		ctrl.addNewExample = addNewExample;
		ctrl.editWord = editWord;
		ctrl.getAllWords = getAllWords;
		ctrl.reset = reset;
		ctrl.removeWord = removeWord;
		ctrl.saveWord = saveWord;

		ctrl.getAllWords();

		function addNewExample(word){
			if( !word.examples ){
				word['examples'] = []
			}
			word.examples.push({
				type : 'Text',
				value : ''
			});
		}

		function editWord(word){
			if(word){
				//deep copy.
				ctrl.newWord = jQuery.extend(true, {}, word);
			}else{
				ctrl.newWord = initialWord();
			}
			$('#editWord').modal();
		}

		function initialWord(){
			return {
				examples : []
			};
		}

		function getAllWords(){
			wordsService.getWords().then(function(data){
				//console.log(data);
				ctrl.words = data;
			});
		}

		function reset(){
			ctrl.newWord = initialWord();
			ctrl.saveFlag = 0;
		}

		function removeWordLocal(word){
			ctrl.words = jQuery.grep(ctrl.words, function(item){
  			return item.id !== word.id;
			});
		}

		function removeWord(word){
			removeWordLocal(word);
			wordsService.removeWord(word.id).then(function(data){
				//do nothing.
			},function(error){
				ctrl.words.push(word);
			});
		}

		function saveWord(word){
			ctrl.saveFlag = 0;
			if(word.id){
				wordsService.updateWord(word).then(function(data){
					ctrl.saveFlag = 1;
					removeWordLocal(word);
					ctrl.words.push(data);
				},function(error){
					ctrl.saveFlag = 2;
				});
			}else{
				wordsService.saveWord(word).then(function(data){
					ctrl.saveFlag = 1;
					ctrl.words.push(data);
				},function(error){
					ctrl.saveFlag = 2;
				});
			}
		}
	};
})(angular);