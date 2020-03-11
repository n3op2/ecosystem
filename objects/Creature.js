const { directions } = require('../global');
const { rndEl } = require('../helpers');

const directionsNames = Object.keys(directions);

function Creature() {
  this.direction = rndEl(directionsNames);
}

Creature.prototype.act = function(view) {
  if (view.look(this.direction) != " ")
    this.direction = view.find(" ") || "s";
  return { type: 'move', direction: this.direction };
}

module.exports = Creature;
