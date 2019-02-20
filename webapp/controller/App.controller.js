sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("city.challenge.controller.App", {
		onInit: function () {

		},
		
		onLogin: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Challenge");
		}
	});
});