export default class Renderer {
	constructor() {
		this.palette = [];

		this.generatePalette();
	}

	generatePalette() {
		let roffset = 64;
		let goffset = 32;
		let boffset = 0;
		for (let i = 0; i < 256; i += 1) {
			this.palette[i] = { r: roffset, g: goffset, b: boffset };

			if (i < 64) {
				roffset += 4;
			} else if (i < 100) {
				goffset += 6;
			} else if (i < 192) {
				boffset += 5;
			}
		}
	}

	iterate(x, y, offset, options) {
		const { xPan, yPan, zoom, maxIterations } = options;
		const x0 = (x + offset.x + xPan) / zoom;
		const y0 = (y + offset.y + yPan) / zoom;

		let a = 0;
		let b = 0;
		let rx = 0;
		let ry = 0;

		let iterations = 0;
		while (iterations < maxIterations && (rx * rx + ry * ry <= 4)) {
			rx = a * a - b * b + x0;
			ry = 2 * a * b + y0;

			a = rx;
			b = ry;
			iterations += 1;
		}

		let color;
		if (iterations >= maxIterations) {
			color = { r: 0, g: 0, b: 0 };
		} else {
			const index = Math.floor((iterations / (maxIterations - 1)) * 255);
			color = this.palette[index];
		}

		return color;
	}

	image(img, sketch, options) {
		const { width, height } = img;

		const offset = {
			x: -width / 2,
			y: -height / 2
		};

		for (let x = 0; x < width; x += 1) {
			for (let y = 0; y < height; y += 1) {
				const color = this.iterate(x, y, offset, options);
				img.set(x, y, sketch.color(color.r, color.g, color.b, 255));
			}
		}
		return img;
	}
}
