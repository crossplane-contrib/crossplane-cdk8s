const { readdirSync, statSync } = require('fs');
const { join, relative } = require('path');
const { ConstructLibraryCdk8s } = require('projen');

const CDK8S_VERSION = '1.0.0-beta.5';

const project = new ConstructLibraryCdk8s({
  authorAddress: 'prasek@gmail.com',
  authorName: 'Phil Prasek',
  cdk8sVersion: CDK8S_VERSION,
  name: 'crossplane-cdk8s',
  description: 'CDK for Crossplane',
  repository: 'https://github.com/crossplane-contrib/crossplane-cdk8s.git',
  defaultReleaseBranch: 'master',
  bundledDeps: [
    'codemaker@^1.16.0',
    'js-yaml@^3.1.3',
  ],
  devDeps: [
    'typescript',
    'ts-node',
    '@types/js-yaml',
    `cdk8s-cli@${CDK8S_VERSION}`,
  ],
});

project.eslint.addRules(
  {
    'max-len': ['error', {
      code: 170,
      ignoreUrls: true, // Most common reason to disable it
      ignoreStrings: true, // These are not fantastic but necessary for error messages
      ignoreTemplateLiterals: true,
      ignoreComments: true,
      ignoreRegExpLiterals: true,
    }],
  },
);

project.gitignore.exclude('.vscode/');
project.gitignore.exclude('*.d.ts');
project.gitignore.exclude('*.js');
project.gitignore.exclude('creds.conf');

const synthExamples = project.addTask('compile-examples');

const base = join('examples', 'typescript');
for (const dir of readdirSync(base)) {
  const dirpath = join(base, dir);
  if (!statSync(dirpath).isDirectory()) {
    continue;
  }

  synthExamples.exec(`(cd ${dirpath} && rm -fr imports && npx cdk8s import)`);
  synthExamples.exec(`(cd ${dirpath} && npx cdk8s synth)`);
}

project.compileTask.spawn(synthExamples);

// include "examples" in the tsconfig for tests.
project.tryFindJsonFile('tsconfig.jest.json').obj.include.push('examples/**/*.ts');


project.synth();

