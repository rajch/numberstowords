(function basicCurrencyTests() {
  var tap = require('tap');
  var n = require('../numberstowords');

  function assertCurrency(number, word, majorOnly, majorAtEnd, minorAtEnd, suppressMajorIfZero, suppressMinorIfZero)
  {
    var opts = {
      useCurrency : true,
      majorCurrencySymbol : 'rupees',
      minorCurrencySymbol : 'paise',
      integerOnly : majorOnly,
      majorCurrencyAtEnd: majorAtEnd || false,
      minorCurrencyAtEnd: minorAtEnd === undefined ? true : minorAtEnd,
      suppressMajorIfZero: suppressMajorIfZero,
      suppressMinorIfZero: suppressMinorIfZero
    };
    
    var testvalue = n.toWords(number, opts);
    tap.assert(testvalue === word, number + ' should equal "' + word + '", actually equals "' + testvalue + '"');
  }

  assertCurrency(12345.67, 'rupees twelve thousand three hundred forty five', true);
  assertCurrency(12345.67, 'rupees twelve thousand three hundred forty five and sixty seven paise', false);
  assertCurrency(12345.67, 'twelve thousand three hundred forty five rupees and sixty seven paise', false, true);
  assertCurrency(12345.67, 'twelve thousand three hundred forty five rupees and paise sixty seven', false, true, false);
  assertCurrency(12345.6785, 'twelve thousand three hundred forty five rupees and paise sixty eight', false, true, false);
  
  assertCurrency(12345, 'rupees twelve thousand three hundred forty five and zero paise', false);
  
  assertCurrency(0.00, 'rupees zero', true);
  assertCurrency(0.00, 'rupees zero and zero paise', false);
  assertCurrency(0, 'rupees zero and zero paise', false);
  assertCurrency(0.15, 'rupees zero and fifteen paise', false);
  
  
  assertCurrency(0.00, '', true, false, true, true, true);
  assertCurrency(0.00, 'zero paise', false, false, true, true, false);
  assertCurrency(0, 'zero paise', false, false, true, true, false);
  assertCurrency(0, '', false, false, true, true, true);
  assertCurrency(0.15, 'fifteen paise', false, false, true, true, false);
  assertCurrency(0.15, 'fifteen paise', false, false, true, true, true);
  
  
  
  //assertDecimalNumber(12345.67, 'twelve thousand three hundred forty five and sixty seven');
  //assertDecimalNumber(12345.6785, 'twelve thousand three hundred forty five and sixty eight');
})();