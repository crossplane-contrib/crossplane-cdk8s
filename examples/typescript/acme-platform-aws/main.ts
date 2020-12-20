import { App } from 'cdk8s';
import { ClusterChart } from './charts/cluster';
import { ConfigurationChart } from './charts/config';
import { NetworkChart } from './charts/network';
import { PostgresChart } from './charts/postgres';

const pkg = new App();

new ConfigurationChart(pkg, 'crossplane');
new ClusterChart(pkg, 'cluster-api');
new PostgresChart(pkg, 'postgres-api');
new NetworkChart(pkg, 'network-api');

pkg.synth();
