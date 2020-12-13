import * as cdk8s from 'cdk8s';
import { toCamelCase } from 'codemaker';
import { Construct } from 'constructs';
import * as yaml from 'js-yaml';
import { Resource } from './base';
import * as l1 from './imports/apiextensions.crossplane.io';
import { undefinedIfEmpty } from './utils';

/**
 * An CompositeResourceDefinition defines a new kind of composite
 * infrastructure resource. The new resource is composed of other composite or
 * managed infrastructure resources.
 *
 * @schema CompositeResourceDefinition
 */
export class CompositeResourceDefinition extends Resource {
  /**
   * Defines a "CompositeResourceDefinition" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialiation props - note: currently only .name and .metadata are processed
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
  private _metaUI?: MetaUI;

  public constructor(scope: Construct, id: string, props: CompositeResourceDefinitionProps = {} ) {
    super(scope, id, { metadata: props.metadata });

    const name = props.name ?? id;

    let annotations: any = { };
    if (props.metadata?.annotations) { annotations = { ...props.metadata.annotations, ...annotations }; }
    annotations['upbound.io/ui-schema'] = cdk8s.Lazy.any({ produce: () => this._metaUI?._toL1() });

    //TODO: load prop.spec for those not using fluent API

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
    let version = this._versions.find(v => v.name == name);
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

  public get ui(): MetaUI {
    this._metaUI = this._metaUI ?? new MetaUI();
    return this._metaUI;
  }
}

export class MetaUI {
  private _sections: MetaUISection[] = [];
  private _activeSection?: MetaUISection;

  /**
   * use CompositeResourceDefinition.ui instead
   *
   * @internal
   */
  public constructor() {

  }

  public get activeSection(): MetaUISection {
    this._activeSection = this._activeSection ?? this.addSection({
      title: 'PLACEHOLDER TITLE: add a section',
      description: 'PLACEHOLDER DESCRIPTION: add a descriptions',
    });
    return this._activeSection;
  }

  public addSection(props: MetaUISectionProps): MetaUISection {
    const s = new MetaUISection(props);
    this._sections.push(s);
    this._activeSection = s;
    return s;
  }

  /**
   * @internal
   */
  public _toL1(): any {
    const sections = new Array();
    for (const s of this._sections) {
      sections.push(s._toL1());
    }

    if (sections.length == 0) {
      return undefined;
    }

    const result = {
      configSections: sections,
    };
    return `---\n${yaml.safeDump(result, { indent: 2, noArrayIndent: true, condenseFlow: false })}`;
  }
}

export class MetaUISection {
  private _fields: MetaUIInput[] = [];
  private _props: MetaUISectionProps;

  /**
   * Use CompositeResourceDefinition.ui.addSection() instead
   * @param props
   *
   * @internal
   */
  public constructor(props: MetaUISectionProps) {
    this._props = props;
  }

  public addInput(field: MetaUIInputProps): MetaUIInput {
    const f = new MetaUIInput(field);
    this._fields.push(f);
    return f;
  }

  /**
   * @internal
   */
  public _toL1(): any {
    const result = new Array();
    for (const s of this._fields) {
      result.push(s._toL1());
    }
    const items = undefinedIfEmpty(result);
    return {
      title: this._props.title,
      description: this._props.description,
      items: items,
    };
  }
}

export class MetaUIInput {
  private _props: MetaUIInputProps;

  /**
   * Use CompositeResourceDefinition.ui.activeSection.addInput() instead
   * @param props
   *
   * @internal
   */
  public constructor(props: MetaUIInputProps) {
    this._props = props;
  }

  /**
   * @internal
   */
  public _toL1(): any {
    const props = this._props;
    const base: any = {
      name: props.name,
      controlType: props.inputType,
      type: props.type,
      path: props.path,
      title: props.title,
      description: props.description,
    };

    const specific: any = {};

    switch (this._props.type) {
      case PropType.INTEGER:
        const intProps = this._props as MetaUIInputIntegerProps;
        if (intProps.default) { specific.default = intProps.default; }
        if (intProps.required || intProps.min || intProps.max || intProps.customError) {

          const validation: any[] = [];
          if (intProps.min) { validation.push({ minimum: intProps.min }); }
          if (intProps.max) { validation.push({ maximum: intProps.max }); }
          if (intProps.required) { validation.push({ required: intProps.required }); }
          if (intProps.customError) { validation.push({ customError: intProps.customError }); }

          specific.validation = validation;
        }
        break;

      case PropType.STRING:
        const strProps = this._props as MetaUIInputIntegerProps;
        if (strProps.default) { specific.default = strProps.default; }
        if (strProps.required || strProps.customError) {

          const validation: any[] = [];
          if (strProps.required) { validation.push({ required: strProps.required }); }
          if (strProps.customError) { validation.push({ customError: strProps.customError }); }

          specific.validation = validation;
        }
        break;

      default:
        throw new Error(`unsupported MetaUI type '${this._props.type}'`);
    }

    return {
      ...base,
      ...specific,
    };
  }
}

export interface MetaUISectionProps{
  readonly title: string;
  readonly description: string;
}

