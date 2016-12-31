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
//    nine hundred and ninety nine million, nine hundred and ninety nine thousand, nine hundred and ninety nine
```

Note: As of version 0.1.0, numberstowords only works with integer numbers. Decimals are silently truncated.