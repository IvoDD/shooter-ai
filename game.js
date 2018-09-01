var players = [new Example(500, 1000, 0, "Pesho", "red"), new Example(0, 0, 1, "Gosho", "blue")];
var walls = [new Wall(500, 400, 10, 100), new Wall(500, 400, 100, 10)];
var medkits = [];

var p_pos, m_pos, w_pos;

function update() {
    p_pos = [];
    for (let i=0; i<players.length; ++i){
        p_pos[i] = {x: players[i].x, y: players[i].y, sx: players[i].sx, sy: players[i].sy};
    }
    m_pos = [];
    for (let i=0; i<medkits.length; ++i){
        m_pos[i] = {x: medkits[i].x, y: medkits[i].y, sx: medkits[i].sx, sy: medkits[i].sy};
    }
    w_pos = [];
    for (let i=0; i<walls.length; ++i){
        w_pos[i] = {x: walls[i].x, y: walls[i].y, sx: walls[i].sx, sy: walls[i].sy};
    }

    for (let i=0; i<players.length; ++i){
        players[i].update(p_pos, m_pos, w_pos, i);
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
