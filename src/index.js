import { GUI } from 'dat.gui';
import P5 from 'p5';

import Renderer from './renderer';

const options = {
	maxIterations: 250,
	zoom: 250,
	xPan: -100,
	yPan: 0,
	quality: 0.9,
	draw: () => { },
	reset: () => { }
};

const defaultOptions = Object.assign({}, options);

const imgWidth = () => Math.floor(window.innerWidth * options.quality);
const imgHeight = () => Math.floor(window.innerHeight * options.quality);

function zoomFractal(x, y, factor, zoomin) {
	const offset = {
		x: -imgWidth() / 2,
		y: -imgHeight() / 2
	};

	if (zoomin) { // Zoom in
		options.zoom *= factor;
		options.xPan = factor * (x + offset.x + options.xPan);
		options.yPan = factor * (y + offset.y + options.yPan);
	} else { // Zoom out
		options.zoom /= factor;
		options.xPan = (x + offset.x + options.xPan) / factor;
		options.yPan = (y + offset.y + options.yPan) / factor;
	}
}

/* eslint no-unused-vars: 0 */
const myp5 = new P5((sketch) => {
	const renderer = new Renderer();

	const gui = new GUI();
	gui.add(options, 'maxIterations', 1);
	gui.add(options, 'zoom', 100);

	const offset = gui.addFolder('Offset');
	offset.add(options, 'xPan');
	offset.add(options, 'yPan');

	const imagesOptions = gui.addFolder('Image Options');
	imagesOptions.add(options, 'quality', 0.1, 1).step(0.1);

	gui.add(options, 'draw');
	options.draw = () => sketch.redraw();

	gui.add(options, 'reset');
	options.reset = () => {
		for (const key in options) {
			if (typeof (options[key]) !== 'function') {
				options[key] = defaultOptions[key];
			}
		}
		gui.__controllers.forEach((c) => c.updateDisplay());
		sketch.redraw();
	};

	sketch.setup = () => {
		sketch.createCanvas(window.innerWidth, window.innerHeight);

		sketch.noLoop();
	};

	sketch.mouseClicked = () => {
		const rect = gui.domElement.getBoundingClientRect();
		if (sketch.mouseY > rect.top && sketch.mouseY < rect.bottom) {
			if (sketch.mouseX > rect.left && sketch.mouseX < rect.right) {
				return false;
			}
		}
		let zoomIn = true;
		if (sketch.keyIsDown(sketch.CONTROL)) {
			zoomIn = false;
		}
		let zoomFactor = 2;
		if (sketch.keyIsDown(sketch.SHIFT)) {
			zoomFactor = 1;
		}
		zoomFractal(sketch.mouseX * options.quality, sketch.mouseY * options.quality, zoomFactor, zoomIn);

		gui.__controllers.forEach((c) => c.updateDisplay());
		sketch.redraw();
		return false;
	};

	sketch.draw = () => {
		sketch.background(255);
		let img = sketch.createImage(imgWidth(), imgHeight());
		img.loadPixels();
		img = renderer.image(img, sketch, options);
		img.updatePixels();
		sketch.image(img, 0, 0, window.innerWidth, window.innerHeight);
	};
}, document.getElementById('root'));
