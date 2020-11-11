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

project.synth();
