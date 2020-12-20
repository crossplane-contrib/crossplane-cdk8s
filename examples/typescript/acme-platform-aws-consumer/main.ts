import { App, Chart } from 'cdk8s';
import { Construct } from 'constructs';
import * as acme from './imports/aws.platform.acme.io';

class MyChart extends Chart {
  constructor(scope: Construct, id: string) {
    super(scope, id, {
      namespace: 'team1',
    });

    const clusterId = 'acme-platform-aws-cluster';
    const networkId = 'acme-platform-aws-network';

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


    new acme.PostgreSqlInstance(this, 'database', {
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
new MyChart(app, 'dev-env');

app.synth();
