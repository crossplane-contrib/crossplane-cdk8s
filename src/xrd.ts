import * as cdk8s from 'cdk8s';
import { Construct } from 'constructs';
import { Resource } from './base';
import * as l1 from './imports/apiextensions.crossplane.io';
import { undefinedIfEmpty } from './utils';

/**
 * An CompositeResourceDefinition defines a new kind of composite infrastructure resource. The new resource is composed of other composite or managed infrastructure resources.
 *
 * @schema CompositeResourceDefinition
 */
export class CompositeResourceDefinition extends Resource {
  /**
   * Defines a "CompositeResourceDefinition" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialiation props
   */

  /**
   * @see base.Resource.apiObject
   */
  protected readonly apiObject: cdk8s.ApiObject;

  private _group?: string;
  private _claimNames?: Names;
  private _names?: Names;
  private _connectionSecret?: ConnectionSecret;
  private _versions: Version[] = [];

  public constructor(scope: Construct, id: string, props: CompositeResourceDefinitionProps = {} ) {
    super(scope, id, { metadata: props.metadata });

    const name = props.name ?? id;

    let annotations: any = { };
    /*
    if (props.uiSchema) { annotations['upbound.io/ui-schema'] = props.uiSchema; }
      metadata: {
        name: 'compositeclusters.aws.platformref.crossplane.io',
        annotations: {
          'upbound.io/ui-schema': '---\nconfigSections:\n- title: Cluster Info\n  description: Information about this cluster\n  items:\n  - name: id\n    controlType: singleInput\n    type: string\n    path: ".spec.id"\n    title: Cluster ID\n    description: Cluster ID that other objects will use to refer to this cluster\n    default: platform-ref-aws-cluster\n    validation:\n    - required: true\n      customError: Cluster ID is required.\n  - name: writeSecretRef\n    controlType: singleInput\n    type: string\n    path: ".spec.writeConnectionSecretToRef.name"\n    title: Connection Secret Ref\n    description: name of the secret to write to this namespace\n    default: cluster-conn\n    validation:\n    - required: true\n- title: Cluster Nodes\n  description: Enter information to size your cluster\n  items:\n  - name: clusterNodeCount\n    controlType: singleInput\n    type: integer\n    path: ".spec.parameters.nodes.count"\n    title: Node Count\n    description: Number of nodes in the cluster\n    default: 1\n    validation:\n    - minimum: 1\n    - maximum: 100\n    - required: true\n      customError: Node count is required.\n  - name: clusterNodeSize\n    controlType: singleSelect\n    path: ".spec.parameters.nodes.size"\n    title: Node Size\n    description: Desired node count, from 1 to 100.\n    default: small\n    enum:\n    - small\n    - medium\n    - large\n    validation:\n    - required: true\n      customError: Node size is required.\n- title: Cluster Networking\n  description: Select a network fabric for your cluster\n  items:\n  - name: networkRef\n    controlType: singleInput\n    type: string\n    path: ".spec.parameters.networkRef.id"\n    title: Network Ref\n    description: Network fabric to connect the database to\n    default: platform-ref-aws-network\n    validation:\n    - required: true\n      customError: Network ref is required.\n- title: Cluster Services\n  description: Configure cluster services and operators\n  items:\n  - name: promVersion\n    controlType: singleInput\n    type: string\n    path: ".spec.parameters.services.operators.prometheus.version"\n    title: Prometheus Chart Version\n    description: The version of kube-prometheus-stack chart to install\n    default: 10.1.0\n    validation:\n    - required: false',
        },
      },
    */
    /*
      xrd.name = 'compositepostgresqlinstances.aws.platformref.crossplane.io';
      xrd.uiSchema = {
        configSections: [
          { title: 'Database Size',
            description: 'Enter information to size your database',
            items: [ {
              name: 'storageGB',
              controlType: 'singleInput',
              type: 'integer',
              path: '.spec.parameters.storageGB',
              title: 'Storage (GB)',
              description: 'The size in GB for database storage',
              default: 5,
              validation: {
                minimum: 1,
                maximum: 500,
                required: true
              },
            },
            {
              name: 'networkRef',
              controlType: 'singleInput',
              type: 'string',
              path: '.spec.parameters.networkRef.id',
              title: 'Network Ref',
              description: 'Network fabric to connect the database to',
              default: 'platform-ref-aws-network',
              validation: {
                required: true,
                customError: 'Network ref is required and should match the network ref of the app cluster.'
              },
            },
            {
              name: 'writeSecretRef',
              controlType: 'singleInput',
              type: 'string',
              path: '.spec.writeConnectionSecretToRef.name',
              title: 'Connection Secret Ref',
              description: 'name of the secret to write to this namespace',
              default: 'db-conn',
              validation: {
                required: true
              }
            } ]
          }
        ]
      }
      */

    // patch over props annotations
    if (props.metadata?.annotations) { annotations = { ...props.metadata.annotations, ...annotations }; }

    this.apiObject = new l1.CompositeResourceDefinition(this, name, {
      metadata: {
        ...props.metadata,
        name: name,
        annotations: annotations,
      },
      spec: cdk8s.Lazy.any({ produce: () => this._toL1() }),
    });
  }

