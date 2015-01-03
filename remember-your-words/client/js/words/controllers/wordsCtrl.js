(function(angular){
	angular.module('wordsApp')
	.controller('wordsCtrl', wordsCtrl);

	wordsCtrl.$inject = ['wordsService'];

	function wordsCtrl(wordsService){
		var ctrl = this;

		ctrl.words = {};
		ctrl.newWord = {};
		ctrl.saveFlag = 0;
		ctrl.tab = 0;

		ctrl.getAllWords = getAllWords;
		ctrl.reset = reset;
		ctrl.removeWord = removeWord;
		ctrl.saveWord = saveWord;

		ctrl.getAllWords();

		function getAllWords(){
			wordsService.getWords().then(function(data){
				//console.log(data);
				ctrl.words = data;
			});
		}

		function reset(){
			ctrl.newWord = {};
			ctrl.saveFlag = 0;
		}

		function removeWord(word){
			ctrl.words = jQuery.grep(ctrl.words, function(item){
  			return item.name !== word.name;
			});
			wordsService.removeWord(word.id).then(function(data){
				//do nothing.
			},function(error){
				ctrl.words.push(word);
			});
		}

		function saveWord(word){
			ctrl.saveFlag = 0;
			wordsService.saveWord(word).then(function(data){
				ctrl.saveFlag = 1;
				ctrl.words.push(data);
			},function(error){
				ctrl.saveFlag = 2;
			});
		}
	};
})(angular);