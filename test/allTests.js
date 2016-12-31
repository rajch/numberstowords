(function allTests() {
  var tap = require('tap');
  var n = require('../numberstowords');

  var unitWords = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen'
  ];

  var tenWords = [ null, null, 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety' ];

  function unitsWord(number)
  {
    return unitWords[number];
  }

  function tensWord(number)
  {
    var result;
    if(number > 19) {
      result = tenWords[Math.trunc(number / 10)];
      if(number % 10 !== 0) {
        result += ' ';
        result += unitsWord(number % 10);
      }
    } else {
      result = unitsWord(number);
    }
    return result;
  }

  function hundredsWord(number)
  {
    var result;
    if(number > 99) {
      result = tensWord(Math.trunc(number / 100)) + ' hundred';
      var underhundred = number % 100;
      if(underhundred !== 0) {
        result += ' ';
        if(underhundred > 19) {
          result += tensWord(underhundred);
        } else {
          result += unitsWord(underhundred);
        }
      }
    } else {
      result = tensWord(number);
    }
    return result;
  }

  function thousandsWord(number)
  {
    var result;
    if(number > 999) {
      result = tensWord(Math.trunc(number / 1000)) + ' thousand';
      var underthousand = number % 1000;
      if(underthousand !== 0) {
        result += ' ';
        result += hundredsWord(underthousand);
      }
    } else {
      result = hundredsWord(number);
    }
    return result;
  }

  function numTest(t, startNum, endNum, wordfn)
  {
    for(let i = startNum; i < endNum; i++) {
      t.assert(n.toWords(i) === wordfn(i), i + ' should equal ' + wordfn(i) + ', is actually ' + n.toWords(i));
    }
    t.end();
  }

  tap.pass('Testing framework initialized ok.');

  // Test Zero
  tap.assert(n.toWords(0) === 'zero', '0 should equal "zero"');

  // Test units
  tap.test("Testing units and te(e)ns", function(t) { numTest(t, 1, 20, unitsWord); });

  // Test twenties to nineties
  /*
  tap.test("Testing twenties", function(t) { numTest(t, 20, 30, tensWord); });
  tap.test("Testing thirties", function(t) { numTest(t, 30, 40, tensWord); });
  tap.test("Testing forties", function(t) { numTest(t, 40, 50, tensWord); });
  tap.test("Testing fifties", function(t) { numTest(t, 50, 60, tensWord); });
  tap.test("Testing sixies", function(t) { numTest(t, 60, 70, tensWord); });
  tap.test("Testing seventies", function(t) { numTest(t, 70, 80, tensWord); });
  tap.test("Testing eighties", function(t) { numTest(t, 80, 90, tensWord); });
  tap.test("Testing nineties", function(t) { numTest(t, 90, 100, tensWord); });
  */
  // Test hundreds
  /*
  tap.test("Testing 100 to 199", function(t) { numTest(t, 100, 200, hundredsWord); });
  tap.test("Testing 200 to 299", function(t) { numTest(t, 200, 300, hundredsWord); });
  tap.test("Testing 900 to 999", function(t) { numTest(t, 900, 1000, hundredsWord); });
  */
  // Test thousands
  /*
  tap.test("Testing 1000 to 1199", function(t) { numTest(t, 1000, 1200, thousandsWord); });
  tap.test("Testing 9900 to 10100", function(t) { numTest(t, 9900, 10101, thousandsWord); });
  tap.test("Testing 19990 to 20100", function(t) { numTest(t, 19990, 20101, thousandsWord); });
  */
  tap.test("Testing 99990 to 100021", function(t) { numTest(t, 99990, 100022, thousandsWord); });
  
})();