(function basicCasingTests() {
  var tap = require('tap');
  var n = require('../numberstowords');

  function assertWithCasing(number, word, opts)
  {
    opts = opts || {};
    opts.useOnlyWord = opts.useOnlyWord === undefined ? true : opts.useOnlyWord;
    var testvalue = n.toWords(number, opts);
    tap.assert(testvalue === word, number + ' should equal "' + word + '", actually equals "' + testvalue + '"');
  }

  assertWithCasing(1234, "one thousand two hundred thirty four only");
  assertWithCasing(1234, "one thousand two hundred and thirty four only", { useAnd : true });

  assertWithCasing(1234, "ONE THOUSAND TWO HUNDRED THIRTY FOUR ONLY", { useCase : 'upper' });
  assertWithCasing(1234, "ONE THOUSAND TWO HUNDRED AND THIRTY FOUR ONLY", { useAnd : true, useCase : 'upper' });

  assertWithCasing(1234,
                   "ONE THOUSAND TWO HUNDRED AND THIRTY FOUR POINT ZERO ZERO ONLY",
                   { useAnd : true, integerOnly : false, useCase : 'upper' });
  assertWithCasing(1234.25,
                   "ONE THOUSAND TWO HUNDRED AND THIRTY FOUR POINT TWO FIVE ONLY",
                   { useAnd : true, integerOnly : false, useCase : 'upper' });

  assertWithCasing(12.25,
                   "RUPEES TWELVE AND TWENTY FIVE PAISE ONLY",
                   { useAnd : true, integerOnly : false, useCurrency : true, useCase : 'upper' });

  assertWithCasing(0, "ZERO ONLY", { useCase : 'upper' });
  assertWithCasing(0, "ZERO POINT ZERO ZERO ONLY", { integerOnly : false, useCase : 'upper' });
  assertWithCasing(0, "POINT ZERO ZERO ONLY", { integerOnly : false, suppressMajorIfZero : true, useCase : 'upper' });
  assertWithCasing(
      0, "", { integerOnly : false, suppressMajorIfZero : true, suppressMinorIfZero : true, useCase : 'upper' });

  assertWithCasing(12.25,
                   "Rupees Twelve And Twenty Five Paise Only",
                   { useAnd : true, integerOnly : false, useCurrency : true, useCase : 'proper' });

  assertWithCasing(1234.25,
                   "One Thousand Two Hundred And Thirty Four Point Two Five Only",
                   { useAnd : true, integerOnly : false, useCase : 'proper' });

  assertWithCasing(0, "Zero Only", { useCase : 'proper' });
  assertWithCasing(0, "Zero", { useCase : 'proper', useOnlyWord : false });

  assertWithCasing(12.25,
                   "Rupees twelve and twenty five paise only",
                   { useAnd : true, integerOnly : false, useCurrency : true, useCase : 'sentence' });

})();