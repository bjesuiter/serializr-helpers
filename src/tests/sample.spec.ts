class Calculator {

    static Sum(a: number, b: number) {
        return a + b
    }

}

describe('calculate', function () {

    it('add', function () {
        let result = Calculator.Sum(5, 2);
        expect(result).toBe(7);
    });

});
