'use strict';

/*global document*/

module.exports = {
	init,
};

function init(selectors){
	setTimeout(function(){
		let i = 0;
		let countTo = 1;
		function count(){
			setTimeout(function() {
				document.querySelector('#ledImpactFigure').setAttribute('value', i);
				i++;
				if (i <= countTo) {
					count();
				}
				if(i == countTo){
					setTimeout(function(){
						selectors.scene.emit('startTrees', true);
					}, 500);
				}
			}, 100 - (i*0.9));
		}
		count();
	}, 1000);
}