(
    function(root, factory) {
      if(typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
      } else if(typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
      } else {
        // Browser globals (root is window)
        root.numberstowords = factory();
      }
    })(this, function() {

  function numberstowords()
  {
    this.options = {
      unitWords : [
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
                  ],
      tenWords : [ null, null, 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety' ],
      smallAmountWords : {
                           "hundred" : 'hundred',
                           "thousand" : 'thousand',

                         },
      bigAmountWords : {
                         "lakh" : 'lakh',
                         "crore" : 'crore',
                         "million" : 'million',
                         "billion" : 'billion',
                         "trillion" : 'trillion'
                       },
      useComma : false,
      useAnd : false
    };

    function combineOpts(opts1, opts2)
    {
      var result = {};
      if((!opts2) || opts2 === opts1) {
        result = opts1;
      } else {
        for(var prop in opts1) {
          if(!opts2[prop]) {
            result[prop] = opts1[prop];
          }
        }
        for(var prop in opts2) {
          result[prop] = opts2[prop];
        }
      }
      return result;
    }

    function getSmallAmountWord(word, opts)
    {
      return ' ' + opts.smallAmountWords[word] + ' ';
    }

    function getBigAmountWord(word, opts)
    {
      return ' ' + opts.bigAmountWords[word] + ' ';
    }
    
    function useComma(value, opts, needsComma) 
    {
      return opts.useComma && needsComma ? value.trim() +", " : value;
    }

    function toHundreds(number, opts, needsAnd)
    {
      var value = number;
      var result = '';

      var hundredFactor = Math.trunc(value / 100);
      if(hundredFactor > 0) {
        result += toHundreds(hundredFactor, opts) + getSmallAmountWord('hundred', opts);
        value = value % 100;
        needsAnd = true;
      }

      if(value > 19) {
        if(opts.useAnd && needsAnd) {
          result += 'and ';
          needsAnd = false;
        }
        var tenFactor = Math.trunc(value / 10);
        result += opts.tenWords[tenFactor] + ' ';
        value = value % 10;
      }

      if(value > 0) {
        if(opts.useAnd && needsAnd) {
          result += 'and ';
          needsAnd = false;
        }
        result += opts.unitWords[value] + ' ';
      }

      return result.trim();
    }

    function toIndianThousands(number, opts, needsComma)
    {
      var value = number;
      var result = '';
      var needsAnd = (value > 999);

      if(value > 9999999) {
        var croreFactor = Math.trunc(value / 10000000);

        result += toIndianThousands(croreFactor, opts) + getBigAmountWord('crore', opts);
        value = value % 10000000;
        needsComma = true;
      }

      if(value > 99999) {
        result = useComma(result, opts, needsComma);
        var lakhFactor = Math.trunc(value / 100000);

        result += toIndianThousands(lakhFactor, opts) + getBigAmountWord('lakh', opts);
        value = value % 100000;
        needsComma = true;
      }

      if(value > 999) {
        result = useComma(result, opts, needsComma);
        var thousandFactor = Math.trunc(value / 1000);

        result += toIndianThousands(thousandFactor, opts) + getSmallAmountWord('thousand', opts);
        value = value % 1000;
        needsComma = true;
      }

      if(value !== 0) {
        if(opts.useComma && needsComma && value >99 && value %100 !== 0) {
          result = result.trim() + ', ';
        }
        result += toHundreds(value, opts, needsAnd);
      }

      return result.trim();
    }

    function toInternationalThousands(number, opts, needsComma)
    {
      var value = number;
      var result = '';
      var needsAnd = (value > 999);

      if(value > 999999999999) {
        
        var trillionFactor = Math.trunc(value / 1000000000000);

        result += toInternationalThousands(trillionFactor, opts) + getBigAmountWord('trillion', opts);
        value = value % 1000000000000;
        needsComma = true;
      }

      if(value > 999999999) {
        result = useComma(result, opts, needsComma);
        var billionFactor = Math.trunc(value / 1000000000);

        result += toInternationalThousands(billionFactor, opts) + getBigAmountWord('billion', opts);
        value = value % 1000000000;
        needsComma = true;
      }

      if(value > 999999) {
        result = useComma(result, opts, needsComma);
        var millionFactor = Math.trunc(value / 1000000);

        result += toInternationalThousands(millionFactor, opts) + getBigAmountWord('million', opts);
        value = value % 1000000;
        needsComma = true;
      }

      if(value > 999) {
        result = useComma(result, opts, needsComma);
        var thousandFactor = Math.trunc(value / 1000);

        result += toInternationalThousands(thousandFactor, opts) + getSmallAmountWord('thousand', opts);
        value = value % 1000;
        needsComma = true;
      }

      if(value !== 0) {
        if(opts.useComma && needsComma && value >99 && value %100 !== 0) {
          result = result.trim() + ', ';
        }
        result += toHundreds(value, opts, needsAnd);
      }

      return result.trim();
    }

    this.toWords = function(number, opts) {
      opts = combineOpts(this.options, opts);
      var value = number;
      var result = '';
      if(value === 0) {
        result = 'zero ';
      } else {
        if(opts.useIndianStyle) {
          result = toIndianThousands(value, opts, false);
        } else {
          result = toInternationalThousands(value, opts, false);
        }
      }

      return result.trim();
    };

    this.toIndianWords = function toIndianWords(number, opts) {
      opts = combineOpts(this.options, opts);
      opts.useIndianStyle = true;
      return this.toWords(number, opts);
    };

    this.toInternationalWords = function toInternationalWords(number, opts) {
      opts = combineOpts(this.options, opts);
      opts.useIndianStyle = false;
      return this.toWords(number, opts);
    };
  }

  return new numberstowords();
});