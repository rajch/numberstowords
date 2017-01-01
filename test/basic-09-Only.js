(function basicOnlyTests() {
  var tap = require('tap');
  var n = require('../numberstowords');

  function assertWithOnly(number, word, opts)
  {
    opts = opts || {};
    opts.useOnlyWord = true;

    var testvalue = n.toWords(number, opts);
    tap.assert(testvalue === word, number + ' should equal "' + word + '", actually equals "' + testvalue + '"');
  }
  
  assertWithOnly(1234, "one thousand two hundred thirty four only");
  assertWithOnly(1234, "one thousand two hundred and thirty four only", {useAnd: true});
  assertWithOnly(1234, "one thousand two hundred and thirty four point zero zero only", {useAnd: true, integerOnly:false });
  assertWithOnly(1234.25, "one thousand two hundred and thirty four point two five only", {useAnd: true, integerOnly:false });
  
  assertWithOnly(12.25, "rupees twelve and twenty five paise only", {useAnd: true, integerOnly:false, showCurrency:true });
  
  assertWithOnly(0, "zero only");
  assertWithOnly(0, "zero point zero zero only", {integerOnly:false});
  assertWithOnly(0, "point zero zero only", {integerOnly:false, suppressMajorIfZero:true});
  assertWithOnly(0, "", {integerOnly:false, suppressMajorIfZero:true, suppressMinorIfZero:true});

})();