export default function normalizeId (id) {
    /*
    *   When elements of a collection have an ObjectId as _id, the
    *   stringification of the ObjectId meteor does before sending the element
    *   to the client prepends a dash `-` to the normal stringification of the
    *   _id. See https://github.com/meteor/meteor/issues/1679 for details.
    */
    return (id[0] === "-") ? id.slice(1) : id;
}