  private _toL1(): l1.CompositeResourceDefinitionSpec {

    if (this._group === undefined) {
      throw new Error(`group is required for '${this.name}'`);
    }

    const versions = this._versionsToL1();
    if (versions === undefined) {
      throw new Error(`version is required for '${this.name}'`);
    }

    const kind = this._names?._toL1();
    if (kind === undefined) {
      throw new Error(`kind is required for '${this.name}'`);
    }

    return {
      claimNames: this._claimNames?._toL1(),
      group: this._group,
      names: kind,
      connectionSecretKeys: this._connectionSecret?._toL1(),
      versions: versions,
    };
  }

  private _versionsToL1(): l1.CompositeResourceDefinitionSpecVersions[] | undefined {
    const result = new Array();
    for (const version of this._versions) {
      result.push(version._toL1());
    }
    return undefinedIfEmpty(result);
  }

  public group(val: string): CompositeResourceDefinition {
    this._group = val;
    return this;
  }

  public version(name: string): Version {
    let version = this._versions.find(v => v._name == name);
    if (version === undefined) {
      version = new Version(this, name);
      this._versions.push(version);
    }
    return version;
  }

  public claimKind(kind:string): Names {
    this._claimNames = this._claimNames ?? new Names(this, kind);
    return this._claimNames;
  }

  public kind(kind:string): Names {
    this._names = this._names ?? new Names(this, kind);
    return this._names;
  }

  public connectionSecret(): ConnectionSecret {
    this._connectionSecret = this._connectionSecret ?? new ConnectionSecret();
    return this._connectionSecret;
  }
}

export class Names {
  private _xrd: CompositeResourceDefinition;
  private _categories: string[] = [];
  private _kind: string;
  private _listKind?: string;
  private _plural?: string;
  private _shortNames: string[] = [];
  private _singular?: string;

  public constructor(xrd: CompositeResourceDefinition, kind: string) {
    this._xrd = xrd;
    this._kind = kind;
  }

  /**
   * @internal
   */
  public _toL1(): l1.CompositeResourceDefinitionSpecClaimNames {
    if (this._plural === undefined) {
      throw new Error(`'names.plural' is required for ${this._xrd.name}`);
    }
    return {
      categories: undefinedIfEmpty(this._categories),
      kind: this._kind,
      listKind: this._listKind,
      plural: this._plural,
      shortNames: undefinedIfEmpty(this._shortNames),
      singular: this._singular,
    };
  }

  public category(val: string) {
    this._categories.push(val);
  }

  public listKind(val: string) {
    this._listKind = val;
  }

  public plural(val: string) {
    this._plural = val;
  }

  public shortNames(val: string) {
    this._shortNames.push(val);
  }

  public singular(val: string) {
    this._singular = val;
  }
}

export class ConnectionSecret {
  private _keys: string[] = [];

