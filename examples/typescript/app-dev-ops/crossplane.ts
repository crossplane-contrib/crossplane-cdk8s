import { App, Chart } from 'cdk8s';
import { eksCluster } from './crs/cluster.aws.platformref.crossplane.io';
import { networkFabric } from './crs/network.aws.platformref.crossplane.io';
import { postgresInstance } from './crs/postgresqlinstance.aws.platformref.crossplane.io';

const app = new App();
const chart = new Chart(app, 'dev-env');

eksCluster(chart);
networkFabric(chart);
postgresInstance(chart);

app.synth();