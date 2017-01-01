(function basicDecimalTests() {
  var tap = require('tap');
  var n = require('../numberstowords');

  function assertDecimalNumber(number, word, suppressMajorIfZero, suppressMinorIfZero)
  {
    var testvalue = n.toWords(
        number,
        { integerOnly : false, suppressMajorIfZero : suppressMajorIfZero, suppressMinorIfZero : suppressMinorIfZero });
    tap.assert(testvalue === word, number + ' should equal "' + word + '", actually equals "' + testvalue + '"');
  }

  assertDecimalNumber(12345.67, 'twelve thousand three hundred forty five point six seven');
  assertDecimalNumber(12345.6785, 'twelve thousand three hundred forty five point six eight');
  assertDecimalNumber(0.6785, 'zero point six eight');
  assertDecimalNumber(0.6000, 'zero point six zero');
  assertDecimalNumber(0.06000, 'zero point zero six');
  assertDecimalNumber(12, 'twelve point zero zero');
  
  assertDecimalNumber(0.6785, 'point six eight',true, true);
  assertDecimalNumber(12.0001, 'twelve',true, true);
  
  
  
})();