import { App, Chart } from 'cdk8s';
import { Configuration } from '.';
import { CompositeResourceDefinition } from './apiextensions.crossplane.io/compositeresourcedefinition';
import { Composition } from './apiextensions.crossplane.io/composition';

const app = new App();
const chart = new Chart(app, 'test');

const config = new Configuration(chart, 'config', {
  company: 'Upbound',
  keywords: ['aws', 'cloud-native', 'kubernetes', 'example', 'platform', 'reference'],
});

config.addProvider('crossplane/provider-aws', '>=v0.14.0-0');

new CompositeResourceDefinition(chart, 'xrd', {
  metadata: {
    name: 'compositepostgresqlinstances.aws.platformref.crossplane.io',
  },
  spec: {
    claimNames: {
      kind: 'PostgreSQLInstance',
      plural: 'postgresqlinstances',
    },
    connectionSecretKeys: [
      'username',
      'password',
      'endpoint',
      'port',
    ],
    group: 'aws.platformref.crossplane.io',
    names: {
      kind: 'CompositePostgreSQLInstance',
      plural: 'compositepostgresqlinstances',
    },
    versions: [
      {
        name: 'v1alpha1',
        served: true,
        referenceable: true,
        schema: {
          openAPIV3Schema: {
            type: 'object',
            properties: {
              spec: {
                type: 'object',
                properties: {
                  parameters: {
                    type: 'object',
                    properties: {
                      storageGB: { type: 'integer' },
                      networkRef: {
                        type: 'object',
                        description: 'A reference to the Network object that this postgres should be connected to.',
                        properties: {
                          id: { type: 'string', description: 'ID of the Network object this ref points to.' },
                        },
                        required: ['id'],
                      },
                    },
                    required: [
                      'storageGB',
                      'networkRef',
                    ],
                  },
                },
                required: ['parameters'],
              },
            },
          },
        },
      },
    ],
  },
});

new Composition(chart, 'my-composition', {
  metadata: {
    name: 'compositepostgresqlinstances.aws.platformref.crossplane.io',
    labels: {
      provider: 'aws',
    },
  },
  spec: {
    writeConnectionSecretsToNamespace: 'crossplane-system',
    compositeTypeRef: {
      apiVersion: 'aws.platformref.crossplane.io/v1alpha1',
      kind: 'CompositePostgreSQLInstance',
    },
    resources: [
      {
        base: {
          apiVersion: 'database.aws.crossplane.io/v1beta1',
          kind: 'DBSubnetGroup',
          spec: {
            forProvider: {
              region: 'us-west-2',
              description: 'An excellent formation of subnetworks.',
            },
            reclaimPolicy: 'Delete',
          },
        },
        patches: [
          {
            fromFieldPath: 'spec.parameters.networkRef.id',
            toFieldPath: 'spec.forProvider.subnetIdSelector.matchLabels[networks.aws.platformref.crossplane.io/network-id]',
          },
        ],
      },
      {
        base: {
          apiVersion: 'database.aws.crossplane.io/v1beta1',
          kind: 'RDSInstance',
          spec: {
            forProvider: {
              region: 'us-west-2',
              dbSubnetGroupNameSelector: {
                matchControllerRef: true,
              },
              dbInstanceClass: 'db.t2.small',
              masterUsername: 'masteruser',
              engine: 'postgres',
              engineVersion: '9.6',
              skipFinalSnapshotBeforeDeletion: true,
              publiclyAccessible: false,
            },
            writeConnectionSecretToRef: {
              namespace: 'crossplane-system',
            },
            reclaimPolicy: 'Delete',
          },
        },
        patches: [
          {
            fromFieldPath: 'metadata.uid',
            toFieldPath: 'spec.writeConnectionSecretToRef.name',
            transforms: [
              {
                type: 'string',
                string: {
                  fmt: '%s-postgresql',
                },
              },
            ],
          },
          {
            fromFieldPath: 'spec.parameters.storageGB',
            toFieldPath: 'spec.forProvider.allocatedStorage',
          },
          {
            fromFieldPath: 'spec.parameters.networkRef.id',
            toFieldPath: 'spec.forProvider.vpcSecurityGroupIDSelector.matchLabels[networks.aws.platformref.crossplane.io/network-id]',
          },
        ],
        connectionDetails: [
          {
            fromConnectionSecretKey: 'username',
          },
          {
            fromConnectionSecretKey: 'password',
          },
          {
            fromConnectionSecretKey: 'endpoint',
          },
          {
            fromConnectionSecretKey: 'port',
          },
        ],
      },
    ],
  },
});

app.synth();