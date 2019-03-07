sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function (Controller, MessageBox) {
	"use strict";

	return Controller.extend("city.challenge.controller.Challenge", {
		onInit: function () {
			this.oPage = this.byId("page1");
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("challenge").attachPatternMatched(this._onObjectMatched, this);
			this.oRoutesListTemplate = new sap.m.StandardListItem({
                title: "{odata>name}",
                description: "{odata>description}",
                icon: "./googlemaps/themes/base/img/pinkball.png"
            });
		},
		
		_onObjectMatched: function (oEvent) {
			// debugger;
			var person = WEPPS.readPerson();
			if (!person) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("app");
			}
			this.oPage.setTitle(this.getView().getModel("i18n").getResourceBundle().getText("challengeTitle") + "_" + person.captcha);
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
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			var m1 = this.getView().getModel("i18n").getResourceBundle().getText("Message.challenge.navback");
			var that = this;
			MessageBox.warning(m1, {
				actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
				styleClass: bCompact ? "sapUiSizeCompact" : "",
				onClose: function(sAction) {
					if (sAction === sap.m.MessageBox.Action.OK) {
						WEPPS.clearPerson();
						var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
						oRouter.navTo("app");
					}
				}
			});
		}
	});
});