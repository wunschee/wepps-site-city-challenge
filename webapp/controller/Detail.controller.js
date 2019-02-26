sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"city/challenge/model/formatter",
	"sap/m/MessageToast"
], function (Controller, formatter, MessageToast) {
	// "use strict";
	this.selectedLocation = null;
	this.pointReached = false;
	this._routeId = null;

	return Controller.extend("city.challenge.controller.Detail", {
		formatter: formatter,

		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("root").attachPatternMatched(this._onObjectMatched, this);
			sap.ui.getCore().getEventBus().subscribe("listSelected", this.onListSelected, this);
			this.util = openui5.googlemaps.MapUtils;
			this.oPage = this.byId("page1");
			this.oMap = this.byId("map1");
			this.showCurrentPos = false;
			this.showPolyline = false;
			this.geoId = 0;
			this.ochallengeActive = this.byId("challengeActive");
		},
		
		_onObjectMatched: function (oEvent) {
			// debugger;
			this._routeId = parseInt(oEvent.getParameter("arguments").routeId);
		},
		
		onAfterRendering: function () {
			var that = this;
			navigator.geolocation.getCurrentPosition(function (position) {
				var pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				var oModel = that.getView().getModel("odata");
				var sPath = oModel.getData().userlocations.length - 1;
				oModel.setProperty("/userlocations/" + sPath + "/lat", pos.lat);
				oModel.setProperty("/userlocations/" + sPath + "/lng", pos.lng);
			}, function () {
				MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("Message.map.notavailable"));
			}, {
				enableHighAccuracy: true,
				maximumAge: 10e3,
				timeout: 20e3
			});
		},

		onMapReady: function (oEvent) {
			// debugger;
			var that = this;
			if (this.selectedLocation === undefined) {
				// debugger;
				// Set map style
				this._styleMap();
				// Set initial location
				this.selectedLocation = this.getFirstNotCompletedLocation();
				this.setupPolylines();
				// Register button click event handling
				$(document).on("click", "#nextButton", function (event) {
				    that.onNextPressed();
				});
			}
			this.setLocation();
		},

		onNavBack: function () {
			// Nav to master / show master / whatever
			var oSplitApp = this.getView().getParent().getParent();
			if (!sap.ui.Device.phone) {
				/* On phone there is no master-detail pair, 
				 but a single navContainer => so navigate within this navContainer: */
				var oMaster = oSplitApp.getMasterPages()[0];
				oSplitApp.toMaster(oMaster, "flip");
			} else {
				oSplitApp.showMaster();
			}
		},
		
		isNextLocationAvailable: function () {
			var isAvailable;
			var aLocations = this.getView().getModel("odata").getData().userlocations;
			if (this.getFirstNotCompletedLocationIndex() < aLocations.length) {
				isAvailable = true;
			} else {
				isAvailable = false;
			}
			return isAvailable;
		},
		
		getFirstNotCompletedLocation: function () {
			// debugger;
			var aLocations = this.getView().getModel("odata").getData().userlocations;
			var oLocation;
			for (var i = 0; i < aLocations.length; i++) {
				if (aLocations[i].completed === false && aLocations[i].type === "location") {
					oLocation = aLocations[i];
					break;
				}
			}
			return oLocation;
		},
		
		getFirstNotCompletedLocationIndex: function () {
			var aLocations = this.getView().getModel("odata").getData().userlocations;
			var iIndex;
			for (var i = 0; i < aLocations.length; i++) {
				if (aLocations[i].completed === false && aLocations[i].type === "location") {
					iIndex = i;
					break;
				}
			}
			return iIndex;
		},
		
		setLocation: function (bPublish) {
			if (this.pointReached === true) {
				this.markerWindowOpen(this.selectedLocation);
			} else {
				this.markerSetPosition(this.selectedLocation);
			}
			sap.ui.getCore().getEventBus().publish("placeSelected", {
				location: this.selectedLocation
			});
		},
		
		markerSetPosition: function (oData) {
			var that = this;
			this.oMap.getMarkers().forEach(function (oMarker) {
				if (oMarker.getLat() === oData.lat && oMarker.getLng() === oData.lng) {
					var result = /<h1\b[^>]*>(.*?)<\/h1>/.exec(oMarker.getInfo());
					that.oPage.setTitle(result[1]);
					that.oMap.map.setCenter(that.selectedLocation);
				} else {
					oMarker.infoWindowClose();
				}
				oMarker.removeListeners();                         
			});
		},

		markerWindowOpen: function (oData) {
			var that = this;
			this.oMap.getMarkers().forEach(function (oMarker) {
				if (oMarker.getLat() === oData.lat && oMarker.getLng() === oData.lng) {
					var result = /<h1\b[^>]*>(.*?)<\/h1>/.exec(oMarker.getInfo());
					that.oPage.setTitle(result[1]);
					if (that.ochallengeActive.getState() === true) {
						oMarker.infoWindowOpen();
					}
				} else {
					oMarker.infoWindowClose();
				}
			});
		},
		
		onNextPressed: function () {
			var oModel = this.getView().getModel("odata");
			oModel.setProperty("/userlocations/" + this.getFirstNotCompletedLocationIndex() + "/completed", true);
			this.pointReached = false;
			if (this.isNextLocationAvailable() === true) {
				this.selectedLocation = this.getFirstNotCompletedLocation();
				this.setLocation();
			} else {
				MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("Message.map.completed"));
			}
		},

		onListSelected: function (sChannelId, sEventId, oData) {
			this.pointReached = false;
			this.selectedLocation = oData.context.getObject();
			this.setLocation();
		},

		getPaths: function () {
			var aPaths = [];
			this.getView().getModel("odata").getData().userlocations.forEach(function (obj) {
				if (obj.type === "location") {
					aPaths.push({
						lat: obj.lat,
						lng: obj.lng
					});
				}
			});
			return aPaths;
		},

		setupPolylines: function () {
			if (this.oMap.getPolylines().length > 0) {
				return;
			}
			var lineSymbol = {
				path: "M 0,-1 0,1",
				strokeOpacity: 0.5,
				scale: 4
			};
			this.oMap.addPolyline(new openui5.googlemaps.Polyline({
				path: this.getPaths(),
				strokeColor: "#0000FF",
				strokeOpacity: 0.5,
				strokeWeight: 0.2,
				visible: this.showPolyline,
				icons: [{
					icon: lineSymbol,
					offset: "0",
					repeat: "20px"
				}]
			}));
		},

		onShowPolyline: function (oEvent) {
			this.showPolyline = !this.showPolyline;
			var that = this;
			if (this.oMap.getPolylines()) {
				this.oMap.getPolylines().forEach(function (oControl) {
					oControl.setVisible(that.showPolyline);
				});
			}
		},

		onShowCurrentPos: function (oEvent) {
			var that = this;
			this.showCurrentPos = !this.showCurrentPos;
			if (this.showCurrentPos === true) {
				if (this.selectedLocation !== this.getFirstNotCompletedLocation()) {
					this.selectedLocation = this.getFirstNotCompletedLocation();
					this.setLocation();
				}
				this.geoId = navigator.geolocation.watchPosition(function (position) {
					var pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};
					var oModel = that.getView().getModel("odata");
					var sPath = oModel.getData().userlocations.length - 1;
					oModel.setProperty("/userlocations/" + sPath + "/lat", pos.lat);
					oModel.setProperty("/userlocations/" + sPath + "/lng", pos.lng);
					// Check if location reached
					if (that.util.latLngEqual(pos, that.selectedLocation) === true) {
						that.pointReached = true;
						that.setLocation();
						navigator.geolocation.clearWatch(this.geoId);
						that.onShowCurrentPos(false);
						that.ochallengeActive.setState(false);
					} else {
						that.pointReached = false;
					}
				}, function () {
					MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("Message.map.notavailable"));
				}, {
					enableHighAccuracy: true,
					maximumAge: 10e3,
					timeout: 20e3
				});
			} else {
				navigator.geolocation.clearWatch(this.geoId);
			}
		},

		_styleMap: function () {
			// Style the map
			var styledMapType = new google.maps.StyledMapType(this._aMapStyle);
			this.oMap.map.mapTypes.set("styled_map", styledMapType);
			this.oMap.map.setMapTypeId("styled_map");
		},

		_aMapStyle: [{
			"featureType": "administrative",
			"elementType": "geometry",
			"stylers": [{
				"visibility": "off"
			}]
		}, {
			"featureType": "administrative.land_parcel",
			"elementType": "labels",
			"stylers": [{
				"visibility": "off"
			}]
		}, {
			"featureType": "poi",
			"stylers": [{
				"visibility": "off"
			}]
		}, {
			"featureType": "poi",
			"elementType": "labels.text",
			"stylers": [{
				"visibility": "off"
			}]
		}, {
			"featureType": "road",
			"stylers": [{
				"visibility": "off"
			}]
		}, {
			"featureType": "road",
			"elementType": "labels.icon",
			"stylers": [{
				"visibility": "off"
			}]
		}, {
			"featureType": "road.local",
			"elementType": "labels",
			"stylers": [{
				"visibility": "off"
			}]
		}, {
			"featureType": "transit",
			"stylers": [{
				"visibility": "off"
			}]
		}]
	});
});