(function basicIndianTests() {
  var tap = require('tap');
  var n = require('../numberstowords');

  function assertNumber(number, word)
  {
    var testvalue = n.toIndianWords(number, {useAnd: true, useComma: true});
    tap.assert(testvalue === word,
               number + ' should equal "' + word + '", actually equals "' + testvalue + '"');
  }

  tap.comment('Smoke testing lakhs');
  assertNumber(100000, 'one lakh');
  assertNumber(100001, 'one lakh and one');
  assertNumber(100019, 'one lakh and nineteen');
  assertNumber(100020, 'one lakh and twenty');
  assertNumber(100021, 'one lakh and twenty one');
  assertNumber(100099, 'one lakh and ninety nine');
  assertNumber(100100, 'one lakh one hundred');
  assertNumber(100999, 'one lakh, nine hundred and ninety nine');
  assertNumber(101000, 'one lakh, one thousand');
  assertNumber(109999, 'one lakh, nine thousand, nine hundred and ninety nine');
  assertNumber(110000, 'one lakh, ten thousand');
  assertNumber(199999, 'one lakh, ninety nine thousand, nine hundred and ninety nine');
  assertNumber(200000, 'two lakh');
  assertNumber(1000000, 'ten lakh');
  assertNumber(1900000, 'nineteen lakh');
  assertNumber(2000000, 'twenty lakh');
  assertNumber(2100000, 'twenty one lakh');
  assertNumber(9999999, 'ninety nine lakh, ninety nine thousand, nine hundred and ninety nine');

  tap.comment('Smoke testing crores');
  assertNumber(10000000, 'one crore');
  assertNumber(10000001, 'one crore and one');
  assertNumber(10000019, 'one crore and nineteen');
  assertNumber(10000020, 'one crore and twenty');
  assertNumber(10000021, 'one crore and twenty one');
  assertNumber(10100000, 'one crore, one lakh');
  assertNumber(10199999, 'one crore, one lakh, ninety nine thousand, nine hundred and ninety nine');
  assertNumber(11000000, 'one crore, ten lakh');
  assertNumber(19999999, 'one crore, ninety nine lakh, ninety nine thousand, nine hundred and ninety nine');
  assertNumber(20000000, 'two crore');
  assertNumber(100000000, 'ten crore');
  assertNumber(190000000, 'nineteen crore');
  assertNumber(999999999, 'ninety nine crore, ninety nine lakh, ninety nine thousand, nine hundred and ninety nine');
  assertNumber(100000000, 'ten crore');
  assertNumber(190000000, 'nineteen crore');
  assertNumber(990000000, 'ninety nine crore');
  assertNumber(1000000000, 'one hundred crore');
  assertNumber(10000000000, 'one thousand crore');
  assertNumber(260000000000, 'twenty six thousand crore');
  assertNumber(1000000000000, 'one lakh crore');
  assertNumber(10000000000000, 'ten lakh crore');
  assertNumber(100000000000000, 'one crore crore');
  assertNumber(109990000000000, 'one crore, nine lakh, ninety nine thousand crore');

})();