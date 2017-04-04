var fs = require('fs');
var g_lessonsObject = null;
//========
// loadLessonsJSON middleware
//========
exports.loadLessonsJSON = function (req, res, next) {
  console.log("LOADING JSON");
  if(g_lessonsObject != null) {
    // no need to fetch JSON
    req.body.allLessons = g_lessonsObject;
    next();
  } else {
    getLessonsJSON(finishLoad);
  }

  function getLessonsJSON(callback) {
    // fetches all lessons from data.json
    // example:
    //  {
    //    lessonone: {
    //      "feedback": "Vel gert",
    //      "path": "lessontwo",
    //      "instructions": "Instructions for lesson two"
    //      "validationFunction": "validateLessonOne"
    //    }
    //  }
    var obj;
    fs.readFile('./middlewares/data.json', 'utf8', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
      // global object with all lessons
      g_lessonsObject = obj;
      callback();
    });
  }
  // callback function to continue to next middlewares
  function finishLoad () {
    req.body.allLessons = g_lessonsObject;
    next();
  }
}
//========
// getLesson middleware
//========
exports.getLesson = function (req, res, next) {
  console.log("GET LESSON STARTS HERE");
  console.log(req.body.currentLesson);
  console.log(req.body.testPassed);
  //console.log(g_lessonsObject);

  var currentLesson = req.body.currentLesson;
  // if the test was passed we get a new lesson
  if(req.body.testPassed) {
    //getLessonsJSON(req.url, getValidationFunction);
    getValidationFunction(g_lessonsObject);
  } else {
    // we get nothing, user will get error message..
    next();
  }
  // a callback function which sends new lesson to client
  // if the user passed
  function sendLesson(data) {
    var nextLesson = data[currentLesson];
    req.body.feedback = nextLesson["feedback"];
    req.body.path = nextLesson["path"];
    req.body.instructions = nextLesson["instructions"];
    console.log("req.body.feedback in sendLesson function: ");
    console.log(req.body.feedback);
    next();
  }

  function getValidationFunction(data) {
    var validationFunction = "lessonFunction";
    console.log("GET VALIDATION FUNCTION");
    // eval hack ...
    // validate current lesson
    // runs the appropriate validation function
    if(eval(data[currentLesson][validationFunction])) {
      // user followed instructions correctly
      sendLesson(data);
    } else {
      req.body.testPassed = false;
      next();
    }
  }

  function lessonStart(code) {
    var userSolved = false;
    // number operator number
    // example:
    // 1+4
    console.log("code from validateLessonStart: ");
    console.log(code);
    var regex =code.match(/\d+[\-\+\*\/\s]+\d+/);
    if(regex) {
      // user solved problem correctly
      console.log("USER SOLVED PROBLEM");
      userSolved = true;
    } else {
      // user has not solved problem correctly
      req.body.feedback = "Ekki farið eftir leiðbeiningum.";
      console.log("USER HAS NOT SOLVED PROBLEM");
    }
    return userSolved;
  }
  function lessonOne(code) {
    var userSolved = false;
    // "string1" + "string2"
    // example:
    // "hello" + "world"
    console.log("code from validateLessonOne: ");
    console.log(code);
    var regex = code.match(/\"\s*[\w\s]+\"\s*[\+]\s*\"\s*[\w\s]+\"/);
    console.log("REGEX : ");
    console.log(regex);
    if(regex) {
      // user solved problem correctly
      console.log("USER SOLVED PROBLEM");
      userSolved = true;
    } else {
      // user has not solved problem correctly
      req.body.feedback = "Ekki farið eftir leiðbeiningum.";
      console.log("USER HAS NOT SOLVED PROBLEM");
    }
    return userSolved;
  }
  function lessonTwo(code) {
    var userSolved = false;
    // number modulus number
    // example:
    // 3%2
    console.log("code from validateLessonTwo: ");
    console.log(code);
    var regex = code.match(/\d+[\%\s]+\d+/);
    console.log("REGEX : ");
    console.log(regex);
    if(regex) {
      // user solved problem correctly
      console.log("USER SOLVED PROBLEM");
      userSolved = true;
    } else {
      // user has not solved problem correctly
      req.body.feedback = "Ekki farið eftir leiðbeiningum.";
      console.log("USER HAS NOT SOLVED PROBLEM");
    }
    return userSolved;
  }
  function lessonThree(code) {
    // init if problem is not solved
    var userSolved = false;
    req.body.feedback = "Ekki farið eftir leiðbeiningum.";
    // using variable
    // example:
    // var x = 4;
    // x = 2*x
    var removedSpacesAndToLowerCase = code.replace(/\s+/g, '').toLowerCase();
    var str = removedSpacesAndToLowerCase;
    // check if initialization is used correctly for x variable
    // check if doubling value by using its own value
    if(str.indexOf("varx=")>=0 && ((str.indexOf("=2*x")>=0 || str.indexOf("=x*2")>=0)))  {
      // if((str.indexOf("=2*x")>=0 || str.indexOf("=x*2")>=0)) {
        // user solved problem correctly
        console.log("USER SOLVED PROBLEM");
        userSolved = true;
      // }
      // else {
      //   // user has not solved problem correctly
      //   console.log("USER HAS NOT SOLVED PROBLEM");
      // }
    } else {
      // user has not solved problem correctly
      console.log("USER HAS NOT SOLVED PROBLEM");
    }
    return userSolved;
  }

  function lessonFour(code) {
    // init if problem is not solved
    var userSolved = false;
    req.body.feedback = "Ekki farið eftir leiðbeiningum.";
    // if/else statements
    // example:
    // if(x>=100) {
    //    x = 5*x;
    // } else {
    //    x = x/2;
    // }
    var removedSpacesAndToLowerCase = code.replace(/\s+/g, '').toLowerCase();
    var str = removedSpacesAndToLowerCase;
    // check if user is using correct if/else statements
    if(str.indexOf("if(")>=0 && str.indexOf("else")>=0 ) {
        // user solved problem correctly
        console.log("USER SOLVED PROBLEM");
        userSolved = true;
    } else {
      // user has not solved problem correctly
      console.log("USER HAS NOT SOLVED PROBLEM");
    }
    return userSolved;
  }

  function lessonFive(code) {
    // init if problem is not solved
    var userSolved = false;
    req.body.feedback = "Ekki farið eftir leiðbeiningum.";
    // while statements
    // example:
    // var x = 0;
    // while(x<10) {
    //    sum = sum + x;
    //    x = x + 1;
    // }
    var removedSpacesAndToLowerCase = code.replace(/\s+/g, '').toLowerCase();
    var str = removedSpacesAndToLowerCase;
    // check if user is using correct while
    if(str.indexOf("while(")>=0) {
        // user solved problem correctly
        console.log("USER SOLVED PROBLEM");
        userSolved = true;
    } else {
      // user has not solved problem correctly
      console.log("USER HAS NOT SOLVED PROBLEM");
    }
    return userSolved;
  }

}
