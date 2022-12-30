const Environment = {
    CIRCLECI: process.env.CIRCLECI === 'true',
    CIRCLE_BUILD_NUM: process.env.CIRCLE_BUILD_NUM as string,
    CIRCLE_PULL_REQUEST_ID:
        ((process.env.CIRCLE_PULL_REQUEST as string) ?? '').split('/').pop() ??
        '',
    CIRCLE_COMMIT_SHA: process.env.CIRCLE_SHA1 as string,
    REPO_TOKEN: process.env.REPO_TOKEN as string,
    CIRCLE_AUTHOR: process.env.CIRCLE_USERNAME as string,
};

export default Environment;
