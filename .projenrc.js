const { ConstructLibraryCdk8s } = require('projen');

const project = new ConstructLibraryCdk8s({
  authorAddress: "benisrae@amazon.com",
  authorName: "Elad Ben-Israel",
  cdk8sVersion: "1.0.0-beta.2",
  name: "crossplane-cdk",
  repository: "https://github.com/eladb/crossplane-cdk.git",
  defaultReleaseBranch: "main"
});

project.addPeerDeps('constructs@^3.2.34');
project.addPeerDeps('cdk8s-plus-17@^1.0.0-beta.2');

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
