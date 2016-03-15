describe('Read book data', function() {

  // Object that contains all required functions
  var invertedIndex;

  // Make instance to access functions
  beforeAll(function(done) {

    invertedIndex = new InvertedIndex();

    // Store returned books array as object property
    invertedIndex.loadJSON('../books.json').done(function(data) {

      invertedIndex.booksArray = data;
    });
  });

  // Test function that reads and parses JSON file
  it('correctly reads and parses json file', function() {

    expect(invertedIndex.booksArray).toBeDefined();
    expect(invertedIndex.booksArray).toEqual(jasmine.any(Object));
    exopect(invertedIndex.booksArray).not.toEqual({});
  });
});

describe('Populate Index', function() {

  // Object that contains all required functions
  var invertedIndex;

  // Make instance to access functions
  beforeAll(function(done) {

    invertedIndex = new InvertedIndex();

    // Store returned books array as object property
    invertedIndex.loadJSON('../books.json').done(function(data) {

      invertedIndex.booksArray = data;
    });

    // Concatenate objects' strings for easier lookup
    function concat(obj) {

      var keys = Object.keys(obj);
      var concatString = '';

      keys.forEach(function(key) {

        concatString += obj.key;
      });

      return concatString;
    }

    // Convert booksArray into array of constituting strings
    for(var i = 0; i < (invertedIndex.booksArray).length; i++) {

      invertedIndex.booksArray[i] = concat(invertedIndex.booksArray[i]);
    }
  });

  // Test whetehr index is created as soon as JSON loads
  it('correctly creates index from loaded JSON', function() {

    expect(invertedIndex.index).toBeDefined();
    expect(invertedIndex.index).toEqual(jasmine.any(Object));
    exopect(invertedIndex.index).not.toEqual({});
  });

  // Test whetehr index maps the string keys to the correct objects
  it('correctly maps keys to objects', function() {

    // String properties of the index
    var tokens = Object.keys(invertedIndex.index);

    // For each property
    tokens.forEach(function(property) {

      // Get array of objects associated with it
      var objsArray = invertedIndex.index.property;

      // For each concatenated string in the array
      objsArray.forEach(function(conStr) {

        // Check whether string property is in it
        expect(conStr.indexOf(token)).toBeGreaterThan(-1);

      });
    });
  });
});

describe('Search index', function() {

  it('returns an array of the indices of the correct objects', function() {

    expect(invertedIndex.searchIndex('alice')).toBeEqual([0]);
    expect(invertedIndex.searchIndex('lord')).toBeEqual([1]);
  });
});
