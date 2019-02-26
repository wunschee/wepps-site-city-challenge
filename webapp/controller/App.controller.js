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
			var that = this;
			sap.ui.require(["city/challenge/session/captcha"], function (captcha) {
				var rCaptcha = captcha.customMethod();
				that.byId("generateCaptcha").setValue(rCaptcha);
			});
		},
		
		onLogin: function () {
			debugger;
			var Input1 = this.byId("generateCaptcha").getValue();
			var Input2 = this.byId("captchaCheck").getValue();
			if (Input2 === "") {
				MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("Message.app.enter"));
			} else if (Input1 === Input2) {
				MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("Message.app.valid"));
				var that = this;
				sap.ui.require(["city/challenge/session/captcha"], function (captcha) {
					var captchaCorrect = captcha.customMethod();
					that.byId("generateCaptcha").setValue(captchaCorrect);
				});
				this.byId("captchaCheck").setValue("");
				// Captcha validated, continue login
				var firstName = this.getView().byId("inputFirstname").getValue();
				var lastName = this.getView().byId("inputLastname").getValue();
				// var age = this.getView().byId("input_age").getValue();
				var age = 38;
				WEPPS.submitPerson(firstName, lastName, age);
				// Clear fields
				this.getView().byId("inputFirstname").setValue();
				this.getView().byId("inputLastname").setValue();
				// Navigation
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("challenge");
			} else {
				MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("Message.app.notvalid"));
				var that = this;
				sap.ui.require(["city/challenge/session/captcha"], function (captcha) {
					var captchaWrong = captcha.customMethod();
					that.byId("generateCaptcha").setValue(captchaWrong);
				});
				this.byId("captchaCheck").setValue("");
			}
		}
	});
});