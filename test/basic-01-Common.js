(function basicCommonTests() {
  var tap = require('tap');
  var n = require('../numberstowords');

  function assertNumber(number, word)
  {
    var testvalue = n.toWords(number);
    tap.assert(testvalue === word, number + ' should equal "' + word + '", actually equals "' + testvalue + '"');
  }

  tap.comment("Testing zero");
  assertNumber(0, 'zero');

  tap.comment("Testing one through nineteen");
  assertNumber(1, 'one');
  assertNumber(2, 'two');
  assertNumber(3, 'three');
  assertNumber(4, 'four');
  assertNumber(5, 'five');
  assertNumber(6, 'six');
  assertNumber(7, 'seven');
  assertNumber(8, 'eight');
  assertNumber(9, 'nine');
  assertNumber(10, 'ten');
  assertNumber(11, 'eleven');
  assertNumber(12, 'twelve');
  assertNumber(13, 'thirteen');
  assertNumber(14, 'fourteen');
  assertNumber(15, 'fifteen');
  assertNumber(16, 'sixteen');
  assertNumber(17, 'seventeen');
  assertNumber(18, 'eighteen');
  assertNumber(19, 'nineteen');

  tap.comment('Smoke testing tweens');
  assertNumber(20, 'twenty');
  assertNumber(21, 'twenty one');
  assertNumber(22, 'twenty two');
  assertNumber(33, 'thirty three');
  assertNumber(44, 'forty four');
  assertNumber(55, 'fifty five');
  assertNumber(66, 'sixty six');
  assertNumber(77, 'seventy seven');
  assertNumber(88, 'eighty eight');
  assertNumber(99, 'ninety nine');

  tap.comment('Smoke testing hundreds');
  assertNumber(100, 'one hundred');
  assertNumber(101, 'one hundred one');
  assertNumber(119, 'one hundred nineteen');
  assertNumber(101, 'one hundred one');
  assertNumber(120, 'one hundred twenty');
  assertNumber(129, 'one hundred twenty nine');
  assertNumber(130, 'one hundred thirty');
  assertNumber(199, 'one hundred ninety nine');
  assertNumber(200, 'two hundred');
  assertNumber(999, 'nine hundred ninety nine');

  tap.comment('Smoke testing thousands');
  assertNumber(1000, 'one thousand');
  assertNumber(1001, 'one thousand one');
  assertNumber(1019, 'one thousand nineteen');
  assertNumber(1020, 'one thousand twenty');
  assertNumber(1021, 'one thousand twenty one');
  assertNumber(1099, 'one thousand ninety nine');
  assertNumber(1100, 'one thousand one hundred');
  assertNumber(1101, 'one thousand one hundred one');
  assertNumber(1199, 'one thousand one hundred ninety nine');
  assertNumber(1200, 'one thousand two hundred');
  assertNumber(1999, 'one thousand nine hundred ninety nine');
  assertNumber(2000, 'two thousand');
  assertNumber(10000, 'ten thousand');
  assertNumber(19000, 'nineteen thousand');
  assertNumber(19999, 'nineteen thousand nine hundred ninety nine');
  assertNumber(20000, 'twenty thousand');
  assertNumber(99999, 'ninety nine thousand nine hundred ninety nine');
})();