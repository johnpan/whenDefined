(function (window, jQuery) {
	"use strict";

	var
	whenDefined,
	whenDefined_version = "0.0.2";

	function check(o, f) {
		if (f) {
			if ((o === true || eval("window." + o)) && 'function' == typeof eval("window." + f) && eval("window." + f + "();"))
				return true;
		} else {
			if (eval("window." + o))
				return true;
		}
		return false;
	}

	function checkDefinitions() {
		var lengthBeforeCheck = whenDefined_promises.length;
		// check resolve/reject
		var checkedPromisesArr = whenDefined_promises.filter(function (promiseContainer) {
				var obj = promiseContainer.tests[0];
				var fn = promiseContainer.tests[1];
				if (check(obj, fn)) {
					// console.log("resolving: " + obj)
					whenDefined_promises
					.findObjects("library", obj)[0]
					.promiseInstance
					.resolve(true);
				} else if (Date.now() - promiseContainer.requestedAt > window.whenDefined_timeOutLimit) {
					whenDefined_promises
					.findObjects("library", obj)[0]
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
				// say("pushed missed: " + whenDefined_promises[i].library)
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
			// say("initializing whenDefined");
			if (!Array.prototype.findObjects) {
				Array.prototype.findObjects = function (prop, val) {
					// function returns an array with the found object(s) or an empty array
					// needs optimization. Add a parameter for exact much OR indexOf
					if (!this || !this[0])
						return [];
					if (!this[0][prop]) {
						console.log("no such property");
						return [];
					}
					return this.filter(function (pairItem) {
						if (pairItem[prop] == val)
							return true;
						if (pairItem[prop].indexOf(val) > -1)
							return true;
					});
				}
			}
			window.whenDefined_promises = [];
			window.whenDefined_loadingTimeout = 0;
			window.whenDefined_timeOutLimit = 1 * minute + 30 * second;
			window.whenDefined_checkDefinitions = checkDefinitions;
			whenDefined_loadingTimeout = setInterval(whenDefined_checkDefinitions, 500);
		}

		// init array of promises if not there
		if (!window.whenDefined_promises)
			init();
		// look for stored promise request
		var promiseContainer = whenDefined_promises.findObjects("library", thisPromiseRequest.library)[0];
		if (promiseContainer) {
			// found promise so just return it
			return promiseContainer.promiseInstance.promise();
		} else {
			// push promise request and return promise()
			thisPromiseRequest.promiseInstance = new $.Deferred();
			// say("pushing:",thisPromiseRequest)
			whenDefined_promises.push(thisPromiseRequest);
			return thisPromiseRequest.promiseInstance.promise();
		}
	}

	// liberate / expose to scope
	window.whenDefined = whenDefined;
}
	(window, jQuery));
