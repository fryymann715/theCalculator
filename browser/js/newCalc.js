( function() {
  function Calculator( domElement ) {
    this.MAX_LENGTH = 11
    this.dom = domElement
    this.data = {
      current: '',
      equationString: ''
    }
    this.onButtonClick = Calculator.onButtonClick.bind( this ),
    this.onKeyPress = Calculator.onKeyPress.bind( this ),
    this.addListener()
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
  Calculator.cssClasses = {
    GREY_BUTTON_PRESSED: 'calculator-button-grey-pressed',
    ORANGE_BUTTON_PRESSED: 'calculator-operator-button-pressed',
    SMALL_FONT: 'calculator-small-font'
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

  Calculator.prototype.addListener = function() {
    this.dom.querySelector( Calculator.elementSelectors.BUTTON_SECTION )
      .addEventListener( 'click', this.onButtonClick )
    this.dom.addEventListener( 'keydown', this.onKeyPress )
  }

  Calculator.prototype.getButton = function ( keyValue ) {
    return this.dom.querySelector( Calculator.divWithDataValue( keyValue ) )
  }

  Calculator.onButtonClick = function( event ) {
    if ( event.target.matches( Calculator.elementSelectors.NUMBER ) ) {
      this.enterDigit( event.target.dataset.value )
    } else if (
      ( event.target.matches( Calculator.elementSelectors.OPERATOR )) &&
      ( !event.target.matches( Calculator.elementSelectors.EQUALS ))
    ) {
      this.setOperator( event.target.dataset.value )
    } else if ( event.target.matches( Calculator.elementSelectors.CLEAR ) ) {
      this.clearCalculator()
    } else if ( event.target.matches( Calculator.elementSelectors.EQUALS ) ) {
      this.doCalculate()
    } else if ( event.target.matches( Calculator.elementSelectors.TOGGLE_SIGN ) ) {
      this.toggleNegativeValue()
    } else if ( event.target.matches( Calculator.elementSelectors.DOT ) ) {
      this.addDot()
    } else if ( event.target.matches( Calculator.elementSelectors.PERCENT ) ) {
      this.convertPercent()
    }
  }
  Calculator.onKeyPress = function( event ) {
    if ( Calculator.isNumber( event.key ) ) {
      this.fakeClickEffect( event.key, Calculator.cssClasses.GREY_BUTTON_PRESSED )
      this.enterDigit( event.key )
    } else if ( Calculator.isOperator( event.key ) ) {
      this.fakeClickEffect( event.key, Calculator.cssClasses.ORANGE_BUTTON_PRESSED )
      this.setOperator( event.key )
    } else if ( Calculator.isEquals( event.key ) ) {
      this.fakeClickEffect( Calculator.buttons.EQUALS, Calculator.cssClasses.ORANGE_BUTTON_PRESSED )
      this.doCalculate()
    } else if ( Calculator.isClear( event.key ) ) {
      this.fakeClickEffect( Calculator.buttons.CLEAR, Calculator.cssClasses.GREY_BUTTON_PRESSED )
      this.clearCalculator()
    } else if ( Calculator.isDot( event.key ) ) {
      this.fakeClickEffect( Calculator.buttons.DOT, Calculator.cssClasses.GREY_BUTTON_PRESSED )
      this.addDot()
    }
  }
  Calculator.prototype.fakeClickEffect = function ( button, color ) {
    var currentCalculator = this
    currentCalculator.getButton( button ).classList.add( color )
    setTimeout( function() {
      currentCalculator.getButton( button ).classList.remove( color )
      }, 100 )
  }


  Calculator.isOperator = function ( keyValue ) {
    return keyValue === Calculator.buttons.ADD
      || keyValue === Calculator.buttons.SUBTRACT
      || keyValue === Calculator.buttons.DIVIDE
      || keyValue === Calculator.buttons.MULTIPLY
  }
  Calculator.isEquals = function ( keyValue ) {
    return keyValue === Calculator.buttons.ENTER
      || keyValue === Calculator.buttons.EQUALS
  }
  Calculator.isClear = function ( keyValue ) {
    return keyValue === Calculator.buttons.CLEAR
      || keyValue === Calculator.buttons.BACKSPACE
      || keyValue === Calculator.buttons.DELETE
  }
  Calculator.isDot = function ( keyValue ) {
    return keyValue === Calculator.buttons.DOT
  }
  Calculator.isNumber = function ( keyValue ) {
    return parseInt( keyValue ) || keyValue === '0'
  }
  Calculator.isGreyButton = function ( keyValue ) {
    return keyValue === Calculator.buttons.CLEAR
      || parseInt( keyValue )
      || keyValue === '0'
      || keyValue === Calculator.buttons.DOT
  }


  Calculator.prototype.enterDigit = function( number ) {
    var current = this.data.current
    if ( current === '0' || this.data.memory === this.data.result ) {
      this.clearResult()
      current = ''
    }
    if ( this.data.current.length === this.data.MAX_LENGTH ) {
      this.shrinkFontSize()
    }
    current += number
    this.data.current = current
    this.setOutput()
  }


  document.querySelectorAll( '.calculator' ).forEach( function( calculator ) {
    var calc = new Calculator( calculator )
  })
})()
