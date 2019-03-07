sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("city.challenge.controller.App", {
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("app").attachPatternMatched(this._onObjectMatched, this);
		},
		
		_onObjectMatched: function (oEvent) {
			this.onRefresh();
		},
		
		onRefresh: function () {
			var rCaptcha = WEPPS.readCaptcha();
			this.byId("generateCaptcha").setValue(rCaptcha);
		},
		
		onLogin: function () {
			// debugger;
			var Input1 = this.byId("generateCaptcha").getValue();
			var Input2 = this.byId("captchaCheck").getValue();
			if (Input2 === "") {
				MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("Message.app.enter"));
			} else if (Input1 === Input2) {
				// MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("Message.app.valid"));
				var captchaCorrect = WEPPS.readCaptcha();
				this.byId("generateCaptcha").setValue(captchaCorrect);
				this.byId("captchaCheck").setValue("");
				// Captcha validated, continue login
				WEPPS.submitPerson(Input2);
				// Navigation
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("challenge");
			} else {
				MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("Message.app.notvalid"));
				var captchaWrong = WEPPS.readCaptcha();
				this.byId("generateCaptcha").setValue(captchaWrong);
				this.byId("captchaCheck").setValue("");
			}
		}
	});
});