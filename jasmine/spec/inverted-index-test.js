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
          var book = invertedIndexObject.concat(invertedIndexObject.booksArray[index]);
          // Check whether string property is in it
          expect(book.indexOf(property)).toBeGreaterThan(-1);

        });
      });
    });
  });
  //
  // describe('Search index', function() {
  //
  //   // Object that contains all required functions
  //   var invertedIndex;
  //
  //   // Make instance to access functions
  //   beforeAll(function(done) {
  //
  //     indxObj = new InvertedIndex();
  //
  //     // Store returned books array as object property
  //     indxObj.loadJSON('./books.json').done(function(data) {
  //
  //       indxObj.booksArray = data;
  //       done();
  //     });
  //   });
  //
  //   it('returns an array of the indices of the correct objects', function() {
  //
  //     expect(indxObj.searchIndex('alice')).toEqual([0]);
  //     expect(indxObj.searchIndex('lord')).toEqual([1]);
  //   });
  // });

});
