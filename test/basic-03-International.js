(function basicIndianTests() {
  var tap = require('tap');
  var n = require('../numberstowords');

  function assertNumber(number, word)
  {
    var testvalue = n.toInternationalWords(number);
    tap.assert(testvalue === word, number + ' should equal "' + word + '", actually equals "' + testvalue + '"');
  }

  tap.comment('Smoke testing hundred thousands');
  assertNumber(100000, 'one hundred thousand');
  assertNumber(100001, 'one hundred thousand one');
  assertNumber(100019, 'one hundred thousand nineteen');
  assertNumber(100020, 'one hundred thousand twenty');
  assertNumber(100021, 'one hundred thousand twenty one');
  assertNumber(100099, 'one hundred thousand ninety nine');
  assertNumber(100100, 'one hundred thousand one hundred');
  assertNumber(100999, 'one hundred thousand nine hundred ninety nine');
  assertNumber(101000, 'one hundred one thousand');
  assertNumber(109999, 'one hundred nine thousand nine hundred ninety nine');
  assertNumber(110000, 'one hundred ten thousand');
  assertNumber(199999, 'one hundred ninety nine thousand nine hundred ninety nine');
  assertNumber(200000, 'two hundred thousand');
  assertNumber(999999, 'nine hundred ninety nine thousand nine hundred ninety nine');

  tap.comment('Smoke testing millions');
  assertNumber(1000000, 'one million');
  assertNumber(1090000, 'one million ninety thousand');
  assertNumber(1900000, 'one million nine hundred thousand');
  assertNumber(2000000, 'two million');
  assertNumber(2100000, 'two million one hundred thousand');
  assertNumber(9999999, 'nine million nine hundred ninety nine thousand nine hundred ninety nine');
  assertNumber(10000000, 'ten million');
  assertNumber(10010110, 'ten million ten thousand one hundred ten');
  assertNumber(10111110, 'ten million one hundred eleven thousand one hundred ten');
  assertNumber(11100110, 'eleven million one hundred thousand one hundred ten');
  assertNumber(99999999, 'ninety nine million nine hundred ninety nine thousand nine hundred ninety nine');
  assertNumber(100000000, 'one hundred million');
  assertNumber(999999999,
               'nine hundred ninety nine million nine hundred ninety nine thousand nine hundred ninety nine');

  tap.comment('Smoke testing billions');
  assertNumber(1000000000, 'one billion');
  assertNumber(1000090000, 'one billion ninety thousand');
  assertNumber(1000900000, 'one billion nine hundred thousand');
  assertNumber(2000000000, 'two billion');
  assertNumber(2000100000, 'two billion one hundred thousand');
  assertNumber(
      9999999999,
      'nine billion nine hundred ninety nine million nine hundred ninety nine thousand nine hundred ninety nine');
  assertNumber(10000000000, 'ten billion');
  assertNumber(10000010110, 'ten billion ten thousand one hundred ten');
  assertNumber(10000111110, 'ten billion one hundred eleven thousand one hundred ten');
  assertNumber(11000100110, 'eleven billion one hundred thousand one hundred ten');
  assertNumber(
      99999999999,
      'ninety nine billion nine hundred ninety nine million nine hundred ninety nine thousand nine hundred ninety nine');
  assertNumber(100000000000, 'one hundred billion');
  assertNumber(
      999999999999,
      'nine hundred ninety nine billion nine hundred ninety nine million nine hundred ninety nine thousand nine hundred ninety nine');

  tap.comment("Smoke testing a single trillion. My eyes hurt.");
  assertNumber(1000000000000, 'one trillion');

})();