import chai, {expect} from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import Immutable from "immutable";
import {EventEmitter} from "events";

chai.use(sinonChai);

import * as asteroidCollections from "asteroid-collections";

describe("`asteroid-collection` mixin", function () {

    describe("`init` method", function () {

        const added = sinon.spy();
        const changed = sinon.spy();
        const removed = sinon.spy();

        beforeEach(function () {
            added.reset();
            asteroidCollections.__Rewire__("added", added);
            changed.reset();
            asteroidCollections.__Rewire__("changed", changed);
            removed.reset();
            asteroidCollections.__Rewire__("removed", removed);
        });

        afterEach(function () {
            asteroidCollections.__ResetDependency__("added");
            asteroidCollections.__ResetDependency__("changed");
            asteroidCollections.__ResetDependency__("removed");
        });

        it("should set the `collections` object as `Immutable.Map`", function () {
            const instance = {
                ddp: {
                    on: sinon.spy()
                }
            };
            asteroidCollections.init.call(instance);
            expect(instance.collections).to.be.an.instanceOf(Immutable.Map);
            expect(instance.collections.toJS()).to.deep.equal({});
        });

        describe("`added` event handler", function () {

            it("should call the `added` function on correct instance", function () {
                var eventEmitter = new EventEmitter();
                const instance = {
                    ddp: eventEmitter
                };
                asteroidCollections.init.call(instance);
                instance.ddp.emit("added");
                expect(added).to.have.been.callCount(1);
                expect(added).to.have.been.calledOn(instance);
            });

        });

        describe("`changed` event handler", function () {

            it("should call the `changed` function on correct instance", function () {
                var eventEmitter = new EventEmitter();
                const instance = {
                    ddp: eventEmitter
                };
                asteroidCollections.init.call(instance);
                instance.ddp.emit("changed");
                expect(changed).to.have.been.callCount(1);
                expect(changed).to.have.been.calledOn(instance);
            });

        });

        describe("`removed` event handler", function () {

            it("should call the `removed` function on correct instance", function () {
                var eventEmitter = new EventEmitter();
                const instance = {
                    ddp: eventEmitter
                };
                asteroidCollections.init.call(instance);
                instance.ddp.emit("removed");
                expect(removed).to.have.been.callCount(1);
                expect(removed).to.have.been.calledOn(instance);
            });

        });

    });

    describe("`getServiceConfig`", function () {

        const providerName = "providerName";
        const SERVICE_CONFIG_COLLECTION = "SERVICE_CONFIG_COLLECTION";

        before(function () {
            asteroidCollections.__Rewire__("SERVICE_CONFIG_COLLECTION", SERVICE_CONFIG_COLLECTION);
        });

        after(function () {
            asteroidCollections.__ResetDependency__("SERVICE_CONFIG_COLLECTION");
        });

        it("should call the `get` function of collections with the correct parameter", function () {
            const instance = {
                collections: {
                    get: sinon.stub().returns(Immutable.Map({id: Immutable.Map({service: "providerName"})}))
                }
            };
            asteroidCollections.getServiceConfig.call(instance, providerName);
            expect(instance.collections.get).to.have.callCount(1);
            expect(instance.collections.get).to.have.been.calledWith(SERVICE_CONFIG_COLLECTION);
        });

        it("should return an object", function () {
            const instance = {
                collections: {
                    get: sinon.stub().returns(Immutable.Map({
                        id: Immutable.Map(
                            {service: "providerName", clientID: "clientID"}
                        )}
                    ))
                }
            };
            var ret = asteroidCollections.getServiceConfig.call(instance, providerName);
            expect(ret).to.be.an.instanceOf(Object);
            expect(ret).to.deep.equal({
                service: "providerName",
                clientID: "clientID"
            });
        });

        it("should throw an `Error` with correct message if serviceConfiguration is `undefined`", function () {
            const instance = {
                collections: Immutable.Map()
            };
            const troubleMaker = () => {
                asteroidCollections.getServiceConfig.call(instance, providerName);
            };
            expect(troubleMaker).to.throw("No configuration found for provider providerName");
        });

    });

});
