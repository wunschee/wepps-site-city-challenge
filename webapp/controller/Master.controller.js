sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	var _routeId;

	return Controller.extend("city.challenge.controller.Master", {
		onInit: function () {
			// debugger;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("root").attachPatternMatched(this._onObjectMatched, this);
			this.list = this.byId("places");
            sap.ui.getCore().getEventBus().subscribe("placeSelected", this.onPlaceSelected, this);
        	this.oLocationsListTemplate = new sap.m.StandardListItem({
                title: "{odata>name}",
                description: "{odata>description}",
                icon: "./googlemaps/themes/base/img/pinkball.png"
            });
		},
		
		_onObjectMatched: function (oEvent) {
			debugger;
			_routeId = parseInt(oEvent.getParameter("arguments").routeId);
			var oLocationsList = this.getView().byId("places");
			oLocationsList.unbindAggregation("items");
			oLocationsList.bindAggregation("items", {
				path: "odata>/locations",
				filters: [
					new sap.ui.model.Filter({
						path: "routeId",
						operator: "EQ",
						value1: _routeId
					}),
					new sap.ui.model.Filter({
						path: "type",
						operator: "EQ",
						value1: "location"
					})
				],
				template: this.oLocationsListTemplate
			});
		},
		
		onNavBack: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("challenge");
		},
		
		handleListSelect: function (oEvent) {
            sap.ui.getCore().getEventBus().publish("listSelected", {
                context: oEvent.getParameter("listItem").getBindingContext("odata")
            });
            // nav to detail / show detail / whatever
		    var oSplitApp = this.getView().getParent().getParent();
		    if (!sap.ui.Device.phone) {
				/* on phone there is no master-detail pair, 
				 but a single navContainer => so navigate within this navContainer: */
			    var oDetail = oSplitApp.getDetailPages()[0];
			    oSplitApp.toDetail(oDetail, "flip");
			} else {
				oSplitApp.showDetail();
			}
        },
        
        onPlaceSelected: function (sChannelId, sEventId, oData) {
            var that = this;
            this.list.getItems().forEach(function(item) {
                if (item.getTitle() === oData.location.name && that.list.getSelectedItem() !== item) {
                    that.list.setSelectedItem(item, true);
                }
            });
        }
	});
});