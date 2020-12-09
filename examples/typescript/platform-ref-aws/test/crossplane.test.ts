import { App, Chart, Testing } from 'cdk8s';

import * as comp from '../crs/composition.apiextensions.crossplane.io';
import * as xrds from '../crs/xrd.apiextensions.crossplane.io';
import * as config from '../crs/configuration.meta.pkg.crossplane.io';

test('platform-ref-aws', () => {

const crossplanePackage = new App();

const crossplaneYaml = new Chart(crossplanePackage, 'crossplane');
config.platformRefAws(crossplaneYaml, 'platform-ref-aws)')

const dbYaml = new Chart(crossplanePackage, 'postgres-api');
xrds.compositepostgresqlinstancesAwsPlatformrefCrossplaneIo(dbYaml, 'postgres-xrd');
comp.compositepostgresqlinstancesAwsPlatformrefCrossplaneIo(dbYaml, 'postgres-composition');

const networkYaml = new Chart(crossplanePackage, 'network-api');
xrds.compositenetworksAwsPlatformrefCrossplaneIo(networkYaml, 'network-xrd');
comp.compositenetworksAwsPlatformrefCrossplaneIo(networkYaml, 'network-composition');

const clusterYaml = new Chart(crossplanePackage, 'cluster-api');
xrds.compositeclustersAwsPlatformrefCrossplaneIo(clusterYaml, 'cluster-xrd');
comp.compositeclustersAwsPlatformrefCrossplaneIo(clusterYaml, 'cluster-composition');

xrds.eksAwsPlatformrefCrossplaneIo(clusterYaml, 'eks-xrd');
comp.eksAwsPlatformrefCrossplaneIo(clusterYaml, 'eks-composition');

xrds.servicesAwsPlatformrefCrossplaneIo(clusterYaml, 'services-xrd');
comp.servicesAwsPlatformrefCrossplaneIo(clusterYaml, 'services-composition');

expect(Testing.synth(crossplaneYaml)).toMatchSnapshot();
expect(Testing.synth(dbYaml)).toMatchSnapshot();
expect(Testing.synth(networkYaml)).toMatchSnapshot();
expect(Testing.synth(clusterYaml)).toMatchSnapshot();
});