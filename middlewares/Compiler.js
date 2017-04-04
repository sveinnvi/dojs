var Sandbox = require('sandbox')


exports.testCode = function (req, res, next) {
  var sandbox = new Sandbox();
  var currentLesson = req.body.currentLesson;
  var lessonsObject = req.body.allLessons;
  var codeToTest = req.body.codeFromUser;
  var testPassed = true;
  var typeOfError = "";
  console.log("I am in compiler.testCode");

  var appendedCode = getAppendBodyFunction(lessonsObject);
  if(appendedCode != -1) {
    // if appendedCode == -1 there is no appendBodyFunction to use for this lesson
    // so here there is a appendedCode to test
    // appendedCode[0][0] corresponds to the first example of a function body
    codeToTest = appendedCode[0][0];
  }

  sandbox.run(codeToTest, function(output) {
    console.log(output.result);
    console.log(output.console);

    // Check if there were any errors, if so Lessons will be informed and the next lesson wont be available.
    // If there are no errors, Lessons will be informed and the user will continue
    // Lessons keeps the appropriate information about the next Lesson in a json format.

    if(checkError(output.result)) {
      // we got an error
      console.log("if(checkError()) returns true---------");
      typeOfError = getError(output.result);
      testPassed = false;
      req.body.feedback = typeOfError;
      finishCompilation(output.result, output.console);
    } else if(appendedCode != -1) {
      // no errors and the code was appended
      console.log("runTestCases will be run---------");
      // runTestCases(appendedCode, finishCompilation);
      runTestCases(appendedCode, 0);
    } else {
      // no errors and the code wasnt appended
      console.log("else statement matches, calling finishCompilation() in beginning...---------");
      finishCompilation(output.result, output.console);
    }


  });

  function finishCompilation(results, consoles) {
    // last callback function to call before finishing Compiler activity
    console.log("testPassed in finishCompilation");
    console.log(testPassed);
    req.body.testPassed = testPassed;
    // req.body.outputResult = output.result;
    // req.body.outputConsole = output.console;
    req.body.outputResult = results;
    req.body.outputConsole = consoles;
    next();
  }

  function checkError(result) {
    // if results contains "error"
    // it is a error
    if(result.toLowerCase().indexOf("error") >= 0) {
      return true;
    } else return false;
  }

  function getError(result) {
    // get type of error:
    var str="";
    // "ReferenceError: x is not defined"
    var regexReferenceError = result.match(/\ReferenceError: (.*?)\ is not defined/);
    // "SyntaxError: Unexpected end of input"
    var regexSyntaxErrorUnexpectedEndOfInput = result.match(/\SyntaxError: Unexpected end of input/);
    // "SyntaxError: Unexpected token ;"
    var regexSyntaxErrorUnexpectedToken = result.match(/\SyntaxError: Unexpected token (.*)/);
    // "TimeoutError"
    var regexTimeoutError = result.match(/\TimeoutError/);
    // "RangeError: Maximum call stack size exceeded"
    var regexRangeError = result.match(/\RangeError: Maximum call stack size exceeded/);
    console.log("REGEX");
    if(regexReferenceError) {
      console.log("reference error");
      str += "Tilvísunarvilla! ";
      str += regexReferenceError[1];
      str += " er ekki skilgreint.";
    } else if(regexSyntaxErrorUnexpectedToken) {
      console.log("syntax token error");
      str += "Þýðandinn átti ekki von á "
      str += regexSyntaxErrorUnexpectedToken[1];
      str += " tákni."
    } else if(regexSyntaxErrorUnexpectedEndOfInput) {
      console.log("syntax end of input error");
      str += "Villa! ";
      str += "Þýðandinn kvartar yfir end of input. ";
    } else if(regexTimeoutError) {
      console.log("timeout error");
      str += "Tímavilla, óendanleg lykkja?";
    } else if(regexRangeError) {
      console.log("range error");
      str += "Óendanleg endurkvæmni?";
    } else {
      console.log("unknown error");
      str += "Úps, villa!";
      str += " Könnumst ekki við þessa villu: ";
      str += result;
    }
    return str;
  }

  function getAppendBodyFunction(data) {
    var appendBodyFunction = "lessonFunction";
    console.log("GET APPEND BODY FUNCTION");
    // eval hack ...
    // validate current lesson
    // runs the appropriate validation function
    return eval(data[currentLesson][appendBodyFunction]);

  }
  function lessonStart(code) {
    // no appending in current lesson
    return -1;
  }
  function lessonOne(code) {
    // no appending in current lesson
    return -1;
  }
  function lessonTwo(code) {
    // no appending in current lesson
    return -1;
  }
  function lessonThree(code) {
    // no appending in current lesson
    return -1;
  }
  function lessonFour(code) {
    // build cases of inputs and expectedOutputs
    var functionBodyStart = "function F_U_N_C(x) {";
    var functionBodyEnd1 = "return x; } F_U_N_C(500);"
    var functionBodyEnd2 = "return x; } F_U_N_C(20);"
    var functionBodyEnd3 = "return x; } F_U_N_C(100);"

    var function_1 = functionBodyStart+code+functionBodyEnd1;
    var function_2 = functionBodyStart+code+functionBodyEnd2;
    var function_3 = functionBodyStart+code+functionBodyEnd3;

    var functionArray = [function_1, function_2, function_3];
    var expectedOutputs = [250, 100, 50];

    // if(runCode(functionArray, expectedOutputs)) {
    //   return true;
    // } else {
    //   return false;
    // }
    return [functionArray, expectedOutputs];
  }

  function lessonFive(code) {
    // build cases of inputs and expectedOutputs
    var functionBodyStart = "function F_U_N_C() {";
    var functionBodyEnd1 = "return sum; } F_U_N_C();"

    var function_1 = functionBodyStart+code+functionBodyEnd1;

    var functionArray = [function_1];
    var expectedOutputs = [55];
    // returns a matrix of functions and expected outputs
    return [functionArray, expectedOutputs];
  }


  function runTestCases(m, i) {
    // m is a matrix with 2 lines, line 0 with functions and line 1 with expectedOutputs
    sandbox.run(m[0][i], function(output) {
      if(output.result != m[1][i]) {
        console.log("NOT MATCH");
        testPassed = false;
        req.body.feedback = "Einhvað fór úrskeiðis þegar forritið var prófað miðað við input, endurskoðaðu forritið þitt.";
        finishCompilation(output.result, output.console);
      } else {
        console.log("MATCH");
        if(i < m[0].length-1) {
          console.log("NOT END OF MATRIX");
          runTestCases(m,i+1);
        } else {
          console.log("END OF MATRIX");
          finishCompilation(output.result, output.console);
        }
      }
    });
  }
}
