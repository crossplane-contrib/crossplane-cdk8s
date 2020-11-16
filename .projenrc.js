const { ConstructLibraryCdk8s } = require('projen');

const project = new ConstructLibraryCdk8s({
  authorAddress: "benisrae@amazon.com",
  authorName: "Elad Ben-Israel",
  cdk8sVersion: "0.33.0",
  name: "play-14140",
  repository: "https://github.com/benisrae/play-14140.git",
  defaultReleaseBranch: "main"
});

project.addPeerDeps('constructs@^3.0.4');

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
