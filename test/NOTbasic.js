(function basicTests() {
  var tap = require('tap');
  var n = require('../numberstowords');

  function assertNumber(number, word)
  {
    tap.assert(n.toWords(number) === word, number + ' should equal "' + word + '", actually equals "' + n.toWords(number) + '"');
  }

  tap.pass("Testing framework initialized.");

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

  tap.comment('Smoke testing lakhs');
  assertNumber(100000, 'one lakh');
  assertNumber(100001, 'one lakh one');
  assertNumber(100019, 'one lakh nineteen');
  assertNumber(100020, 'one lakh twenty');
  assertNumber(100021, 'one lakh twenty one');
  assertNumber(100099, 'one lakh ninety nine');
  assertNumber(100100, 'one lakh one hundred');
  assertNumber(100999, 'one lakh nine hundred ninety nine');
  assertNumber(101000, 'one lakh one thousand');
  assertNumber(109999, 'one lakh nine thousand nine hundred ninety nine');
  assertNumber(110000, 'one lakh ten thousand');
  assertNumber(199999, 'one lakh ninety nine thousand nine hundred ninety nine');
  assertNumber(200000, 'two lakh');
  assertNumber(1000000, 'ten lakh');
  assertNumber(1900000, 'nineteen lakh');
  assertNumber(2000000, 'twenty lakh');
  assertNumber(2100000, 'twenty one lakh');
  assertNumber(9999999, 'ninety nine lakh ninety nine thousand nine hundred ninety nine');
  
  tap.comment('Smoke testing crores');
  assertNumber(10000000, 'one crore');
  assertNumber(10000001, 'one crore one');
  assertNumber(10000019, 'one crore nineteen');
  assertNumber(10000020, 'one crore twenty');
  assertNumber(10000021, 'one crore twenty one');
  assertNumber(10100000, 'one crore one lakh');
  assertNumber(10199999, 'one crore one lakh ninety nine thousand nine hundred ninety nine');
  assertNumber(11000000, 'one crore ten lakh');
  assertNumber(19999999, 'one crore ninety nine lakh ninety nine thousand nine hundred ninety nine');
  assertNumber(20000000, 'two crore');
  assertNumber(100000000, 'ten crore');
  assertNumber(190000000, 'nineteen crore');
  assertNumber(999999999, 'ninety nine crore ninety nine lakh ninety nine thousand nine hundred ninety nine');
  assertNumber(100000000, 'ten crore');
  assertNumber(190000000, 'nineteen crore');
  assertNumber(990000000, 'ninety nine crore');
  assertNumber(1000000000, 'one hundred crore');
  assertNumber(10000000000, 'one thousand crore');
  assertNumber(260000000000, 'twenty six thousand crore');
  assertNumber(1000000000000, 'one lakh crore');
  assertNumber(10000000000000, 'ten lakh crore');
  assertNumber(100000000000000, 'one crore crore');
  assertNumber(109990000000000, 'one crore nine lakh ninety nine thousand crore');
  
})();