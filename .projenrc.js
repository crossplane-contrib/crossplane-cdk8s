const { readdirSync, statSync } = require('fs');
const { join, relative } = require('path');
const { ConstructLibraryCdk8s } = require('projen');

const CDK8S_VERSION = '1.0.0-beta.5';

const project = new ConstructLibraryCdk8s({
  authorAddress: 'prasek@gmail.com',
  authorName: 'Phil Prasek',
  cdk8sVersion: CDK8S_VERSION,
  name: 'crossplane-cdk',
  description: 'CDK for Crossplane',
  repository: 'https://github.com/crossplane-contrib/crossplane-cdk.git',
  defaultReleaseBranch: 'master',
  bundledDeps: [
    'codemaker@^1.16.0',
    'js-yaml@^3.1.3',
  ],
  devDeps: [
    'typescript',
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

const compileExamples = project.addTask('compile-examples');

const base = join('examples', 'typescript');
for (const dir of readdirSync(base)) {
  const dirpath = join(base, dir);
  if (!statSync(dirpath).isDirectory()) {
    continue;
  }
  const tsc = relative(dirpath, 'node_modules/typescript/bin/tsc');
  compileExamples.exec(`(cd ${dirpath} && rm -fr imports && npx cdk8s import)`);
  compileExamples.exec(`(cd ${dirpath} && ${tsc})`);
}

project.compileTask.spawn(compileExamples);

// include "examples" in the tsconfig for tests.
project.tryFindJsonFile('tsconfig.jest.json').obj.include.push('examples/**/*.ts');


project.synth();


