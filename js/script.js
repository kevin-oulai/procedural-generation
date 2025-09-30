let roomNumber;
const cellSize = 10;

let rows = Math.floor(window.innerHeight/cellSize);
let cols = Math.floor(window.innerWidth/cellSize);

let rooms = [];
let grid = [];

class Room{
    constructor(x,y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    show(){
        fill(255);
        rect(this.x, this.y, this.width, this.height);
    }

    isColliding(){
        for(let room of rooms){
            if (room.isNull() || room === this) continue;
            if (this.x < room.x + room.width &&
                this.x + this.width > room.x &&
                this.y < room.y + room.height &&
                this.y + this.height > room.y
                ){
                return true;
            }
        }
        return false;
    }

    isNull(){
        return this.x == null && this.y == null && this.height == null && this.width == null;
    }

    randomSide(){
        let side = floor(random(4));
        switch (side) {
            case 1: // top
                return { x: floor(random(this.x, this.x + this.width)), y: this.y - 1 }
            case 2: // bottom
                return { x: floor(random(this.x, this.x + this.width)), y: this.y + this.height }
            case 3: // left
                return { x: this.x - 1, y: floor(random(this.y, this.y + this.height)) }
            case 4: // right
                return { x: this.x + this.width, y: floor(random(this.y, this.y + this.height)) }
            default:
                break;
        }
    }
}


function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    roomNumber = 15;
    grid = Array.from({ length: rows }, () => Array(cols).fill(0));

    generateRooms(roomNumber);
}

function generateRooms(roomNumber){
    rooms = [];
    for(let i = 0; i < roomNumber; i++){
        rooms[i] = new Room(null, null, null, null);
        while(rooms[i].isNull() || rooms[i].isColliding()){
            let width = floor(random(10,15));
            let height = floor(random(10,15));
            let x = floor(random(0,cols - width));
            let y = floor(random(0,rows - height));
            rooms[i] = new Room(x, y, width, height);

            for (let yy = y; yy < y + height; yy++) {
                for (let xx = x; xx < x + width; xx++) {
                grid[yy][xx] = 1;
                }
            }

        }
        console.log(rooms[i].randomSide());
        rect(rooms[i].randomSide().x, rooms[i].randomSide().y, 5, 5);
    }

}

function generateTunnel(){
    
}

function draw(){
for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 1) {
        const neighbors = [
            [1, 0],   // down
            [0, 1],   // right
            [1, 1],   // down-right
            [-1, 0],  // up
            [0, -1],  // left
            [-1, -1], // up-left
            [1, -1],  // down-left
            [-1, 1],  // up-right
        ];
        
        let isWall = false;
        
        for (let [dy, dx] of neighbors) {
            const ny = y + dy;
            const nx = x + dx;
        
            if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[0].length) {
                if (grid[ny][nx] !== 1) {
                    isWall = true;
                    break;
                }
            }
        }
        
        if (isWall) {
            stroke(200);
            fill(200);
        } else {
            stroke(255);
            fill(255);
        }
        
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

// Move on canva with mouse
function mouseDragged(){
    translate(mouseX - pmouseX, mouseY - pmouseY);
}