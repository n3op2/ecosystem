const plan = 
  [
    "##########################################",
    "#                                        #",
    "#         #        ###       o           #",
    "#                  # #                   #",
    "#                  # #                   #",
    "#                  ###                   #",
    "#                                        #",
    "#                                        #",
    "#        ##                  #           #",
    "#                            #           #",
    "#                            #           #",
    "#                                        #",
    "#                                        #",
    "##########################################",
  ];

function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
}

function Grid(width, height) {
  this.space = new Array(width * height);
  this.width = width;
  this.height = height;
}

Grid.prototype.isInside = function(vector) {
  return vector.x >= 0 && vector.x < this.width &&
    vector.y >= 0 && vector.y < this.height;
}

Grid.prototype.get = function(vector) {
  return this.space[vector.x + this.width * vector.y];
}

Grid.prototype.set = function(vector, val) {
  return this.space[vector.x + this.width * vector.y] = val;
}

const directions = {
  "n": new Vector(0, -1),
  "ne": new Vector(1, -1),
  "e": new Vector(1, 0),
  "se": new Vector(1, 1),
  "s": new Vector(0, 1),
  "sw": new Vector(-1, 1),
  "w": new Vector(-1, 0),
  "nw": new Vector(-1, -1),
};

function rndEl(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const directionsNames = Object.keys(directions);

function BouncingCreature() {
  this.direction = rndEl(directionsNames);
}

BouncingCreature.prototype.act = function(view) {
  if (view.look(this.direction) != " ")
    this.direction = view.find(" ") || "s";
  return { type: 'move', direction: this.direction };
}

function elementFromChar(legend, ch) {
  if (ch == " ")
    return null;
  var element = new legend[ch]();
  element.originChar = ch;
  return element;
}

function World(map, legend) {
  var grid = new Grid(map[0].length, map.length);
  this.grid = grid;
  this.legend = legend;

  map.forEach(function(line, y) {
    for (let x = 0; x < line.length; x++) {
      grid.set(new Vector(x, y),
        elementFromChar(legend, line[x]));
    }
  });
}

function Wall() {}

function charFromElement(element) {
  if (element == null)
    return " ";
  else
    return element.originChar;
}

World.prototype.print = function() {
  let output = '';
  for (let y = 0; y < this.grid.height; y++) {
    for (let x = 0; x < this.grid.width; x++) {
      let element = this.grid.get(new Vector(x, y));
      output += charFromElement(element)
    }
    output += '\n';
  }
  return output;
}

const world = new World(plan, {
  "#": Wall,
  "o": BouncingCreature
});

console.log(world.print());

