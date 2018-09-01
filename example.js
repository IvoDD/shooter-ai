class Example extends Player{
    constructor(x, y, ind, name, color){
        super(x, y, ind, name, color);
        //тук добавяте "глобални променливи"
        this.t = 0;
        this.asdf = "HAHAHA";
    }
    ai(player_pos, medkit_pos, wall_pos, ind){
        //player_pos[0].x - x координата на играч с индекс 0
        //player_pos[0].y - y координата на играч с индекс 0
        //ind - индекса на играча който контролираме
        //player_pos[ind].x - x координата на играча който контролираме
        //medkit_pos - позиции на medkit-ове (още не съм ги добавил)
        //wall_pos - позиции на стени (позициите включват sx и sy - размер по x и y)
        //console.log(this.t);
        this.t++;
        if (this.t % 100 < 50){//t 0-49, 100-149, 200-249
            this.move(400, 300);
        }else{
            this.move(0, 0);//t 50-99, 150-199, 250-299
        }
        if (player_pos.length > 1){
            if (ind == 0){
                this.shoot(player_pos[1].x, player_pos[1].y);
            }else{
                this.shoot(player_pos[0].x, player_pos[0].y);
            }
        }
    }
}