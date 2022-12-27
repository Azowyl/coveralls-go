import { readFileSync } from 'fs'
import md5 from 'js-md5'
import * as FileUtils from './file'

interface CoverallsSourceFile {
    name: string;
    sourceDigest: string;
    coverage: Array<number | null>;
}

export interface CoverallsRequestObject {
    serviceJobId: string;
    serviceName: string;
    sourceFiles: CoverallsSourceFile[];
}
class CoverallsRequestBuilder {
    private readonly requestObject: CoverallsRequestObject = {
        serviceJobId: '',
        serviceName: '',
        sourceFiles: []
    }

    withServiceName(name: string): CoverallsRequestBuilder {
        this.requestObject.serviceName = name;
        return this;
    }

    withServiceJobId(id: string): CoverallsRequestBuilder {
        this.requestObject.serviceJobId = id;
        return this;
    }

    withSourceFile(filePath: string, coverage: Array<number | null>): CoverallsRequestBuilder {
        this.requestObject.sourceFiles = this.requestObject.sourceFiles.concat({
            name: filePath,
            sourceDigest: FileUtils.md5Digest(filePath),
            coverage
        });

        return this;
    }

    build(): CoverallsRequestObject {
        return this.requestObject;
    }
}

export default CoverallsRequestBuilder;