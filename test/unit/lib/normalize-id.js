import chai, {expect} from "chai";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

import normalizeId from "lib/normalize-id.js";

describe("`normalizeId` lib", function () {

    it("should return the `id` if the first element is not `-`", function () {
        const id = "id";
        const ret = normalizeId(id);
        expect(ret).to.equal("id");
    });

    it("should return `id` without `-`, if that is present", function () {
        const id = "-id";
        const ret = normalizeId(id);
        expect(ret).to.equal("id");
    });

});
