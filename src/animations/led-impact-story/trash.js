'use strict';

/*global document*/
const helpers = require('../../helpers');
const ajsounds = require('../../data/ajsounds');
const intro  = require('../../modules/intro');
const camera = document.querySelector('a-camera');

module.exports = {
	init,
	animIn,
};

const sceneElement = document.querySelector('a-scene');
const sky = document.querySelector('a-sky');
let ledImpactFigure;
let floor;
let walls;
const numWalls = 4;

function init() {
		ledImpactFigure = helpers.appendNewElement(sceneElement, 'a-text', {
			'id': 'ledImpactFigure',
			'color': '#19b77e',
			'position': '11.700 2 -24.485',
			'align': 'center',
			'baseline': 'bottom',
			'scale': '55 55',
			'rotation': '0 -34 0',
			'value': '0',
			'opacity': '0',
		});
		const trash = helpers.appendNewElement(sceneElement, 'a-text', {
			'id': 'trash',
			'mixin': 'ledImpactTextMixin',
			'color': '#19b77e',
			'position': '12.700 6 -23.485',
			'align': 'center',
			'value': 'trash',
			'scale': '55 55 0',
			'rotation': '0 -38 0',
		});

		setTimeout(function(){
			helpers.appendNewElement(trash, 'a-animation', {
				'attribute': 'opacity',
				'from': '1',
				'to': '0',
				'dur': '500',
				'ease': 'ease-in-out',
			});
			setTimeout(sceneElement.removeChild(trash), 500);

			helpers.appendNewElement(ledImpactFigure, 'a-animation', {
				'attribute': 'opacity',
				'from': '0',
				'to': '1',
				'dur': '600',
				'ease': 'ease-in-out',
			});
		}, 5000);

	floor = helpers.appendNewElement(sceneElement, 'a-box', {
		'id': 'floor',
		'width': '100',
		'depth': '100',
		'height': '50',
		'position': '0 -25 0',
		'static-body': '',
		'color': 'black',
		'opacity': '0',
	});
}

function animIn(savings) {
	sceneElement.removeChild(ledImpactFigure);

	const trash = helpers.appendNewElement(sceneElement, 'a-entity', {
		'id': 'trash',
	});

	let i = 0;
	// let trashToCreate = 50; // TESTING
	let trashToCreate = (((savings.yearlySavings * 1.222) / 40)).toFixed(0);
	if (trashToCreate > 100) {
		trashToCreate = 100; // In case trash to create is too high.
	}

	const cMin = -20;
	const cMax = 20;
	const rainHeight = 200; // Height that it rains from

	function createTrash() {
		let ranX = Math.floor(Math.random() * (cMax - cMin)) + cMin;
		let ranZ = Math.floor(Math.random() * (cMax - cMin)) + cMin;
		let ranY = Math.floor(Math.random() * (360 - 0)) + 0;
		let items = [{
				'type': 'a-box',
				'src': '#pizzaBox',
				'depth': '1',
				'height': '0.1',
				'width': '1',
				'rotation': '0 ' + ranY + ' 0',
				'position': ranX + ' ' + rainHeight + ' ' + ranZ,
				'dynamic-body': 'shape: box',

			},
			{
				'type': 'a-box',
				'src': '#plasticBag',
				'depth': '0.65',
				'height': '0.01',
				'width': '1',
				'rotation': '0 ' + ranY + ' 0',
				'position': ranX + ' ' + rainHeight + ' ' + ranZ,
				'dynamic-body': 'shape: box',
			},
			{
				'type': 'a-box',
				'src': '#cereal',
				'depth': '1',
				'height': '0.2',
				'width': '0.5',
				'rotation': '0 ' + ranY + ' 0',
				'position': ranX + ' ' + rainHeight + ' ' + ranZ,
				'dynamic-body': 'shape: box',
			},
			{
				'type': 'a-cylinder',
				'src': '#can',
				'height': '0.3',
				'radius': '0.1',
				'rotation': '0 ' + ranY + ' 0',
				'position': ranX + ' ' + rainHeight + ' ' + ranZ,
				'dynamic-body': 'shape: cylinder',
				'child': {
					'type': 'a-circle',
					'radius': '0.1',
					'src': '#canTop',
					'position': '-0.002 0.158 0.007',
					'rotation': '-90 0 0',
				},
			},
			{
				'type': 'a-cylinder',
				'src': '#plasticBottle',
				'height': '0.4',
				'radius': '0.1',
				'rotation': '-90 ' + ranY + ' 45',
				'position': ranX + ' ' + rainHeight + ' ' + ranZ,
				'dynamic-body': 'shape: cylinder',
			},
			{
				'type': 'a-box',
				'src': '#crisps',
				'depth': '0.05',
				'height': '0.75',
				'width': '0.45',
				'rotation': '0 ' + ranY + ' 0',
				'position': ranX + ' ' + rainHeight + ' ' + ranZ,
				'dynamic-body': 'shape: box',
			},
			{
				'type': 'a-cylinder',
				'src': '#tubeChips',
				'height': '0.7',
				'radius': '0.14',
				'rotation': '-90 ' + ranY + ' 0',
				'position': ranX + ' ' + rainHeight + ' ' + ranZ,
				'dynamic-body': 'shape: cylinder',
			},
			{
				'type': 'a-box',
				'src': '#cookies',
				'depth': '0.3',
				'height': '0.075',
				'width': '0.45',
				'rotation': '0 ' + ranY + ' 0',
				'position': ranX + ' ' + rainHeight + ' ' + ranZ,
				'dynamic-body': 'shape: box',
			}
		];

		let ranItem = Math.floor(Math.random() * items.length);

		setTimeout(function() {
			if ((ranX < 1 && ranX > -1) || (ranZ < 1 && ranZ > -1)) {} else {
				const item = document.createElement(items[ranItem].type);
				for (const [key, value] of Object.entries(items[ranItem])) {
					if (key == 'type') {} else if (key == 'child') {
						const child = document.createElement(items[ranItem].child.type);
						for (const [key, value] of Object.entries(items[ranItem].child)) {
							if (key == 'type') {} else {
								child.setAttribute(key, value);
							}
						}
						item.appendChild(child);
					} else {
						item.setAttribute(key, value);
					}
				}
				trash.appendChild(item);
				i++;
			}
			if (i <= trashToCreate) {
				createTrash();
			} else {
				setTimeout(function() {
					helpers.playSound(ajsounds.outro);
					setTimeout(function() {
						sceneElement.removeChild(trash);
						sceneElement.removeChild(floor);
						helpers.playSound(ajsounds.payoff);
						setTimeout(function() {
							const endText = helpers.appendNewElement(sceneElement, 'a-text',{
								'id': 'endText',
								'mixin': 'ledImpactTextMixin',
								'color': '#19b77e',
								'position': '11.700 2 -24.485',
								'align': 'center',
								'value': '#together',
								'scale': '30 30 0',
								'rotation': '0 -38 0',
							});
							setTimeout(function(){
								helpers.appendNewElement(endText, 'a-animation', {
									'attribute': 'opacity',
									'from': '1',
									'to': '0',
									'dur': '500',
									'ease': 'ease-out',
								});
							}, 5000);
						}, 500);
					}, 10500);
				}, 12000);
			}
		}, 100);
	}
	createTrash();
}
