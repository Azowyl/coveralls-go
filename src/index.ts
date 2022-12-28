import Coveralls from './coveralls'
import path from 'path'

async function main(): Promise<void> {
    const coveralls = new Coveralls();
    await coveralls.submitFromLcov(path.normalize(`${process.cwd()}/coverage/lcov.info`));
}

main().catch((error) => console.log(error))