# whenDefined.js
A simple way to check object/ library/ function availability and trigger promises. Uses jQuery promises.

Dead-easy usage:
  ```javascript
  whenDefined(objectName).then(doSmth);
  whenDefined(objectName).then(doSmth, doSmthElse);
  whenDefined(objectName, functionNameMustReturnTrue).then(doSmth, doSmthElse);
  ```
Examples: </br>
```javascript
whenDefined("ko").then(function(){alert( "knockout.js is loaded"); });  
whenDefined("ko", "isOddMonth").then(function(){alert( "knockout.js is loaded and it is an odd month!"); });
 ```
