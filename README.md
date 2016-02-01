# whenDefined.js
A simple way to check object/ library/ function availability and trigger promises. With the second parameter one can ensure that the promise resolves only if a method returns true. Uses jQuery promises.

Dead-easy usage:
  ```javascript
  whenDefined(objectName).then(doSmth);
  whenDefined(objectName).then(doSmth, doSmthElse);
  whenDefined(objectName, functionNameMustReturnTrue).then(doSmth, doSmthElse);
  ```
Examples: </br>
```javascript
whenDefined("ko").then(function(){alert( "knockout.js is loaded"); }); 

whenDefined("myLibrary", "myLibrary.isOddMonth").then(function(){alert( "myLibrary is loaded and it is an odd month!"); });
 ```
