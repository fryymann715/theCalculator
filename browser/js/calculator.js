( function() {

  function Calculator( domElement ) {
    this.dom = domElement,
    this.data = {
      memory: '0',
      current: '0',
      operation: '',
      result: '0',
      MAX_LENGTH: 11
    }
  }

  Calculator.cssClasses = {
    GREY_BUTTON_PRESSED: 'calculator-button-grey-pressed',
    ORANGE_BUTTON_PRESSED: 'calculator-operator-button-pressed',
    SMALL_FONT: 'calculator-small-font'
  }

  Calculator.elementSelectors = {
    CLEAR: '.calculator-clear',
    EQUALS: '.calculator-equals',
    TOGGLE_SIGN: '.calculator-toggle-negative',
    DOT: '.calculator-dot',
    PERCENT: '.calculator-percent',
    OPERATOR: '.calculator-operator-button',
    NUMBER: '.calculator-number',
    BUTTON_SECTION: '.calculator-button-section',
    OUTPUT: '.calculator-output'
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

  Calculator.prototype.divWithDataValue = function ( value ) {
    return `[data-value="${value}"]`
  }

  Calculator.prototype.getButton = function ( keyValue ) {
    return this.dom.querySelector( this.divWithDataValue( keyValue ) )
  }
  Calculator.prototype.isOperator = function ( keyValue ) {
    return keyValue === Calculator.buttons.ADD
      || keyValue === Calculator.buttons.SUBTRACT
      || keyValue === Calculator.buttons.DIVIDE
      || keyValue === Calculator.buttons.MULTIPLY
  }
  Calculator.prototype.isEquals = function ( keyValue ) {
    return keyValue === Calculator.buttons.ENTER || keyValue === Calculator.buttons.EQUALS
  }
  Calculator.prototype.isClear = function ( keyValue ) {
    return keyValue === Calculator.buttons.CLEAR
      || keyValue === Calculator.buttons.BACKSPACE
      || keyValue === Calculator.buttons.DELETE
  }
  Calculator.prototype.isDot = function ( keyValue ) {
    return keyValue === Calculator.buttons.DOT
  }
  Calculator.prototype.isNumber = function ( keyValue ) {
    return parseInt( keyValue ) || keyValue === '0'
  }
  Calculator.prototype.isGreyButton = function ( keyValue ) {
    return keyValue === Calculator.buttons.CLEAR
      || parseInt( keyValue )
      || keyValue === '0'
      || keyValue === Calculator.buttons.DOT
  }
  Calculator.prototype.fakeClickEffect = function ( button, color ) {
    //FIXME: ghetto binding
    var me = this
    this.getButton( button )
      .classList.add( color )
    setTimeout( function() {
      me.getButton( button )
        .classList.remove( color )
      }, 100 )
  }

  Calculator.prototype.addListeners = function () {
    //FIXME: ghetto binding
    var me = this
    this.dom.querySelector( Calculator.elementSelectors.BUTTON_SECTION )
      .addEventListener( 'click', function( event ) {
        if ( event.target.matches( Calculator.elementSelectors.NUMBER ) ) {
          me.enterDigit( event.target.dataset.value )
        } else if (
          ( event.target.matches( Calculator.elementSelectors.OPERATOR )) &&
          ( !event.target.matches( Calculator.elementSelectors.EQUALS ))
        ) {
          me.setOperator( event.target.dataset.value )
        } else if ( event.target.matches( Calculator.elementSelectors.CLEAR ) ) {
          me.clearCalculator()
        } else if ( event.target.matches( Calculator.elementSelectors.EQUALS ) ) {
          me.calculate()
        } else if ( event.target.matches( Calculator.elementSelectors.TOGGLE_SIGN ) ) {
          me.toggleNegativeValue()
        } else if ( event.target.matches( Calculator.elementSelectors.DOT ) ) {
          me.addDot()
        } else if ( event.target.matches( Calculator.elementSelectors.PERCENT ) ) {
          me.convertPercent()
        }
      })
      this.dom.onkeydown = function( event ) {
        me.isNumber( event.key )
          ? ( me.fakeClickEffect( event.key, Calculator.cssClasses.GREY_BUTTON_PRESSED ),
            me.enterDigit( event.key ) )
          : me.isOperator( event.key )
          ? ( me.fakeClickEffect( event.key, Calculator.cssClasses.ORANGE_BUTTON_PRESSED ),
            me.setOperator( event.key ) )
          : me.isEquals( event.key )
          ? ( me.fakeClickEffect( Calculator.buttons.EQUALS, Calculator.cssClasses.ORANGE_BUTTON_PRESSED ),
            me.calculate() )
          : me.isClear( event.key )
          ? ( me.fakeClickEffect( Calculator.buttons.CLEAR, Calculator.cssClasses.GREY_BUTTON_PRESSED ),
            me.clearCalculator() )
          : me.isDot( event.key )
          ? ( me.fakeClickEffect( Calculator.buttons.DOT, Calculator.cssClasses.GREY_BUTTON_PRESSED ),
            me.addDot() )
          : null
      }
  }
  Calculator.prototype.setOutput = function ( text ) {
    //FIXME: ghetto binding
    var me = this
    if ( text ) {
      if ( text.length > this.data.MAX_LENGTH ) {
        me.shrinkFontSize()
      }
      this.dom.querySelector( Calculator.elementSelectors.OUTPUT ).innerHTML = text
    } else {
      if ( this.data.current.length > this.data.MAX_LENGTH ) {
        me.shrinkFontSize()
      }
      this.dom.querySelector( Calculator.elementSelectors.OUTPUT ).innerHTML = this.data.current
    }
  }
  Calculator.prototype.setResult = function ( number ) {
    this.data.result = number.toString()
    this.data.memory = this.data.result
  }
  Calculator.prototype
  .clearResult = function () {
    this.data.result = ''
  }
  Calculator.prototype
  .resetData = function () {
    this.data = {
      memory: '0',
      current: '0',
      operation: '',
      result: '',
      MAX_LENGTH: 11
    }
  }
  Calculator.prototype.shrinkFontSize = function () {
    this.dom.querySelector( Calculator.elementSelectors.OUTPUT )
      .classList.add( Calculator.cssClasses.SMALL_FONT )
  }
  Calculator.prototype.resetFontSize = function () {
    this.dom.querySelector( Calculator.elementSelectors.OUTPUT )
      .classList.remove( Calculator.cssClasses.SMALL_FONT )
  }
  Calculator.prototype.enterDigit = function ( number ) {
    var me = this
    var current = this.data.current
    if ( current === '0' || this.data.memory === this.data.result ) {
      me.clearResult()
      current = ''
    }
    if ( this.data.current.length === this.data.MAX_LENGTH ) {
      me.shrinkFontSize()
    }
    current += number
    this.data.current = current
    me.setOutput()
  }
  Calculator.prototype.setOperator = function ( operation ) {
    //FIXME: ghetto binding
    var me = this
    if ( me.data.memory === me.data.result ) {
      me.data.memory = me.data.result
    } else {
      me.data.memory = me.data.current
    }
    me.data.current = '0'
    me.data.operation = operation
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
  Calculator.prototype.toggleNegativeValue = function () {
    if ( this.data.current.indexOf( '-' ) === -1 ) {
      this.data.current = '-' + this.data.current
    } else {
      this.data.current = this.data.current.substring( 1 )
    }
    this.setOutput()
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
  Calculator.prototype.addDot = function () {
    if ( this.data.current.indexOf( '.' ) === -1 ) {
      this.data.current = this.data.current + '.'
      this.setOutput()
    }
  }

  Calculator.prototype.calculate = function () {
    if ( !(this.data.memory === '0' && this.data.current === '0') ) {
      switch( this.data.operation ) {
        case Calculator.buttons.ADD:
          this.add()
          break;
        case Calculator.buttons.SUBTRACT:
          this.subtract()
          break;
        case Calculator.buttons.MULTIPLY:
          this.multiply()
          break;
        case Calculator.buttons.DIVIDE:
          this.divide()
          break;
      }
      this.setOutput( this.data.result )
    }
  }
  Calculator.prototype.add = function () {
    this.setResult(
      parseFloat( this.data.memory ) + parseFloat( this.data.current ) )
  }
  Calculator.prototype.subtract = function () {
    this.setResult(
      parseFloat( this.data.memory ) - parseFloat( this.data.current ) )
  }
  Calculator.prototype.multiply = function () {
    this.setResult(
      parseFloat( this.data.memory ) * parseFloat( this.data.current ) )
  }
  Calculator.prototype.divide = function () {
    this.setResult(
      parseFloat( this.data.memory ) / parseFloat( this.data.current ) )
  }

  document.querySelectorAll( '.calculator' ).forEach( function( calculator ) {
    var calc = new Calculator( calculator )
    calc.addListeners()
  })
}) ()
