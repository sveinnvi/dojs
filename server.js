var express = require('express')
var path = require('path')

var app = express()


import React from 'react'
import {renderToString} from 'react-dom/server'
import {match, RouterContext} from 'react-router'
import routes from './modules/routes'


// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')))

// app.get('/about', function (req, res) {
//   console.log("about get?")
//   res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })


// send all requests to index.html so browserHistory in React Router works
app.get('*', (req, res) => {
  console.log("Ég fer á völlinn");
  // match the routes to the url
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    // `RouterContext` is what the `Router` renders. `Router` keeps these
    // `props` in its state as it listens to `browserHistory`. But on the
    // server our app is stateless, so we need to use `match` to
    // get these props before rendering.
    const appHtml = renderToString(<RouterContext {...props}/>)

    // dump the HTML into a template, lots of ways to do this, but none are
    // really influenced by React Router, so we're just using a little
    // function, `renderPage`
    res.send(renderPage(appHtml))
  })
})

function renderPage(appHtml) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>My First React Router App</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
    <link rel=stylesheet href=/index.css>
    <div id=app>${appHtml}</div>
    <script src="/bundle.js"></script>
   `
}

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
