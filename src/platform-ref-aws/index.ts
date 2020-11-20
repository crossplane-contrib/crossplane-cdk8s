import { App, Chart } from 'cdk8s';
import { Configuration } from '../crossplane/imports/meta.pkg.crossplane.io';
import databasePostgresDefinition from './database/postgres/definition'
import databasePostgresComposition from './database/postgres/composition'
import networkDefinition from './network/definition'
import networkComposition from './network/composition'
import clusterDefinition from './cluster/definition'

const crossplanePackage = new App();

const crossplaneYaml = new Chart(crossplanePackage, 'crossplane');
new Configuration(crossplaneYaml, 'platform-ref-aws', { 
  metadata: {
    name: "platform-ref-aws",
    annotations: {
      company: "Upbound",
      maintainer: "Jared Watts <jared@upbound.io>",
      keywords: "aws, cloud-native, kubernetes, example, platform, reference",
      source: "github.com/upbound/platform-ref-aws",
      license: "Apache-2.0",
      descriptionShort: "The AWS reference platform for Kubernetes and Data Services.\n",
      description: "This reference platform Configuration for Kubernetes and Data Services\nis a starting point to build, run, and operate your own internal cloud\nplatform and offer a self-service console and API to your internal teams.\n",
      readme: "This reference platform `Configuration` for Kubernetes and Data Services\nis a starting point to build, run, and operate your own internal cloud\nplatform and offer a self-service console and API to your internal teams.\nIt provides platform APIs to provision fully configured EKS clusters,\nwith secure networking, and stateful cloud services (RDS) designed to\nsecurely connect to the nodes in each EKS cluster -- all composed using\ncloud service primitives from the [Crossplane AWS\nProvider](https://doc.crds.dev/github.com/crossplane/provider-aws). App\ndeployments can securely connect to the infrastructure they need using\nsecrets distributed directly to the app namespace.\n\n[Quickstart\nGuide](https://github.com/upbound/platform-ref-aws/#quick-start)\n\n[APIs in this\nConfiguration](https://github.com/upbound/platform-ref-aws/#apis-in-this-configuration)\n\nTo learn more checkout the [GitHub\nrepo](https://github.com/upbound/platform-ref-aws/) that you can copy and\ncustomize to meet the exact needs of your organization!\n"
    }
  },
  spec: {
    crossplane: {
      version: ">=v0.14.0-0"
    },
    dependsOn: [
      {
        provider: "crossplane/provider-aws",
        version: ">=v0.15.0-0"
      },
      {
        provider: "crossplane/provider-helm",
        version: ">=v0.3.7-0"
      }
    ]
  }
});

databasePostgresDefinition(crossplanePackage);
databasePostgresComposition(crossplanePackage);

networkDefinition(crossplanePackage);
networkComposition(crossplanePackage);

clusterDefinition(crossplanePackage);

crossplanePackage.synth();