import Immutable from "immutable";

import {added, changed, removed} from "./handlers";
import {getServiceConfig} from "./get-service-config";

function init () {
    this.collections = Immutable.Map();
    this.ddp.on("added", added.bind(this));
    this.ddp.on("changed", changed.bind(this));
    this.ddp.on("removed", removed.bind(this));
}

module.exports = {
    init,
    getServiceConfig
};
