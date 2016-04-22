(function (window, jQuery) {
	"use strict";

	var
	whenDefined,
	whenDefined_version = "0.0.3";

	function checkDefinitions() {
		var lengthBeforeCheck = whenDefined_promises.length;
		// check resolve/reject
		var checkedPromisesArr = whenDefined_promises.filter(function (promiseContainer) {
				var obj = promiseContainer.tests[0];
				var fn = promiseContainer.tests[1];
				if (check(obj, fn)) {
					findObjects(whenDefined_promises, "library", obj)[0]
					.promiseInstance
					.resolve(true);
				} else if (Date.now() - promiseContainer.requestedAt > window.whenDefined_timeOutLimit) {
					findObjects(whenDefined_promises, "library", obj)[0]
					.promiseInstance
					.reject("timeout");
				} else {
					// allow pending request in array
					return true;
				}
				// return false to remove this promise from new array
				return false;
			});
		if (lengthBeforeCheck == whenDefined_promises.length) {
			// no changes to promises array while filtering
			whenDefined_promises = checkedPromisesArr;
		} else {
			// missed some promises while looping with map
			for (var i = lengthBeforeCheck; i < whenDefined_promises.length; i++) {
				checkedPromisesArr.push(whenDefined_promises[i]);
				//console.log("pushed missed: " + whenDefined_promises[i].library)
			}
			whenDefined_promises = checkedPromisesArr;
		}
		if (whenDefined_promises.length == 0) {
			// stop checking
			clearInterval(whenDefined_loadingTimeout);
			// force re-init next time
			whenDefined_promises = null;
		}
	}

	function findObjects(arr, prop, val) {
		// function returns an array with the found object(s) or an empty array
		if (!arr || !arr[0])
			return [];
		if (!arr[0][prop]) {
			// no such property
			return [];
		}
		return arr.filter(function (pairItem) {
			return (pairItem[prop] == val || pairItem[prop].indexOf(val) > -1);
		});
	}

	function whenDefined(mustExist, mustReturnTrue) {
		var
		second = 1000,
		minute = 60 * second,
		thisPromiseRequest = {
			requestedAt : Date.now(),
			library : mustExist,
			tests : [mustExist, mustReturnTrue],
			promiseInstance : null
		};

		function init() {
			// next two values are OK to modify
			window.whenDefined_timeOutLimit = 1 * minute + 30 * second;
			window.whenDefined_intervalCycle = 0.5 * second;
			//
			window.whenDefined_promises = [];
			window.whenDefined_loadingTimeout = 0;
			window.whenDefined_checkDefinitions = checkDefinitions;
			whenDefined_loadingTimeout = setInterval(whenDefined_checkDefinitions, window.whenDefined_intervalCycle);
		}

		// init array of promises if not there
		if (!window.whenDefined_promises)
			init();
		// look for stored promise request
		var promiseContainer = findObjects(whenDefined_promises, "library", thisPromiseRequest.library)[0];
		if (promiseContainer) {
			// found promise so just return it
			return promiseContainer.promiseInstance.promise();
		} else {
			// push promise request and return promise()
			thisPromiseRequest.promiseInstance = new $.Deferred();
			//console.log("pushing:", thisPromiseRequest)
			whenDefined_promises.push(thisPromiseRequest);
			return thisPromiseRequest.promiseInstance.promise();
		}
	}

	
	function isUndefined(objName) {
		return ("undefined" == typeof eval("window." + objName));
	}

	function check(obj, fn) {
		// obj must exist or must be True, fn must be function that retruns true
		if ((fn &&
				(obj === true || !isUndefined(obj)) &&
				'function' == typeof eval("window." + fn) &&
				eval("window." + fn + "();")) ||
			(!isUndefined(obj) &&
				!fn)) {
			return true;
		}
		return false;
	}
	
	// liberate / expose to scope
	window.whenDefined = whenDefined;
}
	(window, jQuery));
