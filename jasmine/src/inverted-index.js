// Object that will hold the required mehtods
var InvertedIndex = function() {};

// Reads and parses JSON file
InvertedIndex.prototype.loadJSON = function(filename) {

  // Return object to run callback when running funcion
  return $.getJSON(filename);
};
