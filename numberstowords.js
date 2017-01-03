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
    function defaultWords()
    {
      return {
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
        andWord : 'and',
        pointWord : 'point',
        onlyWord : 'only'
      };
    }

    function defaultOpts()
    {
      return {
        useComma : false,
        useAnd : false,
        useOnlyWord : false,
        integerOnly : true,
        useCurrency : false,
        majorCurrencySymbol : 'rupees',
        minorCurrencySymbol : 'paise',
        majorCurrencyAtEnd : false,
        minorCurrencyAtEnd : true,
        suppressMajorIfZero : false,
        suppressMinorIfZero : false,
        useCase : 'lower'
      };
    }

    this.words = defaultWords();
    this.options = defaultOpts();

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

    function getWord(word, words)
    {
      return words[word + 'Word'];
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

    function convertToWords(number, opts, words)
    {
      var value = number;
      var result = '';

      if(value === 0) {
        result = words.unitWords[0];
      } else {
        if(opts.useIndianStyle) {
          result = toIndianThousands(value, opts, words, false);
        } else {
          result = toInternationalThousands(value, opts, words, false);
        }
      }

      return result.trim();
    }

    function processCurrency(number, opts, words)
    {
      var result = '';

      var integerValue = Math.trunc(number);
      if(!(integerValue === 0 && opts.suppressMajorIfZero)) {
        var integerPart = convertToWords(integerValue, opts, words);

        if(!opts.majorCurrencyAtEnd) {
          result = opts.majorCurrencySymbol + ' ' + integerPart;
        } else {
          result = integerPart + ' ' + opts.majorCurrencySymbol;
        }
      }

      if(!opts.integerOnly) {
        var decimalValue = number - integerValue;
        decimalValue = Math.round(decimalValue * 100);

        if(!(decimalValue === 0 && opts.suppressMinorIfZero)) {
          var decimalPart = convertToWords(decimalValue, opts, words);

          if(result !== '') {
            result += ' ' + words.andWord + ' ';
          }

          if(opts.minorCurrencyAtEnd === false) {
            result += opts.minorCurrencySymbol + ' ' + decimalPart;
          } else {
            result += decimalPart + ' ' + opts.minorCurrencySymbol;
          }
        }
      }

      return result;
    }

    function processNumber(number, opts, words)
    {
      var result = '';

      var integerPart = Math.trunc(number);
      if(!(integerPart === 0 && opts.suppressMajorIfZero)) {
        result = convertToWords(integerPart, opts, words);
      }

      if(!opts.integerOnly) {
        var decimalPart = number - integerPart;
        decimalPart = (Math.round(decimalPart * 100) / 100);

        if(!(decimalPart === 0 && opts.suppressMinorIfZero)) {
          if(result !== '') {
            result += ' ';
          }

          result += words.pointWord + ' ';

          var decimalString = decimalPart.toFixed(2);

          var decimalWords = decimalString.split('').splice(2).map(function(digitString) {
            return words.unitWords[parseInt(digitString)]; // convertToWords(digitString, opts, words);
          }).join(' ');

          result += decimalWords.trim();
        }
      }
      return result;
    }

    this.toWords = function(number, opts) {
      opts = combineOpts(this.options, opts);
      var result = '';

      if(opts.useCurrency) {
        result = processCurrency(number, opts, this.words);
      } else {
        result = processNumber(number, opts, this.words);
      }

      if(opts.useOnlyWord && result !== '') {
        result += ' ' + getWord('only', this.words);
      }

      if(opts.useCase.toLowerCase() !== 'lower') {
        if(opts.useCase.toLowerCase() === 'upper') {
          result = result.toUpperCase();
        } else if(opts.useCase.toLowerCase() === 'proper') {
          result = result.split(' ').map(function properCase(element) {
            return element.charAt(0).toUpperCase() + element.substring(1);
          }).join(' ');
        } else if(opts.useCase.toLocaleLowerCase() === 'sentence') {
          result = result.charAt(0).toUpperCase() + result.substring(1);
        }
      }

      return result;
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

    this.resetOptions = function resetOptions() {
      this.words = defaultWords();
      this.options = defaultOpts();
    }
  }
  return new numberstowords();

});