  /**
   * @internal
   */
  public _toL1(): string[] | undefined {
    return undefinedIfEmpty(this._keys);
  }

  public key(val: string): ConnectionSecret {
    this._keys.push(val);
    return this;
  }
}

export class Version {
  private _xrd: CompositeResourceDefinition;
  /**
   * @internal
   */
  public _name: string;
  private _served?: boolean;
  private _referencable?: boolean;
  private _spec?: SchemaPropObject;

  public constructor(xrd: CompositeResourceDefinition, name: string) {
    this._xrd = xrd;
    this._name = name;
  }

  public served(val: boolean = true): Version {
    this._served = val;
    return this;
  }

  public referencable(val: boolean = true): Version {
    this._referencable = val;
    return this;
  }

  public spec(): SchemaPropObject {
    this._spec = this._spec ?? new SchemaPropObject(this._xrd, '.', 'spec');
    return this._spec;
  }

  /**
   * @internal
   */
  public _toL1(): l1.CompositeResourceDefinitionSpecVersions {
    if (this._referencable === undefined) {
      throw new Error(`'referencable' is required on '${this._xrd.name}.spec.version["${this._name}"]'`);
    }

    if (this._served === undefined) {
      throw new Error(`'served' is required on '${this._xrd.name}.spec.version["${this._name}"]'`);
    }

    let schema: any = { };

    if (this._spec) {
      schema = {
        schema: {
          openAPIV3Schema: {
            type: 'object',
            properties: {
              spec: this._spec._toL1(),
            },
          },
        },
      };
    }

    return {
      name: this._name,
      referenceable: this._referencable,
      served: this._served,
      ...schema,
    };
  }
}

/**
 * JSII callback class/interface
 */
export class Prop {
  public static for(doer: IAnyProp): any {
    return new Prop(doer) as unknown as any;
  }

  private constructor(private readonly doer: IAnyProp) {}

  public object(prop: SchemaPropObject): any {
    return this.doer.object(prop);
  }
}

export interface IAnyProp {
  object( prop: SchemaPropObject): any;
}

/**
 * Schema Props
 */
export interface ISchemaPropMeta {
  readonly name: string;

  readonly required: boolean;

  /**
   * Additional attributes.
   */
  readonly [key: string]: any;
}

export interface ISchemaProp {
  readonly meta: ISchemaPropMeta;

  /**
   * @internal
   */
  _toL1(): any;
}

export class SchemaPropObject implements ISchemaProp {
  private _xrd: CompositeResourceDefinition;
  private _path: string;
  private _name: string;
  private _children: ISchemaProp[] = [];
  private _description?: string;
  private _required: boolean = false;

  public constructor(xrd: CompositeResourceDefinition, parentPath: string, name: string) {
    this._xrd = xrd;
    this._name = name;
    this._path = `${parentPath}.${name}`;
  }

  public get meta(): ISchemaPropMeta {
    return {
      name: this._name,
      required: this._required,
    };
  }

  public propObject(name: string): SchemaPropObject {
    const o = new SchemaPropObject(this._xrd, this._path, name);
    this._children.push(o);
    return o;
  }

  public propInteger(name: string): SchemaPropInteger {
    const o = new SchemaPropInteger(this._xrd, this._path, name);
    this._children.push(o);
    return o;
  }

  public propString(name: string): SchemaPropString {
    const o = new SchemaPropString(this._xrd, this._path, name);
    this._children.push(o);
    return o;
  }

  public description(val: string): SchemaPropObject {
    this._description = val;
    return this;
  }

  public required(val: boolean = true): SchemaPropObject {
    this._required = val;
    return this;
  }

  public with( prop: Prop): SchemaPropObject {
    prop.object(this);
    return this;
  }

  /**
   * @internal
   */
  public _toL1(): any {
    const required: string[] = [];
    const children: any = {};
    for (const child of this._children) {
      children[child.meta.name] = child._toL1();
      if (child.meta.required) {
        required.push(child.meta.name);
      }
    }

    return {
      description: this._description,
      properties: children,
      required: undefinedIfEmpty(required),
      type: 'object',
    };
  }
}

