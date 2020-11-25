const { ConstructLibraryCdk8s } = require('projen');

const project = new ConstructLibraryCdk8s({
  authorAddress: "benisrae@amazon.com",
  authorName: "Elad Ben-Israel",
  cdk8sVersion: "1.0.0-beta.3",
  name: "crossplane-cdk",
  description: 'CDK for Crossplane',
  repository: "https://github.com/eladb/crossplane-cdk.git",
  defaultReleaseBranch: "main",
  peerDeps: [
    'constructs@^3.2.42',
    'cdk8s-plus-17@^1.0.0-beta.3',
  ]
});

project.eslint.addRules(
  {'max-len': ['error', {
    code: 170,
    ignoreUrls: true, // Most common reason to disable it
    ignoreStrings: true, // These are not fantastic but necessary for error messages
    ignoreTemplateLiterals: true,
    ignoreComments: true,
    ignoreRegExpLiterals: true,
  }]}
);

project.synth();