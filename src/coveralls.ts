import axios from 'axios'
import LcovToCoverallsParser from './parsers/lcov';
import FormData from 'form-data';

class Coveralls {
    async submitFromLcov(lcovFilePath: string): Promise<void> {
        const coverallsRequestBuilder = new LcovToCoverallsParser().parse(lcovFilePath);
        coverallsRequestBuilder.withService('circleci');

        const coverallsRequestObject = coverallsRequestBuilder.build();
        console.log('Posting to coveralls:', coverallsRequestObject);

        const formData = new FormData();
        formData.append('json_file', Buffer.from(JSON.stringify(coverallsRequestObject)), 'utf-8')

        return await axios({
            method: 'POST',
            url: 'https://coveralls.io/api/v1/jobs',
            data: formData,
            headers: formData.getHeaders()
        })
    }
}

export default Coveralls