/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"city/challenge/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});