/**
 * UI Input Control Style
 */
export enum InputType {
  /**
   * Single input
   */
  SINGLE_INPUT = 'singleInput',
}

export class SchemaPropInteger implements ISchemaProp {
  //private _xrd: CompositeResourceDefinition;
  //private _path: string;
  private _name: string;
  private _description?: string;
  private _required: boolean = false;
  private _min?: number;
  private _max?: number;
  private _uiInputType?: InputType;
  private _uiName?: string;
  private _uiDescription?: string;
  private _uiDefault?: number;

  public constructor(_xrd: CompositeResourceDefinition, _parentPath: string, name: string) {
    //this._xrd = xrd;
    this._name = name;
    //this._path = `${parentPath}.${name}`;
  }

  public get meta(): ISchemaPropMeta {
    return {
      name: this._name,
      required: this._required,
      min: this._min,
      max: this._max,
      uiInputType: this._uiInputType,
      uiName: this._uiName,
      uiDescription: this._uiDescription,
      uiDefault: this._uiDefault,
    };
  }

  public description(val: string): SchemaPropInteger {
    this._description = val;
    return this;
  }

  public required(val: boolean = true): SchemaPropInteger {
    this._required = val;
    return this;
  }

  public min(val: number): SchemaPropInteger {
    this._min = val;
    return this;
  }

  public max(val: number): SchemaPropInteger {
    this._max = val;
    return this;
  }

  public uiInputSingle(): SchemaPropInteger {
    this._uiInputType = InputType.SINGLE_INPUT;
    return this;
  }

  public uiName(val: string): SchemaPropInteger {
    this._uiName = val;
    return this;
  }

  public uiDescription(val: string): SchemaPropInteger {
    this._uiDescription = val;
    return this;
  }

  public uiDefault(val: number): SchemaPropInteger {
    this._uiDefault = val;
    return this;
  }

  /**
   * @internal
   */
  public _toL1(): any {
    return {
      description: this._description,
      type: 'integer',
    };
  }
}

export class SchemaPropString implements ISchemaProp {
  //private _xrd: CompositeResourceDefinition;
  //private _path: string;
  private _name: string;
  private _description?: string;
  private _required: boolean = false;

  public constructor(_xrd: CompositeResourceDefinition, _parentPath: string, name: string) {
    //this._xrd = xrd;
    this._name = name;
    //this._path = `${parentPath}.${name}`;
  }

  public get meta(): ISchemaPropMeta {
    return {
      name: this._name,
      required: this._required,
    };
  }

  public description(val: string): SchemaPropString {
    this._description = val;
    return this;
  }

  public required(val: boolean = true): SchemaPropString {
    this._required = val;
    return this;
  }

  /**
   * @internal
   */
  public _toL1(): any {
    return {
      description: this._description,
      type: 'string',
    };
  }
}

/**
 * XRD Props
 */

/**
 * An CompositeResourceDefinition defines a new kind of composite infrastructure resource. The new resource is composed of other composite or managed infrastructure resources.
 *
 * @schema CompositeResourceDefinition
 */
export interface CompositeResourceDefinitionProps {
  /**
   * @schema metadata.name
   */
  readonly name?: string;

  /**
   * @schema CompositeResourceDefinition#metadata
   */
  readonly metadata?: cdk8s.ApiObjectMetadata;

  /**
   * CompositeResourceDefinitionSpec specifies the desired state of the definition.
   *
   * @schema CompositeResourceDefinition#spec
   */
  readonly spec?: CompositeResourceDefinitionSpecProps;

}

/**
 * CompositeResourceDefinitionSpec specifies the desired state of the definition.
 *
 * @schema CompositeResourceDefinitionSpec
 */
