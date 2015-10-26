function objectSearch(object, regex) {
  var result = [];

  
  function recursiveSearch(value, currentLoc)
    if ( typeof value !== 'object' ) {
      if ( value.match(regex) ) {
        result.push(currentLoc);
      }
    } else if ( Array.isArray(value) ) {
      for ( var i = 0; i < value.length; i++ ) {
        recursiveSearch(value[i], currentLoc + '[' + i + ']');
      }
    } else {
      for ( key in value ) {
        recursiveSearch(value[key], currentLoc + '.' + key);
      }
    }

  recursiveSearch(object, '');
  return result;
}
