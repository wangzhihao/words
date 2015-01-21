(function(angular){
	angular.module('wordsApp')
	.controller('wordsCtrl', wordsCtrl);

	wordsCtrl.$inject = ['wordsService', 'wordSelectionService', 'wordsLocalService'];

	function wordsCtrl(wordsService, wordSelectionService, wordsLocalService){
		var ctrl = this;

		ctrl.localService = wordsLocalService;
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
			if(!ctrl.localService.todayCache){
				ctrl.localService.todayCache = [];
				wordSelectionService.randomSelect(ctrl.todayNumber, ctrl.localService);
			}
		}

		function showRecentWords(){
			if(!ctrl.localService.recentCache){
				ctrl.localService.recentCache = [];
				wordSelectionService.recent(ctrl.recentNumber, ctrl.localService);
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

		function removeWord(word){
			wordsService.removeWord(word.id).then(function(data){
				ctrl.localService.removeWordLocal(word);
			});
		}

		function saveWord(word){
			ctrl.saveFlag = 0;
			if(word.id){
				wordsService.updateWord(word).then(function(data){
					ctrl.saveFlag = 1;
					ctrl.localService.editWordLocal(word);
				},function(error){
					ctrl.saveFlag = 2;
				});
			}else{
				word['create-date'] = new Date();
				wordsService.saveWord(word).then(function(data){
					ctrl.saveFlag = 1;
					ctrl.localService.addWordLocal(word);
				},function(error){
					ctrl.saveFlag = 2;
				});
			}
		}
	};
})(angular);