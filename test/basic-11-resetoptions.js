(function basicResetOptionsTests() {
  var tap = require('tap');
  var n = require('../numberstowords');
  
  function assertWithSettings(t, number, word)
  {
    var testvalue = n.toWords(number);
    t.assert(testvalue === word, number + ' should equal "' + word + '", actually equals "' + testvalue + '"');
  }
  
  var test1 = tap.test("Setting and resetting options", function(t) {
    n.words.smallAmountWords['hundred'] = 'sau';
    n.words.smallAmountWords['thousand'] = 'hajjar';
    n.words.unitWords[1] = 'ek';
    n.words.andWord = 'aur';
    n.options.useAnd = true;
    
    assertWithSettings(t, 1201, 'ek hajjar two sau aur ek');
    assertWithSettings(t, 12001, 'twelve hajjar aur ek');
    
    n.resetOptions();
    
    assertWithSettings(t, 1200, 'one thousand two hundred');
    assertWithSettings(t, 12001, 'twelve thousand one');
    
    t.end();
  });
  
})();