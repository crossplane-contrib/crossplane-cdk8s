import { App, Chart, Testing } from 'cdk8s';
import * as l2 from '../src';
import * as comp from './crs/composition.apiextensions.crossplane.io';
import * as xrds from './crs/xrd.apiextensions.crossplane.io';

test('compositeClusters', () => {

  const crossplanePackage = new App();

  const crossplaneYaml = new Chart(crossplanePackage, 'crossplane');

  const pkg = new l2.Configuration(crossplaneYaml, 'platform-ref-aws', {
    name: 'platform-ref-aws',
    company: 'Upbound',
    maintainer: 'Jared Watts <jared@upbound.io>',
    keywords: ['aws', 'cloud-native', 'kubernetes', 'example', 'platform', 'reference'],
    source: 'github.com/upbound/platform-ref-aws',
    license: 'Apache-2.0',
    descriptionShort: 'The AWS reference platform for Kubernetes and Data Services.\n',
    description: 'This reference platform Configuration for Kubernetes and Data Services\nis a starting point to build, run, and operate your own internal cloud\nplatform and offer a self-service console and API to your internal teams.\n',
    readme: 'This reference platform `Configuration` for Kubernetes and Data Services\nis a starting point to build, run, and operate your own internal cloud\nplatform and offer a self-service console and API to your internal teams.\nIt provides platform APIs to provision fully configured EKS clusters,\nwith secure networking, and stateful cloud services (RDS) designed to\nsecurely connect to the nodes in each EKS cluster -- all composed using\ncloud service primitives from the [Crossplane AWS\nProvider](https://doc.crds.dev/github.com/crossplane/provider-aws). App\ndeployments can securely connect to the infrastructure they need using\nsecrets distributed directly to the app namespace.\n\n[Quickstart\nGuide](https://github.com/upbound/platform-ref-aws/#quick-start)\n\n[APIs in this\nConfiguration](https://github.com/upbound/platform-ref-aws/#apis-in-this-configuration)\n\nTo learn more checkout the [GitHub\nrepo](https://github.com/upbound/platform-ref-aws/) that you can copy and\ncustomize to meet the exact needs of your organization!\n',
    crossplaneVersion: '>=v1.0.0-0',
  });

  pkg.addProvider('crossplane/provider-aws', '>=v0.14.0-0');
  pkg.addProvider('crossplane/provider-helm', '>=v0.3.6-0');

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