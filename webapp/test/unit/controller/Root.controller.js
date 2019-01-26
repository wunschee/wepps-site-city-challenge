/*global QUnit*/

sap.ui.define([
	"city/challenge/controller/Root.controller"
], function (oController) {
	"use strict";

	QUnit.module("Root Controller");

	QUnit.test("I should test the Root controller", function (assert) {
		var oAppController = new oController();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});