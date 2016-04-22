const SERVICE_CONFIG_COLLECTION = "meteor_accounts_loginServiceConfiguration";

export function getServiceConfig (providerName) {
    try {
        return this.collections
            .get(SERVICE_CONFIG_COLLECTION)
            .find(serviceConfig => serviceConfig.get("service") === providerName)
            .toJS();
    } catch (ignore) {
        throw new Error(`No configuration found for provider ${providerName}`);
    }
}
