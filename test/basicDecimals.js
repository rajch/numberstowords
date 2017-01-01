(function basicDecimalTests() {
  var tap = require('tap');
  var n = require('../numberstowords');

  function assertDecimalNumber(number, word)
  {
    var testvalue = n.toWords(number, {integerOnly: false});
    tap.assert( testvalue === word,
               number + ' should equal "' + word + '", actually equals "' + testvalue + '"');
  }

  assertDecimalNumber(12345.67, 'twelve thousand three hundred forty five and sixty seven');
  assertDecimalNumber(12345.6785, 'twelve thousand three hundred forty five and sixty eight');
})();