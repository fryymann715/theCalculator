( function() {

  function Calculator( domElement ) {
    this.dom = domElement,
    this.data = {
      memory: '0',
      current: '0',
      operation: '',
      result: '0',
      MAX_LENGTH: 11
    },
    this.onButtonClick = Calculator.onButtonClick.bind( this ),
    this.onKeyPress = Calculator.onKeyPress.bind( this ),
    this.addListeners()
  }
  Calculator.operations = {
    '+': 'add',
    '-': 'subtract',
    '*': 'multiply',
    '/': 'divide',
    '=': 'calculate'
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
  Calculator.divWithDataValue = function ( value ) {
    return `[data-value="${value}"]`
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

  Calculator.prototype.getButton = function ( keyValue ) {
    return this.dom.querySelector( Calculator.divWithDataValue( keyValue ) )
  }
  Calculator.prototype.fakeClickEffect = function ( button, color ) {
    var currentCalculator = this
    currentCalculator.getButton( button ).classList.add( color )
    setTimeout( function() {
      currentCalculator.getButton( button ).classList.remove( color )
      }, 100 )
  }
  Calculator.prototype.addListeners = function() {
    this.dom.querySelector( Calculator.elementSelectors.BUTTON_SECTION )
      .addEventListener( 'click', this.onButtonClick )
    this.dom.addEventListener( 'keydown', this.onKeyPress )
  }

  Calculator.prototype.setOutput = function( text ) {
    if ( text ) {
      if ( text.length > this.data.MAX_LENGTH ) {
        this.shrinkFontSize()
        this.shrinkFontSize()
      }
      this.dom.querySelector( Calculator.elementSelectors.OUTPUT ).innerText = text
    } else {
      if ( this.data.current.length > this.data.MAX_LENGTH ) {
        this.shrinkFontSize()
      }
      this.dom.querySelector( Calculator.elementSelectors.OUTPUT ).innerText = this.data.current
    }
  }

  Calculator.prototype.showResult = function() {
    this.dom.querySelector( Calculator.elementSelectors.OUTPUT ).innerText = this.data.result
  }

  Calculator.prototype.setResult = function( number ) {
    this.data.result = number.toString()
    this.data.memory = this.data.result
  }




  Calculator.prototype.shrinkFontSize = function() {
    this.dom.querySelector( Calculator.elementSelectors.OUTPUT )
      .classList.add( Calculator.cssClasses.SMALL_FONT )
  }
  Calculator.prototype.resetFontSize = function() {
    this.dom.querySelector( Calculator.elementSelectors.OUTPUT )
      .classList.remove( Calculator.cssClasses.SMALL_FONT )
  }


  Calculator.prototype.makeFetchString = function( operation  ) {
    return `/${Calculator.operations[operation]}`
  }

  Calculator.prototype.makeFetchData = function() {
    var data = this.data
    var myHeaders = new Headers()
    myHeaders.append( "Accept", "application/json" )
    myHeaders.append( "Content-Type", "application/json" )
    var fetchData = {
      headers: myHeaders,
      method: 'POST',
      body: JSON.stringify({ data })
    }
    return fetchData
  }

  Calculator.prototype.doFetch = function() {
    var fetchURL = this.makeFetchString()
    fetch(  )
  }

  Calculator.prototype.setOperator = function( operation ) {
    var currentCalc = this
    var myHeaders = new Headers()
    myHeaders.append( "Accept", "application/json" )
    myHeaders.append( "Content-Type", "application/json" )

    var data = this.data

    var fetchData = this.makeFetchData()

    fetch( this.makeFetchString( operation ), fetchData )
    .then( function( result ) {
      return result.json()
    }).then( function( data ) {
      console.log( data.calcState )
      currentCalc.data = data.calcState
      currentCalc.setOutput()
    })

  }

  Calculator.prototype.doCalculate = function() {
    if ( this.data.operation === ''  ) {
      return null
    } else {
      var currentCalc = this
      var fetchData = this.makeFetchData()
      var operation = '='

      fetch( this.makeFetchString( operation ), fetchData )
      .then( function( result ) {
        return result.json()
      }).then( function( data ) {
        //console.log( 'return > ', data.calcState )
        currentCalc.data = data.calcState
        currentCalc.showResult()
      })
    }

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
  Calculator.prototype.clearResult = function() {
    this.data.result = ''
  }
  Calculator.prototype.clearCalculator = function() {
    if ( this.data.current === '0' ) {
      this.resetData()
      this.setOutput()
    } else {
      this.resetFontSize()
      this.data.current = '0'
      this.setOutput()
    }
  }
  Calculator.prototype.resetData = function() {
    this.data = {
      memory: '0',
      current: '0',
      operation: '',
      result: '',
      MAX_LENGTH: 11
    }
  }
  Calculator.prototype.toggleNegativeValue = function() {
    if ( this.data.current.indexOf( '-' ) === -1 ) {
      this.data.current = '-' + this.data.current
    } else {
      this.data.current = this.data.current.substring( 1 )
    }
    this.setOutput()
  }
  Calculator.prototype.addDot = function() {
    if ( this.data.current.indexOf( '.' ) === -1 ) {
      this.data.current = this.data.current + '.'
      this.setOutput()
    }
  }

  document.querySelectorAll( '.calculator' ).forEach( function( calculator ) {
    var calc = new Calculator( calculator )
  })
}) ()
