import { Testing } from 'cdk8s';
import { Configuration } from '../src';
import { CompositeResourceDefinition } from '../src/apiextensions.crossplane.io/compositeresourcedefinition';

test('hello', () => {
  const chart = Testing.chart();

  const config = new Configuration(chart, 'my-config', {
    company: 'Upbound',
    keywords: ['aws', 'cloud-native', 'kubernetes', 'example', 'platform', 'reference'],
  });

  config.addProvider('crossplane/provider-aws', '>=v0.14.0-0');

  expect(Testing.synth(chart)).toMatchSnapshot();
});

test('xrd', () => {
  const chart = Testing.chart();

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

  expect(Testing.synth(chart)).toMatchSnapshot();
});
