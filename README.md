# whenDefined.js
A simple way to check object/ library/ function availability and trigger promises. Uses jQuery promises. Promises will be rejected after one and a half minutes, and you can change that by altering the <i>window.whenDefined_timeOutLimit</i> variable

Dead-easy usage:
  ```javascript
  whenDefined(objectName).then(doSmth);
  whenDefined(objectName).then(doSmth, doSmthElseOnFail);
  ```
  
With the <b>second parameter</b> you can ensure that the promise resolves only if a method returns true. 
  ```javascript
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
whenDefined("wheel").then (
  function () { whenDefined("car").then(
    buildCarFactory
  )}
);
```
