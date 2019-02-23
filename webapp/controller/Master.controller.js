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
			// debugger;
			_routeId = parseInt(oEvent.getParameter("arguments").routeId);
			// Get all locations from model
			var oModel = this.getView().getModel("odata");
			var allLocations = oModel.getProperty("/locations");
			var aLocations = [];
			// Select out relevant locations
			allLocations.forEach(function (obj) {
				if (obj.type === "location" && obj.routeId === _routeId) {
					aLocations.push({
						locationId: obj.locationId,
						routeId: obj.routeId,
						name: obj.name,
						description: obj.description,
						type: obj.type,
						email: obj.email,
						image: obj.image,
						completed: obj.completed,
						lat: obj.lat,
						lng: obj.lng
					});
				}
			});
			// Set user location
			var oNewLocation = {
                "locationId": 0,
				"routeId": _routeId,
				"name": "User",
				"description": "User location",
				"type": "user",
				"email": "<a href='mailto:wunsch.peter@gmail.com'>eM@il</a>",
				"image": "images/fast_ship.png",
				"completed": false,
				"lat": 46.130400,
				"lng": 18.323200
        	};
        	aLocations.push(oNewLocation);
			var aRoutes = this.getView().getModel("odata").getData().routes;
			// Set flag image
			var oLocations = aLocations.map(function (oLocation) {
				oLocation.icon = this._getImage(oLocation.type);
				return oLocation;
			}.bind(this));
			// Set new model data
			this.getView().getModel("odata").setData({
				routes: aRoutes,
				locations: allLocations,
				userlocations: oLocations
			});
			// Location list binding
			var oLocationsList = this.getView().byId("places");
			oLocationsList.unbindAggregation("items");
			oLocationsList.bindAggregation("items", {
				path: "odata>/userlocations",
				filters: [
					new sap.ui.model.Filter({
						path: "type",
						operator: "EQ",
						value1: "location"
					})
				],
				template: this.oLocationsListTemplate
			});
		},
		
		_getImage: function (oType) {
			var sImage;
			if (oType === "user") {
				sImage = "/img/m1.png";
			} else {
				sImage = "/img/pinkball.png";
			}
			return jQuery.sap.getModulePath("openui5.googlemaps.themes." + "base") + sImage;
		},
		
		onNavBack: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("challenge");
		},
		
		handleListSelect: function (oEvent) {
            sap.ui.getCore().getEventBus().publish("listSelected", {
                context: oEvent.getParameter("listItem").getBindingContext("odata")
            });
            // Nav to detail / show detail / whatever
		    var oSplitApp = this.getView().getParent().getParent();
		    if (!sap.ui.Device.phone) {
				/* On phone there is no master-detail pair, 
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