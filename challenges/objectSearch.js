function objectSearch(object, regex) {
  var result = [];
  for ( key in object ) {
    if ( object[key].match(regex) ) {
      result.push(key);
    }
  }
  return result;
}