import LcovToCoverallsParser from '../../src/parsers/lcov';

describe('LcovToCoverallsParser', () => {
    let parser: LcovToCoverallsParser;

    beforeEach(() => {
        parser = new LcovToCoverallsParser();
    });

    describe('parse', () => {
        it('returns coveralls object', () => {
            expect(parser.parse(require.resolve('../fixtures/lcov.info')))
                .toMatchSnapshot();
        });
    });
});
