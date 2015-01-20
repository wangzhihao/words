(function(angular){
	angular.module('wordsApp')
	.controller('wordsCtrl', wordsCtrl);

	wordsCtrl.$inject = ['wordsService', 'wordSelectionService'];

	function wordsCtrl(wordsService, wordSelectionService){
		var ctrl = this;

		ctrl.cache = [];
		ctrl.words = {};
		ctrl.number = 5;
		ctrl.newWord = initialWord();
		ctrl.saveFlag = 0;
		ctrl.tab = 0;

		ctrl.addNewExample = addNewExample;
		ctrl.editWord = editWord;
		ctrl.showAllWords = showAllWords;
		ctrl.showTodayWords = showTodayWords;
		ctrl.reset = reset;
		ctrl.removeWord = removeWord;
		ctrl.saveWord = saveWord;
		
		ctrl.showTodayWords();
		
		function showTodayWords(){
			if(ctrl.cache['today']){
				ctrl.words = ctrl.cache['today'];
			}else{
				wordSelectionService.randomSelect(ctrl.number, ctrl, ctrl.cache);
			}
		}

		function showAllWords(){
			if(ctrl.cache['all']){
				ctrl.words = ctrl.cache['all'];
			}else{
				wordsService.getWords().then(function(data){
					//console.log(data);
					ctrl.words = ctrl.cache['all'] = data;
				});
			}
		}

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
			ctrl.reset(word);
			$('#editWord').modal();
		}

		function initialWord(){
			return {
				examples : []
			};
		}

		function reset(word){
			if(word){
				//deep copy.
				ctrl.newWord = jQuery.extend(true, {}, word);
			}else{
				ctrl.newWord = initialWord();
			}
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
					if(wordsCtrl.tab === 1){
						//in "List all words page".
						ctrl.words.push(data);
					}
					ctrl.cache['all'].push(data);
				},function(error){
					ctrl.saveFlag = 2;
				});
			}
		}
	};
})(angular);