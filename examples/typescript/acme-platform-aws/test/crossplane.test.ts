import { App, Testing } from 'cdk8s';
import { ClusterChart } from '../charts/cluster';
import { ConfigurationChart } from '../charts/config';
import { NetworkChart } from '../charts/network';
import { PostgresChart } from '../charts/postgres';

test('acme-platform-aws', () => {
  const pkg = new App();
  expect(Testing.synth(new ConfigurationChart(pkg, 'crossplane'))).toMatchSnapshot();
  expect(Testing.synth(new PostgresChart(pkg, 'postgres-api'))).toMatchSnapshot();
  expect(Testing.synth(new NetworkChart(pkg, 'network-api'))).toMatchSnapshot();
  expect(Testing.synth(new ClusterChart(pkg, 'cluster-api'))).toMatchSnapshot();
});
