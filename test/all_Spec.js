/**
 * Created by vadimkorotkij on 28.07.15.
 */

describe('The main feature test case', function() {

    it('should be define', function() { expect(sum).toBeDefined(); });

    it('should return the sum of two numbers', function() {
        expect(sum(7, 9)).toEqual(16);
    });

});