export interface MetaUIInputProps {
  readonly type: PropType;
  readonly inputType: InputType;
  readonly path: string;
  readonly name: string;
  readonly title: string;
  readonly description?: string;
  readonly required: boolean;
  readonly customError?: string;
  readonly [key: string]: any;
}

export interface MetaUIInputIntegerProps extends MetaUIInputProps {

  readonly default?: number;
  readonly min?: number;
  readonly max?: number;
}

export interface MetaUIInputStringProps extends MetaUIInputProps {
  readonly default?: string;
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
   * use CompositeResourceDefinition.connectionSecret() instead
   *
   * @internal
   */
  public constructor() {

  }

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
  private _name: string;
  private _served?: boolean;
  private _referencable?: boolean;
  private _spec?: SchemaPropObject;

  /**
   * use CompositeResourceDefinition.version() instead
   * @param xrd
   * @param name
   *
   * @internal
   */
  public constructor(xrd: CompositeResourceDefinition, name: string) {
    this._xrd = xrd;
    this._name = name;
  }

  public get name(): string {
    return this._name;
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
    this._spec = this._spec ?? new SchemaPropObject(this._xrd, '', 'spec');
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
 * Schema Props
 */
export interface ISchemaProp {
  readonly meta: ISchemaPropMeta;

  /**
   * @internal
   */
  _toL1(): any;
}

export interface ISchemaPropMeta {
  readonly type: PropType;

  readonly name: string;

  readonly description?: string;

  readonly path: string;

  readonly required: boolean;

  readonly implicit: boolean;

  readonly uiSection?: MetaUISectionProps;

  readonly uiInput?: MetaUIInputProps;

  /**
   * Additional metadata attributes.
   */
  readonly [key: string]: any;
}

export interface ISchemaPropMetaInteger extends ISchemaPropMeta {
  readonly min?: number;
  readonly max?: number;
}

export interface ISchemaPropMetaString extends ISchemaPropMeta {

}

/**
 * JSII callback class/interface for SchemaProp.with()
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
 * openAPIv3Schema Object with MetaUI
 */
export class SchemaPropObject implements ISchemaProp {
  private _xrd: CompositeResourceDefinition;
  private _type: PropType = PropType.OBJECT;
  private _path: string;
  private _name: string;
  private _children: ISchemaProp[] = [];
  private _description?: string;
  private _required: boolean = false;
  private _implicit: boolean = false;
  private _uiSection?: MetaUISectionProps;

  /**
   * use SchemaPropObject.propObject() instead
   * e.g. CompositeResourceDefinition.version().spec().propObject()
   * @param xrd
   * @param parentPath
   * @param name
   *
   * @internal
   */
  public constructor(xrd: CompositeResourceDefinition, parentPath: string, name: string) {
    this._xrd = xrd;
    this._name = name;
    this._path = `${parentPath}.${name}`;
  }

  public get meta(): ISchemaPropMeta {
    return {
      type: this._type,
      name: this._name,
      path: this._path,
      required: this._required,
      implicit: this._implicit,
      uiSection: this._uiSection,
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

  /**
   * field is implicitly added by Crossplane.
   * used for UI only fields and to suppress
   * adding this field to XRD schema props
   * during synth.
   *
   * defaults to false if not set
   *
   * @param val boolean - default true
   */
  public implicit(val: boolean = true): SchemaPropObject {
    this._implicit = val;
    return this;
  }

  public uiSection(options: MetaUISectionProps): SchemaPropObject {
    this._uiSection = options;
    this._xrd.ui.addSection(options);
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
      if (child.meta.implicit) {
        continue;
      }
      children[child.meta.name] = child._toL1();
      if (child.meta.required) {
        required.push(child.meta.name);
      }
    }

    return {
      description: this._description,
      properties: children,
      required: undefinedIfEmpty(required),
      type: this._type,
    };
  }
}

export class SchemaPropInteger implements ISchemaProp {
  private _xrd: CompositeResourceDefinition;
  private _type: PropType = PropType.INTEGER;
  private _path: string;
  private _name: string;
  private _description?: string;
  private _required: boolean = false;
  private _min?: number;
  private _max?: number;
  private _implicit: boolean = false;
  private _uiInput?: MetaUIInputIntegerProps;

  /**
   * use SchemaPropObject.propInteger() instead
   * e.g. CompositeResourceDefinition.version().spec().propInteger()
   * @param xrd
   * @param parentPath
   * @param name
   */
  public constructor(xrd: CompositeResourceDefinition, parentPath: string, name: string) {
    this._xrd = xrd;
    this._name = name;
    this._path = `${parentPath}.${name}`;
  }

  public get meta(): ISchemaPropMeta {
    return {
      path: this._path,
      type: this._type,
      name: this._name,
      description: this._description,
      required: this._required,
      min: this._min,
      max: this._max,
      implicit: this._implicit,
      uiInput: this._uiInput,
    };
  }

  public path(val: string): SchemaPropInteger {
    this._path = val;
    return this;
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

  /**
   * field is implicitly added by Crossplane.
   * used for UI only fields and to suppress
   * adding this field to XRD schema props
   * during synth.
   *
   * commonly used for writeConnectionSecretRef
   *
   * defaults to false if not set
   *
   * @param val boolean - default true
   */
  public implicit(val: boolean = true): SchemaPropInteger {
    this._implicit = val;
    return this;
  }

  public uiInput(options: MetaUIInputIntegerPropOverrides = {}): SchemaPropInteger {
    const inputType = options.inputType ?? InputType.SINGLE_INPUT;
    const path = options.path ?? this._path;
    const name = options.name ?? toCamelCase(this._path);
    const title = options.title ?? this._name;
    const description = options.description ?? this._description;
    const min = options.min ?? this._min;
    const max = options.max ?? this._max;
    const required = options.required ?? this._required;
    const customError = options.customError;
    const def = options.default;

    this._uiInput = {
      type: this._type,
      inputType,
      path,
      name,
      title,
      description,
      min,
      max,
      required,
      customError,
      default: def,
    };

    this._xrd.ui.activeSection.addInput(this._uiInput);
    return this;
  }

  /**
   * @internal
   */
  public _toL1(): any {
    return {
      description: this._description,
      type: this._type,
    };
  }
}

export class SchemaPropString implements ISchemaProp {
  private _xrd: CompositeResourceDefinition;
  private _type: PropType = PropType.STRING;
  private _path: string;
  private _name: string;
  private _description?: string;
  private _required: boolean = false;
  private _implicit: boolean = false;
  private _uiInput?: MetaUIInputStringProps;

  /**
   * use SchemaPropObject.propString() instead
   * e.g. CompositeResourceDefinition.version().spec().propString()
   * @param xrd
   * @param parentPath
   * @param name
   */
  public constructor(xrd: CompositeResourceDefinition, parentPath: string, name: string) {
    this._xrd = xrd;
    this._name = name;
    this._path = `${parentPath}.${name}`;
  }

  /**
   * field is implicitly added by Crossplane.
   * used for UI only fields and to suppress
   * adding this field to XRD schema props
   * during synth.
   *
   * defaults to false if not set
   *
   * @param val boolean - default true
   */
  public implicit(val: boolean = true): SchemaPropString {
    this._implicit = val;
    return this;
  }

  public get meta(): ISchemaPropMeta {
    return {
      type: this._type,
      name: this._name,
      path: this._path,
      required: this._required,
      implicit: this._implicit,
      uiInput: this._uiInput,
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

  public uiInput(options: MetaUIInputStringPropOverrides = {}): SchemaPropString {
    const inputType = options.inputType ?? InputType.SINGLE_INPUT;
    const path = options.path ?? this._path;
    const name = options.name ?? toCamelCase(this._path);
    const title = options.title ?? this._name;
    const required = options.required ?? this._required;
    const description = options.description ?? this._description;
    const customError = options.customError;
    const def = options.default;

    this._uiInput = {
      type: this._type,
      inputType,
      path,
      name,
      title,
      description,
      required,
      customError,
      default: def,
    };
    this._xrd.ui.activeSection.addInput(this._uiInput);
    return this;
  }

  /**
   * @internal
   */
  public _toL1(): any {
    return {
      description: this._description,
      type: this._type,
    };
  }
}

/**
 * Overrides with optional inputs for fluent API with reasonable defaults
 */
export interface MetaUIInputPropOverrides {

  /**
   * defaults to InputType.SINGLE_INPUT
   */
  readonly inputType?: InputType;

  /**
   * defaults to ISchemaPropMeta.path if not specified
   */
  readonly path?: string;

  /**
   * defaults to camel case ISchemaPropMeta.path if not specified
   */
  readonly name?: string;

  /**
   * defaults to ISchemaPropMeta.name if not specified
   */
  readonly title?: string;

  /**
   * defaults to ISchemaPropMeta.required if not specified
   */
  readonly required?: boolean;

  /**
   * defaults to ISchemaPropMeta.description if not specified
   */
  readonly description?: string;

  readonly customError?: string;

  readonly [key: string]: any;
}

export interface MetaUIInputIntegerPropOverrides extends MetaUIInputPropOverrides {

  readonly default?: number;

  /**
   * defaults to ISchemaPropMetaInteger.min if not specified
   */
  readonly min?: number;

  /**
   * defaults to ISchemaPropMetaInteger.max if not specified
   */
  readonly max?: number;
}

export interface MetaUIInputStringPropOverrides extends MetaUIInputPropOverrides {
  readonly default?: string;
}


export enum PropType {
  OBJECT = 'object',
  INTEGER = 'integer',
  STRING = 'string',
}

export enum InputType {
  SINGLE_INPUT = 'singleInput',
}


/**
 * CompositeResourceDefinition Props for those not using the fluent API
 */

/**
 * An CompositeResourceDefinition defines a new kind of composite
 * infrastructure resource. The new resource is composed of other composite or
 * managed infrastructure resources.
 *
 * TODO: Support all available props in fluent API.
 * TODO: Process props.spec in CompositeResourceDefinition so you can init with
 * static spec fields instead of using the fluent API.
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