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
    this.words = {
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
      smallAmountWords : { "hundred" : 'hundred', "thousand" : 'thousand' },
      bigAmountWords : {
                         "lakh" : 'lakh',
                         "crore" : 'crore',
                         "million" : 'million',
                         "billion" : 'billion',
                         "trillion" : 'trillion'
                       },
      andWord : 'and'
    };

    this.options = { useComma : false, useAnd : false, integerOnly : true };

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

    function getSmallAmountWord(word, words)
    {
      return ' ' + words.smallAmountWords[word] + ' ';
    }

    function getBigAmountWord(word, words)
    {
      return ' ' + words.bigAmountWords[word] + ' ';
    }

    function useComma(value, opts, needsComma)
    {
      return opts.useComma && needsComma ? value.trim() + ", " : value;
    }

    function toHundreds(number, opts, words, needsAnd)
    {
      var value = number;
      var result = '';

      var hundredFactor = Math.trunc(value / 100);
      if(hundredFactor > 0) {
        result += toHundreds(hundredFactor, opts, words) + getSmallAmountWord('hundred', words);
        value = value % 100;
        needsAnd = true;
      }

      if(value > 19) {
        if(opts.useAnd && needsAnd) {
          result += (words.andWord + ' ');
          needsAnd = false;
        }
        var tenFactor = Math.trunc(value / 10);
        result += words.tenWords[tenFactor] + ' ';
        value = value % 10;
      }

      if(value > 0) {
        if(opts.useAnd && needsAnd) {
          result += (words.andWord + ' ');
          needsAnd = false;
        }
        result += words.unitWords[value] + ' ';
      }

      return result.trim();
    }

    function toIndianThousands(number, opts, words, needsComma)
    {
      var value = number;
      var result = '';
      var needsAnd = (value > 999);

      if(value > 9999999) {
        var croreFactor = Math.trunc(value / 10000000);

        result += toIndianThousands(croreFactor, opts, words) + getBigAmountWord('crore', words);
        value = value % 10000000;
        needsComma = true;
      }

      if(value > 99999) {
        result = useComma(result, opts, needsComma);
        var lakhFactor = Math.trunc(value / 100000);

        result += toIndianThousands(lakhFactor, opts, words) + getBigAmountWord('lakh', words);
        value = value % 100000;
        needsComma = true;
      }

      if(value > 999) {
        result = useComma(result, opts, needsComma);
        var thousandFactor = Math.trunc(value / 1000);

        result += toIndianThousands(thousandFactor, opts, words) + getSmallAmountWord('thousand', words);
        value = value % 1000;
        needsComma = true;
      }

      if(value !== 0) {
        if(opts.useComma && needsComma && value > 99 && value % 100 !== 0) {
          result = result.trim() + ', ';
        }
        result += toHundreds(value, opts, words, needsAnd);
      }

      return result.trim();
    }

    function toInternationalThousands(number, opts, words, needsComma)
    {
      var value = number;
      var result = '';
      var needsAnd = (value > 999);

      if(value > 999999999999) {

        var trillionFactor = Math.trunc(value / 1000000000000);

        result += toInternationalThousands(trillionFactor, opts, words) + getBigAmountWord('trillion', words);
        value = value % 1000000000000;
        needsComma = true;
      }

      if(value > 999999999) {
        result = useComma(result, opts, needsComma);
        var billionFactor = Math.trunc(value / 1000000000);

        result += toInternationalThousands(billionFactor, opts, words) + getBigAmountWord('billion', words);
        value = value % 1000000000;
        needsComma = true;
      }

      if(value > 999999) {
        result = useComma(result, opts, needsComma);
        var millionFactor = Math.trunc(value / 1000000);

        result += toInternationalThousands(millionFactor, opts, words) + getBigAmountWord('million', words);
        value = value % 1000000;
        needsComma = true;
      }

      if(value > 999) {
        result = useComma(result, opts, needsComma);
        var thousandFactor = Math.trunc(value / 1000);

        result += toInternationalThousands(thousandFactor, opts, words) + getSmallAmountWord('thousand', words);
        value = value % 1000;
        needsComma = true;
      }

      if(value !== 0) {
        if(opts.useComma && needsComma && value > 99 && value % 100 !== 0) {
          result = result.trim() + ', ';
        }
        result += toHundreds(value, opts, words, needsAnd);
      }

      return result.trim();
    }

    this.toWords = function(number, opts) {
      opts = combineOpts(this.options, opts);

      var value = opts.integerOnly ? Math.trunc(number) : number;
      var result = '';

      if(value === 0) {
        result = this.words.unitWords[0];
      } else {
        if(opts.useIndianStyle) {
          result = toIndianThousands(value, opts, this.words, false);
        } else {
          result = toInternationalThousands(value, opts, this.words, false);
        }
      }

      return result.trim();
    };

    this.toIndianWords = function toIndianWords(number, opts) {
      opts = opts || {};
      opts.useIndianStyle = true;
      return this.toWords(number, opts);
    };

    this.toInternationalWords = function toInternationalWords(number, opts) {
      opts = opts || {};
      opts.useIndianStyle = false;
      return this.toWords(number, opts);
    };
  }

  return new numberstowords();
});