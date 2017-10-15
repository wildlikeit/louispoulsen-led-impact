'use strict';

/*global document*/

const helpers = require('../../helpers');

module.exports = {
	create,
};

function create(inputHoursData, container) {
	const ledImpactInput3 = document.querySelector('#ledImpactInput3');

	// Adding inputs via the data
	inputHoursData.forEach(function(element, index) {
		// Total Input Wrapper
		let ledImpactInputWrapper = helpers
			.appendNewElement(container, 'a-entity', {
				'id': 'ledImpactInputWrapper' + index,
				'position': '0 ' + (-index * 3) + ' 0',
			});

		if (element.type == 'input') {
			// Plus Input
			let ledImpactInputPlusCircle = helpers
				.appendNewElement(ledImpactInputWrapper, 'a-circle', {
					'id': 'ledImpactPlusCircle' + index,
					'position': '-1.903 0 -1.802',
					'rotation': '0 -43 0',
					'radius': '0.6',
					'opacity': '0.5',
				});

			helpers
				.appendNewElement(ledImpactInputPlusCircle, 'a-text', {
					'id': 'ledImpactInputPlus' + index,
					'position': '0 0 0',
					'scale': '4.5 4.5',
					'align': 'center',
					'value': '+',
				});

			let ledImpactInputPlusEvent = helpers
				.appendNewElement(ledImpactInputPlusCircle, 'a-circle', {
					'id': 'ledImpactPlusEvent' + index,
					'position': '0 0 0',
					'radius': '0.6',
					'opacity': '0',
				});

			ledImpactInputPlusEvent.addEventListener('click', function() {
				let curVal = parseInt(ledImpactInput3.getAttribute('value'));

				if (curVal >= 0) {
					ledImpactInput3.setAttribute('value', curVal += element.value);
				}
			});

			// Minus Input
			let ledImpactInputMinusCircle = helpers
				.appendNewElement(ledImpactInputWrapper, 'a-circle', {
					'id': 'ledImpactMinusCircle' + index,
					'position': '-0.790 0 -0.801',
					'rotation': '0 -43 0',
					'radius': '0.6',
					'opacity': '0.5',
				});

			helpers
				.appendNewElement(ledImpactInputMinusCircle, 'a-text', {
					'id': 'ledImpactInputMinus' + index,
					'position': '0 0 0',
					'scale': '4.5 4.5',
					'align': 'center',
					'value': '-',
				});

			let ledImpactInputMinusEvent = helpers
				.appendNewElement(ledImpactInputMinusCircle, 'a-circle', {
					'id': 'ledImpactMinusEvent' + index,
					'position': '0 0 0',
					'radius': '0.6',
					'opacity': '0',
				});

			ledImpactInputMinusEvent.addEventListener('click', function() {
				let curVal = parseInt(ledImpactInput3.getAttribute('value'));

				if ((curVal - element.value) >= 0) {
					ledImpactInput3.setAttribute('value', curVal -= element.value);
				}
			});
		}

		// Input Text
		helpers
			.appendNewElement(ledImpactInputWrapper, 'a-text', {
				'id': 'ledImpactInput' + index,
				'mixin': 'ledImpactTextMixin',
				'position': '0 0 0',
				'value': element.value,
			});
	});
}
