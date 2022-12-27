import { CoverallsRequestObject } from '../coverallsRequestBuilder'

interface CoverallsParser {
    parse: (filePath: string) => CoverallsRequestObject;
}

export default CoverallsParser;