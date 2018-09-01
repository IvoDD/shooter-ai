function d(x1, y1, x2, y2){
    return Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
}

class Bullet{
    constructor(x, y, tx, ty, vel, color, dmg=1){
        this.x = x;
        this.y = y;
        this.sx = 5;
        this.sy = 5;
        this.vel = vel;
        this.color = color;
        let dist = d(x, y, tx, ty);
        this.dx = (tx-x)/dist*vel;
        this.dy = (ty-y)/dist*vel;
        this.dmg = dmg;
    }
    update(){
        this.x += this.dx;
        this.y += this.dy;
    }
    draw(){
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.sx, this.sy);
    }
}

class Wall {
    constructor(x, y, sx, sy){
        this.x = x;
        this.y = y;
        this.sx = sx;
        this.sy = sy;
        this.color = "black";
    }
    draw(){
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.sx, this.sy);
    }
}

function kill(ind){
    players[ind] = players[players.length-1]
    players.pop();
    if (ind < players.length){
        players[ind].ind = ind;
    }
}

class Player {
    constructor(x, y, ind, name, color){
        this.oldx = x;
        this.oldy = y;
        this.x = x;
        this.y = y;
        this.name = name;
        this.ind = ind;
        this.sx = 20;
        this.sy = 20;
        this.color = color;
        this.movement_v = 2;
        this.bullet_v = 5;
        this.reload_time = 10;
        this.curr_reload = 0;
        this.bullets = [];
        this.move_timeout = 0;
        this.hp = 50;
    }
    draw(){
        context.fillStyle = this.color;
        context.font = "20px Arial";
        context.fillText(this.name, this.x+this.sx/2-context.measureText(this.name).width/2, this.y-5);
        context.fillRect(this.x, this.y, this.sx, this.sy);
        context.fillRect(this.x+this.sx/2-this.hp/2, this.y-35, this.hp, 10);
        for (let b of this.bullets){
            b.draw();
        }
    }
    move(tx, ty){
        if (tx == this.x && ty == this.y) return;
        if (this.move_timeout==0){
            this.move_timeout++;
            let dist = d(this.x, this.y, tx, ty);
            let dx = (tx-this.x)/dist*this.movement_v;
            let dy = (ty-this.y)/dist*this.movement_v;
            this.x += dx;
            this.y += dy;
        }
    }
    shoot(tx, ty){
        if (this.curr_reload==0){
            this.bullets.push(new Bullet(this.x, this.y, tx, ty, this.bullet_v, this.color));
            this.curr_reload = this.reload_time;
        }
    }
    hit(dmg){
        this.hp -= dmg;
        if (this.hp <= 0){
            kill(this.ind);
        }
    }
    del(ind){
        this.bullets[ind] = this.bullets[this.bullets.length-1];
        this.bullets.pop();
    }
    ai(player_pos, medkit_pos, wall_pos, ind){}
    update(player_pos, medkit_pos, wall_pos, ind){
        this.ind = ind;
        this.oldx = this.x;
        this.oldy = this.y;
        try{
            this.ai(player_pos, medkit_pos, wall_pos, ind);
        }catch(e){
            console.log(this.name + " has crashed :(. RIP");
            this.hit(this.hp);
        }
        if (this.move_timeout>0) this.move_timeout--;
        if (this.curr_reload>0) this.curr_reload--;
        for (let w of walls){
            if (areColliding(this.x, this.y, this.sx, this.sy, w.x, w.y, w.sx, w.sy)){
                if (this.oldx+this.sx <= w.x) {this.x = w.x-this.sx;}
                else if (this.oldx >= w.x + w.sx) {this.x = w.x+w.sx;}
                else if (this.oldy+this.sy <= w.y) {this.y = w.y-this.sy;}
                else if (this.oldy >= w.y + w.sy) {this.y = w.y+w.sy;}
            }
        }
        for (let i=0; i<this.bullets.length; ++i){
            this.bullets[i].update();
            let isdel = false;
            for (let w of walls){
                if (areColliding(this.bullets[i].x, this.bullets[i].y, this.bullets[i].sx, this.bullets[i].sy, w.x, w.y, w.sx, w.sy)){
                    this.del(i);
                    --i;
                    isdel = true;
                    break;
                }
            }
            if (isdel) continue;
            for (let j=0; j<players.length; ++j){
                if (j!=this.ind && areColliding(this.bullets[i].x, this.bullets[i].y, this.bullets[i].sx, this.bullets[i].sy, players[j].x, players[j].y, players[j].sx, players[j].sy)){
                    players[j].hit(this.bullets[i].dmg);
                    this.del(i);
                    --i;
                    break;
                }
            }
        }
    }
}