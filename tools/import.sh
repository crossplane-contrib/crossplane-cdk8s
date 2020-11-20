#!/bin/bash
set -euo pipefail
repo_root=$(cd $(dirname $0)/.. && pwd)
cd ${repo_root}

import(){
  output="${repo_root}/src/$2/imports"
  rm -rf ${output}

  node ~/go/src/github.com/awslabs/cdk8s/packages/cdk8s-cli/lib/cli/index.js import -l typescript -o ${output} $1
}

import "github:crossplane/crossplane@0.14.0" "crossplane" 
import "github:crossplane/provider-aws@0.15.0" "provider-aws" 
import "github:crossplane-contrib/provider-helm@0.3.7" "provider-helm" 
