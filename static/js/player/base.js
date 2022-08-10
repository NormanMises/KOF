import { AcGameObject } from '/static/js/ac_game_object/base.js';

class Player extends AcGameObject {
	constructor(root, info) {
		super();

		this.root = root;
		this.id = info.id;
		this.x = info.x;
		this.y = info.y;
		this.width = info.width;
		this.height = info.height;
		this.color = info.color;

		this.vx = 0;
		this.vy = 0;
		this.gravity = 50;

		this.speedx = 400; // 水平速度
		this.speedy = 1000; // 跳起的初始速度

		this.direction = 1;
		this.status = 3; // 0: idle, 1: forward, 2: backward, 3: jump, 4: attack, 5: beaten, 6: dead
		this.pressed_keys = this.root.game_map.controller.pressed_keys;

		this.ctx = this.root.game_map.ctx;
	}

	start() {}

	update_move() {
		this.vy += this.gravity;

		this.x += (this.vx * this.timedelta) / 1000;
		this.y += (this.vy * this.timedelta) / 1000;

		if (this.y > 450) {
			this.y = 450;
			this.vy = 0;
		}
	}

	update_control() {
		let w, a, d, space;
		if (this.id === 0) {
      w = this.pressed_keys.has('w')
      a = this.pressed_keys.has('a')
      d = this.pressed_keys.has('d')
      space = this.pressed_keys.has(' ')
    }
    else
    {
      w = this.pressed_keys.has('ArrowUp');
		a = this.pressed_keys.has('ArrowLeft');
		d = this.pressed_keys.has('ArrowRight');
		space = this.pressed_keys.has('Enter');
      }
	}

	update() {
		this.update_control();
		this.update_move();
		this.render();
	}

	render() {
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

export { Player };
