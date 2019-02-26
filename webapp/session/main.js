// All Controllers only call functions from this file
(function (WEPPS, $, undefined) {
	WEPPS.submitPerson = function (firstName, lastName, age) {
		debugger;
		// Create new object
		var person = new WEPPS.Person(firstName, lastName, age);
		// Call instance method
		person.log();
		// Write to SessionStorage
		WEPPS.SessionManager.setPerson("person", person);
	};
	
	WEPPS.readPerson = function () {
		debugger;
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