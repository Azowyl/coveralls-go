import { readFileSync } from 'fs';
import md5 from 'js-md5';
import path from 'path';

const linesCount = (filePath: string): number =>
    source(filePath).split('\n').length;
const source = (filePath: string): string =>
    readFileSync(path.normalize(filePath), 'utf-8');
const md5Digest = (filePath: string): string =>
    md5.digest(source(filePath)).toString();

export { linesCount, source, md5Digest };
