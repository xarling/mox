import {Mox} from "./mox";

describe('Mox test', function() {

    it('should initialize throw an error with a wrong url', function() {
        new Mox('justanurl');
    });
});
