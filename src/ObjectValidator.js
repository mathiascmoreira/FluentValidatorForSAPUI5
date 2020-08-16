sap.ui.define([
    "sap/ui/base/Object",
    "sap/ui/core/ValueState",
    "./RulesForArrays",
    "./RulesForBooleans",
    "./RulesForDates",
    "./RulesForNumbers",
    "./RulesForStrings",
], function (Object, ValueState, RulesForArrays, RulesForBooleans, RulesForDates, RulesForNumbers, RulesForStrings) {
    "use strict";
    return Object.extend("ObjectValidator", {
        constructor: function (controls) {
            this._contextName = '';
            this._conditions = [];
            this._controls = controls || [];
            this._onlyFirstFailure = false;
            this._propertyRules = [];
        },

        array(propertyName, alias) {
            return this._addPropertyRule(RulesForArrays, propertyName, alias);
        },

        bool(propertyName, alias) {
            return this._addPropertyRule(RulesForBooleans, propertyName, alias);
        },

        boolean(propertyName, alias) {
            return this._addPropertyRule(RulesForBooleans, propertyName, alias);
        },

        date(propertyName, alias) {
            return this._addPropertyRule(RulesForDates, propertyName, alias);
        },

        number(propertyName, alias) {
            return this._addPropertyRule(RulesForNumbers, propertyName, alias);
        },

        string(propertyName, alias) {
            return this._addPropertyRule(RulesForStrings, propertyName, alias);
        },

        onlyFirstFailure() {
            this._onlyFirstFailure = true;
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
            this._propertyRules.every(propertyRule => {
                propertyRule.validate(object, contexts);
                return !this._onlyFirstFailure || this._validationResult.isValid;
            });
            return this._validationResult;
        },

        clearControlsStatus() {
            this._controls.map(control => control.control.setValueState(ValueState.None));
        },

        _addPropertyRule(rulesType, propertyName, alias) {
            let control = this._getAssossiatedControl(propertyName);
            let propertyRule = new rulesType(this, propertyName, alias, this._contextName, [...this._conditions], control);
            this._propertyRules.push(propertyRule);
            return propertyRule;
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