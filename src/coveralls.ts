import axios from 'axios'
import LcovToCoverallsParser from './parsers/lcov'

class Coveralls {
    async submitFromLcov(lcovFilePath: string): Promise<void> {
        const coverallsRequestBuilder = new LcovToCoverallsParser().parse(lcovFilePath);
        coverallsRequestBuilder.withService('circleci');

        return await axios({
            method: 'POST',
            url: 'https://coveralls.io/api/v1/jobs',
            data: coverallsRequestBuilder.build()
        })
    }
}

export default Coveralls