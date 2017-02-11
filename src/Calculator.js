  function Calculator( domElement ) {
    this.data = {
      memory: '0',
      current: '0',
      operation: '',
      result: '0'
    }
  }

  Calculator.buttons = {
      ADD: '+',
      SUBTRACT: '-',
      MULTIPLY: '*',
      DIVIDE: '/',
      EQUALS: '=',
      ENTER: 'Enter',
      CLEAR: 'Clear',
      BACKSPACE: 'Backspace',
      DELETE: 'Delete',
      DOT: '.'
  }

  Calculator.operations = {
    '+': 'add',
    '-': 'subtract',
    '*': 'multiply',
    '/': 'divide',
    '=': 'calculate'
  }

  Calculator.prototype.setOperator = function ( operation ) {
    if ( this.data.memory === this.data.result ) {
      this.data.memory = this.data.result
    } else {
      this.data.memory = this.data.current
    }
    this.data.current = '0'
    this.data.operation = operation
  }
  Calculator.prototype.clearCalculator = function () {
    if ( this.data.current === '0' ) {
      this.resetData()
      this.setOutput()
    } else {
      this.resetFontSize()
      this.data.current = '0'
      this.setOutput()
    }
  }

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

  Calculator.calculate = function ({ memory, operation, current }) {
    if ( !(memory === '0' && current === '0') ) {
      switch( operation ) {
        case Calculator.buttons.ADD:
          return Calculator.add( memory, current )
          break;
        case Calculator.buttons.SUBTRACT:
          return Calculator.subtract( memory, current )
          break;
        case Calculator.buttons.MULTIPLY:
          return Calculator.multiply( memory, current )
          break;
        case Calculator.buttons.DIVIDE:
          return Calculator.divide( memory, current )
          break;
        default:
          return
          break;
      }
    }
  }
  Calculator.add = function ( memory, current ) {
    return (parseFloat( memory ) + parseFloat( current ) ).toString()
  }
  Calculator.subtract = function ( memory, current ) {
    return (parseFloat( memory ) - parseFloat( current ) ).toString()
  }
  Calculator.multiply = function ( memory, current ) {
      return (parseFloat( memory ) * parseFloat( current ) ).toString()
  }
  Calculator.divide = function ( memory, current ) {
      return (parseFloat( memory ) / parseFloat( current ) ).toString()
  }

  module.exports = Calculator
