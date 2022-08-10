import { AcGameObject } from '/static/js/ac_game_object/base.js';
import { Controller } from '/static/js/controller/base.js';

class GameMap extends AcGameObject {
	constructor(root) {
		super();

		this.root = root;
		this.$canvas = $(
			'<canvas width="1280" height="720" tabindex=0></canvas>'
		);
		this.ctx = this.$canvas[0].getContext('2d'); // 为了使 canvas 能获取输入
		this.root.$kof.append(this.$canvas);
		this.$canvas.focus(); // 聚焦

		this.controller = new Controller(this.$canvas);
	}

	start() {}

	update() {
		this.render();
	}

	render() {
		// this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		this.ctx.fillStyle = 'black';
		this.ctx.fillRect(0, 0, this.$canvas.width(), this.$canvas.height());
	}
}

export { GameMap };
