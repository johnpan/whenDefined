# whenDefined

Dead-easy usage:
  ```javascript
  whenDefined(objectName).then(doSmth);
  whenDefined(objectName).then(doSmth, doSmthElse);
  whenDefined(objectName, functionNameMustReturnTrue).then(doSmth, doSmthElse);
  ```
Examples: </br>
whenDefined("ko").then(function(){alert( "knockout.js is loaded"); }); <br/>
whenDefined("ko", "isOddMonth").then(function(){alert( "knockout.js is loaded and it is an odd month!"); });

