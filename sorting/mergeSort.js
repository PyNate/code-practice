function mergeSort(arr){
  if ( arr.length === 1 ) {
    return arr;
  }
  var front = arr.slice(0, Math.floor(arr.length/2));
  var back = arr.slice(Math.floor(arr.length/2), arr.length);
  var result = [];
  
  front = mergeSort(front);
  back = mergeSort(back);
  
  var f = 0;
  var b = 0;
  while ( result.length !== arr.length ) {
    if ( front[f] === undefined ) {
      result.push(back[b]);
      b++;
    } else if ( back[b] === undefined ) {
      result.push(front[f]);
      f++;
    }
    else if ( front[f] < back[b] ) {
      result.push(front[f]);
      f++;
    } else {
      result.push(back[b]);
      b++;
    }
  }
    
  
  return result;
}
