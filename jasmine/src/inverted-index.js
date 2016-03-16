// Object that will hold the required mehtods
var InvertedIndex = function() {};

// Reads and parses JSON file
InvertedIndex.prototype.loadJSON = function(filename) {

  // Return object to run callback when running funcion
  return $.getJSON(filename);
};

// Helper method to turn all the object's values into a single string
InvertedIndex.prototype.concat = function(obj) {

  // Array of object's properties
  var keys = Object.keys(obj);



  // Will store result of concatenation
  var concatString = '';

  // For each property
  keys.forEach(function(key) {

    // Add it's value to the string
    concatString += obj[key] + " ";
  });

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
  function wordInObject(word, obj) {

    // Turn object's values into one string
    var objString = self.concat(obj);

    // Turn to lowercase to normalize
    objString = objString.toLowerCase();

    // If the word is in the resulting string
    if (objString.indexOf(word) > -1) {

      return true;
    }

    return false;
  }

  // For every object in the array
  for (var i = 0; i < self.booksArray.length; i++) {

    // Extract values of its properties and add to allStrings
    allStrings += self.concat(self.booksArray[i]);
  }

  // Remove punctuation marks from the string
  allStrings = allStrings.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

  // Turn to lowercase to normalize
  allStrings = allStrings.toLowerCase();

  // Turn into array to be able to iterate over the words
  allStrings = allStrings.split(' ');

  // Remove duplicates
  allStrings = allStrings.filter(function(item, pos) {
    return allStrings.indexOf(item) == pos;
  });

  // Remove empty string
  allStrings = allStrings.filter(function(item, pos) {
    return item !== '';
  });
  console.log(allStrings);

  // For every word
  allStrings.forEach(function(word) {

    // Indices of objects in booksArray in which word is found
    var objIndices = [];

    // For every object in booksArray
    for (var i = 0; i < self.booksArray.length; i++) {

      // If word is in the object
      if (wordInObject(word, self.booksArray[i])) {

        // Add object's index
        objIndices.push(i);
      }

      // Add property to index object
      self.index[word] = objIndices;
    }

  });

  console.log(self.index);
};

// Return object(s) where word occurs
InvertedIndex.prototype.searchIndex = function(word) {

  // If index has not been created
  if (!this.index) {

    // Create the index
    this.createIndex();
  }

  // console.log(this);

  return this.index[word];
};
