describe('Inverted Index Object', function() {
  // Instanciate object and load JSON before each test
  var invertedIndexObject;
  beforeAll(function(done) {
    invertedIndexObject = new InvertedIndex();
    // Store returned books array as object property
    invertedIndexObject.loadJSON('./books.json').done(function(data) {
      invertedIndexObject.booksArray = data;
      done();
    });
  });

  describe('Read book data', function() {
    // Test function that reads and parses JSON file
    it('correctly reads and parses json file', function() {
      expect(invertedIndexObject.booksArray).toBeDefined();
      expect(invertedIndexObject.booksArray).toEqual(jasmine.any(Object));
      expect(invertedIndexObject.booksArray).not.toEqual({});
    });
  });

  describe('Populate Index', function() {
    // Index property should not exist before createIndex() is called
    it('does not create index before createIndex() is called', function() {
      expect(invertedIndexObject.index).not.toBeDefined();
    });

    // Test whetehr index is created after createIndex() is called
    it('correctly creates index from loaded JSON', function() {
      invertedIndexObject.createIndex();
      expect(invertedIndexObject.index).toBeDefined();
      expect(invertedIndexObject.index).toEqual(jasmine.any(Object));
      expect(invertedIndexObject.index).not.toEqual({});
    });

    // Test whether the function recognises foreign keys
    it('does not recognise keys not in the index', function() {
      expect(invertedIndexObject.index.notInIndex).not.toBeDefined();
    });

    // Test whetehr index maps the string keys to the correct objects
    it('correctly maps keys to objects', function() {
      // String properties of the index
      var properties = Object.keys(invertedIndexObject.index);
      // For each property
      properties.forEach(function(property) {
        // Get array of object indices associated with it
        var indicesArray = invertedIndexObject.index[property];
        // For each index
        indicesArray.forEach(function(index) {
          // Get corresponding object as a single string
          var book = invertedIndexObject
            .concat(invertedIndexObject.booksArray[index]);
          // Check whether string property is in it
          expect(book.indexOf(property)).toBeGreaterThan(-1);

        });
      });
    });


  });

  describe('Search index', function() {
    // Store results of searching for various words
    var results = [];
    it('returns an array', function() {
      // invertedIndexObject is undefined outside it blocks
      results.push(invertedIndexObject.searchIndex('alice'));
      results.push(invertedIndexObject.searchIndex('lord'));
      results.push(invertedIndexObject.searchIndex('and'));
      results.push(invertedIndexObject.searchIndex('notInObjects'));
      results.forEach(function(item) {
        expect(item).toEqual(jasmine.any(Array));
      });
    });

    it('finds word in one object', function() {
      // Will test both length and contents of array
      expect(results[0]).toEqual([0]);
      expect(results[1]).toEqual([1]);
    });

    it('finds word in multiple objects', function() {
      expect(results[2]).toEqual([0, 1]);
    });

    it('returns empty array if word is not found', function() {
      expect(results[3]).toEqual([]);
    });
  });
});
