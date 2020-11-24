import { App, Chart } from 'cdk8s';
import { Composition } from '../../crossplane/imports/apiextensions.crossplane.io';

export default function generate(crossplanePackage: App) {

  const compositionYaml = new Chart(crossplanePackage, 'network-composition');

  new Composition(compositionYaml, 'compositenetworks.aws.platformref.crossplane.io', {
    metadata: {
      name: 'compositenetworks.aws.platformref.crossplane.io',
      labels: {
        provider: 'aws',
      },
    },
    spec: {
      writeConnectionSecretsToNamespace: 'crossplane-system',
      compositeTypeRef: {
        apiVersion: 'aws.platformref.crossplane.io/v1alpha1',
        kind: 'CompositeNetwork',
      },
      resources: [
        {
          base: {
            apiVersion: 'ec2.aws.crossplane.io/v1beta1',
            kind: 'VPC',
            spec: {
              forProvider: {
                region: 'us-west-2',
                cidrBlock: '192.168.0.0/16',
                enableDnsSupport: true,
                enableDnsHostNames: true,
              },
            },
          },
          patches: [
            {
              fromFieldPath: 'spec.id',
              toFieldPath: 'metadata.labels[networks.aws.platformref.crossplane.io/network-id]',
            },
          ],
        },
        {
          base: {
            apiVersion: 'ec2.aws.crossplane.io/v1beta1',
            kind: 'InternetGateway',
            spec: {
              forProvider: {
                region: 'us-west-2',
                vpcIdSelector: {
                  matchControllerRef: true,
                },
              },
            },
          },
          patches: [
            {
              fromFieldPath: 'spec.id',
              toFieldPath: 'metadata.labels[networks.aws.platformref.crossplane.io/network-id]',
            },
          ],
        },
        {
          base: {
            apiVersion: 'ec2.aws.crossplane.io/v1beta1',
            kind: 'Subnet',
            metadata: {
              labels: {
                zone: 'us-west-2a',
                access: 'public',
              },
            },
            spec: {
              forProvider: {
                region: 'us-west-2',
                mapPublicIPOnLaunch: true,
                cidrBlock: '192.168.0.0/18',
                vpcIdSelector: {
                  matchControllerRef: true,
                },
                availabilityZone: 'us-west-2a',
                tags: [
                  {
                    key: 'kubernetes.io/role/elb',
                    value: '1',
                  },
                ],
              },
            },
          },
          patches: [
            {
              fromFieldPath: 'spec.id',
              toFieldPath: 'metadata.labels[networks.aws.platformref.crossplane.io/network-id]',
            },
          ],
        },
        {
          base: {
            apiVersion: 'ec2.aws.crossplane.io/v1beta1',
            kind: 'Subnet',
            metadata: {
              labels: {
                zone: 'us-west-2b',
                access: 'public',
              },
            },
            spec: {
              forProvider: {
                region: 'us-west-2',
                mapPublicIPOnLaunch: true,
                cidrBlock: '192.168.64.0/18',
                vpcIdSelector: {
                  matchControllerRef: true,
                },
                availabilityZone: 'us-west-2b',
                tags: [
                  {
                    key: 'kubernetes.io/role/elb',
                    value: '1',
                  },
                ],
              },
            },
          },
          patches: [
            {
              fromFieldPath: 'spec.id',
              toFieldPath: 'metadata.labels[networks.aws.platformref.crossplane.io/network-id]',
            },
          ],
        },
        {
          base: {
            apiVersion: 'ec2.aws.crossplane.io/v1beta1',
            kind: 'Subnet',
            metadata: {
              labels: {
                zone: 'us-west-2a',
                access: 'private',
              },
            },
            spec: {
              forProvider: {
                region: 'us-west-2',
                cidrBlock: '192.168.128.0/18',
                vpcIdSelector: {
                  matchControllerRef: true,
                },
                availabilityZone: 'us-west-2a',
                tags: [
                  {
                    value: 'shared',
                    key: '',
                  },
                  {
                    key: 'kubernetes.io/role/internal-elb',
                    value: '1',
                  },
                ],
              },
            },
          },
          patches: [
            {
              fromFieldPath: 'spec.id',
              toFieldPath: 'metadata.labels[networks.aws.platformref.crossplane.io/network-id]',
            },
            {
              fromFieldPath: 'spec.clusterRef.id',
              toFieldPath: 'spec.forProvider.tags[0].key',
              transforms: [
                {
                  type: 'string',
                  string: {
                    fmt: 'kubernetes.io/cluster/%s',
                  },
                },
              ],
            },
          ],
        },
        {
          base: {
            apiVersion: 'ec2.aws.crossplane.io/v1beta1',
            kind: 'Subnet',
            metadata: {
              labels: {
                zone: 'us-west-2b',
                access: 'private',
              },
            },
            spec: {
              forProvider: {
                region: 'us-west-2',
                cidrBlock: '192.168.192.0/18',
                vpcIdSelector: {
                  matchControllerRef: true,
                },
                availabilityZone: 'us-west-2b',
                tags: [
                  {
                    value: 'shared',
                    key: '',
                  },
                  {
                    key: 'kubernetes.io/role/internal-elb',
                    value: '1',
                  },
                ],
              },
            },
          },
          patches: [
            {
              fromFieldPath: 'spec.id',
              toFieldPath: 'metadata.labels[networks.aws.platformref.crossplane.io/network-id]',
            },
            {
              fromFieldPath: 'spec.clusterRef.id',
              toFieldPath: 'spec.forProvider.tags[0].key',
              transforms: [
                {
                  type: 'string',
                  string: {
                    fmt: 'kubernetes.io/cluster/%s',
                  },
                },
              ],
            },
          ],
        },
        {
          base: {
            apiVersion: 'ec2.aws.crossplane.io/v1alpha4',
            kind: 'RouteTable',
            spec: {
              forProvider: {
                region: 'us-west-2',
                vpcIdSelector: {
                  matchControllerRef: true,
                },
                routes: [
                  {
                    destinationCidrBlock: '0.0.0.0/0',
                    gatewayIdSelector: {
                      matchControllerRef: true,
                    },
                  },
                ],
                associations: [
                  {
                    subnetIdSelector: {
                      matchControllerRef: true,
                      matchLabels: {
                        zone: 'us-west-2a',
                        access: 'public',
                      },
                    },
                  },
                  {
                    subnetIdSelector: {
                      matchControllerRef: true,
                      matchLabels: {
                        zone: 'us-west-2b',
                        access: 'public',
                      },
                    },
                  },
                  {
                    subnetIdSelector: {
                      matchControllerRef: true,
                      matchLabels: {
                        zone: 'us-west-2a',
                        access: 'private',
                      },
                    },
                  },
                  {
                    subnetIdSelector: {
                      matchControllerRef: true,
                      matchLabels: {
                        zone: 'us-west-2b',
                        access: 'private',
                      },
                    },
                  },
                ],
              },
            },
          },
          patches: [
            {
              fromFieldPath: 'spec.id',
              toFieldPath: 'metadata.labels[networks.aws.platformref.crossplane.io/network-id]',
            },
          ],
        },
        {
          base: {
            apiVersion: 'ec2.aws.crossplane.io/v1beta1',
            kind: 'SecurityGroup',
            spec: {
              forProvider: {
                region: 'us-west-2',
                vpcIdSelector: {
                  matchControllerRef: true,
                },
                groupName: 'platform-ref-aws-cluster',
                description: 'Allow access to PostgreSQL',
                ingress: [
                  {
                    fromPort: 5432,
                    toPort: 5432,
                    ipProtocol: 'tcp',
                    ipRanges: [
                      {
                        cidrIp: '0.0.0.0/0',
                        description: 'Everywhere',
                      },
                    ],
                  },
                ],
              },
            },
          },
          patches: [
            {
              fromFieldPath: 'spec.id',
              toFieldPath: 'metadata.labels[networks.aws.platformref.crossplane.io/network-id]',
            },
          ],
        },
      ],
    },
  });
}