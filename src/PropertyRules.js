sap.ui.define([
    "sap/ui/base/Object",
    "sap/ui/core/ValueState"
], function (Object, ValueState) {
    "use strict";
    return Object.extend("PropertyRules", {
        constructor(objectValidator, propertyName, alias, contextName, conditions, control) {
            this._objectValidator = objectValidator;
            this._propertyName = propertyName;
            this._alias = alias;
            this._control = control;
            this._contextName = contextName;
            this._conditions = conditions;
            this._validationRules = [];
            this._onlyFirstFailure = false;
        },

        onlyFirstFailure() {
            this._onlyFirstFailure = true;
            return this;
        },

        array(propertyName, alias) {
            return this._objectValidator.array(propertyName, alias);
        },

        bool(propertyName, alias) {
            return this._objectValidator.bool(propertyName, alias);
        },

        boolean(propertyName, alias) {
            return this._objectValidator.boolean(propertyName, alias);
        },

        date(propertyName, alias) {
            return this._objectValidator.date(propertyName, alias);
        },

        number(propertyName, alias) {
            return this._objectValidator.number(propertyName, alias);
        },

        string(propertyName, alias) {
            return this._objectValidator.string(propertyName, alias);
        },

        validate(object, contexts) {
            if (this._checkConditions(object) && this._checkContexts(contexts)) {
                let value = object[this._propertyName];
                this._failures = [];
                this._validationRules.every(validation => {
                    validation(value, object);
                    return !this._onlyFirstFailure || !this._failures.length;
                });
                this._updateControlStatus();
            }
        },

        _propertyDescription() {
            return this._alias || this._propertyName;
        },

        _addValidationRule(rule, message) {
            let validationRule = (value, object) => {
                if (!rule(value, object)) {
                    let failure = {
                        propertyName: this._propertyName,
                        alias: this._alias,
                        message: message
                    };
                    this._failures.push(failure);
                    this._objectValidator._validationResult.failures.push(failure);
                    this._objectValidator._validationResult.isValid = false;
                }
            }
            this._validationRules.push(validationRule);
        },

        _checkConditions(object) {
            return this._conditions.every(condition => {
                return condition(object);
            })
        },

        _checkContexts(contexts) {
            return (contexts || ['']).some(context => context === this._contextName)
        },

        _valueIsOfType(value, type) {
            return Object.prototype.toString.call(value) === `[object ${type}]`;
        },

        _valueIsNullOrUndefined(value) {
            return value == null;
        },

        _updateControlStatus() {
            if (this._failures.length) {
                let messages = this._failures.reduce((message, failure) => message + `${failure.message}\n`, '');
                this._control.control.setValueState(ValueState.Error);
                this._control.control.setValueStateText(messages);
            }
        }
    });
});