export interface CompositeResourceDefinitionSpecProps {
  /**
   * ClaimNames specifies the names of an optional composite resource claim. When claim names are specified Crossplane will create a namespaced 'composite resource claim' CRD that corresponds to the defined composite resource. This composite resource claim acts as a namespaced proxy for the composite resource; creating, updating, or deleting the claim will create, update, or delete a corresponding composite resource. You may add claim names to an existing CompositeResourceDefinition, but they cannot be changed or removed once they have been set.
   *
   * @schema CompositeResourceDefinitionSpec#claimNames
   */
  readonly claimNames?: CompositeResourceDefinitionSpecClaimNamesProps;

  /**
   * ConnectionSecretKeys is the list of keys that will be exposed to the end user of the defined kind.
   *
   * @schema CompositeResourceDefinitionSpec#connectionSecretKeys
   */
  readonly connectionSecretKeys?: string[];

  /**
   * DefaultCompositionRef refers to the Composition resource that will be used in case no composition selector is given.
   *
   * @schema CompositeResourceDefinitionSpec#defaultCompositionRef
   */
  readonly defaultCompositionRef?: CompositeResourceDefinitionSpecDefaultCompositionRefProps;

  /**
   * EnforcedCompositionRef refers to the Composition resource that will be used by all composite instances whose schema is defined by this definition.
   *
   * @schema CompositeResourceDefinitionSpec#enforcedCompositionRef
   */
  readonly enforcedCompositionRef?: CompositeResourceDefinitionSpecEnforcedCompositionRefProps;

  /**
   * Group specifies the API group of the defined composite resource. Composite resources are served under `/apis/<group>/...`. Must match the name of the XRD (in the form `<names.plural>.<group>`).
   *
   * @schema CompositeResourceDefinitionSpec#group
   */
  readonly group: string;

  /**
   * Names specifies the resource and kind names of the defined composite resource.
   *
   * @schema CompositeResourceDefinitionSpec#names
   */
  readonly names: CompositeResourceDefinitionSpecNamesProps;

  /**
   * Versions is the list of all API versions of the defined composite resource. Version names are used to compute the order in which served versions are listed in API discovery. If the version string is "kube-like", it will sort above non "kube-like" version strings, which are ordered lexicographically. "Kube-like" versions start with a "v", then are followed by a number (the major version), then optionally the string "alpha" or "beta" and another number (the minor version). These are sorted first by GA > beta > alpha (where GA is a version with no suffix such as beta or alpha), and then by comparing major version, then minor version. An example sorted list of versions: v10, v2, v1, v11beta2, v10beta3, v3beta1, v12alpha1, v11alpha2, foo1, foo10. Note that all versions must have identical schemas; Crossplane does not currently support conversion between different version schemas.
   *
   * @schema CompositeResourceDefinitionSpec#versions
   */
  readonly versions: CompositeResourceDefinitionSpecVersionsProps[];

}

/**
 * ClaimNames specifies the names of an optional composite resource claim. When claim names are specified Crossplane will create a namespaced 'composite resource claim' CRD that corresponds to the defined composite resource. This composite resource claim acts as a namespaced proxy for the composite resource; creating, updating, or deleting the claim will create, update, or delete a corresponding composite resource. You may add claim names to an existing CompositeResourceDefinition, but they cannot be changed or removed once they have been set.
 *
 * @schema CompositeResourceDefinitionSpecClaimNames
 */
export interface CompositeResourceDefinitionSpecClaimNamesProps {
  /**
   * categories is a list of grouped resources this custom resource belongs to (e.g. 'all'). This is published in API discovery documents, and used by clients to support invocations like `kubectl get all`.
   *
   * @schema CompositeResourceDefinitionSpecClaimNames#categories
   */
  readonly categories?: string[];

  /**
   * kind is the serialized kind of the resource. It is normally CamelCase and singular. Custom resource instances will use this value as the `kind` attribute in API calls.
   *
   * @schema CompositeResourceDefinitionSpecClaimNames#kind
   */
  readonly kind: string;

  /**
   * listKind is the serialized kind of the list for this resource. Defaults to "`kind`List".
   *
   * @default kind`List".
   * @schema CompositeResourceDefinitionSpecClaimNames#listKind
   */
  readonly listKind?: string;

