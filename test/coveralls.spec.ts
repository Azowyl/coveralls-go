import Coveralls from '../src/coveralls';
import Environment from '../src/environment';
import axios, { AxiosRequestConfig } from 'axios';
import FormData from 'form-data';

jest.mock('axios');
jest.mock('js-md5', () => ({
    digest: jest.fn().mockReturnValue('sourceDigest'),
}));

describe('Coveralls', () => {
    let coveralls: Coveralls;
    const axiosMock = axios as unknown as jest.Mock;

    beforeEach(() => {
        coveralls = new Coveralls();
    });

    const itMakesRequestWithCorrectParams = (): void =>
        it('makes request to coveralls with correct params', async () => {
            await coveralls.submitFromLcov(
                require.resolve('./fixtures/repo/coverage/lcov.info')
            );

            const calledData = (
                axiosMock.mock.calls[0] as object[]
            )[0] as AxiosRequestConfig;

            expect(
                (calledData.data as FormData)
                    .getBuffer()
                    .toString()
                    .match(/{.*}/)
            ).toMatchSnapshot();
        });

    describe('submitFromLcov', () => {
        describe('with PR circleci environment', () => {
            beforeEach(() => {
                Environment.CIRCLECI = true;
                Environment.CIRCLE_BUILD_NUM = '1';
                Environment.CIRCLE_COMMIT_SHA =
                    '0d15c65a92b7c3642883a528da8dd4841accde21';
                Environment.CIRCLE_PULL_REQUEST_ID = '123';
            });

            itMakesRequestWithCorrectParams();
        });

        describe('with no PR circleci environment', () => {
            beforeEach(() => {
                Environment.CIRCLE_PULL_REQUEST_ID = '';
            });

            itMakesRequestWithCorrectParams();
        });
    });
});
