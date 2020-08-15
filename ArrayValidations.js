sap.ui.define([
    "taxone/nfe/model/FluentValidator/PropertyValidator",
], function (PropertyValidator) {
    "use strict";
    return PropertyValidator.extend("taxone.nfe.model.FluentValidator.ArrayValidations", {
        constructor: function (objectValidator, propertyName, alias, contextName, condition, control) {
            PropertyValidator.call(this, objectValidator, propertyName, alias, contextName, condition, control);
        },
        //Validates if the array has no elements, is null or undefined.
        empty: function (customMessage) {
            let rule = (value) => value == null || value.length < 1;
            let message = customMessage || `${this._propertyDescription()} must be empty`;
            this._addValidationRule(rule, message);
            return this;
        },
        //Validates if the array has length equals to a given value.
        length: function (valueToCompare, customMessage) {
            let rule = (value) => value != null && value.length == valueToCompare;
            let message = customMessage || `${this._propertyDescription()} must have length: ${valueToCompare}`;
            this._addValidationRule(rule, message);
            return this;
        },
        //Validates if the array has length less than or equals to a given value.
        maximumLength: function (valueToCompare, customMessage) {
            let rule = (value) => value == null || value.length <= valueToCompare;
            let message = customMessage || `${this._propertyDescription()} is greater than maximum length: ${valueToCompare}`;
            this._addValidationRule(rule, message);
            return this;
        },
        //Validates if the array has length greater than or equals to a given value.
        minimumLength: function (valueToCompare, customMessage) {
            let rule = (value) => value != null && value.length >= valueToCompare;
            let message = customMessage || `${this._propertyDescription()} is less than minimum length: ${valueToCompare}`;
            this._addValidationRule(rule, message);
            return this;
        },
        //Validates if the array is NOT empty, null or undefined. 
        notEmpty: function (customMessage) {
            let rule = (value) => value != null && value.length > 0;
            let message = customMessage || `${this._propertyDescription()} can't be empty`;
            this._addValidationRule(rule, message);
            return this;
        }
    });
});