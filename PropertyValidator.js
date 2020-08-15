sap.ui.define([
    "sap/ui/base/Object",
    "sap/ui/core/ValueState"
], function (Object, ValueState) {
    "use strict";
    return Object.extend("taxone.nfe.model.FluentValidator.PropertyValidator", {
        constructor(fluentValidator, propertyName, alias, contextName, conditions, control) {
            this._fluentValidator = fluentValidator;

            this._propertyName = propertyName;
            this._alias = alias;

            this._control = control;

            this._contextName = contextName;
            this._conditions = conditions;

            this._validationRules = [];            

            this._onlyFirstError = false;
        },
        onlyFirstError() {
            this._onlyFirstError = true;
            return this;
        },
        arrayProperty(propertyName, alias) {
            return this._fluentValidator.arrayProperty(propertyName, alias);
        },
        boolProperty(propertyName, alias) {
            return this._fluentValidator.boolProperty(propertyName, alias);
        },
        booleanProperty(propertyName, alias) {
            return this._fluentValidator.booleanProperty(propertyName, alias);
        },
        dateProperty(propertyName, alias) {
            return this._fluentValidator.dateProperty(propertyName, alias);
        },
        numberProperty(propertyName, alias) {
            return this._fluentValidator.numberProperty(propertyName, alias);
        },
        objectProperty(propertyName, alias) {
            throw new Error('NOT IMPLEMENTED');
        },
        stringProperty(propertyName, alias) {
            return this._fluentValidator.stringProperty(propertyName, alias);
        },
        validate(object, contexts) {
            if (!this._testConditions(object) || !this._testContexts(contexts))
                return;

            this._failures = [];

            let value = object[this._propertyName];

            this._validationRules.every(validationRule => {
                validationRule(value, object);

                return !this._onlyFirstError || !this._failures;
            });

            this._updateControlStatus();
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
                    this._fluentValidator._validationResult.failures.push(failure);
                    this._fluentValidator._validationResult.isValid = false;
                }
            }
            this._validationRules.push(validationRule);
        },
        _testConditions(object) {
            return this._conditions.every(condition => {
                return condition(object);
            })
        },
        _testContexts(contexts) {
            return !contexts || contexts.some(context => context === this._contextName)
        },
        _updateControlStatus() {
            if(this._failures.length){
                let messages = this._failures.reduce((message, failure) => message + `${failure.message}\n`, '');
           
                this._control.control.setValueState(ValueState.Error);
                this._control.control.setValueStateText(messages);
            }
        }
    });
});