function objectSearch(object, regex) {
  var result = [];

  function recursiveSearch(value, lastLoc) {
    if ( Array.isArray(value) ) {
      for ( var i = 0; i < value.length; i++ ) {
        var currentLoc = lastLoc + '[' + i + ']';
        if ( typeof value[i] === 'string' ) {
          if ( value[i].match(regex) ) {
            result.push(currentLoc);
          }
        } else if ( typeof value[i] === 'object' ) {        
          recursiveSearch(value[i], currentLoc);
        }
      }
    } else {
      if ( !value.visited ) {
        for ( var key in value ) {
          var currentLoc = lastLoc.length === 0 ? lastLoc + key : lastLoc + '.' + key;
          if ( typeof value[key] === 'string' ) {
            if ( value[key].match(regex) ) {
              result.push(currentLoc);
            }
          } else if ( typeof value[key] === 'object' ) {        
            recursiveSearch(value[key], currentLoc);
          }
        }
        value.visited = true;
      }
    }
  }
  for ( var key in object ) {
    if ( typeof object[key] === 'object' ) {        
      recursiveSearch(object[key], key);
    }
  }
  return result;
}
