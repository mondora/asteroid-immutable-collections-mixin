import chai, {expect} from "chai";
import Immutable from "immutable";
import sinon from "sinon";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

import {added, changed, removed} from "handlers";

describe("`handlers` function", function () {

    describe("`added` function", function () {

        it("should `add` a new collections with the correct parameter", function () {
            const instance = {
                collections: Immutable.Map(),
                emit: sinon.spy()
            };
            const options = {
                collection: "collection-name",
                id: "id",
                fields: {
                    a: "b",
                    test: "test"
                }
            };
            added.call(instance, options);
            expect(instance.collections.get("collection-name")).to.be.an.instanceOf(Immutable.Map);
            expect(instance.collections.get("collection-name").toJS()).to.deep.equal({
                id: {
                    _id: "id",
                    a: "b",
                    test: "test"
                }
            });
        });

        it("should call `emit` function with the correct parameter", function () {
            const instance = {
                collections: Immutable.Map(),
                emit: sinon.spy()
            };
            const options = {
                collection: "collection-name",
                id: "id",
                fields: {}
            };
            added.call(instance, options);
            expect(instance.emit).to.have.callCount(1);
            expect(instance.emit).to.have.been.calledWith("collections:change", "added", "collection-name", "id");
        });

    });

    describe("`changed` function", function () {

        it("should merge a new field in collection if fields object is present", function () {
            const instance = {
                collections: Immutable.Map(),
                emit: sinon.spy()
            };
            const addedCollectionOptions = {
                collection: "collection-name",
                id: "id1",
                fields: {
                    test: "test"
                }
            };
            const changedCollectionOptions = {
                collection: "collection-name",
                id: "id1",
                fields: {
                    change: "changed"
                }
            };
            added.call(instance, addedCollectionOptions);
            changed.call(instance, changedCollectionOptions);
            expect(instance.collections.get("collection-name").toJS()).to.deep.equal({
                id1: {
                    _id: "id1",
                    test: "test",
                    change: "changed"
                }
            });
        });

        it("should remove a key document in collection if cleared array is present", function () {
            const instance = {
                collections: Immutable.Map(),
                emit: sinon.spy()
            };
            const addedCollectionOptions = {
                collection: "collection-name",
                id: "id1",
                fields: {
                    test: "test"
                }
            };
            const changedCollectionOptions = {
                collection: "collection-name",
                id: "id1",
                cleared: ["test"]
            };
            added.call(instance, addedCollectionOptions);
            changed.call(instance, changedCollectionOptions);
            expect(instance.collections.get("collection-name").toJS()).to.deep.equal({
                id1: {
                    _id: "id1"
                }
            });
        });

        it("should remove more than one key document in collection if cleared array is present", function () {
            const instance = {
                collections: Immutable.Map(),
                emit: sinon.spy()
            };
            const addedCollectionOptions = {
                collection: "collection-name",
                id: "id1",
                fields: {
                    test1: "test1",
                    test2: "test2",
                    test3: "test3"
                }
            };
            const changedCollectionOptions = {
                collection: "collection-name",
                id: "id1",
                cleared: ["test1", "test3"]
            };
            added.call(instance, addedCollectionOptions);
            changed.call(instance, changedCollectionOptions);
            expect(instance.collections.get("collection-name").toJS()).to.deep.equal({
                id1: {
                    _id: "id1",
                    test2: "test2"
                }
            });
        });

        it("should call `emit` function with the correct parameter", function () {
            const instance = {
                collections: Immutable.Map(),
                emit: sinon.spy()
            };
            const options = {
                collection: "collection-name",
                id: "id"
            };
            changed.call(instance, options);
            expect(instance.emit).to.have.callCount(1);
            expect(instance.emit).to.have.been.calledWith("collections:change", "changed", "collection-name", "id");
        });

    });

    describe("`removed` function", function () {

        it("should remove only the document with the specified id", function () {
            const instance = {
                collections: Immutable.Map(),
                emit: sinon.spy()
            };
            const optionsAddDocument1 = {
                collection: "collection-name1",
                id: "id1",
                fields: {
                    test1: "test1"
                }
            };
            const optionsAddDocument2 = {
                collection: "collection-name1",
                id: "id2",
                fields: {
                    test2: "test2"
                }
            };
            const optionsRemoveCollection = {
                collection: "collection-name1",
                id: "id1"
            };
            added.call(instance, optionsAddDocument1);
            added.call(instance, optionsAddDocument2);
            removed.call(instance, optionsRemoveCollection);
            expect(instance.collections.get("collection-name1").toJS()).to.deep.equal({
                id2: {
                    _id: "id2",
                    test2: "test2"
                }
            });

        });

        it("should call `emit` function with the correct parameter", function () {
            const instance = {
                collections: Immutable.Map(),
                emit: sinon.spy()
            };
            const options = {
                collection: "collection-name",
                id: "id"
            };
            removed.call(instance, options);
            expect(instance.emit).to.have.callCount(1);
            expect(instance.emit).to.have.been.calledWith("collections:change", "removed", "collection-name", "id");
        });

    });

});
