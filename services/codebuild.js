const {head, branch} = require('../lib/git');

// https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-env-vars.html

module.exports = {
	detect({env}) {
		const isCi = Boolean(env.CODEBUILD_BUILD_ID);
		console.log(`***** isCodeBuild: ${isCi}`);
		return isCi;
	},
	configuration({env, cwd}) {
		const config = {
			name: 'AWS CodeBuild',
			service: 'codebuild',
			commit: head({env, cwd}),
			build: env.CODEBUILD_BUILD_ID,
			branch: env.BRANCH ? env.BRANCH : branch({env, cwd}),
			buildUrl: `https://console.aws.amazon.com/codebuild/home?region=${env.AWS_REGION}#/builds/${
				env.CODEBUILD_BUILD_ID
			}/view/new`,
			root: env.PWD,
		};
		console.log(`***** CodeBuild config: ${JSON.stringify(config)}`);
		return config;
	},
};
