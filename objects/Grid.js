const Vector = require('./Vector');

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

Grid.prototype.forEach = function(f, context) {
  for (let y = 0; y < this.height; y++) {
    for (let x = 0; x < this.width; x++) {
      let val = this.space[x + y * this.width];
      if (val != null)
        f.call(context, val, new Vector(x, y));
    }
  }
}

module.exports = Grid;
