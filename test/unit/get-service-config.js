import chai, {expect} from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import Immutable from "immutable";

chai.use(sinonChai);

import config, {getServiceConfig} from "get-service-config";

describe("`getServiceConfig`", function () {

    const providerName = "providerName";
    const SERVICE_CONFIG_COLLECTION = "SERVICE_CONFIG_COLLECTION";

    before(function () {
        config.__Rewire__("SERVICE_CONFIG_COLLECTION", SERVICE_CONFIG_COLLECTION);
    });

    after(function () {
        config.__ResetDependency__("SERVICE_CONFIG_COLLECTION");
    });

    it("should call the `get` function of collections with the correct parameter", function () {
        const instance = {
            collections: {
                get: sinon.stub().returns(Immutable.Map({id: Immutable.Map({service: "providerName"})}))
            }
        };
        getServiceConfig.call(instance, providerName);
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
        var ret = getServiceConfig.call(instance, providerName);
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
            getServiceConfig.call(instance, providerName);
        };
        expect(troubleMaker).to.throw("No configuration found for provider providerName");
    });

});
