describe('Read book data', function() {

  // Object that contains all required functions
  var invertedIndex;

  // Make instance to access functions
  beforeAll(function(done) {

    invertedIndex = new InvertedIndex();

    // Store returned books array as object property
    invertedIndex.loadJSON('./books.json').done(function(data) {

      invertedIndex.booksArray = data;
      done();
    });
  });

  // Test function that reads and parses JSON file
  it('correctly reads and parses json file', function() {

    expect(invertedIndex.booksArray).toBeDefined();
    expect(invertedIndex.booksArray).toEqual(jasmine.any(Object));
    expect(invertedIndex.booksArray).not.toEqual({});
  });
});

describe('Populate Index', function() {

  // Object that contains all required functions
  var indxObj;

  // Make instance to access functions
  beforeAll(function(done) {

    // Instantiatiate the object to access properties
    indxObj = new InvertedIndex();

    // Load the json file
    indxObj.loadJSON('./books.json').done(function(data) {

      // Store json data as object property for easier access
      indxObj.booksArray = data;

      // Create index after JSON file is loaded
      indxObj.createIndex();

      // Only continue after the asynchronous loadJSON finishes loading
      done();
    });
  });

  // Test whetehr index is created as soon as JSON loads
  it('correctly creates index from loaded JSON', function() {

    expect(indxObj.index).toBeDefined();
    expect(indxObj.index).toEqual(jasmine.any(Object));
    expect(indxObj.index).not.toEqual({});
  });

  // Test whetehr index maps the string keys to the correct objects
  it('correctly maps keys to objects', function() {

    // String properties of the index
    var properties = Object.keys(indxObj.index);

    // For each property
    properties.forEach(function(property) {

      // Get array of object indices associated with it
      var indicesArray = indxObj.index[property];

      // For each index
      indicesArray.forEach(function(index) {

        // Get corresponding object as a single string
        var book = indxObj.concat(indxObj.booksArray[index]);

        // Check whether string property is in it
        expect(book.indexOf(property)).toBeGreaterThan(-1);

      });
    });
  });
});

describe('Search index', function() {

  // Object that contains all required functions
  var invertedIndex;

  // Make instance to access functions
  beforeAll(function(done) {

    invertedIndex = new InvertedIndex();

    // Store returned books array as object property
    invertedIndex.loadJSON('./books.json').done(function(data) {

      invertedIndex.booksArray = data;
      done();
    });
  });

  it('returns an array of the indices of the correct objects', function() {

    expect(invertedIndex.searchIndex('alice')).toBeEqual([0]);
    expect(invertedIndex.searchIndex('lord')).toBeEqual([1]);
  });
});
