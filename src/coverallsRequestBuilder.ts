import * as FileUtils from './file';
import Environment from './environment';
import GitUtils from './git';

interface CoverallsGitInfo {
    head: {
        id: string;
        authorName: string;
        authorEmail?: string;
        committerName?: string;
        committerEmail?: string;
        message: string;
    };

    branch: string;
    remotes?: Array<{
        name: string;
        url: string;
    }>;
}

export interface CoverallsSourceFile {
    name: string;
    sourceDigest: string;
    coverage: Array<number | null>;
    branches: number[];
}

export interface CoverallsRequestObject {
    serviceJobId: string;
    serviceName: string;
    repoToken: string;
    servicePullRequest?: string;
    commitSha?: string;
    git?: CoverallsGitInfo;
    sourceFiles: CoverallsSourceFile[];
}

export type Service = 'circleci';

class CoverallsRequestBuilder {
    private readonly requestObject: CoverallsRequestObject = {
        serviceJobId: '',
        serviceName: '',
        repoToken: '',
        servicePullRequest: '',
        commitSha: '',
        sourceFiles: [],
    };

    withService(service: Service): CoverallsRequestBuilder {
        this.setValuesBasedOnService(service);
        return this;
    }

    withSourceFile(
        filePath: string,
        coverage: Array<number | null>,
        branches: number[]
    ): CoverallsRequestBuilder {
        this.requestObject.sourceFiles = this.requestObject.sourceFiles.concat({
            name: filePath,
            sourceDigest: FileUtils.md5Digest(filePath),
            coverage,
            branches,
        });

        return this;
    }

    build(): CoverallsRequestObject {
        return this.requestObject;
    }

    private setValuesBasedOnService(service: Service): void {
        this.requestObject.serviceName = service;
        this.requestObject.repoToken = Environment.REPO_TOKEN;

        if (Environment.CIRCLECI) {
            this.requestObject.serviceJobId = Environment.CIRCLE_BUILD_NUM;
            if (Environment.CIRCLE_PULL_REQUEST != null) {
                this.requestObject.servicePullRequest =
                    Environment.CIRCLE_PULL_REQUEST.split('/').pop() as string;
            }
            this.requestObject.git = {
                head: {
                    id: Environment.CIRCLE_COMMIT_SHA,
                    authorName: Environment.CIRCLE_AUTHOR,
                    committerName: GitUtils.commiterName(),
                    message: GitUtils.commitMessage(),
                },
                branch: GitUtils.currentBranch(),
                remotes: [
                    {
                        name: 'origin',
                        url: GitUtils.originRemote(),
                    },
                ],
            };
        } else {
            throw new Error(
                'Looks like this is not a circleci environment, currently only builds from circleci are supported. Feel free to submit a PR with your desired service integration'
            );
        }
    }
}

export default CoverallsRequestBuilder;
