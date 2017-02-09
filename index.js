var express = require( 'express' )
var app = express()
var path = require('path')

app.use(express.static(path.join(__dirname, 'browser')));

app.get( '/', function( request, response ) {
  response.sendFile( './browser/calculator.html' )
})

app.listen( 9000, function() {
  console.log( 'Server running on port 9000.' )
})