  /**
   * plural is the plural name of the resource to serve. The custom resources are served under `/apis/<group>/<version>/.../<plural>`. Must match the name of the CustomResourceDefinition (in the form `<names.plural>.<group>`). Must be all lowercase.
   *
   * @schema CompositeResourceDefinitionSpecClaimNames#plural
   */
  readonly plural: string;

  /**
   * shortNames are short names for the resource, exposed in API discovery documents, and used by clients to support invocations like `kubectl get <shortname>`. It must be all lowercase.
   *
   * @schema CompositeResourceDefinitionSpecClaimNames#shortNames
   */
  readonly shortNames?: string[];

  /**
   * singular is the singular name of the resource. It must be all lowercase. Defaults to lowercased `kind`.
   *
   * @default lowercased `kind`.
   * @schema CompositeResourceDefinitionSpecClaimNames#singular
   */
  readonly singular?: string;

}

/**
 * DefaultCompositionRef refers to the Composition resource that will be used in case no composition selector is given.
 *
 * @schema CompositeResourceDefinitionSpecDefaultCompositionRef
 */
export interface CompositeResourceDefinitionSpecDefaultCompositionRefProps {
  /**
   * Name of the referenced object.
   *
   * @schema CompositeResourceDefinitionSpecDefaultCompositionRef#name
   */
  readonly name: string;

}

/**
 * EnforcedCompositionRef refers to the Composition resource that will be used by all composite instances whose schema is defined by this definition.
 *
 * @schema CompositeResourceDefinitionSpecEnforcedCompositionRef
 */
export interface CompositeResourceDefinitionSpecEnforcedCompositionRefProps {
  /**
   * Name of the referenced object.
   *
   * @schema CompositeResourceDefinitionSpecEnforcedCompositionRef#name
   */
  readonly name: string;

}

/**
 * Names specifies the resource and kind names of the defined composite resource.
 *
 * @schema CompositeResourceDefinitionSpecNames
 */
export interface CompositeResourceDefinitionSpecNamesProps {
  /**
   * categories is a list of grouped resources this custom resource belongs to (e.g. 'all'). This is published in API discovery documents, and used by clients to support invocations like `kubectl get all`.
   *
   * @schema CompositeResourceDefinitionSpecNames#categories
   */
  readonly categories?: string[];

  /**
   * kind is the serialized kind of the resource. It is normally CamelCase and singular. Custom resource instances will use this value as the `kind` attribute in API calls.
   *
   * @schema CompositeResourceDefinitionSpecNames#kind
   */
  readonly kind: string;

  /**
   * listKind is the serialized kind of the list for this resource. Defaults to "`kind`List".
   *
   * @default kind`List".
   * @schema CompositeResourceDefinitionSpecNames#listKind
   */
  readonly listKind?: string;

  /**
   * plural is the plural name of the resource to serve. The custom resources are served under `/apis/<group>/<version>/.../<plural>`. Must match the name of the CustomResourceDefinition (in the form `<names.plural>.<group>`). Must be all lowercase.
   *
   * @schema CompositeResourceDefinitionSpecNames#plural
   */
  readonly plural: string;

  /**
   * shortNames are short names for the resource, exposed in API discovery documents, and used by clients to support invocations like `kubectl get <shortname>`. It must be all lowercase.
   *
   * @schema CompositeResourceDefinitionSpecNames#shortNames
   */
  readonly shortNames?: string[];

  /**
   * singular is the singular name of the resource. It must be all lowercase. Defaults to lowercased `kind`.
   *
   * @default lowercased `kind`.
   * @schema CompositeResourceDefinitionSpecNames#singular
   */
  readonly singular?: string;

}

/**
 * CompositeResourceDefinitionVersion describes a version of an XR.
 *
 * @schema CompositeResourceDefinitionSpecVersions
 */
