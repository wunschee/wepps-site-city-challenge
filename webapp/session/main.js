// All Controllers only call functions from this file
(function (WEPPS, $, undefined) {
	WEPPS.readCaptcha   = function () {
		// debugger;
		// Read captcha from random array
		var captcha = WEPPS.Captcha.getCaptcha();
		return captcha;
	};
	
	WEPPS.submitPerson = function (captcha) {
		// debugger;
		// Create new object
		var person = new WEPPS.Person(captcha);
		// Call instance method
		person.log();
		// Write to SessionStorage
		WEPPS.SessionManager.setPerson("person", person);
	};
	
	WEPPS.readPerson = function () {
		// debugger;
		// Read person from SessionStorage
		var person = WEPPS.SessionManager.getPerson("person");
		// If person is not null...
		if (person) {
			// Call instance method
			person.log();
		} else {
			// Show warning
		}
		return person;
	};
	
	WEPPS.clearPerson = function () {
		// Clear person from SessionStorage
		WEPPS.SessionManager.clearPerson();
		// Reload current location
		location.reload();
	};
} (window.WEPPS = window.WEPPS || {}, jQuery));