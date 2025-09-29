const cols = 152;
const rows = 73;
const cellSize = 10;

let grid = [];
let rooms = [];
let numRooms = 20;

function setup() {
  createCanvas(cols * cellSize, rows * cellSize);
  noLoop();
  generateDungeon();
}

function draw() {
  background(0);
  noStroke();
  fill(255);

  // Draw carved cells (rooms + corridors)
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 1) {
        fill(255);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      } else if (grid[y][x] === 2) {
        fill(150);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

// ---------- DUNGEON GENERATION ----------

function generateDungeon() {
  grid = Array.from({ length: rows }, () => Array(cols).fill(0));
  rooms = [];

  // 1. Place random rooms
  for (let i = 0; i < numRooms; i++) {
    let w = floor(random(6, 12));
    let h = floor(random(6, 12));
    let x = floor(random(1, cols - w - 1));
    let y = floor(random(1, rows - h - 1));

    for (let yy = y; yy < y + h; yy++) {
      for (let xx = x; xx < x + w; xx++) {
        grid[yy][xx] = 1;
      }
    }
    rooms.push({ x, y, w, h });
  }

  // 2. For each room, start one or more corridor walkers
  for (let room of rooms) {
    let branchCount = floor(random(3, 5));
    for (let i = 0; i < branchCount; i++) {
      let start = randomSideCell(room);
      randomCorridorWalk(start.x, start.y, 500);
    }
  }
}

// ---------- HELPERS ----------

// Pick a random cell on the edge of a room
function randomSideCell(room) {
  let side = floor(random(4));
  if (side === 0) return { x: floor(random(room.x, room.x + room.w)), y: room.y - 1 }; // top
  if (side === 1) return { x: floor(random(room.x, room.x + room.w)), y: room.y + room.h }; // bottom
  if (side === 2) return { x: room.x - 1, y: floor(random(room.y, room.y + room.h)) }; // left
  if (side === 3) return { x: room.x + room.w, y: floor(random(room.y, room.y + room.h)) }; // right
}

// Do a random walk corridor with occasional branching
function randomCorridorWalk(x, y, steps) {
  let dir = randomDirection();
  let branchChance = 0.05; // chance to branch at each step

  for (let i = 0; i < steps; i++) {
    if (!inBounds(x, y)) break;

    grid[y][x] = 2;

    // Randomly turn slightly
    if (random() < 0.2) dir = randomDirection();

    // Occasionally branch
    if (random() < branchChance) {
      randomCorridorWalk(x, y, floor(steps / 2));
    }

    // Move
    x += dir.x;
    y += dir.y;

    // Stop if we hit a room or existing corridor often
    if ((grid[y] && grid[y][x] === 1 || grid[y][x] === 2) && random() < 0.2) break;
  }
}

function randomDirection() {
  let dirs = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ];
  return random(dirs);
}

function inBounds(x, y) {
  return x > 1 && y > 1 && x < cols - 2 && y < rows - 2;
}
