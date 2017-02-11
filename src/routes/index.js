var express = require( 'express' )
var router = express.Router()
var path = require( 'path' )

router.get( '/', function( request, response ) {
  response.sendFile( path.join( __dirname, '../../browser/calculator.html' ) )
})

router.post( '/add', function( request, response ) {
  var data = request.body.data

  data.memory = data.current
  data.operation = '+'
  data.current = '0'

  response.status(200).json({
    status: 'success',
    calcState: data,
    message: 'You suck.' })
})

router.get( '/subtract', function( request, response ) {
  var data = request.params.data

    console.log( '-- Subtract things.' )
    response.status(200).json({
      status: 'success',
      data: rersult,
      message: 'You suck.' })

})

router.get( '/multiply', function( request, response ) {
  //multiply number in memory by number provided
  var number = request.params.number
  console.log( '-- Multiply ' + number + ' to number in memory.' )
  response.status(200).json({
    status: 'success',
    data: number,
    message: 'You suck.' })
})

router.get( '/divide', function( request, response ) {
  var number = request.params.number
  console.log( '-- Divide ' + number + ' to number in memory.' )
  response.status(200).json({
    status: 'success',
    data: number,
    message: 'You suck.' })
})

router.get( '/percent', function( request, repsonse ) {
  //convert number provided to percent of number in memory, return decimal value
  var number = request.params.number
  console.log( '-- Add ' + number + ' to number in memory.' )
  response.status(200).json({
    status: 'success',
    data: number,
    message: 'You suck.' })
})

router.post( '/calculate', function( request, response ) {
  var data = request.body.data
  console.log( 'Calculate! ', data.memory )
  if ( !data.operation ) {
    console.log( 'in the if' )
    response.status(200).json({
      status: 'Unsuccessful',
      calcState: data,
      message: 'You still suck!' })
  } else {
    data.result = Calculator.calculate( data )
    response.status(200).json({
      status: 'success',
      calcState: data,
      message: 'You suck.' })
  }
})

module.exports = router
