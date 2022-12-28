import CoverallsParser from './coveralls';
import CoverallsRequestBuilder from '../coverallsRequestBuilder';
import parseLCOV, { LCOVRecord } from 'parse-lcov';
import * as FileUtils from '../file';

class LcovToCoverallsParser implements CoverallsParser {
    private readonly coverageRequestBuilder: CoverallsRequestBuilder;
    constructor() {
        this.coverageRequestBuilder = new CoverallsRequestBuilder();
    }

    parse(lcovFilePath: string): CoverallsRequestBuilder {
        return this.getCoverallsRequestObject(
            parseLCOV(FileUtils.source(lcovFilePath))
        );
    }

    private getCoverallsRequestObject(
        lcovData: LCOVRecord[]
    ): CoverallsRequestBuilder {
        lcovData.forEach((data) => {
            this.coverageRequestBuilder.withSourceFile(
                data.file,
                this.getLinesCoverage(
                    data.lines,
                    FileUtils.linesCount(data.file)
                )
            );
        });

        return this.coverageRequestBuilder;
    }

    private getLinesCoverage(
        lines: LCOVRecord['lines'],
        linesCount: number
    ): Array<null | number> {
        const coverage: Array<null | number> = [
            ...Array(linesCount).keys(),
        ].map(() => null);
        lines.details.forEach((detail) => {
            const currentValue = coverage[detail.line - 1];
            coverage[detail.line - 1] = (currentValue ?? 0) + detail.hit;
        });

        return coverage;
    }
}

export default LcovToCoverallsParser;
