function rndEl(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function elementFromChar(legend, ch) {
  if (ch == " ")
    return null;
  var element = new legend[ch]();
  element.originChar = ch;
  return element;
}

function charFromElement(element) {
  if (element == null)
    return " ";
  else
    return element.originChar;
}

module.exports = {
  rndEl,
  elementFromChar,
  charFromElement,
};
