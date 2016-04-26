"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getServiceConfig = getServiceConfig;
var SERVICE_CONFIG_COLLECTION = "meteor_accounts_loginServiceConfiguration";

function getServiceConfig(providerName) {
    try {
        return this.collections.get(SERVICE_CONFIG_COLLECTION).find(function (serviceConfig) {
            return serviceConfig.get("service") === providerName;
        }).toJS();
    } catch (ignore) {
        throw new Error("No configuration found for provider " + providerName);
    }
}