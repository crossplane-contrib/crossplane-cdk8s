import * as cdk8s from 'cdk8s';
import { toCamelCase } from 'codemaker';
import { Construct } from 'constructs';
import * as yaml from 'js-yaml';
import { Resource, ResourceProps } from './base';
import * as l1 from './imports/apiextensions.crossplane.io';
import { undefinedIfEmpty } from './utils';

/**
 * An CompositeResourceDefinition defines a new kind of composite
 * infrastructure resource. The new resource is composed of other composite or
 * managed infrastructure resources.
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
  private _names?: Names;
  private _claimNames?: Names;
  private _connectionSecret?: ConnectionSecret;
  private _versions: Version[] = [];
  private _metaUI?: MetaUI;

  public constructor(scope: Construct, id: string, props: CompositeResourceDefinitionProps = {} ) {
    super(scope, id, { metadata: props.metadata });

    const name = props.name ?? (props.metadata?.name ?? id);

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
      throw new Error(`group is required for '${this.fqn}'`);
    }

    const versions = this._versionsToL1();
    if (versions === undefined) {
      throw new Error(`version is required for '${this.fqn}'`);
    }

    const kind = this._names?._toL1();
    if (kind === undefined) {
      throw new Error(`kind is required for '${this.fqn}'`);
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

  public get meta(): ICompositeResourceDefinitionMeta {
    const versions = new Array();
    let versionServed: string = '';
    for (const version of this._versions) {
      const v = version.meta;
      if (v.served) {
        versionServed = v.name;
      }
      versions.push(v);
    }

    return {
      name: this.name,
      group: this._group ?? '',
      names: this._names?.meta ?? { kind: '', plural: '' },
      claimNames: this._claimNames?.meta,
      versions: undefinedIfEmpty(versions),
      versionServed: versionServed,
      connectionSecret: this._connectionSecret?.meta,
    };
  }

  public get fqn(): string {
    const xrd = this.meta;
    return `${this.name}/${xrd.names.plural}.${xrd.group}/${xrd.versionServed}`;
  }
}

export interface ICompositeResourceDefinitionMeta {
  readonly name: string;
  readonly group: string;
  readonly names: INamesMeta;
  readonly claimNames?: INamesMeta;
  readonly versions?: IVersionMeta[];
  readonly versionServed: string;
  readonly connectionSecret?: IConnectionSecretMeta;
}

export interface INamesMeta {
  readonly kind: string;
  readonly plural: string;
}

export interface IVersionMeta {
  readonly name: string;
  readonly served?: boolean;
  readonly referencable?: boolean;
}

export interface IConnectionSecretMeta {
  readonly defaultNamespace: string;
  readonly keys: string[];
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
    for (const f of this._fields) {
      result.push(f._toL1());
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
        const strProps = this._props as MetaUIInputStringProps;
        if (strProps.default) { specific.default = strProps.default; }
        if (strProps.required || strProps.customError) {

          const validation: any[] = [];
          if (strProps.required) { validation.push({ required: strProps.required }); }
          if (strProps.customError) { validation.push({ customError: strProps.customError }); }

          specific.validation = validation;
        }
        break;

      case PropType.ENUM:
        const enumProps = this._props as MetaUIInputEnumProps;
        if (enumProps.inputType !== InputType.SINGLE_SELECT) {
          throw new Error(`unsupported enum InputType '${this._props.type}'`);
        }
        //InputType.SINGLE_SELECT doesn't accept a `type` field
        delete base.type;

        if (enumProps.default) { specific.default = enumProps.default; }
        if (enumProps.enum) { specific.enum = enumProps.enum; }
        if (enumProps.required || enumProps.customError) {

          const validation: any[] = [];
          if (enumProps.required) { validation.push({ required: enumProps.required }); }
          if (enumProps.customError) { validation.push({ customError: enumProps.customError }); }

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

export interface MetaUIInputEnumProps extends MetaUIInputProps {
  readonly default?: string;
  readonly enum?: string[];
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
    if (this._kind === undefined) {
      throw new Error(`'kind' is required for '${this._xrd.fqn}.spec.names.kind'`);
    }
    if (this._plural === undefined) {
      throw new Error(`'plural' is required for ${this._xrd.fqn}.spec.names.plural`);
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

  public get meta(): INamesMeta {
    if (this._kind === undefined) {
      throw new Error(`'kind' is required for '${this._xrd.fqn}.spec.names.kind'`);
    }
    if (this._plural === undefined) {
      throw new Error(`'plural' is required for ${this._xrd.fqn}.spec.names.plural`);
    }
    return {
      kind: this._kind,
      plural: this._plural,
    };
  }
}

export class ConnectionSecret {
  private _keys: string[] = [];
  private _defaultNamespace: string = 'crossplane-system';

  /**
   * use CompositeResourceDefinition.connectionSecret() instead
   *
   * @internal
   */
  public constructor() {

  }

  public get meta(): IConnectionSecretMeta {
    return {
      defaultNamespace: this._defaultNamespace,
      keys: [...this._keys],
    };
  }

  public defaultNamespace(val: string): ConnectionSecret {
    this._defaultNamespace = val;
    return this;
  }

  public key(val: string): ConnectionSecret {
    this._keys.push(val);
    return this;
  }

  /**
   * @internal
   */
  public _toL1(): string[] | undefined {
    return undefinedIfEmpty(this._keys);
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

  public get meta(): IVersionMeta {
    return {
      name: this._name,
      served: this._served,
      referencable: this._referencable,
    };
  }

  /**
   * @internal
   */
  public _toL1(): l1.CompositeResourceDefinitionSpecVersions {
    if (this._referencable === undefined) {
      throw new Error(`'referencable' is required on '${this._xrd.fqn}.spec.version["${this._name}"]'`);
    }

    if (this._served === undefined) {
      throw new Error(`'served' is required on '${this._xrd.fqn}.spec.version["${this._name}"]'`);
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

export interface ISchemaPropMetaEnum extends ISchemaPropMeta {

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
    this._path = (parentPath.length == 0) ? name : `${parentPath}.${name}`;
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

  public propEnum(name: string): SchemaPropEnum {
    const o = new SchemaPropEnum(this._xrd, this._path, name);
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

export class SchemaPropScalarBase {
  /**
   * @internal
   */

  protected _xrd: CompositeResourceDefinition;
  /**
   * @internal
   */
  protected _type: PropType;

  /**
   * @internal
   */
  protected _path: string;

  /**
   * @internal
   */
  protected _name: string;

  /**
   * @internal
   */
  protected _description?: string;

  /**
   * @internal
   */
  protected _required: boolean = false;

  /**
   * @internal
   */
  protected _implicit: boolean = false;

  /**
   * use SchemaPropObject.propInteger() instead
   * e.g. CompositeResourceDefinition.version().spec().propInteger()
   * @param xrd
   * @param parentPath
   * @param name
   */
  public constructor(type: PropType, xrd: CompositeResourceDefinition, parentPath: string, name: string) {
    this._type = type;
    this._xrd = xrd;
    this._name = name;
    this._path = `${parentPath}.${name}`;
  }

  protected get baseMeta(): ISchemaPropMeta {
    return {
      path: this._path,
      type: this._type,
      name: this._name,
      description: this._description,
      required: this._required,
      implicit: this._implicit,
    };
  }

  protected uiInputPropsWithDefaults(options: MetaUIInputPropOverrides = {}): MetaUIInputProps {
    const inputType = options.inputType ?? InputType.SINGLE_INPUT;
    let path = options.path ?? this._path;
    const name = options.name ?? toCamelCase(this._path);
    const title = options.title ?? this._name;
    const description = options.description ?? this._description;
    const required = options.required ?? this._required;
    const customError = options.customError;

    //UI expects paths to start with '.'
    //but elsewhere we don't so accomodate both
    if (!path.startsWith('.')) {
      path = `.${path}`;
    }

    const res = {
      ...options,
      type: this._type,
      inputType,
      path,
      name,
      title,
      description,
      required,
      customError,
    };

    return res;
  }

}

export class SchemaPropInteger extends SchemaPropScalarBase implements ISchemaProp {
  private _min?: number;
  private _max?: number;
  private _uiInput?: MetaUIInputIntegerProps;

  /**
   * use SchemaPropObject.propInteger() instead
   * e.g. CompositeResourceDefinition.version().spec().propInteger()
   * @param xrd
   * @param parentPath
   * @param name
   */
  public constructor(xrd: CompositeResourceDefinition, parentPath: string, name: string) {
    super(PropType.INTEGER, xrd, parentPath, name);
  }

  public get meta(): ISchemaPropMeta {
    return {
      ...this.baseMeta,
      min: this._min,
      max: this._max,
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
    const min = options.min ?? this._min;
    const max = options.max ?? this._max;
    const def = options.default;

    this._uiInput = {
      ...this.uiInputPropsWithDefaults(options),
      min,
      max,
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
      minimum: this._min,
      maximum: this._max,
    };
  }
}

export class SchemaPropString extends SchemaPropScalarBase implements ISchemaProp {
  private _uiInput?: MetaUIInputStringProps;

  /**
   * use SchemaPropObject.propString() instead
   * e.g. CompositeResourceDefinition.version().spec().propString()
   * @param xrd
   * @param parentPath
   * @param name
   */
  public constructor(xrd: CompositeResourceDefinition, parentPath: string, name: string) {
    super(PropType.STRING, xrd, parentPath, name);
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
      ...this.baseMeta,
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
    const def = options.default;

    this._uiInput = {
      ...this.uiInputPropsWithDefaults(options),
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

export class SchemaPropEnum extends SchemaPropScalarBase implements ISchemaProp {
  private _enumValueDefault?: string;
  private _enumValues: string[] = [];
  private _uiInput?: MetaUIInputEnumProps;

  /**
   * use SchemaPropObject.propString() instead
   * e.g. CompositeResourceDefinition.version().spec().propString()
   * @param xrd
   * @param parentPath
   * @param name
   */
  public constructor(xrd: CompositeResourceDefinition, parentPath: string, name: string) {
    super(PropType.ENUM, xrd, parentPath, name);
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
  public implicit(val: boolean = true): SchemaPropEnum {
    this._implicit = val;
    return this;
  }

  public get meta(): ISchemaPropMeta {
    return {
      ...this.baseMeta,
      uiInput: this._uiInput,
    };
  }

  public description(val: string): SchemaPropEnum {
    this._description = val;
    return this;
  }

  public required(val: boolean = true): SchemaPropEnum {
    this._required = val;
    return this;
  }

  /**
   * adds an enum value
   * @param val - enum value
   * @param def - is default enum value
   */
  public enumValue(val: string, def: boolean = false): SchemaPropEnum {
    if (def && this._enumValueDefault) {
      throw new Error(`Default 'enumValue' already specified for '${this._xrd.fqn}.spec.version["${this._name}"].schema.properties${this._path}', got '${this._enumValueDefault}' and '${def}'`);
    }
    if (def) {
      this._enumValueDefault = val;
    }
    this._enumValues.push(val);
    return this;
  }

  public uiInput(options: MetaUIInputEnumPropOverrides = {}): SchemaPropEnum {
    this._enumValueDefault = this._enumValueDefault ?? options.default;

    if (options.default && options.default !== this._enumValueDefault) {
      throw new Error(`Default 'enumValue' must match for '${this._xrd.fqn}.spec.version["${this._name}"].schema.properties${this._path}', got '${this._enumValueDefault}' and '${options.default}'`);
    }

    const def = this._enumValues.find(v => v == this._enumValueDefault);
    if (def === undefined) {
      throw new Error(`Default 'enumValue' must be in enum values for '${this._xrd.fqn}.spec.version["${this._name}"].schema.properties${this._path}', got '${this._enumValueDefault}' and '${this._enumValues}'`);
    }

    this._uiInput = {
      ...this.uiInputPropsWithDefaults(options),
      inputType: InputType.SINGLE_SELECT,
      enum: undefinedIfEmpty(this._enumValues),
      default: def,
    };

    this._xrd.ui.activeSection.addInput(this._uiInput);
    return this;
  }

  /**
   * @internal
   */
  public _toL1(): any {
    const values = undefinedIfEmpty(this._enumValues);
    if (values === undefined) {
      throw new Error(`'enumValues' are required for '${this._xrd.fqn}.spec.version["${this._name}"].schema.properties${this._path}'`);
    }

    if (this._enumValueDefault === undefined) {
      throw new Error(`'enumValueDefault' is required for '${this._xrd.fqn}.spec.version["${this._name}"].schema.properties${this._path}'`);
    }

    return {
      description: this._description,
      type: PropType.STRING,
      enum: values,
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

export interface MetaUIInputEnumPropOverrides extends MetaUIInputPropOverrides {
  readonly default?: string;
}

export enum PropType {
  OBJECT = 'object',
  INTEGER = 'integer',
  STRING = 'string',
  ENUM = 'enum',
}

export enum InputType {
  SINGLE_INPUT = 'singleInput',
  SINGLE_SELECT = 'singleSelect',
}


/**
 * CompositeResourceDefinition Props
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
 * @schema CompositeResourceDefinitionProps
 */
export interface CompositeResourceDefinitionProps extends ResourceProps {
  /**
   * CompositeResourceDefinitionSpec specifies the desired state of the definition.
   *
   * @schema CompositeResourceDefinitionProps#spec
   */
  //readonly spec?: CompositeResourceDefinitionSpecProps;
}