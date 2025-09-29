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
}


function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    roomNumber = 20;
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
            let x = floor(random(0,cols - width - 1));
            let y = floor(random(0,rows - height - 1));
            rooms[i] = new Room(x, y, width, height);

            for (let yy = y; yy < y + height; yy++) {
                for (let xx = x; xx < x + width; xx++) {
                grid[yy][xx] = 1;
                }
            }
        }
    }

}

function generateTunnel(){
    
}

function draw(){
for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 1) {
        if(grid[y+1][x] !== 1 || grid[y][x+1] !== 1 || grid[y-1][x] !== 1 || grid[y][x-1] !== 1){
            stroke(200);
            fill(200);
        }
        else{
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