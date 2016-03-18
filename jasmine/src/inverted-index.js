// Object that will hold the required mehtods
var InvertedIndex = function() {};
// Reads and parses JSON file
InvertedIndex.prototype.loadJSON = function(filename) {
  // Return object to run callback when running funcion
  return $.getJSON(filename);
};

// Helper method to turn all the object's values into a single string
InvertedIndex.prototype.concat = function(object) {
  // Array of object's properties
  var keys = Object.keys(object);
  // Will store result of concatenation
  var concatString = '';
  // For each property
  keys.forEach(function(key) {
    // Add it's value to the string
    concatString += object[key] + ' ';
  });
  // Normalize
  concatString = concatString.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
    .toLowerCase();
  return concatString;
};

// Creates index form loaded JSON
InvertedIndex.prototype.createIndex = function() {
  // To be able to access object's properties inside callback functions
  var self = this;
  // The index object
  self.index = {};
  // All strings in the objects concatenated into one
  var allStrings = '';
  // Returns true if provided word is in object's values
  function wordInObject(word, object) {
    // Turn object's values into one lowercase string
    var objectString = self.concat(object);
    // If the word is in the resulting string
    if (objectString.indexOf(word) > -1) {
      return true;
    }
    return false;
  }
  // For every object in the books array
  for (var i = 0, length = self.booksArray.length; i < length; i++) {
    // Extract values of its properties and add to allStrings
    allStrings += self.concat(self.booksArray[i]);

  }
  // Turn into array to make words iteratable
  allStrings = allStrings.split(' ');
  // Remove duplicates and empty strings
  allStrings = allStrings.filter(function(item, pos) {
    return allStrings.indexOf(item) === pos && item !== '';
  });
  // For every word
  allStrings.forEach(function(word) {
    // Indices of objects in booksArray in which word is found
    var objectIndices = [];
    // For every object in booksArray
    for(var i = 0, arrayLength = self.booksArray.length; i < arrayLength; i++) {
      // If word is in the object
      if (wordInObject(word, self.booksArray[i])) {
        // Add object's index
        objectIndices.push(i);
      }
    }

    // Add property to index object
    self.index[word] = objectIndices;

  });
};

// Return object(s) where word occurs
InvertedIndex.prototype.searchIndex = function(word) {
  // If index has not been created
  if (!this.index) {
    // Create the index
    this.createIndex();
  }
  // If word is not in the index return an empty array
  return this.index[word] || [];
};
