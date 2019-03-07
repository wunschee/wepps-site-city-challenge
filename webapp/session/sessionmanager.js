// SessionManager
(function (WEPPS, $, undefined) {
	WEPPS.SessionManager = function () {};

	WEPPS.SessionManager.getPerson = function (key) {
		var person;
		// Get item over SessionStorage API
		var personStorage = sessionStorage.getItem(key);
		if (personStorage) {
			// Parse JSON to object
			personStorage = JSON.parse(personStorage);
			// Create new object
			person = new WEPPS.Person(personStorage.captcha);
		}
		return person;
	};
	
	WEPPS.SessionManager.setPerson = function(key, person) {
		if (person) {
			// Serialize Object to JSON
			var personStorage = JSON.stringify(person);
			// Set item over SessionStorage API
			sessionStorage.setItem(key, personStorage);
		}
	};
	
	WEPPS.SessionManager.clearPerson = function() {
		sessionStorage.removeItem("person");
	};
} (window.WEPPS = window.WEPPS || {}, jQuery));