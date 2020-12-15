#!/bin/bash
set -euo pipefail
repo_root=$(cd $(dirname $0)/.. && pwd)/
cd ${repo_root}

import(){
  output="${repo_root}$2"
  rm -rf ${output}
  mkdir -p ${output}
  echo ${output}

  node ~/go/src/github.com/awslabs/cdk8s/packages/cdk8s-cli/lib/cli/index.js import -l typescript -o ${output} $1
}

import "github:crossplane/crossplane" "src/imports"
import "github:crossplane/provider-aws@0.15.0" "test/imports/provider-aws"
import "github:crossplane-contrib/provider-helm@0.3.7" "test/imports/provider-helm" 
