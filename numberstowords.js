/*(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
  }
}(this, function () {*/

// Just return a value to define the module export.
// This example returns an object, but the module
// can return a function as the exported value.
function numberstowords()
{
  var unitWords = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen'
  ];

  var tenWords = [ null, null, 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety' ];

  function toHundreds(number)
  {
    var value = number;
    var result = '';

    var hundredFactor = Math.trunc(value / 100);
    if(hundredFactor > 0) {
      result += toHundreds(hundredFactor) + ' hundred ';
      value = value % 100;
    }

    if(value > 19) {
      var tenFactor = Math.trunc(value / 10);
      result += tenWords[tenFactor] + ' ';
      value = value % 10;
    }

    if(value > 0) {
      result += unitWords[value] + ' ';
    }

    return result.trim();
  }

  function toIndianThousands(number)
  {
    var value = number;
    var result = '';
    
    if(value > 9999999) {
      var croreFactor = Math.trunc(value / 10000000);
      
      result += toIndianThousands(croreFactor) + ' crore ';
      value = value % 10000000;
    }

    if(value > 99999) {
      var lakhFactor = Math.trunc(value / 100000);

      result += toIndianThousands(lakhFactor) + ' lakh ';
      value = value % 100000;
    }

    if(value > 999) {
      var thousandFactor = Math.trunc(value / 1000);

      result += toIndianThousands(thousandFactor) + ' thousand ';
      value = value % 1000;
    }

    result += toHundreds(value);

    return result.trim();
  }

  this.toWords = function(number) {
    var value = number;
    var result = '';
    if(value === 0) {
      result = 'zero '
    } else {

      result = toIndianThousands(value);
    }

    return result.trim();
  };
}

module.exports = new numberstowords();
/*    return numberstowords;
}));*/