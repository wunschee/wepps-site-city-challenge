sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("city.challenge.controller.Challenge", {
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("challenge").attachPatternMatched(this._onObjectMatched, this);
			this.oRoutesListTemplate = new sap.m.StandardListItem({
                title: "{odata>name}",
                description: "{odata>description}",
                icon: "./googlemaps/themes/base/img/pinkball.png"
            });
		},
		
		_onObjectMatched: function (oEvent) {
			debugger;
			var person = WEPPS.readPerson();
			this.getView().byId("inputFirstname").setText(person.firstName + " " + person.lastName + ", " + person.age + " years");
			var oRoutesList = this.getView().byId("routes");
			oRoutesList.unbindAggregation("items");
			oRoutesList.bindAggregation("items", {
				path: "odata>/routes",
				filters: [
					new sap.ui.model.Filter({
						path: "type",
						operator: "EQ",
						value1: "user"
					})
				],
				template: this.oRoutesListTemplate
			});
		},

		onGo: function () {
			// debugger;
			var oItem = this.getView().byId("routes");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("root", {
				routeId: oItem.getSelectedItems()[0].getBindingContext("odata").getProperty("routeId")
			});
		},

		onNavBack: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("app");
		}
	});
});