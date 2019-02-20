sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	var _routeId;

	return Controller.extend("city.challenge.controller.Master", {
		onInit: function () {
			debugger;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Root").attachPatternMatched(this._onObjectMatched, this);
			this.list = this.byId("places");
            sap.ui.getCore().getEventBus().subscribe("placeSelected", this.onPlaceSelected, this);
		},
		
		_onObjectMatched: function (oEvent) {
			debugger;
			_routeId = parseInt(oEvent.getParameter("arguments").routeId);
		},
		
		onNavBack: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Challenge");
		},
		
		handleListSelect: function (oEvent) {
            sap.ui.getCore().getEventBus().publish("listSelected", {
                context: oEvent.getParameter("listItem").getBindingContext()
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