sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"city/challenge/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("city.challenge.Component", {

		metadata: {
			manifest: "json"
		},

		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}/*,
		
		createContent: function () {
            //create root view
            var oView = sap.ui.view({
                id: "idViewRoot",
                viewName: "city.challenge.view.Root",
                type: "XML",
                viewData: {
                    component: this
                }
            });
            // done
            return oView;
        }*/
	});
});