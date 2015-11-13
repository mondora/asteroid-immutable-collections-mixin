import Immutable from "immutable";

import {added, changed, removed} from "./handlers";

const SERVICE_CONFIG_COLLECTION = "meteor_accounts_loginServiceConfiguration";

export function init () {
    this.collections = Immutable.Map();
    this.ddp.on("added", added.bind(this));
    this.ddp.on("changed", changed.bind(this));
    this.ddp.on("removed", removed.bind(this));
}

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
