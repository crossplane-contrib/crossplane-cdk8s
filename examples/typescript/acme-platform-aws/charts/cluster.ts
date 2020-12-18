import { Chart } from 'cdk8s';
import { Construct } from 'constructs';
import * as crossplane from '../../../../src';
import * as comp from '../crs/composition.apiextensions.crossplane.io'
import * as xrds from '../crs/xrd.apiextensions.crossplane.io'

export class ClusterChart extends Chart {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const xrd = new crossplane.CompositeResourceDefinition(this, 'cluster-xrd', {
        name: 'compositeclusters.aws.platformref.crossplane.io'
    });

    xrd.group('aws.platformref.crossplane.io');
    xrd.claimKind('Cluster').plural('clusters');
    xrd.kind('CompositeCluster').plural('compositeclusters');
    xrd.connectionSecret().key('kubeconfig');

    xrd.version('v1alpha1').served().referencable().spec().with(crossplane.Prop.for({ object: (spec) => {
      spec.uiSection({
        title: 'Cluster Info',
        description: 'Information about this cluster',
      });
      spec.propString('id').required()
        .description('Cluster ID that other objects will use to refer to this cluster')
        .uiInput({
          title: 'Cluster ID',
          default: 'platform-ref-aws-cluster',
          customError: 'Cluster ID is required.'
        });
        
      spec.propString('writeSecretRef').implicit().required()
        .uiInput({
          title: 'Connection Secret Ref',
          description: 'name of the secret to write to this namespace',
          default: 'cluster-conn',
          path: '.spec.writeConnectionSecretToRef.name',
        });

      spec.propObject('parameters').required().description('Cluster node configuration parameters').with(crossplane.Prop.for({ object: (params) => {
        params.uiSection({
          title: 'Cluster Nodes',
          description: 'Enter information to size your cluster',
        });

        params.propObject('nodes').required().with(crossplane.Prop.for({ object: (nodes) => {
            nodes.propInteger('count').required().min(1).max(100)
              .description('Desired node count, from 1 to 100.')
              .uiInput({
                title: 'Node Count',
                default: 1,
                customError: 'Node count is required.'
              });

            nodes.propEnum('size').required().description('Size of node.')
              .enumValue('small', true)
              .enumValue('medium')
              .enumValue('large')
              .uiInput({
                title: 'Node Size',
                customError: 'Node size is required.'
              });

          }
        }));

        params.uiSection({
          title: 'Cluster Networking',
          description: 'Select a network fabric for your cluster',
        });
        params.propObject('networkRef').required()
          .description('A reference to the Network object that this cluster should be connected to.')
          .with(crossplane.Prop.for({ object: (networkRef) => {
              networkRef.propString('id').description('ID of the Network object this ref points to.').required()
                .uiInput({
                  title: 'Network Ref',
                  default: 'platform-ref-aws-network',
                  customError: 'Network ref is required and should match the network ref of the app cluster.',
                });
            }}));

        params.uiSection({
          title: 'Cluster Services',
          description: 'Configure cluster services and operators',
        });
        params.propObject('services').description('Services configuration parameters.').with(crossplane.Prop.for({ object: (services) => {
            services.propObject('operators').description('Configuration for operators.').with(crossplane.Prop.for({ object: (ops) => {
                ops.propObject('prometheus').description('Configuration for the Prometheus operator.').with(crossplane.Prop.for({ object: (prom) => {
                    prom.propString('version').description('The version of kube-prometheus-stack chart to install')
                      .uiInput({
                        title: 'Prometheus Chart Version',
                        default: '10.1.0',
                      });
                }}));
            }}));
        }}));
      }}));
    }}));

    comp.compositeclustersAwsPlatformrefCrossplaneIo(this, 'cluster-composition');

    xrds.eksAwsPlatformrefCrossplaneIo(this, 'eks-xrd');
    comp.eksAwsPlatformrefCrossplaneIo(this, 'eks-composition');

    xrds.servicesAwsPlatformrefCrossplaneIo(this, 'services-xrd');
    comp.servicesAwsPlatformrefCrossplaneIo(this, 'services-composition');
  }
}