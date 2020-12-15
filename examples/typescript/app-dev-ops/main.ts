import { App, Chart } from 'cdk8s';
import { Construct } from 'constructs';
import * as acme from './imports/aws.platformref.crossplane.io';

class MyChart extends Chart {
  constructor(scope: Construct, id: string) {
    super(scope, id, {
      namespace: 'team1',
    });

    const clusterId = 'platform-ref-aws-cluster';
    const networkId = 'platform-ref-aws-network';
  
    new acme.Network(this, 'network', {
      spec: {
        id: networkId,
        clusterRef: { id: clusterId },
      },
    });

    new acme.Cluster(this, 'cluster', {
      spec: {
        id: clusterId,
        parameters: {
          nodes: {
            count: 3,
            size: acme.ClusterSpecParametersNodesSize.SMALL,
          },
          services: {
            operators: {
              prometheus: { version: '10.0.2' },
            },
          },
          networkRef: { id: networkId },
        },
        writeConnectionSecretToRef: { name: clusterId },
      },
    });


    new acme.PostgreSqlInstance(chart, 'database', {
      spec: {
        parameters: {
          storageGB: 20,
          networkRef: { id: networkId },
        },
        writeConnectionSecretToRef: {
          name: 'my-db-conn',
        },
      },
    });
  }
}

const app = new App();
const chart = new MyChart(app, 'dev-env');

app.synth();