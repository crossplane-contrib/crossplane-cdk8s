const { readdirSync, statSync } = require('fs');
const { join, relative } = require('path');
const { ConstructLibraryCdk8s } = require('projen');

const project = new ConstructLibraryCdk8s({
  authorAddress: 'prasek@gmail.com',
  authorName: 'Phil Prasek',
  cdk8sVersion: '1.0.0-beta.4',
  name: 'crossplane-cdk',
  description: 'CDK for Crossplane',
  repository: 'https://github.com/crossplane-contrib/crossplane-cdk.git',
  defaultReleaseBranch: 'master',
  peerDeps: [
    'constructs@^3.2.42',
    'cdk8s-plus-17@^1.0.0-beta.3',
  ],
  bundledDeps: [
    'codemaker@^1.16.0',
    'js-yaml@^3.1.3',
  ],
  devDeps: [
    'typescript',
    '@types/js-yaml',
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

/*
project.npmignore.exclude('!*.js');
project.npmignore.exclude('*.ts');
project.npmignore.exclude('!*.d.ts');

const compileExamples = project.addTask('compile-examples');

const base = join('examples', 'typescript');
for (const dir of readdirSync(base)) {
  const dirpath = join(base, dir);
  if (!statSync(dirpath).isDirectory()) {
    continue;
  }

  compileExamples.exec(`(cd ${dirpath} && mkdir -p node_modules && cd node_modules && rm -f crossplane-cdk && ln -s ../../../../ crossplane-cdk)`);
  compileExamples.exec(`(cd ${dirpath} && ${relative(dirpath, require.resolve('typescript/bin/tsc'))})`);
}

project.compileTask.spawn(compileExamples);

*/

project.synth();