function objectSearch(object, regex) {
  var result = [];

  function recursiveSearch(value, currentLoc) {
    if ( typeof value !== 'object' ) {
      if ( value.match(regex) ) {
        result.push(currentLoc);
      }
    } else if ( Array.isArray(value) ) {
      for ( var i = 0; i < value.length; i++ ) {
        if ( typeof value[i] === 'string' || typeof value[i] === 'object' ) {
          try {
            recursiveSearch(value[i], currentLoc + '[' + i + ']');
          } catch (err) {
            continue;
          }
        }
      }
    } else {
      if ( !value.visited ) {
        value.visited = true;
        for ( var key in value ) {
          if ( typeof value[key] === 'string' || typeof value[key] === 'object' ) {
            try {
              if ( currentLoc.length === 0 ) recursiveSearch(value[key], currentLoc + key);
              else recursiveSearch(value[key], currentLoc + '.' + key);
            } catch (err) {
              continue;
            }
          }
        }
      }
    }
  }

  recursiveSearch(object, '');
  return result;
}
