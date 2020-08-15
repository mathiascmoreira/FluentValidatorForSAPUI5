sap.ui.define([
    "sap/ui/base/Object",
    "sap/ui/core/ValueState",
    "taxone/nfe/model/FluentValidator/ArrayValidations",
    "taxone/nfe/model/FluentValidator/BooleanValidations",
    "taxone/nfe/model/FluentValidator/DateValidations",
    "taxone/nfe/model/FluentValidator/NumberValidations",
    "taxone/nfe/model/FluentValidator/StringValidations",
], function (Object, ValueState, ArrayValidations, BooleanValidations, DateValidations, NumberValidations, StringValidations) {
    "use strict";
    return Object.extend("taxone.nfe.model.FluentValidator.ObjectValidator", {
        constructor: function (controls) {
            this._contextName = '';
            this._conditions = [];

            this._controls = controls || [];

            this._onlyFirstError = false;

            this._propertyValidations = [];
        },
        arrayProperty: function () {
            return this._property(propertyName, alias, ArrayValidations);
        },
        boolProperty(propertyName, alias) {
            return this._property(propertyName, alias, BooleanValidations);
        },
        booleanProperty(propertyName, alias) {
            return this._property(propertyName, alias, BooleanValidations);
        },
        dateProperty(propertyName, alias) {
            return this._property(propertyName, alias, DateValidations);
        },
        numberProperty(propertyName, alias) {
            return this._property(propertyName, alias, NumberValidations);
        },
        stringProperty(propertyName, alias) {
            return this._property(propertyName, alias, StringValidations);
        },
        onlyFirstError() {
            this._onlyFirstError = true;
            return this;
        },
        context(contextName, rules) {
            this._contextName = contextName;
            rules();
            this._contextName = '';
            return this;
        },
        condition(condition, rules) {
            this._conditions.push(condition);
            rules();
            this._conditions.pop();
            return this;
        },   
        validate(object, contexts) {
            this.clearControlsStatus();
            this._validationResult = this._validationSuccess();

            this._propertyValidations.every(propertyValidation => {
                propertyValidation.validate(object, contexts);

                return !this._onlyFirstError || !this._validationResult.isValid;
            });

            return this._validationResult;
        },     
        clearControlsStatus() {
            this._controls.map(control => control.control.setValueState(ValueState.None));
        },
        _property(propertyName, alias, validationType) {
            let control = this._getAssossiatedControl(propertyName);
            let validations = new validationType(this, propertyName, alias, this._contextName, [...this._conditions], control);
            this._propertyValidations.push(validations);
            return validations;
        },
        _getAssossiatedControl(propertyName) {
            return this._controls
                .find(control => control.propertyName == propertyName);
        },
        _validationSuccess() {
            return {
                isValid: true,
                failures: []
            };
        }
    });
});