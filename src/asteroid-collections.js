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
    const serviceConfiguration = this.collections.getIn([
        SERVICE_CONFIG_COLLECTION,
        providerName
    ]);
    if (!serviceConfiguration) {
        throw new Error(`No configuration found for provider ${providerName}`);
    }
    return serviceConfiguration.toJS();
}
