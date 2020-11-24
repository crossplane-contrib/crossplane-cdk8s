import { App, Chart } from 'cdk8s';
import { CompositeResourceDefinition } from '../../../crossplane/imports/apiextensions.crossplane.io';

export default function generate(crossplanePackage: App) {

  const definitionYaml = new Chart(crossplanePackage, 'database-postgres-definition');

  new CompositeResourceDefinition(definitionYaml, 'compositepostgresqlinstances.aws.platformref.crossplane.io', {
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
}