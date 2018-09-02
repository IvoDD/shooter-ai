var players = [
               new Example(Math.random()*1000, Math.random()*780, 0, "Pesho", "red"),
               new Lainiani(Math.random()*1000, Math.random()*780, 1, "Laina", "brown"),
               new Marti(Math.random()*1000, Math.random()*780, 2, "Marti", "black"),
               new Victor(Math.random()*1000, Math.random()*780, 3, "Victor", "pink"),
               new Zaeka(Math.random()*1000, Math.random()*780, 4, "ZaekaNarkoman", "gray"),
               new Stasi(Math.random()*1000, Math.random()*780, 5, "StasiNarkoman", "skyBlue"),
               new NS(Math.random()*1000, Math.random()*780, 6, "NS", "purple"),
               new Mark(Math.random()*1000, Math.random()*780, 7, "Smark", "green"),
               new Razgel(Math.random()*1000, Math.random()*780, 8, "Razgel", "orange")
            ];
var walls = [new Wall(0, 0, 10, 800), new Wall(0, 0, 1000, 10), new Wall(1000, 0, 10, 810), new Wall(0, 800, 1010, 10) ];

for (let i=0; i<10; ++i){
    for (let j=0; j<8; ++j){
        if (Math.random()<0.1){
            walls.push(new Wall(i*100, j*100, 10, 100));
        }
        if (Math.random()<0.1){
            walls.push(new Wall(i*100, j*100, 100, 10));
        }
    }
}

var p_pos, b_pos, w_pos;

function update() {
    p_pos = [];
    b_pos = [];
    for (let i=0; i<players.length; ++i){
        p_pos[i] = {x: players[i].x, y: players[i].y, sx: players[i].sx, sy: players[i].sy};
        for (b of players[i].bullets){
            b_pos.push({x: b.x, y: b.y, dx: b.dx, dy: b.dy, shooter: i});
        }
    }
    w_pos = [];
    for (let i=0; i<walls.length; ++i){
        w_pos[i] = {x: walls[i].x, y: walls[i].y, sx: walls[i].sx, sy: walls[i].sy};
    }

    for (let i=0; i<players.length; ++i){
        players[i].update(p_pos, b_pos, w_pos, i);
    }
}

function draw() {
    for (let p of players){
        p.draw();
    }
    for (let w of walls){
        w.draw();
    }
};

function keyup(key) {
    
};

function mouseup() {
    
};
