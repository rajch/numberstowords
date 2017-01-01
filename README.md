# numberstowords

A javascript library to convert numbers to words. Supports both international and Indian convention.

## How to get it
### For browsers
Download the zip from github, and put the file numberstowords.js in your web site's js folder. Then, include it on an HTML page using a SCRIPT tag.

```html
<script src="js/numberstowords.js"></script>
```


### For node
Get it from npm using
```bash
npm install --save @rajch/numberstowords
```
Then, use it like so:

```javascript
var numberstowords = require('@rajch/numberstowords');
```
## How to use it
```javascript
var x = numberstowords.toIndianWords(123405); 
// x: one lakh twenty three thousand four hundred five

var x = numberstowords.toInternationalWords(123405);
// x: one hundred twenty three thousand four hundred five

var x = numberstowords.toIndianWords(123405, {useComma:true, useAnd:true});
// x: one lakh, twenty three thousand, four hundred and five

var x = numberstowords.toInternationalWords(123405, {useComma:true, useAnd:true});
// x: one hundred and twenty three thousand, four hundred and five

// Really large numbers
var x = numberstowords.toIndianWords(260000000000, {useComma:true, useAnd:true});
// x: twenty six thousand crore

var x = numberstowords.toInternationalWords(260000000000, {useComma:true, useAnd:true});
// x: nine hundred and ninety nine trillion, nine hundred and ninety nine billion, \
//    nine hundred and ninety nine million, nine hundred and ninety nine thousand, \
//    nine hundred and ninety nine

// Decimals are now allowed
var x = numberstowords.toIndianWords(26.67, {integerOnly:false});
// x: twenty six point six seven

// Rounded up to two decimal places only. 
var x = numberstowords.toIndianWords(26.6764, {integerOnly:false});
// x: twenty six point six eight

// You can use the 'currency format'
var x = numberstowords.toIndianWords(26.67, {
                                integerOnly:false, 
                                useCurrency: true,
                                majorCurrencySymbol: 'ringit',
                                minorCurrencySymbol: 'sen' });
// x: ringit twenty six and sixty seven sen

// With some control options
var x = numberstowords.toIndianWords(26.67, {
                                integerOnly:false, 
                                useCurrency: true,
                                majorCurrencySymbol: 'ringit',
                                minorCurrencySymbol: 'sen',
                                majorCurrencyAtEnd: true,
                                minorCurrencyAtEnd: false,
                                useOnlyWord: true,
                                useCase: 'proper' });
// x: Twenty Six Ringit And Sen Sixty Seven Only

// You can see all options and their default values
var x = numberstowords.options;
/* x: { useComma: false,
  useAnd: false,
  useOnlyWord: false,
  integerOnly: true,
  useCurrency: false,
  majorCurrencySymbol: 'rupees',
  minorCurrencySymbol: 'paise',
  majorCurrencyAtEnd: false,
  minorCurrencyAtEnd: true,
  suppressMajorIfZero: false,
  suppressMinorIfZero: false,
  useCase: 'lower' }
*/

// You can even change the default values.
numberstowords.options.useCurrency = true;
// Now all calls will return currency format by default
var x = numberstowords.toInternationalWords(24);
// x: rupees twenty four

// default values can be reset
 numberstowords.resetOptions();
 var x = numberstowords.toInternationalWords(24);
 // x: twenty four

```

Better documentation is in the pipeline :).
