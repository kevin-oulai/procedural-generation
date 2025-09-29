let roomNumber;

let rooms = [];

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
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    createCanvas(windowWidth, windowHeight);
    background(0);
    roomNumber = 20;
    for(let i = 0; i < roomNumber; i++){
        rooms[i] = new Room(null, null, null, null);
        while(rooms[i].isNull() || rooms[i].isColliding()){
            let width = random(100,250);
            let height = random(100,250);
            let x = random(0,windowWidth - width);
            let y = random(0,windowHeight - height);
            rooms[i] = new Room(x, y, width, height);
        }
    }
}

function generateTunnel(){
    
}

function draw(){
    for(let i = 0; i < roomNumber; i++){
        rooms[i].show();
    }
}
