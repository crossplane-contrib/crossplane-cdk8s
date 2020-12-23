# API Style no. 2 - more traditional OO

* Owner: Phil Prasek (@prasek)
* Status: Draft

## Background

The current fluent API (style no. 1) may not translate very well to all languages supported by [jsii](https://github.com/aws/jsii) -- the underlying tech to provide multi-language support, which supports a variety of OO lanaguages including Java, C#, and others.

Further, for more complex `XRDs` (Crossplane `CompositeResourceDefinitions`) the fluent API doesn't provide a clean way to reuse schema prop definitions across multiple `XRDs` like the Cluster `XRD` in the `acme-platform-aws` example, which wraps EKS and Services `XRDs` and associated `Compositions`. In the `Compositions` that map the Cluster `XRD` down to the EKS and Services `XRDs` there is a lot of boilerplate mapping stanzas, which could be automatically mapped if re-using and extending prop definitions across `XRDs` -- even if the `spec` paths change, for example:

```ts
{
  fromFieldPath: 'spec.parameters.services.operators.prometheus.version',
  toFieldPath: 'spec.operators.prometheus.version',
}
```

See [#30](https://github.com/crossplane-contrib/crossplane-cdk8s/issues/30).

## Proposal

Provide a more traditional OO API style (no. 2) that maps cleanly to all languages supported by `jsii` and supports `XRD` schema prop reuse across `XRDs` and the option to auto-map fields from a parent `XRD` to a composed `XRD`, even if the `spec` fields change (e.g. remove a portion of the path hierarchy like the Services `XRD` does).

### Authorship Experience

The following sketch illustrates the proposed Dev UX:

This cdk8s Chart would synth the content for the following XRDs and backing `Compositions`:

* `CompositeCluster.aws.platform.acme.io`
* `EKS.aws.platform.acme.io`
* `Services.aws.platform.acme.io`

```ts
import { Chart } from 'cdk8s';
import { Construct } from 'constructs';
import { PropType, MetaUI } from 'crossplane-cdk8s';
import * as crossplane from 'crossplane-cdk8s';
import * as iam from '../imports/identity.aws.crossplane.io';
import * as eks from '../imports/eks.aws.crossplane.io';
import * as helm from '../imports/helm.crossplane.io';

const PATH_METADATA_UID = 'metadata.uid';
const PATH_METADATA_NAME = 'metadata.name';
const PATH_METADATA_LABELS = 'metadata.labels';
const PATH_METADATA_ANNOTATIONS = 'metadata.annotations'
const PATH_EXTERNAL_NAME = 'metadata.annotations[crossplane.io/external-name]';
const PATH_CONN_SECRET_NAME = 'spec.writeConnectionSecretToRef.name';
const PATH_CONN_SECRET_NAMESPACE = 'spec.writeConnectionSecretToRef.namespace';

enum NodeSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export class ClusterChart extends Chart {

  private id: StringProp = stringProp({
    path: 'spec.id',
    description: 'Cluster ID that other objects will use to refer to this cluster',
    requireAllInPath: true,
  });

  private networkRef: StringProp = stringProp({
    path: 'spec.parameters.networkRef.id',
    description: 'A reference to the Network object that this Cluster should be connected to.',
    requireAllInPath: true,
  });

  private nodeCount: IntegerProp = integerProp({
    path: 'spec.parameters.nodes.count',
    description: 'Desired node count, from 1 to 100.',
    requireAllInPath: true,
  });

  private nodeSize: EnumProp = enumProp({
    path: 'spec.parameters.nodes.size',
    description: 'Size of node.',
    requireAllInPath: true,
    enum: [
      NodeSize.SMALL,
      NodeSize.MEDIUM,
      NodeSize.LARGE,
    ]
  });

  private promVersion: StringProp = stringProp({
    path: 'spec.parameters.services.operators.prometheus.version',
    description: 'The version of kube-prometheus-stack chart to install.',
    requireAllInPath: true,
  });

  private connectionSecret: ConnectionSecretProps = {
    defaultNamespace: 'crossplane-system',
    keys: [`kubeconfig`]
  };

  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Cluster XRD
    const xrdCluster = new crossplane.CompositeResourceDefinition(this, 'cluster-xrd', {
      name: 'compositeclusters.aws.platform.acme.io',
      group: 'aws.platform.acme.io',
      claimKind: {
        name: 'Cluster',
        plural: 'clusters',
      },
      kind: {
        name: 'CompositeCluster',
        plural: 'compositeclusters'
      },
      connectionSecret: this.connectionSecret,
      versions: [
        {
          name: 'v1alpha1',
          served: true,
          referenceable: true,
          schemaSpec: [
            this.id,
            this.networkRef,
            this.nodeCount,
            this.nodeSize,
            this.promVersion,
          ],
        }
      ],
    });

    const xrdEKS = this.eks();
    const xrdServices = this.services();

    // Cluster Composition
    const clusterComp = new crossplane.Composition(this, 'cluster-comp', xrdCluster, {
      name: 'compositeclusters.aws.platform.acme.io',
      metadata: {
        labels: {
          provider: 'aws',
        },
      },
    });

    // auto mapped patches for reused props
    clusterComp.addXrdResource(xrdEKS)
    .patch(this.id.path, PATH_EXTERNAL_NAME)
    .patchXFormStringFormat(PATH_METADATA_UID, '%s-eks', PATH_CONN_SECRET_NAME)
    .connectionDetailsFromXrd();

    // auto mapped patches for reused props
    clusterComp.addXrdResource(xrdServices)

    //optional Upbound UI meta
    this.clusterUI(clusterXrd);
  }

  private eks(): crossplane.CompositeResourceDefinition {
    // EKS XRD
    const xrd = new crossplane.CompositeResourceDefinition(this, 'eks-xrd', {
      name: 'eks.aws.platform.acme.io',
      group: 'aws.platform.acme.io',
      kind: {
        name: 'EKS',
        plural: 'eks'
      },
      connectionSecret: this.connectionSecret, 
      versions: [
        {
          name: 'v1alpha1',
          served: true,
          referenceable: true,
          schemaSpec: [
            this.id,
            this.networkRef,
            this.nodeCount,
            this.nodeSize,
          ],
        }
      ],
    });

    // EKS Compositions
    const ROLE_CONTROLPLANE = 'controlplane';
    const ROLE_NODEGROUP = 'nodegroup';

    enum IamPolicy {
      EKSWorkerNodePolicy = 'AmazonEKSWorkerNodePolicy',
      EKS_CNI_Policy = 'AmazonEKS_CNI_Policy',
      EC2ContainerRegistryReadOnly = 'AmazonEC2ContainerRegistryReadOnly',
    }

    enum Ec2InstanceType {
      T3_SMALL = 't3.small',
      T3_MEDIUM = 't3.medium',
      T3_LARGE = 't3.large',
    }

    const instanceTypeMap: any = {};
    instanceTypeMap[NodeSize.SMALL] = Ec2InstanceType.T3_SMALL;
    instanceTypeMap[NodeSize.MEDIUM] = Ec2InstanceType.T3_MEDIUM;
    instanceTypeMap[NodeSize.LARGE] = Ec2InstanceType.T3_LARGE;

    const DEFAULT_REGION = 'us-west-2';
    const DEFAULT_K8S_VERSION = '1.16';
    const DEFAULT_INSTANCE_TYPE = Ec2InstanceType.T3_SMALL;

    const eksComp = new crossplane.Composition(this, 'eks-comp', xrd, {
      name: 'eks.aws.platform.acme.io',
      metadata: {
        labels: {
          provider: 'aws',
        },
      },
    });

    eksComp.addResource(this.getIamRole(ROLE_CONTROLPLANE, `
      {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": {
                    "Service": [
                        "eks.amazonaws.com"
                    ]
                },
                "Action": [
                    "sts:AssumeRole"
                ]
            }
        ]
      } 
    `));
    eksComp.addResource(this.getIamRolePolicyAttachment(ROLE_CONTROLPLANE, 'AmazonEKSClusterPolicy'));

    eksComp.addResource(this.getIamRole(ROLE_NODEGROUP, `
          { 
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Principal": {
                        "Service": [
                            "eks.amazonaws.com"
                        ]
                    },
                    "Action": [
                        "sts:AssumeRole"
                    ]
                }
            ]
          } 
    `));
    eksComp.addResource(this.getIamRolePolicyAttachment(ROLE_NODEGROUP, IamPolicy.EKSWorkerNodePolicy));
    eksComp.addResource(this.getIamRolePolicyAttachment(ROLE_NODEGROUP, IamPolicy.EKS_CNI_Policy));
    eksComp.addResource(this.getIamRolePolicyAttachment(ROLE_NODEGROUP, IamPolicy.EC2ContainerRegistryReadOnly));

    eksComp.addResource(eks.Cluster.manifest({
      spec: { 
        forProvider: {
          region: DEFAULT_REGION,
          roleArnSelector: {
            matchControllerRef: true,
            matchLabels: {
              role: ROLE_CONTROLPLANE,
            },
          },
          resourcesVpcConfig: {
            endpointPrivateAccess: true,
            endpointPublicAccess: true,
          },
          version: DEFAULT_K8S_VERSION,
        },
      },
    }))
    .patch(PATH_EXTERNAL_NAME)
    .patch(PATH_CONN_SECRET_NAMESPACE)
    .patchXFormStringFormat(PATH_METADATA_UID, '%s-ekscluster', PATH_CONN_SECRET_NAME)
    .patch(this.networkRef.path, 'spec.forProvider.resourcesVpcConfig.securityGroupIdSelector.matchLabels[networks.aws.platformref.crossplane.io/network-id]')
    .patch(this.networkRef.path, 'spec.forProvider.resourcesVpcConfig.subnetIdSelector.matchLabels[networks.aws.platformref.crossplane.io/network-id]')
    .connectionDetailsFromXrd();

    const nodeGroup = eksComp.addResource(eks.NodeGroup.manifest({
      spec: { 
        forProvider: {
          region: DEFAULT_REGION,
          clusterNameSelector: {
            matchControllerRef: true,
          },
          nodeRoleSelector: {
            matchControllerRef: true,
            matchLabels: {
              role: ROLE_NODEGROUP,
            }
          },
          subnetSelector: {
            matchLabels: {
              access: 'public',
            }
          },
          scalingConfig: {
            minSize: 1,
            maxSize: 100,
            desiredSize: 1,
          },
          instanceTypes: [DEFAULT_INSTANCE_TYPE]
        }
      },
    }));
    nodeGroup.patch(PATH_EXTERNAL_NAME);
    nodeGroup.patch(this.nodeCount.path, 'spec.forProvider.scalingConfig.desiredSize');
    nodeGroup.patchXformMap(this.nodeSize.path, instanceTypeMap, 'spec.forProvider.instanceTypes[0]');
    nodeGroup.patch(this.networkRef.path, 'spec.forProvider.subnetSelector.matchLabels[networks.aws.platformref.crossplane.io/network-id]');

    const helmConfig = eksComp.addResource(helm.ProviderConfig.manifest({
      spec: { 
        credentials: {
          source: helm.ProviderConfigSpecCredentialsSource.SECRET,
          secretRef: {
            namespace: 'crossplane-system',
            name: 'default-name',
            key: 'kubeconfig',
          }
        }
      },
    }));
    helmConfig.patch(this.id.path, PATH_METADATA_NAME);
    helmConfig.patchXFormStringFormat(PATH_METADATA_UID, '%s-ekscluster', PATH_CONN_SECRET_NAME)
    helmConfig.skipReadinessChecks();

    return xrd;
  }

  private services(): crossplane.CompositeResourceDefinition {
    // Services XRD
    const providerConfigRefName: StringProp = {
      ...this.id,
      path: 'spec.providerConfigRef.name',
    };

    const servicesPromVersion: StringProp = {
      ...this.promVersion,
      path: 'operators.prometheus.version'
    }

    const xrd = new crossplane.CompositeResourceDefinition(this, 'services-xrd', {
      name: 'services.aws.platform.acme.io',
      group: 'aws.platform.acme.io',
      kind: {
        name: 'Services',
        plural: 'services'
      },
      connectionSecret: this.connectionSecret,
      versions: [
        {
          name: 'v1alpha1',
          served: true,
          referenceable: true,
          schemaSpec: [
            providerConfigRefName,
            servicesPromVersion,
          ],
        }
      ],
    });

    // Services Compositions
    const servicesComp = new crossplane.Composition(this, 'services-comp', xrd, {
      name: 'services.aws.platform.acme.io',
      metadata: {
        labels: {
          provider: 'aws',
        },
      },
    });

    servicesComp.addResource(helm.Release.manifest({
      spec: {
      rollbackLimit: 3,
      forProvider: {
        namespace: 'operators',
        chart: {
          // from https://github.com/prometheus-community/helm-charts
          // Note that default values are overridden by the patches below.
          name: 'kube-prometheus-stack',
          repository: 'https://prometheus-community.github.io/helm-charts',
          version: "10.1.0",
        },
        values: {}
      }
    }}));

    servicesComp.patch(PATH_METADATA_LABELS);
    servicesComp.patch(PATH_METADATA_ANNOTATIONS);
    servicesComp.patch(providerConfigRefName.path);
    servicesComp.patch(servicesPromVersion.path, 'spec.forProvider.chart.version');

    return xrd;
  }

  private getIamRole(role: string, policy: string): iam.IamRoleProps {
    return iam.IamRole.manifest({
      metadata: { labels: { role: role }},
      spec: { 
        forProvider: {
          assumeRolePolicyDocument: policy
        }
      },
    })
  }

  private getIamRolePolicyAttachment(role: string, policy: string): iam.IamRolePolicyAttachmentProps {
    return iam.IamRolePolicyAttachment.manifest({
      spec: { 
        forProvider: {
          policyArn: `arn:aws:iam::aws:policy/${policy}`,
          roleNameSelector: {
            matchControllerRef: true,
            matchLabels: {
              role: role,
            },
          },
        },
      },
    });
  }

  private clusterUI(xrd: crossplane.CompositeResourceDefinition) {
    const ui: MetaUI = xrd.ui;

    // Cluster Info
    const info = ui.addSection({
      title: 'Cluster Info',
      description: 'Info about this cluster.',
    });

    info.addStringInput(this.id, {
      title: 'Cluster ID',
      default: 'acme-platform-aws-cluster',
      customError: 'Cluster ID is required.'
    });


    info.addStringInput({
      path: PATH_WRITE_CONN_SECRET_NAME,
      description: 'name of the secret to write to this secret',
      required: true,
    }, {
      title: 'Connection Secret Ref',
      default: 'cluster-conn',
    });

    // Cluster Info
    const nodes = ui.addSection({
      title: 'Cluster Nodes',
      description: 'Enter information to size your cluster.',
    });

    nodes.addIntegerInput(this.nodeCount,{
      title: 'Node Count',
      default: 1,
      customError: 'Node count is required.'
    });

    nodes.addEnumInput(this.nodeSize, {
      title: 'Node Size',
      default: NodeSize.SMALL,
      customError: 'Node size is required.'
    });

    // Cluster Networking
    const net = ui.addSection({
      title: 'Cluster Networking',
      description: 'Info about this cluster.',
    });

    net.addStringInput(this.networkRef, {
      title: 'Network Ref',
      default: 'acme-platform-aws-network',
      customError: 'Network ref is required and should match the network ref of the app cluster.',
    });

    // Cluster Services
    const services = ui.addSection({
      title: 'Cluster Services',
      description: 'Info about this cluster.',
    });

    services.addStringInput(this.promVersion, {
      title: 'Prometheus Chart Version',
      default: '10.1.0',
    });
  }
}
```