export interface CompositeResourceDefinitionSpecVersionsProps {
  /**
   * AdditionalPrinterColumns specifies additional columns returned in Table output. If no columns are specified, a single column displaying the age of the custom resource is used. See the following link for details: https://kubernetes.io/docs/reference/using-api/api-concepts/#receiving-resources-as-tables
   *
   * @schema CompositeResourceDefinitionSpecVersions#additionalPrinterColumns
   */
  readonly additionalPrinterColumns?: CompositeResourceDefinitionSpecVersionsAdditionalPrinterColumnsProps[];

  /**
   * Name of this version, e.g. “v1”, “v2beta1”, etc. Composite resources are served under this version at `/apis/<group>/<version>/...` if `served` is true.
   *
   * @schema CompositeResourceDefinitionSpecVersions#name
   */
  readonly name: string;

  /**
   * Referenceable specifies that this version may be referenced by a Composition in order to configure which resources an XR may be composed of. Exactly one version must be marked as referenceable; all Compositions must target only the referenceable version. The referenceable version must be served.
   *
   * @schema CompositeResourceDefinitionSpecVersions#referenceable
   */
  readonly referenceable: boolean;

  /**
   * Schema describes the schema used for validation, pruning, and defaulting of this version of the defined composite resource. Fields required by all composite resources will be injected into this schema automatically, and will override equivalently named fields in this schema. Omitting this schema results in a schema that contains only the fields required by all composite resources.
   *
   * @schema CompositeResourceDefinitionSpecVersions#schema
   */
  readonly schema?: CompositeResourceDefinitionSpecVersionsSchemaProps;

  /**
   * Served specifies that this version should be served via REST APIs.
   *
   * @schema CompositeResourceDefinitionSpecVersions#served
   */
  readonly served: boolean;

}

/**
 * CustomResourceColumnDefinition specifies a column for server side printing.
 *
 * @schema CompositeResourceDefinitionSpecVersionsAdditionalPrinterColumns
 */
export interface CompositeResourceDefinitionSpecVersionsAdditionalPrinterColumnsProps {
  /**
   * description is a human readable description of this column.
   *
   * @schema CompositeResourceDefinitionSpecVersionsAdditionalPrinterColumns#description
   */
  readonly description?: string;

  /**
   * format is an optional OpenAPI type definition for this column. The 'name' format is applied to the primary identifier column to assist in clients identifying column is the resource name. See https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#data-types for details.
   *
   * @schema CompositeResourceDefinitionSpecVersionsAdditionalPrinterColumns#format
   */
  readonly format?: string;

  /**
   * jsonPath is a simple JSON path (i.e. with array notation) which is evaluated against each custom resource to produce the value for this column.
   *
   * @schema CompositeResourceDefinitionSpecVersionsAdditionalPrinterColumns#jsonPath
   */
  readonly jsonPath: string;

  /**
   * name is a human readable name for the column.
   *
   * @schema CompositeResourceDefinitionSpecVersionsAdditionalPrinterColumns#name
   */
  readonly name: string;

  /**
   * priority is an integer defining the relative importance of this column compared to others. Lower numbers are considered higher priority. Columns that may be omitted in limited space scenarios should be given a priority greater than 0.
   *
   * @schema CompositeResourceDefinitionSpecVersionsAdditionalPrinterColumns#priority
   */
  readonly priority?: number;

  /**
   * type is an OpenAPI type definition for this column. See https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#data-types for details.
   *
   * @schema CompositeResourceDefinitionSpecVersionsAdditionalPrinterColumns#type
   */
  readonly type: string;

}

/**
 * Schema describes the schema used for validation, pruning, and defaulting of this version of the defined composite resource. Fields required by all composite resources will be injected into this schema automatically, and will override equivalently named fields in this schema. Omitting this schema results in a schema that contains only the fields required by all composite resources.
 *
 * @schema CompositeResourceDefinitionSpecVersionsSchema
 */
export interface CompositeResourceDefinitionSpecVersionsSchemaProps {
  /**
   * OpenAPIV3Schema is the OpenAPI v3 schema to use for validation and pruning.
   *
   * @schema CompositeResourceDefinitionSpecVersionsSchema#openAPIV3Schema
   */
  readonly openAPIV3Schema?: any;

}