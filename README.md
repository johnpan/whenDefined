# whenDefined.js
A simple way to check object/ library/ function availability and trigger promises. With the <i>second parameter</i> one can ensure that the promise resolves only if a method returns true. Uses jQuery promises.

Dead-easy usage:
  ```javascript
  whenDefined(objectName).then(doSmth);
  whenDefined(objectName).then(doSmth, doSmthElse);
  whenDefined(objectName, functionNameMustReturnTrue).then(doSmth, doSmthElse);
  ```
Examples: </br>
```javascript
whenDefined("ko").then(function(){alert( "knockout.js is loaded"); }); 
whenDefined("myLibrary", "myLibrary.isOddMonth").then(function(){alert( "myLibrary is loaded & it's an odd month"); });
```

You can group promises as usual, using $.when
```javascript
$.when( whenDefined("coolLibrary"), whenDefined("niceLibrary") ).then(doSmthFn);
```

You can bind promises with nested syntax
```javascript
whenDefined("obj6").then (
  function () { whenDefined("obj5").then(
    sayok
  )}
);
```
