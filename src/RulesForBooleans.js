sap.ui.define([
    "taxone/nfe/model/FluentValidator/PropertyValidator"
], function (PropertyValidator) {
    "use strict";
    return PropertyValidator.extend("taxone.nfe.model.FluentValidator.BooleanValidations", {
        constructor: function(objectValidator, propertyName, alias, contextName, condition, control) {
            PropertyValidator.call(this, objectValidator, propertyName, alias, contextName, condition, control);
        },
        //Validates if the value is false (strict).
        mustBeFalse: function(customMessage) {
            let rule = (value) => value === false;
            let message = customMessage || `${this._propertyDescription()} must be false`;
            this._addValidationRule(rule, message);
            return this;
        },
        //Validates if the value is a falsy value.
        mustBeFalsy: function(customMessage) {
            let rule = (value) => value ? false : true;
            let message = customMessage || `${this._propertyDescription()} must be falsy`;
            this._addValidationRule(rule, message);
            return this;
        },
        //Validates if the value is true (strict).
        mustBeTrue: function(customMessage) {
            let rule = (value) => value === true;
            let message = customMessage || `${this._propertyDescription()} must be true`;
            this._addValidationRule(rule, message);
            return this;
        },
        //Validates if the value is a truthy value.
        mustBeTruthy: function(customMessage) {
            let rule = (value) => value ? true : false;
            let message = customMessage || `${this._propertyDescription()} must be truthy`;
            this._addValidationRule(rule, message);
            return this;
        }
    });
});