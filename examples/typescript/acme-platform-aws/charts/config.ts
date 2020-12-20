import { readFileSync } from 'fs';
import { join } from 'path';
import { Chart } from 'cdk8s';
import { Construct } from 'constructs';
import * as crossplane from '../../../../src';

export class ConfigurationChart extends Chart {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const config = new crossplane.Configuration(this, 'config', {
      name: 'acme-platform-aws',
      company: 'Upbound',
      maintainer: 'Phil Prasek <phil@upbound.io>',
      keywords: ['aws', 'cloud-native', 'kubernetes', 'example', 'platform', 'reference'],
      source: 'github.com/crossplane-contrib/crossplane-cdk8s/examples/typescript/acme-platform-aws',
      license: 'Apache-2.0',
      descriptionShort: 'The AWS reference platform for Kubernetes and Data Services.',
      description: 'This reference platform Configuration for Kubernetes and Data Services is a starting point to build, run, and operate your own internal cloud platform and offer a self-service console and API to your internal teams.',
      readme: fromResource('readme.md'),
      crossplaneVersion: '>=v1.0.0-0',
      iconData: fromResource('icon.txt'),
    });

    config.addProvider('registry.upbound.io/crossplane/provider-aws', '>=v0.14.0-0');
    config.addProvider('registry.upbound.io/crossplane/provider-helm', '>=v0.3.6-0');
  }
}

function fromResource(fileName: string) {
  return readFileSync(join(__dirname, '..', 'resources', fileName), 'utf-8');
}
