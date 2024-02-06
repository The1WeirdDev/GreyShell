const canvas = document.getElementById("SnakeCanvas");
const ctx = canvas.getContext("2d");

const score_label = document.getElementById("ScoreLabel");
const game_size = 15;
var block_size;

class Snake{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.tail = [];
        this.max_length = 3;
        this.movement_direction = {x:1, y:0};
    }

    Update(){
        score_label.innerText = "Score: " + (this.tail.length + 1);
        
        this.tail.push({x: this.x, y: this.y});
        if(this.tail.length >= this.max_length)
            this.tail.shift();
        this.x += this.movement_direction.x;
        this.y += this.movement_direction.y;

        if(this.x == apple.x && this.y == apple.y){
            this.max_length += 3;
            snake.SetToRandom();
            return;
        }
        this.CheckForDeath();
        this.last_movement_direction = this.movement_direction;
    }

    SetToRandom(){
        var map = [];

        for(var _x = 0; _x < game_size; _x++){
            for(var _y = 0; _y < game_size; _y++){
                map.push({x:_x, y:_y});
            }
        }

        for(var i = 0; i < snake.tail.length; i++){
            const is_pos = (element) => {
                return element.x == snake.tail[i].x && element.y == snake.tail[i].y
            };
            var index = map.findIndex(is_pos);
            if(index >= 0)
                map.splice(index, 1);
        }

        const is_pos = (element) => (element.x == snake.x && element.y == snake.y);
        var index = map.findIndex(is_pos);
        if(index >= 0)
             map.splice(index, 1);

        if(map.length < 0){
            this.OnGameWon();
        }
        
        var pos = map[Math.floor(Math.random() * (map.length - 1))];
        apple.x = pos.x;
        apple.y = pos.y;
    }
    Draw(){
        for(var i = 0; i < this.tail.length; i++){
            var tail = this.tail[i];
            DrawRect(tail.x * block_size, tail.y * block_size, block_size, block_size, "green");
        }
        DrawRect(this.x * block_size, this.y * block_size, block_size, block_size, "green");
    }

    OnGameWon(){

    }
    CheckForDeath(){
        if(this.x >= game_size || this.y >= game_size || this.x < 0 || this.y < 0){
            this.Die();
            return;
        }

        for(var i = 0; i < this.tail.length; i++){
            var tail = this.tail[i];
            if(this.x == tail.x && this.y == tail.y){
                this.Die();
                return;
            }
        }
    }

    Die(){
        this.tail = [];
        this.max_length = 3;
        this.movement_direction = {x: 0, y: 0};
        this.last_movement_direction = this.movement_direction;
        this.x = 0;
        this.y = 0;
    }

    OnKeyDown(event){
        var key_code = event.keyCode;
        if(key_code == 83 && this.last_movement_direction.y >= 0)
            this.movement_direction = {x:0, y:1};
        if(key_code == 87 && this.last_movement_direction.y <= 0)
            this.movement_direction = {x:0, y:-1};
        if(key_code == 65 && this.last_movement_direction.x <= 0)
            this.movement_direction = {x:-1, y:0};
        if(key_code == 68 && this.last_movement_direction.x >= 0)
            this.movement_direction = {x:1, y:0};
    }
}

class Apple{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    Draw(){
        DrawRect(this.x * block_size, this.y * block_size, block_size, block_size, "red");
    }
}
var snake = new Snake(0,0);
var apple = new Apple(Math.floor(game_size / 2), Math.floor(game_size / 2));

function Init(){
    canvas.addEventListener("contextmenu", function(e){
        e.preventDefault();
    })
    canvas.width= 500;
    canvas.height = 500;
    block_size = canvas.width / game_size;

    document.addEventListener("keydown", function(e){snake.OnKeyDown(e)});
    setInterval(Update, 1000 / 10);
}

function Update(){
    snake.Update();
    Draw();
}

function DrawRect(x, y, width, height, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}
function Draw(){
    DrawRect(0, 0, canvas.width, canvas.height, "black");
    apple.Draw();
    snake.Draw();
}

Init();