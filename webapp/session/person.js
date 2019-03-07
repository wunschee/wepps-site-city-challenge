// Model Person
(function (WEPPS, $, undefined) {
	// Constructor
	WEPPS.Person = function (captcha) {
		this.captcha = captcha;
	};
	
	WEPPS.Person.constructor = WEPPS.Person;
	
	// Sample instance method
	WEPPS.Person.prototype.log = function () {
		console.log(this.captcha);
	};
} (window.WEPPS = window.WEPPS || {}, jQuery));