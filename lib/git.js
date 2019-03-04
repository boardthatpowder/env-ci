const execa = require('execa');

function head(options) {
	try {
		const headResult = execa.sync('git', ['rev-parse', 'HEAD'], options).stdout;
		console.log(`***** headResult: ${headResult}`);
		return headResult;
	} catch (error) {
		console.log(`***** Unable to identify head: ${error}`)
		return undefined;
	}
}

function branch(options) {
	try {
		const headRef = execa.sync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], options).stdout;
		console.log(`***** headRef: ${headRef}`);

		if (headRef === 'HEAD') {
			const branch = execa
				.sync('git', ['show', '-s', '--pretty=%d', 'HEAD'], options)
				.stdout.replace(/^\(|\)$/g, '')
				.split(', ')
				.find(branch => branch.startsWith('origin/'));
			console.log(`***** git branch result: ${branch}`);
			const identifiedBranch = branch ? branch.match(/^origin\/(.+)/)[1] : undefined;
			console.log(`***** identifiedBranch: ${identifiedBranch}`);
			return identifiedBranch;
		}

		console.log(`***** headRef: ${headRef}`);
		return headRef;
	} catch (error) {
		console.log(`***** Unable to identify branch: ${error}`)
		return undefined;
	}
}

module.exports = {head, branch};
