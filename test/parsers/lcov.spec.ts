import LcovToCoverallsParser from '../../src/parsers/lcov';

jest.mock('js-md5', () => ({
    digest: jest.fn().mockReturnValue('sourceDigest'),
}));

describe('LcovToCoverallsParser', () => {
    let parser: LcovToCoverallsParser;

    beforeEach(() => {
        parser = new LcovToCoverallsParser();
    });

    describe('parse', () => {
        it('returns coveralls object', () => {
            expect(
                parser.parse(
                    require.resolve('../fixtures/repo/coverage/lcov.info')
                )
            ).toMatchSnapshot();
        });
    });
});
