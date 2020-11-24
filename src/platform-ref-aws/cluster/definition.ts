import { App, Chart } from 'cdk8s';
import { CompositeResourceDefinition } from '../../crossplane/imports/apiextensions.crossplane.io';

export default function generate(crossplanePackage: App) {

  const definitionYaml = new Chart(crossplanePackage, 'compositeclusters-definition');

  new CompositeResourceDefinition(definitionYaml, 'compositeclusters.aws.platformref.crossplane.io', {
    metadata: {
      name: 'compositeclusters.aws.platformref.crossplane.io',
      annotations: {
        'upbound.io/ui-schema': '---\nconfigSections:\n- title: Cluster Info\n  description: Information about this cluster\n  items:\n  - name: id\n    controlType: singleInput\n    type: string\n    path: ".spec.id"\n    title: Cluster ID\n    description: Cluster ID that other objects will use to refer to this cluster\n    default: platform-ref-aws-cluster\n    validation:\n    - required: true\n      customError: Cluster ID is required.\n  - name: writeSecretRef\n    controlType: singleInput\n    type: string\n    path: ".spec.writeConnectionSecretToRef.name"\n    title: Connection Secret Ref\n    description: name of the secret to write to this namespace\n    default: cluster-conn\n    validation:\n    - required: true\n- title: Cluster Nodes\n  description: Enter information to size your cluster\n  items:\n  - name: clusterNodeCount\n    controlType: singleInput\n    type: integer\n    path: ".spec.parameters.nodes.count"\n    title: Node Count\n    description: Number of nodes in the cluster\n    default: 1\n    validation:\n    - minimum: 1\n    - maximum: 100\n    - required: true\n      customError: Node count is required.\n  - name: clusterNodeSize\n    controlType: singleSelect\n    path: ".spec.parameters.nodes.size"\n    title: Node Size\n    description: Desired node count, from 1 to 100.\n    default: small\n    enum:\n    - small\n    - medium\n    - large\n    validation:\n    - required: true\n      customError: Node size is required.\n- title: Cluster Networking\n  description: Select a network fabric for your cluster\n  items:\n  - name: networkRef\n    controlType: singleInput\n    type: string\n    path: ".spec.parameters.networkRef.id"\n    title: Network Ref\n    description: Network fabric to connect the database to\n    default: platform-ref-aws-network\n    validation:\n    - required: true\n      customError: Network ref is required.\n- title: Cluster Services\n  description: Configure cluster services and operators\n  items:\n  - name: promVersion\n    controlType: singleInput\n    type: string\n    path: ".spec.parameters.services.operators.prometheus.version"\n    title: Prometheus Chart Version\n    description: The version of kube-prometheus-stack chart to install\n    default: 10.1.0\n    validation:\n    - required: false',
      },
    },
    spec: {
      claimNames: {
        kind: 'Cluster',
        plural: 'clusters',
      },
      connectionSecretKeys: [
        'kubeconfig',
      ],
      group: 'aws.platformref.crossplane.io',
      names: {
        kind: 'CompositeCluster',
        plural: 'compositeclusters',
      },
      versions: [
        {
          name: 'v1alpha1',
          served: true,
          referenceable: true,
          schema: {
            openAPIV3Schema: {
              type: 'object',
              properties: {
                spec: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      description: 'ID of this Cluster that other objects will use to refer to it.',
                    },
                    parameters: {
                      type: 'object',
                      description: 'Cluster configuration parameters.',
                      properties: {
                        nodes: {
                          type: 'object',
                          description: 'Cluster node configuration parameters.',
                          properties: {
                            count: {
                              type: 'integer',
                              description: 'Desired node count, from 1 to 100.',
                            },
                            size: {
                              type: 'string',
                              description: 'Size of node.',
                              enum: [
                                'small',
                                'medium',
                                'large',
                              ],
                            },
                          },
                          required: [
                            'count',
                            'size',
                          ],
                        },
                        services: {
                          type: 'object',
                          description: 'Services configuration parameters.',
                          properties: {
                            operators: {
                              type: 'object',
                              description: 'Configuration for operators.',
                              properties: {
                                prometheus: {
                                  type: 'object',
                                  description: 'Configuration for the Prometheus operator.',
                                  properties: {
                                    version: {
                                      type: 'string',
                                      description: 'Prometheus operator version to run.',
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                        networkRef: {
                          type: 'object',
                          description: 'A reference to the Network object that this cluster should be connected to.',
                          properties: {
                            id: {
                              type: 'string',
                              description: 'ID of the Network object this ref points to.',
                            },
                          },
                          required: [
                            'id',
                          ],
                        },
                      },
                      required: [
                        'nodes',
                        'networkRef',
                      ],
                    },
                  },
                  required: [
                    'name',
                    'parameters',
                  ],
                },
              },
            },
          },
        },
      ],
    },
  });
}