(function(angular){
	angular.module('wordsApp')
	.controller('wordsCtrl', wordsCtrl);

	wordsCtrl.$inject = ['wordsService', 'wordSelectionService'];

	function wordsCtrl(wordsService, wordSelectionService){
		var ctrl = this;

		ctrl.cache = [];
		ctrl.words = {};
		ctrl.todayNumber = 5;
		ctrl.recentNumber = 5;
		ctrl.newWord = initialWord();
		ctrl.saveFlag = 0;
		ctrl.tab = 0;

		ctrl.addNewExample = addNewExample;
		ctrl.editWord = editWord;
		ctrl.showRecentWords = showRecentWords;
		ctrl.showTodayWords = showTodayWords;
		ctrl.reset = reset;
		ctrl.removeWord = removeWord;
		ctrl.saveWord = saveWord;
		
		ctrl.showTodayWords();
		
		function showTodayWords(){
			if(ctrl.cache['today']){
				ctrl.words = ctrl.cache['today'];
			}else{
				wordSelectionService.randomSelect(ctrl.todayNumber, ctrl, ctrl.cache);
			}
		}

		function showRecentWords(){
			if(ctrl.cache['recent']){
				ctrl.words = ctrl.cache['recent'];
			}else{
				wordSelectionService.recent(ctrl.recentNumber, ctrl, ctrl.cache);
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
				var source = ctrl.newWord.source;
				ctrl.newWord = initialWord();
				//keep the last source when adding a new word.
				ctrl.newWord['source'] = source;
			}
			ctrl.saveFlag = 0;
		}

		function removeWordLocal(word){
			ctrl.words = jQuery.grep(ctrl.words, function(item){
  			return item.id !== word.id;
			});
			ctrl.cache['recent'] = jQuery.grep(ctrl.cache['recent'], function(item){
  			return item.id !== word.id;
			});
			ctrl.cache['today'] = jQuery.grep(ctrl.cache['today'], function(item){
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
				word['create-date'] = new Date();
				wordsService.saveWord(word).then(function(data){
					ctrl.saveFlag = 1;
					if(wordsCtrl.tab === 1){
						//in "List all words page".
						ctrl.words.push(data);
					}
					ctrl.cache['recent'].push(data);
				},function(error){
					ctrl.saveFlag = 2;
				});
			}
		}
	};
})(angular);