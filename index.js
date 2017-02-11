var express = require( 'express' )
var app = express()
var bodyParser = require( 'body-parser' )
var logger = require( 'morgan' )
var Calculator = require( './src/Calculator' )
var routes = require( './src/routes' )

app.use( logger( 'dev' ) )
app.use( bodyParser.json() )
app.use( routes )

app.use( ( request, response, next ) => {
  var error = new Error( 'Page not Found' )
  error.status = 404
  next( error )
})

app.use( ( request, response, next ) => {
  response.status( error.status || 500 )
  .json({
    status: "Error",
    message: error || '.....Oops?'
  })
})

app.listen( 9000, function() {
  console.log( 'Server running on port 9000.' )
})
