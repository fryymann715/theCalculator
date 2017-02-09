( function() {
  var data = {
    memory: '0',
    current: '0',
    operation: '',
    result: '0-',
    MAX_LENGTH: 11
  }
  var cssClasses = {
    GREY_BUTTON_PRESSED: 'calculator-button-grey-pressed',
    ORANGE_BUTTON_PRESSED: 'calculator-operator-button-pressed',
    SMALL_FONT: 'calculator-small-font'
  }
  var elementSelectors = {
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
  var buttons = {
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
  function divWithDataValue( value ) {
    return `[data-value="${value}"]`
  }
  function getButton( keyValue ) {
    return document.querySelector( divWithDataValue( keyValue ) )
  }
  function isOperator( keyValue ) {
    return keyValue === buttons.ADD
      || keyValue === buttons.SUBTRACT
      || keyValue === buttons.DIVIDE
      || keyValue === buttons.MULTIPLY
  }
  function isEquals( keyValue ) {
    return keyValue === buttons.ENTER || keyValue === buttons.EQUALS
  }
  function isClear( keyValue ) {
    return keyValue === buttons.CLEAR
      || keyValue === buttons.BACKSPACE
      || keyValue === buttons.DELETE
  }
  function isDot( keyValue ) {
    return keyValue === buttons.DOT
  }
  function isNumber( keyValue ) {
    return parseInt( keyValue ) || keyValue === '0'
  }
  function isGreyButton( keyValue ) {
    return keyValue === buttons.CLEAR
      || parseInt( keyValue )
      || keyValue === '0'
      || keyValue === buttons.DOT
  }
  function fakeClickEffect( button, color ) {
    getButton( button )
      .classList.add( color )
    setTimeout( function() {
      getButton( button )
        .classList.remove( color )
      }, 100 )
  }

  window.onkeydown = function( event ) {
    isNumber( event.key )
      ? ( fakeClickEffect( event.key, cssClasses.GREY_BUTTON_PRESSED ),
        enterDigit( event.key ) )
      : isOperator( event.key )
      ? ( fakeClickEffect( event.key, cssClasses.ORANGE_BUTTON_PRESSED ),
        setOperator( event.key ) )
      : isEquals( event.key )
      ? ( fakeClickEffect( buttons.EQUALS, cssClasses.ORANGE_BUTTON_PRESSED ),
        calculate() )
      : isClear( event.key )
      ? ( fakeClickEffect( buttons.CLEAR, cssClasses.GREY_BUTTON_PRESSED ),
        clearCalculator() )
      : isDot( event.key )
      ? ( fakeClickEffect( buttons.DOT, cssClasses.GREY_BUTTON_PRESSED ),
        addDot() )
      : null
  }

  function addListeners() {
    document.querySelector( elementSelectors.BUTTON_SECTION )
      .addEventListener( 'click', function( event ) {
        if ( event.target.matches( elementSelectors.NUMBER ) ) {
          enterDigit( event.target.dataset.value )
        } else if (
          ( event.target.matches( elementSelectors.OPERATOR )) &&
          ( !event.target.matches( elementSelectors.EQUALS ))
        ) {
          setOperator( event.target.dataset.value )
        } else if ( event.target.matches( elementSelectors.CLEAR ) ) {
          clearCalculator()
        } else if ( event.target.matches( elementSelectors.EQUALS ) ) {
          calculate()
        } else if ( event.target.matches( elementSelectors.TOGGLE_SIGN ) ) {
          toggleNegativeValue()
        } else if ( event.target.matches( elementSelectors.DOT ) ) {
          addDot()
        } else if ( event.target.matches( elementSelectors.PERCENT ) ) {
          convertPercent()
        }
      })
  }
  addListeners()

  function setOutput( text ) {
    if ( text ) {
      if ( text.length > data.MAX_LENGTH ) {
        shrinkFontSize()
      }
      document.querySelector( elementSelectors.OUTPUT ).innerHTML = text
    } else {
      if ( data.current.length > data.MAX_LENGTH ) {
        shrinkFontSize()
      }
      document.querySelector( elementSelectors.OUTPUT ).innerHTML = data.current
    }
  }
  function setResult( number ) {
    data.result = number.toString()
    data.memory = data.result
  }
  function clearResult() {
    data.result = ''
  }
  function resetData() {
    data = {
      memory: '0',
      current: '0',
      operation: '',
      result: '',
      MAX_LENGTH: 11
    }
  }
  function shrinkFontSize() {
    document.querySelector( elementSelectors.OUTPUT )
      .classList.add( cssClasses.SMALL_FONT )
  }
  function resetFontSize() {
    document.querySelector( elementSelectors.OUTPUT )
      .classList.remove( cssClasses.SMALL_FONT )
  }

  function enterDigit( number ) {
    var current = data.current
    if ( current === '0' || data.memory === data.result ) {
      clearResult()
      current = ''
    }
    if ( current.length === data.MAX_LENGTH ) {
      shrinkFontSize()
    }
    current += number
    data.current = current
    setOutput()
  }
  function setOperator( operation ) {
    if ( data.memory === data.result ) {
      data.memory = data.result
    } else {
      data.memory = data.current
    }
    data.current = '0'
    data.operation = operation
  }
  function clearCalculator() {
    if ( data.current === '0' ) {
      resetData()
      setOutput()
    } else {
      resetFontSize()
      data.current = '0'
      setOutput()
    }
  }
  function toggleNegativeValue() {
    if ( data.current.indexOf( '-' ) === -1 ) {
      data.current = '-' + data.current
    } else {
      data.current = data.current.substring( 1 )
    }
    setOutput()
  }
  function convertPercent() {
    if ( data.memory === '0' ) {
      data.current = ( parseFloat( data.current ) / 100 ).toString()
      setOutput()
    } else {
      data.current = (
        (parseFloat( data.current ) / parseFloat( data.memory )
      ) * 100 ).toString()
      setOutput()
    }
  }
  function addDot() {
    if ( data.current.indexOf( '.' ) === -1 ) {
      data.current = data.current + '.'
      setOutput()
    }
  }

  function calculate() {
    if ( !(data.memory === '0' && data.current === '0') ) {
      switch( data.operation ) {
        case buttons.ADD:
          add()
          break;
        case buttons.SUBTRACT:
          subtract()
          break;
        case buttons.MULTIPLY:
          multiply()
          break;
        case buttons.DIVIDE:
          divide()
          break;
      }
      setOutput( data.result )
    }
  }
  function add() {
    setResult( parseFloat( data.memory ) + parseFloat( data.current ) )
  }
  function subtract() {
    setResult( parseFloat( data.memory ) - parseFloat( data.current ) )
  }
  function multiply() {
    setResult( parseFloat( data.memory ) * parseFloat( data.current ) )
  }
  function divide() {
    setResult( parseFloat( data.memory ) / parseFloat( data.current ) )
  }
}) ()
