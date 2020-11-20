import { App, Chart } from 'cdk8s';
import { CompositeResourceDefinition } from '../../crossplane/imports/apiextensions.crossplane.io';

export default function generate(crossplanePackage: App){

  const definitionYaml = new Chart(crossplanePackage, 'network-definition');

  new CompositeResourceDefinition(definitionYaml, 'compositenetworks.aws.platformref.crossplane.io', {
    metadata: {
      name: "compositenetworks.aws.platformref.crossplane.io",
    },
    spec: {
      claimNames: {
        kind: "Network",
        plural: "networks"
      },
      group: "aws.platformref.crossplane.io",
      names: {
        kind: "CompositeNetwork",
        plural: "compositenetworks"
      },
      versions: [
        {
          name: "v1alpha1",
          served: true,
          referenceable: true,
          schema: {
            openAPIV3Schema: {
              type: "object",
              properties: {
                "spec": {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      description: "ID of this Network that other objects will use to refer to it."
                    },
                    clusterRef: {
                      type: "object",
                      description: "A reference to the Cluster object that this network will be used for.",
                      properties: {
                        id: {
                          type: "string",
                          description: "ID of the Cluster object this ref points to."
                        }
                      },
                      required: [ "id" ]
                    }
                  },
                  required: [ "id", "clusterRef" ]
                }
              }
            }
          }
        }
      ]
    }
  });
}