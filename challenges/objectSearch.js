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
          if ( 'length' in toSearch[i][1] && toSearch[i][1] !== window ) {
            for ( var j = 0; j < toSearch[i][1].length; j++ ) {
              if ( toSearch[i][1][j] ) {
                var location = toSearch[i][0] + '[' + j + ']';
                nextSearch.push([location, toSearch[i][1][j]]);
              }
            }
          } else if ( !('nodeType' in toSearch[i][1]) ) {
            for ( var key in toSearch[i][1] ) {
              if ( key === "visited" || key === 'enabledPlugin' ) continue;
              if ( toSearch[i][1][key] ) {
                var location = toSearch[i][0].length > 0 ? toSearch[i][0] + '.' + key : toSearch[i][0] + key;
                nextSearch.push([location, toSearch[i][1][key]]);
              }
            }
          }
        }  
      } catch (err) {
        if ( err.name === "InvalidStateError" || err.name === "SecurityError" || err.name === "TypeError" ) continue;
        else throw err;
      }
    }

    toSearch = nextSearch.slice();
  }

  return result;
}
