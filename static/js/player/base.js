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

        this.speedx = 400; // 跳起的水平速度
        this.speedy = -1000; // 跳起的初始速度

        this.direction = 1; // 朝向 1 右
        this.status = 3; // 0: idle, 1: forward, 2: backward, 3: jump, 4: attack, 5: beaten, 6: dead
        this.animations = new Map();
        this.frame_current_cnt = 0; // 帧数记录

        this.pressed_keys = this.root.game_map.controller.pressed_keys;

        this.ctx = this.root.game_map.ctx;
    }

    start() {}

    update_move() {
        if (this.status === 3) {
            this.vy += this.gravity;
        }
        this.x += (this.vx * this.timedelta) / 1000;
        this.y += (this.vy * this.timedelta) / 1000;

        if (this.y > 450) {
            this.y = 450;
            this.vy = 0;
            this.status = 0;
        }

        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.width > this.root.game_map.$canvas.width()) {
            this.x = this.root.game_map.$canvas.width() - this.width;
        }
    }

    update_control() {
        let w, a, d, space;
        if (this.id === 0) {
            w = this.pressed_keys.has('w');
            a = this.pressed_keys.has('a');
            d = this.pressed_keys.has('d');
            space = this.pressed_keys.has(' ');
        } else {
            w = this.pressed_keys.has('ArrowUp');
            a = this.pressed_keys.has('ArrowLeft');
            d = this.pressed_keys.has('ArrowRight');
            space = this.pressed_keys.has('Enter');
        }

        if (this.status === 0 || this.status === 1) {
            if (space) {
                this.status = 4;
                this.vx = 0;
                this.frame_current_cnt = 0;
            } else if (w) {
                if (d) {
                    this.vx = this.speedx;
                } else if (a) {
                    this.vx = -this.speedx;
                } else {
                    this.vx = 0;
                }
                this.vy = this.speedy;
                this.status = 3;
            } else if (d) {
                this.vx = this.speedx;
                this.status = 1;
            } else if (a) {
                this.vx = -this.speedx;
                this.status = 1;
            } else {
                this.vx = 0;
                this.status = 0;
            }
        }
    }

    update() {
        this.update_control();
        this.update_move();
        this.render();
    }

    render() {
        // this.ctx.fillStyle = this.color;
        // this.ctx.fillRect(this.x, this.y, this.width, this.height);

        let status = this.status;

        if (this.status === 1 && this.direction * this.vx < 0) status = 2; // 后退时的状态

        let obj = this.animations.get(status);
        if (obj && obj.loaded) {
            let k =
                parseInt(this.frame_current_cnt / obj.frame_rate) %
                obj.frame_cnt;
            let image = obj.gif.frames[k].image;
            this.ctx.drawImage(
                image,
                this.x,
                this.y + obj.offset_y,
                image.width * obj.scale,
                image.height * obj.scale
            );
        }

        // 挥拳后在最后一帧停下
        if (status === 4) {
            if (
                this.frame_current_cnt ===
                obj.frame_rate * (obj.frame_cnt - 1)
            ) {
                this.status = 0;
            }
        }
        
        this.frame_current_cnt++;
    }
}

export { Player };
