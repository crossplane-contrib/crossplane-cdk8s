import { Chart } from 'cdk8s';
import { Construct } from 'constructs';
import * as crossplane from '../../../../src';
import * as db from '../imports/database.aws.crossplane.io';

export class PostgresChart extends Chart {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const xrd = new crossplane.CompositeResourceDefinition(this, 'xrd', {
      name: 'compositepostgresqlinstances.aws.platformref.crossplane.io',
    });

    xrd.group('aws.platformref.crossplane.io');
    xrd.claimKind('PostgreSQLInstance').plural('postgresqlinstances');
    xrd.kind('CompositePostgreSQLInstance').plural('compositepostgresqlinstances');
    xrd.connectionSecret().key('username').key('password').key('endpoint').key('port').defaultNamespace('crossplane-system');

    let xrdNetRef: crossplane.SchemaPropString;
    let xrdStorageGB: crossplane.SchemaPropInteger;

    xrd.version('v1alpha1').served().referencable()
      .spec().with(crossplane.Prop.for({
        object: (spec) => {
          spec.propObject('parameters').required().with(crossplane.Prop.for({
            object: (params) => {
              params.uiSection( {
                title: 'Database Size',
                description: 'Enter information to size your database',
              });

              xrdStorageGB = params.propInteger('storageGB').required().min(1).max(500)
                .description('GB of storage for your database')
                .uiInput({
                  name: 'storageGB',
                  inputType: crossplane.InputType.SINGLE_INPUT,
                  title: 'Storage (GB)',
                  default: 5,
                });

              params.propObject('networkRef').required()
                .description('A reference to the Network object that this postgres should be connected to.')
                .with(crossplane.Prop.for({
                  object: (networkRef) => {

                    xrdNetRef = networkRef.propString('id')
                      .description('ID of the Network object this ref points to.')
                      .required()
                      .uiInput({
                        name: 'networkRef',
                        inputType: crossplane.InputType.SINGLE_INPUT,
                        title: 'Network Ref',
                        default: 'platform-ref-aws-network',
                        customError: 'Network ref is required and should match the network ref of the app cluster.',
                      });

                  },
                }));

              params.propString('writeSecretRef').implicit().required()
                .uiInput({
                  name: 'writeSecretRef',
                  inputType: crossplane.InputType.SINGLE_INPUT,
                  title: 'Connection Secret Ref',
                  description: 'name of the secret to write to this namespace',
                  default: 'db-conn',
                  path: '.spec.writeConnectionSecretToRef.name',
                });
            },
          }));

        },
      }));

    const composition = new crossplane.Composition(this, 'postgres-composition', xrd, {
      name: 'compositepostgresqlinstances.aws.platformref.crossplane.io',
      metadata: {
        labels: {
          provider: 'aws',
        },
      },
    });

    //TODO: use imported provider-aws types
    composition.addResource(db.DbSubnetGroup.manifest({
      spec: {
        forProvider: {
          region: 'us-west-2',
          description: 'An excellent formation of subnetworks.',
        },
        deletionPolicy: db.DbSubnetGroupSpecDeletionPolicy.DELETE,
      },
    }))
      .mapFieldPath(xrdNetRef!.meta.path, 'spec.forProvider.subnetIdSelector.matchLabels[networks.aws.platformref.crossplane.io/network-id]');

    composition.addResource(db.RdsInstance.manifest({
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
          name: 'default-db-conn',
        },
        deletionPolicy: db.RdsInstanceSpecDeletionPolicy.DELETE,
      },
    }))
      .mapFieldPathXFormStringFormat('metadata.uid', '%s-postgresql', 'spec.writeConnectionSecretToRef.name')
      .mapFieldPath(xrdStorageGB!.meta.path, 'spec.forProvider.allocatedStorage')
      .mapFieldPath(xrdNetRef!.meta.path, 'spec.forProvider.vpcSecurityGroupIDSelector.matchLabels[networks.aws.platformref.crossplane.io/network-id]')
      .connectionDetailsFromXrd();

  }
}
