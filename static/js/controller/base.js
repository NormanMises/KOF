class Controller {
	constructor($canvas) {
		this.$canvas = $canvas;

		this.pressed_keys = new Set();
		this.start();
	}

	start() {
		let outer = this; // 如果想在函数内使用父元素的 this, 必须在外面定义
		this.$canvas.keydown(function (e) {
			outer.pressed_keys.add(e.key);
		});

		this.$canvas.keyup(function (e) {
			outer.pressed_keys.delete(e.key);
		});
	}
}

export { Controller };
