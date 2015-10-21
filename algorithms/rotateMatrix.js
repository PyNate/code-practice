function rotateMatrix (matrix, dir) {
  //Rotate a m x n matrix 90 degrees. Pass in dir <= 0 for
  //counter-clockwise, dir > 0 for clockwise.
  var m = matrix.length;
  var n = matrix[0].length;
  var result = [];
  
  for ( var j = 0; j < n; j++ ) {
    var row = [];
    
    for ( var i = m-1; i >= 0; i-- ){
      if ( dir && dir <= 0 ) row.push(matrix[j][i]);
      else row.push(matrix[i][j]);
    }
    
    result.push(row);
  }
  
  return result;
}
