sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("city.challenge.controller.Challenge", {
		onInit: function () {

		},

		onGo: function () {
			// debugger;
			var oItem = this.getView().byId("routes");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("root", {
				routeId: oItem.getSelectedItems()[0].getBindingContext().getProperty("id")
			});
		},

		onNavBack: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("app");
		}
	});
});