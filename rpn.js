


function toReversePolishNotation( equationString ) {
  var output = ''
  var operators = []
  var tokens = equationString.split('')

  for ( x=0; x<tokens.length; x++ ) {
    var token = tokens[x]
    if ( (parseInt( token ) || token === '0') || token ==='.' ) {
      output += token
      continue;
    } else if( token === '|' ) {
      output+= '-'
      continue;
    } else {
      output += ' '
    }
    while (
      operators.length > 0
      && precedence[token] <= precedence[ operators[ operators.length-1 ] ]
    ) {
      output += operators.pop()
      output += ' '
    }
    operators.push( token )
  }
  while( operators.length > 0 ) {
    output += ' '
    output += operators.pop()
  }
  return output
}
s
var equation = '27+3*|9'
var rpnString = toReversePolishNotation( equation )
console.log( 'rpnString = ', rpnString )


function evalRPN( rpnString ) {
  var numStack = []
  var tokens = rpnString.split(' ')
  for ( var x=0; x<tokens.length; x++ ) {
    var token = tokens[x]
    if ( parseFloat(token) ) {
      numStack.push( token )
    } else {
      var num2 = numStack.pop()
      var num1 = numStack.pop()
      switch( token ) {
        case '*':
          var result = parseFloat( num1 ) * parseFloat( num2 )
          break;
        case '/':
          var result = parseFloat( num1 ) / parseFloat( num2 )
          break;
        case '+':
          var result = parseFloat( num1 ) + parseFloat( num2 )
          break;
        case '-':
          var result = parseFloat( num1 ) - parseFloat( num2 )
          break;
      }
      numStack.push( result )
    }
  }
  return numStack.pop()
}

console.log( 'result = ', evalRPN( rpnString ) )
