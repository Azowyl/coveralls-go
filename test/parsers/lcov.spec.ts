import LcovToCoverallsParser from '../../src/parsers/lcov';

jest.mock('js-md5', () => ({
    digest: jest.fn().mockReturnValue('sourceDigest'),
}));
jest.mock('../../src/git', () => ({
    commiterName: jest.fn().mockReturnValue('test'),
    commitMessage: jest.fn().mockReturnValue('test'),
    currentBranch: jest.fn().mockReturnValue('test'),
    originRemote: jest.fn().mockReturnValue('test'),
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
