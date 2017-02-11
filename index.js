var express = require( 'express' )
var app = express()
var path = require( 'path' )
var bodyParser = require( 'body-parser' )
var Calculator = require( './src/Calculator' )

app.use( express.static( path.join( __dirname, 'browser' )))
app.use( bodyParser.urlencoded({ extended: false }))
app.use( bodyParser.json() )

app.get( '/', function( request, response ) {
  response.sendFile(
    '/Users/ideans/Documents/developer/projects/benchmark-projects/week-21-calculator/browser/calculator.html'
  )
})

app.post( '/add', function( request, response ) {
  var data = request.body.data

  data.memory = data.current
  data.operation = '+'
  data.current = '0'

  response.status(200).json({
    status: 'success',
    calcState: data,
    message: 'You suck.' })
})




app.get( '/subtract', function( request, response ) {
  var data = request.params.data

    console.log( '-- Subtract things.' )
    response.status(200).json({
      status: 'success',
      data: rersult,
      message: 'You suck.' })

})

app.get( '/multiply', function( request, response ) {
  //multiply number in memory by number provided
  var number = request.params.number
  console.log( '-- Multiply ' + number + ' to number in memory.' )
  response.status(200).json({
    status: 'success',
    data: number,
    message: 'You suck.' })
})

app.get( '/divide', function( request, response ) {
  var number = request.params.number
  console.log( '-- Divide ' + number + ' to number in memory.' )
  response.status(200).json({
    status: 'success',
    data: number,
    message: 'You suck.' })
})

app.get( '/percent', function( request, repsonse ) {
  //convert number provided to percent of number in memory, return decimal value
  var number = request.params.number
  console.log( '-- Add ' + number + ' to number in memory.' )
  response.status(200).json({
    status: 'success',
    data: number,
    message: 'You suck.' })
})

app.post( '/calculate', function( request, response ) {
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
app.listen( 9000, function() {
  console.log( 'Server running on port 9000.' )
})
