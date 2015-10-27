function objectSearch(object, regex) {
  var result = [];

  function recursiveSearch(value, lastLoc) {
    //Loops through the indexes and properties of the value passed in and adds matching strings to result.
    //lastLoc is a string that represents the position of value with respect to the object passed to objectSearch
    if ( !value.visited ) {
      //set a "visited" flag on objects to prevent looping recursion 
      value.visited = true;
      if ( Array.isArray(value) ) {
        for ( var i = 0; i < value.length; i++ ) {
          if ( value[i] ) {
            var currentLoc = lastLoc + '[' + i + ']';
            if ( typeof value[i] === "string" && value[i].match(regex) ) {
              result.push(currentLoc);
            } else if ( typeof value[i] === "object" ) {
              //Some objects will be protected, so try/catch is required.
              try {
                recursiveSearch(value[i], currentLoc);
              } catch (err) {
                //Error types to continue on determined through trial-and-error
                if ( err.name === "InvalidStateError" || err.name === "SecurityError" ) continue;
                else throw err;
              }
            }
          }
        }
      } else {
        //Non-array object search very similar to array handling. Could refactor to use underscore.map
        for ( var key in value ) {
          if ( value[key] && key !== "visited" ) {
            var currentLoc = lastLoc.length === 0 ? lastLoc + key : lastLoc + '.' + key;
            if ( typeof value[key] === "string" && value[key].match(regex) ) {
              result.push(currentLoc);
            } else if ( typeof value[key] === "object" ) {
              try {
                if ( lastLoc.length === 0 ) recursiveSearch(value[key], lastLoc + key);
                else recursiveSearch(value[key], lastLoc + '.' + key);
              } catch (err) {
                if ( err.name === "InvalidStateError" || err.name === "SecurityError" ) continue;
                else throw err;
              }
            }
          }
        }
      }
    }
  }
  //Initialize the search and return the result array.
  recursiveSearch(object, '');
  return result;
}
