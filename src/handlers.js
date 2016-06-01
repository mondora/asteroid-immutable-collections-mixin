import {fromJS} from "immutable";

import normalizeId from "./lib/normalize-id";

export function added ({collection, id, fields}) {
    const _id = normalizeId(id);
    // TODO `fields` might be empty. Find out if true and document why
    const element = fromJS({...fields, _id});
    this.collections = this.collections.setIn([collection, _id], element);
    this.emit("collections:change", "added", collection, _id);
}

export function changed ({collection, id, fields, cleared}) {
    const _id = normalizeId(id);
    if (fields) {
        this.collections = this.collections
            .mergeIn([collection, _id], fields);
    }
    if (cleared) {
        this.collections = cleared.reduce((collections, field) => (
            collections.deleteIn([collection, _id, field])
        ), this.collections);
    }
    this.emit("collections:change", "changed", collection, _id);
}

export function removed ({collection, id}) {
    const _id = normalizeId(id);
    this.collections = this.collections.deleteIn([collection, _id]);
    this.emit("collections:change", "removed", collection, _id);
}
