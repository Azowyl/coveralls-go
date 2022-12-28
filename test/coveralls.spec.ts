import Coveralls from '../src/coveralls'
import Environment from '../src/environment'
import axios from 'axios'

jest.mock('axios');
describe('Coveralls', () => {
    let coveralls: Coveralls;

    beforeEach(() => {
        coveralls = new Coveralls();
    })

    describe('submitFromLcov', () => {
        describe('with circleci environment', () => {
            beforeEach(() => {
                Environment.CIRCLECI = true;
                Environment.CIRCLE_BUILD_NUM = '1';
                Environment.CIRCLE_COMMIT_SHA = 'sha';
                Environment.CIRCLE_PULL_REQUEST_ID = '123';
            })

            it('makes request to coveralls with correct params', async () => {
                await coveralls.submitFromLcov(require.resolve('./fixtures/repo/coverage/lcov.info'));

                expect((axios as unknown as jest.Mock).mock.calls[0]).toMatchSnapshot();
            })
        })
    });
});