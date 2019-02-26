// Model Person
(function (WEPPS, $, undefined) {
	// Constructor
	WEPPS.Person = function (firstName, lastName, age) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
	};
	
	WEPPS.Person.constructor = WEPPS.Person;
	
	// Sample instance method
	WEPPS.Person.prototype.log = function () {
		console.log(this.firstName + " " + this.lastName + ", " + this.age + " years");
	};
} (window.WEPPS = window.WEPPS || {}, jQuery));