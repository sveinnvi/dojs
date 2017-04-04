var express = require('express')
var path = require('path')

var app = express()
var Compiler = require('./middlewares/Compiler')
var Lessons = require('./middlewares/Lessons')

const bodyParser = require('body-parser');

const router = express.Router();


import React from 'react'
import {renderToString} from 'react-dom/server'
import {match, RouterContext} from 'react-router'
import routes from './modules/routes'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')))

// app.get('/about', function (req, res) {
//   console.log("about get?")
//   res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

// send all requests to index.html so browserHistory in React Router works

app.post('/CodingPage', (req, res, next) => {
  // INIT req.body variables
  req.body.path = "";
  req.body.outputResult = "";
  req.body.outputConsole = "";
  req.body.feedback = "";
  req.body.instructions = "";
  req.body.userPassed = "";
  req.body.testPassed = "";
  next();
  // middlewares
}, Lessons.loadLessonsJSON, Compiler.testCode, Lessons.getLesson, (req, res, next) => {

  // ran through compiler, check if user passed
  const userPassed = req.body.testPassed;
  if(userPassed) {
    // user passed, provide nextLesson
    path = req.body.path;
  } else {
    // user did not pass, provide same lesson
    path = req.url;
  }
  const results = req.body.outputResult;
  const consoles = req.body.outputConsole;
  const feedback = req.body.feedback;
  const instructions = req.body.instructions;

  const compiledResults = {results, consoles, feedback, path, instructions, userPassed};
  console.log("=====================");
  console.log("compiledResults: ");
  console.log(compiledResults);
  console.log("=====================");

  res.send(compiledResults);
})

app.get('*', (req, res) => {


  console.log("backend");
  // match the routes to the url
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    // `RouterContext` is what the `Router` renders. `Router` keeps these
    // `props` in its state as it listens to `browserHistory`. But on the
    // server our app is stateless, so we need to use `match` to
    // // get these props before rendering.
    // const appHtml = renderToString(<RouterContext {...props}/>)
    //
    // // dump the HTML into a template, lots of ways to do this, but none are
    // // really influenced by React Router, so we're just using a little
    // // function, `renderPage`
    // res.send(renderPage(appHtml))
    console.log(req.url);
    if (err) {
      // there was an error somewhere during route matching
      res.status(500).send(err.message)
    } else if (redirect) {
      // we haven't talked about `onEnter` hooks on routes, but before a
      // route is entered, it can redirect. Here we handle on the server.
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      // if we got props then we matched a route and can render
      const appHtml = renderToString(<RouterContext {...props}/>)
      res.send(renderPage(appHtml))
    } else {
      // no errors, no redirect, we just didn't match anything
      res.status(404).send('Not Found')
    }


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
    <script src="/lib/codemirror.js"></script>
    <script src="/mode/javascript.js"></script>
   `
}

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
