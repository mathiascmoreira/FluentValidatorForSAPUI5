sap.ui.define([
    "taxone/nfe/model/FluentValidator/PropertyValidator"
], function (PropertyValidator) {
    "use strict";
    return PropertyValidator.extend("taxone.nfe.model.FluentValidator.DateValidations", {
        constructor: function(objectValidator, propertyName, alias, contextName, condition, control) {
            PropertyValidator.call(this, objectValidator, propertyName, alias, contextName, condition, control);
        },
        //Validates if the value is greater than or equals to a given date.
        greaterThenOrEqualsTo: function(dateToCompare, customMessage) {
            let rule = (date) => date >= dateToCompare;
            let message = customMessage || `${this._propertyDescription()} must be greater than or equal to ${dateToCompare}`;
            this._addValidationRule(rule, message);
            return this;
        },
        //Validates if the value is between two given dates, INCLUDING this dates.
        between: function(dateToCompare1, dateToCompare2, customMessage) {
            let rule = (date) => date >= dateToCompare1 && date <= dateToCompare2;
            let message = customMessage || `${this._propertyDescription()} must be between ${dateToCompare1} and ${dateToCompare2}`;
            this._addValidationRule(rule, message);
            return this;
        },
        //Validates if the value is less than or equals to a given date. 
        lessThenOrEqualsTo: function(dateToCompare, customMessage) {
            let rule = (date) => !date || date <= dateToCompare;
            let message = customMessage || `${this._propertyDescription()} must be less than or equal to ${dateToCompare}`;
            this._addValidationRule(rule, message);
            return this;
        }
    });
});