sap.ui.define(["jquery.sap.global"], function (jQuery) {
    "use strict";
	return {
		info: function(oV1, oV2, oV3, oV4) {
			// debugger;
			var str = jQuery('<div class="marker-info-win">' +
				'<div class="marker-inner-win"><span class="info-content">' +
				'<div style="float:left"><h1 class="marker-heading">' + oV1 + '</h1>' +
				'' + oV2 + '<br><br>' + oV3 + '</div><div style="float:right">' +
				'<img width="250px" src="' + oV4 + '">' +
				'</div></span></div></div>');
			return str[0].outerHTML;
		},
		getMarkerIcon: function() {
			return jQuery.sap.getModulePath("openui5.googlemaps.themes." + "base") + "/img/pinkball.png";
		},
		roleText: function (sStatus) {
			// debugger;
			var oModel = new sap.ui.model.resource.ResourceModel({
				bundleUrl: "i18n/i18n.properties"
			});
			var resourceBundle = oModel.getResourceBundle();
			switch (sStatus) {
				case true:
					return resourceBundle.getText("AdminRole");
				case false:
					return resourceBundle.getText("UserRole");
				default:
					return sStatus;
			}
		},
		roleColor: function (sStatus) {
			// debugger;
			switch (sStatus) {
				case true:
					return 3;
				case false:
					return 9;
				default:
					return sStatus;
			}
		},
		statusText: function (sStatus) {
			// debugger;
			switch (sStatus) {
				case "1":
					return sap.ui.core.Priority.None;
				case "2":
					return sap.ui.core.Priority.Medium;
				case "3":
					return sap.ui.core.Priority.None;
				case "4":
					return sap.ui.core.Priority.Low;
				case "5":
					return sap.ui.core.Priority.High;
				case "6":
					return sap.ui.core.Priority.High;
				default:
					return sStatus;
			}
		},
		productstatusText: function (sStatus) {
			var oModel = new sap.ui.model.resource.ResourceModel({
				bundleUrl: "i18n/i18n.properties"
			});
			var resourceBundle = oModel.getResourceBundle();
			switch (sStatus) {
				case "A":
					return resourceBundle.getText("productStatusA");
				case "B":
					return resourceBundle.getText("productStatusB");
				case "C":
					return resourceBundle.getText("productStatusC");
				default:
					return sStatus;
			}
		}
	};
});