function objectSearch(object, regex) {
  var result = [];
  var toSearch = [['', object]];
  while ( toSearch.length > 0 ) {
    var nextSearch = [];
    for ( var i = 0; i < toSearch.length; i++ ) {
      try {
        if ( typeof toSearch[i][1] === "string" && toSearch[i][1].match(regex) ) {
          result.push(toSearch[i][0])
        }

        else if ( typeof toSearch[i][1] === "object" && !toSearch[i][1].visited ) {
          toSearch[i][1].visited = true;
          if ( Array.isArray(toSearch[i][1])) {
            for ( var j = 0; j < toSearch[i][1].length; j++ ) {
              if ( toSearch[i][1][j] ) {
                var location = toSearch[i][0] + '[' + j + ']';
                nextSearch.push([location, toSearch[i][1][j]]);
              }
            }
          } else {
            for ( var key in toSearch[i][1] ) {
              if ( key === "visited" ) continue;
              if ( toSearch[i][1][key] ) {
                var location = toSearch[i][0].length > 0 ? toSearch[i][0] + '.' + key : toSearch[i][0] + key;
                nextSearch.push([location, toSearch[i][1][key]]);
              }
            }
          }
        }  
      } catch (err) {
        if ( err.name === "InvalidStateError" || err.name === "SecurityError" ) continue;
        else throw err;
      }
    }

    toSearch = nextSearch.slice();
  }

  return result;
}

  // function recursiveSearch(value, lastLoc) {
  //   //Loops through the indexes and properties of the value passed in and adds matching strings to result.
  //   //lastLoc is a string that represents the position of value with respect to the object passed to objectSearch
  //   if ( !value.visited ) {
  //     //set a "visited" flag on objects to prevent looping recursion 
  //     value.visited = true;

  //     if ( Array.isArray(value) ) {
  //       for ( var i = 0; i < value.length; i++ ) {
  //         if ( value[i] ) {
  //           var currentLoc = lastLoc + '[' + i + ']';
  //           if ( typeof value[i] === "string" && value[i].match(regex) ) {
  //             result.push(currentLoc);
  //           } else if ( typeof value[i] === "object" ) {
  //             //Some objects will be protected, so try/catch is required.
  //             try {
  //               recursiveSearch(value[i], currentLoc);
  //             } catch (err) {
  //               //Error types to continue on determined through trial-and-error
  //               if ( err.name === "InvalidStateError" || err.name === "SecurityError" ) continue;
  //               else throw err;
  //             }
  //           }
  //         }
  //       }

  //     } else {
  //       //Non-array object search very similar to array handling. Could refactor to use underscore.map
  //       for ( var key in value ) {
  //         if ( value[key] && key !== "visited" ) {
  //           var currentLoc = lastLoc.length === 0 ? lastLoc + key : lastLoc + '.' + key;
  //           if ( typeof value[key] === "string" && value[key].match(regex) ) {
  //             result.push(currentLoc);
  //           } else if ( typeof value[key] === "object" ) {
  //             try {
  //               recursiveSearch(value[key], currentLoc);
  //             } catch (err) {
  //               if ( err.name === "InvalidStateError" || err.name === "SecurityError" ) continue;
  //               else throw err;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
  // //Initialize the search and return the result array.
  // recursiveSearch(object, '');
//   return result;
// }
