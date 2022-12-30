import child_process from 'child_process';
import Environment from './environment';

const commiterName = (): string =>
    child_process
        .execSync(`git show -s --format='%ae' ${Environment.CIRCLE_COMMIT_SHA}`)
        .toString();

const commitMessage = (): string =>
    child_process.execSync('git log -1 --pretty=%B').toString();

const currentBranch = (): string =>
    child_process.execSync('git rev-parse --abbrev-ref HEAD').toString();

const originRemote = (): string =>
    child_process.execSync('git config --get remote.origin.url').toString();

export default {
    commiterName,
    commitMessage,
    currentBranch,
    originRemote,
};
