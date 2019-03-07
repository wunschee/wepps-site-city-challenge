// Captcha
(function (WEPPS, $, undefined) {
	WEPPS.Captcha = function () {};

	WEPPS.Captcha.getCaptcha = function () {
		var alpha = new Array("A", "B", "C", "D", "E", "F", "G","H", "I", "J",
			"K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
			"U", "V", "W","X", "Y", "Z", "a", "b", "c", "d",
			"e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
			"o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z");
		var i;
		for (i = 0; i < 6; i++) {
			var a = alpha[Math.floor(Math.random() * alpha.length)];
		        var b = Math.ceil(Math.random() * 10) + "";
			var c = alpha[Math.floor(Math.random() * alpha.length)];
			var d = alpha[Math.floor(Math.random() * alpha.length)];
			var e = Math.ceil(Math.random() * 10) + "";
			var f = alpha[Math.floor(Math.random() * alpha.length)];
			var g = alpha[Math.floor(Math.random() * alpha.length)];
		}
		var code = a + " " + b + " " + " " + c + " " + d + " " + e + " " + f + " " + g;
		var bCode = code.split(" ").join("");
		return bCode;
	};
} (window.WEPPS = window.WEPPS || {}, jQuery));