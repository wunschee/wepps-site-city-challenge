sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"city/challenge/model/formatter",
	"sap/m/MessageToast"
], function (Controller, formatter, MessageToast) {
	// "use strict";

	return Controller.extend("city.challenge.controller.Detail", {
		formatter: formatter,

		onInit: function () {
			sap.ui.getCore().getEventBus().subscribe("listSelected", this.onListSelected, this);
			this.oPage = this.byId("page1");
			this.oMap = this.byId("map1");
			this.showCurrentPos = false;
			this.showPolyline = false;
			this.geoId = 0;
		},

		onMapReady: function (oEvent) {
			if (this.selectedLocation === undefined) {
				var aBeaches = this.getView().getModel().getData().locations;

				// set flag image
				var nBeaches = aBeaches.map(function (oBeach) {
					oBeach.icon = this._getImage();
					return oBeach;
				}.bind(this));

				this._styleMap();

				// this.selectedLocation = aBeaches[aBeaches.length - 1]; //Cronulla
				this.selectedLocation = aBeaches[0];
				this.getView().getModel().setData({
					locations: nBeaches
				});
				this.setupPolylines();
			}
			this.setLocation();
		},

		onNavBack: function () {
			// nav to master / show master / whatever
			var oSplitApp = this.getView().getParent().getParent();
			if (!sap.ui.Device.phone) {
				/* on phone there is no master-detail pair, 
				 but a single navContainer => so navigate within this navContainer: */
				var oMaster = oSplitApp.getMasterPages()[0];
				oSplitApp.toMaster(oMaster, "flip");
			} else {
				oSplitApp.showMaster();
			}
		},

		setLocation: function (bPublish) {
			this.markerWindowOpen(this.selectedLocation);
			sap.ui.getCore().getEventBus().publish("placeSelected", {
				location: this.selectedLocation
			});
		},

		markerWindowOpen: function (oData) {
			var that = this;
			this.oMap.getMarkers().forEach(function (oMarker) {
				if (oMarker.getLat() === oData.lat && oMarker.getLng() === oData.lng) {
					var result = /<h1\b[^>]*>(.*?)<\/h1>/.exec(oMarker.getInfo());
					that.oPage.setTitle(result[1]);
					oMarker.infoWindowOpen();
				} else {
					oMarker.infoWindowClose();
				}
			});
		},

		onListSelected: function (sChannelId, sEventId, oData) {
			this.selectedLocation = oData.context.getObject();
			this.setLocation();
		},

		onMarkerClick: function (oEvent) {
			this.selectedLocation = oEvent.getParameter("context").getObject();
			this.setLocation();
		},

		getPaths: function () {
			var aPaths = [];
			this.getView().getModel().getData().locations.forEach(function (obj) {
				aPaths.push({
					lat: obj.lat,
					lng: obj.lng
				});
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
			this.showCurrentPos = !this.showCurrentPos;
			if (this.showCurrentPos === true) {
				this.geoId = navigator.geolocation.watchPosition(function (position) {
					var pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};
					// alert('Location found.\nLat:' + pos.lat + '\nLng:' + pos.lng);
					MessageToast.show('Location found.\nLat:' + pos.lat + '\nLng:' + pos.lng);
					// this.oMap.setCenter(pos);
					/*debugger;
					if (this.selectedLocation.latitude === pos.latitude && this.selectedLocation.longitude === pos.longitude) {
    					MessageToast.show("Congratulations, you reached the target");
    					navigator.geolocation.clearWatch(this.geoId);
					}*/
				}, function () {
					// alert('Error: The Geolocation service failed.');
					MessageToast.show("Error: The Geolocation service failed.");
				}, {
					enableHighAccuracy: true,
					maximumAge: 10e3,
					timeout: 20e3
				});
			} else {
				navigator.geolocation.clearWatch(this.geoId);
			}
		},

		_getImage: function () {
			// return {
			// 	url: "./images/fast_ship.png",
			// 	size: new google.maps.Size(20, 32),
			// 	// The origin for this image is (0, 0).
			// 	origin: new google.maps.Point(0, 0),
			// 	// The anchor for this image is the base of the flagpole at (0, 32).
			// 	anchor: new google.maps.Point(0, 32)
			// };
			return jQuery.sap.getModulePath("openui5.googlemaps.themes." + "base") + "/img/pinkball.png";
		},

		_styleMap: function () {
			//style the map
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