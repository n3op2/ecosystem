const { plan, directions } = require('./global');
const { charFromElement, elementFromChar, rndEl } = require('./helpers');
const Vector = require('./objects/Vector');
const Grid = require('./objects/Grid');
const Creature = require('./objects/Creature');

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

function View(world, vector) {
  this.world = world;
  this.vector = vector;
}

View.prototype.look = function(dir) {
  let target = this.vector.plus(directions[dir]);
  if (this.world.grid.isInside(target))
    return charFromElement(this.world.grid.get(target));
  else
    return '#';
}

View.prototype.findAll = function(ch) {
  let found = [];
  for (var dir in directions) {
    if (this.look(dir) === ch) {
      found.push(dir);
    }
  }
  return found;
}

View.prototype.find = function(ch) {
  let found = this.findAll(ch);
  if (found.length === 0) return null;
  return rndEl(found);
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

World.prototype.turn = function() {
  let acted = [];
  this.grid.forEach(function(creature, vector) {
    if (creature.act && acted.indexOf(creature) === -1) {
      console.log(creature);
      acted.push(creature);
      this.letAct(creature, vector);
    }
  }, this);
}

World.prototype.checkDestination = function(action, vector) {
  if (directions.hasOwnProperty(action.direction)) {
    let dest = vector.plus(directions[action.direction]);
    console.log(dest);
    if (this.grid.isInside(dest))
      return dest;
  }
}

World.prototype.letAct = function(creature, vector) {
  let action = creature.act(new View(this, vector));
  if (action && action.type === 'move') {
    let dest = this.checkDestination(action, vector);
    console.log(creature, vector, dest)
    if (dest && this.grid.get(dest) == null) {
      this.grid.set(vector, null);
      this.grid.set(dest, creature);
    }
  }
}

const world = new World(plan, {
  "#": Wall,
  "o": Creature
});

async function main() {
  for (let i = 0; i < 9999; i++) {
    await new Promise(r => setTimeout(r, 1000))
    world.turn();
    console.log(world.print());
  }
}

main();
