const github = require('@actions/github');
const semver = require('semver');
const replace = require('replace-in-file');

const filename = process.argv[2] || 'readme.md';
const myToken = process.env.GITHUB_TOKEN;

async function run() {
	const api = new github.GitHub(myToken);

	const { data: releases } = await api.repos.listReleases( github.context.repo );

	let published = releases.filter( release =>
		! release.draft && ! release.prerelease
	);

	let sorted = published.sort( ( a, b ) =>
		semver.rcompare( semver.coerce( a.tag_name ), semver.coerce( b.tag_name ) )
	);

	let changelog = sorted.reduce( ( changelog, release ) =>
		`${changelog}

### ${release.tag_name} ###

${release.body}`
	, '## Changelog ##' );

	const results = await replace( {
		files: filename,
		from: '<!-- changelog -->',
		to: changelog,
	} );
}

run();
