function Calculator() {
  this.postfixString = ''
  this.rpnString = ''
  this.numberStack = []
}

Calculator.prototype.addToPostfix = function( equationChunk ) {
  this.postfixString += equationChunk
}
Calculator.prototype.clearCalculator = function () {
  if ( this.equationString.length < 1 ) {
    this.equationString = ''
  } else {
    while( this.numberStack.length > 0 ) {
      this.numberStack.pop()
    }
  }
}
Calculator.prototype.evaluateEquation = function() {
  this.toReversePolishNotation()
  this.evalRPN()
  return this.numberStack[0]

}

Calculator.prototype.toReversePolishNotation = function() {
  var output = ''
  var operators = []
  var tokens = this.postfixString.split('')

  for ( x=0; x<tokens.length; x++ ) {
    var token = tokens[x]
    if ( Calculator.isNotOperator( token ) ) {
      output += token
      continue;
    } else if( Calculator.isNegativeSign( token ) ) {
      output+= '-'
      continue;
    } else {
      output += ' '
    }
    while (
      operators.length > 0
      && Calculator.precedence[token] <= Calculator.precedence[ operators[ operators.length-1 ] ]
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
  this.rpnString = output
}
Calculator.prototype.evalRPN = function() {
  var tokens = this.rpnString.split(' ')
  for ( var x=0; x<tokens.length; x++ ) {
    var token = tokens[x]
    if ( parseFloat(token) ) {
      this.numberStack.push( token )
    } else {
      var num2 = this.numberStack.pop()
      var num1 = this.numberStack.pop()
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
      this.numberStack.push( result )
    }
  }
}


//TODO: address this with the new design
Calculator.prototype.convertPercent = function () {
  if ( this.data.memory === '0' ) {
    this.data.current = ( parseFloat( this.data.current ) / 100 ).toString()
    this.setOutput()
  } else {
    this.data.current = (
      (parseFloat( this.data.current ) / parseFloat( this.data.memory )
    ) * 100 ).toString()
    this.setOutput()
  }
}

Calculator.precedence = {
  '+': 2,
  '-': 2,
  '*': 3,
  '/': 3
}
Calculator.isNotOperator = function( token ) {
  return ( parseInt( token ) || token === '0' ) || token === '.'
}
Calculator.isNegativeSign = function( token ) {
  return token === '|'
}

/*
var calc = new Calculator()
calc.addToPostfix( '1+' )
calc.addToPostfix( '3*' )
calc.addToPostfix( '4-' )
calc.addToPostfix( '3' )

console.log( calc.postfixString )
console.log( calc.evaluateEquation() )
*/

module.exports = Calculator
