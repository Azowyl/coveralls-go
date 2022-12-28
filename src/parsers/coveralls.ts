import CoverallsRequestBuilder from '../coverallsRequestBuilder'

interface CoverallsParser {
    parse: (filePath: string) => CoverallsRequestBuilder;
}

export default CoverallsParser;