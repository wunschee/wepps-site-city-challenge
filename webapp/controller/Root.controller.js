sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("city.challenge.controller.Root", {
		onInit: function () {
			/*this.oRoot = this.getView().byId("idRoot");
			// Use this controller for child view navigation
			var that = this;
			this.oRoot.getMasterPages().forEach(function (oPage) {
				oPage.getController().navigation = that;
			});*/
		}
	});
});