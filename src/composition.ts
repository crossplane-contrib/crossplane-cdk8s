import * as cdk8s from 'cdk8s';
import { Construct } from 'constructs';
import { Resource, ResourceProps } from './base';
import * as l1 from './imports/apiextensions.crossplane.io';
import { undefinedIfEmpty } from './utils';
import { CompositeResourceDefinition } from './xrd';

/**
 * Composition defines the group of resources to be created when a compatible type is created with reference to the composition.
 */
export class Composition extends Resource {
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

  private _xrd: CompositeResourceDefinition;
  private _resources: CompositionSpecResource[] = [];
  private _writeConnectionSecretToNamespace: string;

  public constructor(scope: Construct, id: string, xrd: CompositeResourceDefinition, props: CompositionProps = {}) {
    super(scope, id, { metadata: props.metadata });

    this._xrd = xrd;
    this._writeConnectionSecretToNamespace = xrd.meta.connectionSecret?.defaultNamespace ?? 'crossplane-system';

    const name = props.name ?? (props.metadata?.name ?? id);

    let annotations: any = {};
    if (props.metadata?.annotations) { annotations = { ...props.metadata.annotations, ...annotations }; }

    //TODO: load prop.spec for those not using fluent API

    this.apiObject = new l1.Composition(this, name, {
      metadata: {
        ...props.metadata,
        name: name,
        annotations: annotations,
      },
      spec: cdk8s.Lazy.any({ produce: () => this._toL1() }),
    });
  }

  private _toL1(): l1.CompositionSpec {
    const xrd = this._xrd.meta;

    const resources = this._resourcesToL1();
    if (resources === undefined) {
      throw new Error(`at least one resource is required for '${this.name}'`);
    }

    return {
      writeConnectionSecretsToNamespace: this._writeConnectionSecretToNamespace,
      compositeTypeRef: {
        apiVersion: `${xrd.group}/${xrd.versionServed}`,
        kind: xrd.names.kind,
      },
      resources: resources,
    };
  }

  private _resourcesToL1(): l1.CompositionSpecResources[] | undefined {
    const result = new Array();
    for (const resource of this._resources) {
      result.push(resource._toL1());
    }
    return undefinedIfEmpty(result);
  }

  public addResource(base: any): CompositionSpecResource {
    const resource = new CompositionSpecResource(this._xrd, base);
    this._resources.push(resource);
    return resource;
  }
}

export class CompositionSpecResource {
  private _xrd: CompositeResourceDefinition;
  private _base: any;
  private _patches: l1.CompositionSpecResourcesPatches[] = [];
  private _connectionDetails: l1.CompositionSpecResourcesConnectionDetails[] = [];

  /**
   * use Composition.addResource() instead
   * @param xrd
   *
   * @internal
   */
  public constructor(xrd: CompositeResourceDefinition, base: any) {
    this._xrd = xrd;
    this._base = base;
  }

  /**
   * @internal
   */
  public _toL1(): l1.CompositionSpecResources {
    return {
      base: this._base,
      patches: undefinedIfEmpty(this._patches),
      connectionDetails: undefinedIfEmpty(this._connectionDetails),
    };
  }

  public mapFieldPath(from: string, to: string): CompositionSpecResource {
    this._patches.push({
      fromFieldPath: from,
      toFieldPath: to,
    });
    return this;
  }

  /**
   *
   * @param from
   * @param format e.g. "%s-suffix"
   * @param to
   */
  public mapFieldPathXFormStringFormat(from: string, format: string, to: string): CompositionSpecResource {
    this._patches.push({
      fromFieldPath: from,
      toFieldPath: to,
      transforms: [
        {
          type: 'string',
          string: {
            fmt: format,
          },
        },
      ],
    });
    return this;
  }

  /*
  public connectionDetails(details: l1.CompositionSpecResourcesConnectionDetails): CompositionSpecResource {
    this._connectionDetails.push(details);
    return this;
  }
  */

  public connectionDetailsFromXrd(xrd: CompositeResourceDefinition = this._xrd): CompositionSpecResource {
    const keys = xrd.meta.connectionSecret?.keys ?? [];
    if (keys.length == 0) {
      throw new Error(`no connectionSecret.keys found for '${xrd.fqn}'`);
    }

    for (const k of keys) {
      this._connectionDetails.push({ fromConnectionSecretKey: k });
    }

    return this;
  }
}

/**
 * Composition Props
 */

/**
 * Composition defines the group of resources to be created when a compatible type is created with reference to the composition.
 *
 * TODO: Support all available props in fluent API.
 * TODO: Process props.spec in Composition so you can init with
 * static spec fields instead of using the fluent API.
 */
export interface CompositionProps extends ResourceProps {
  /**
   * CompositionSpecProps specifies the desired state of the definition.
   *
   * @schema CompositionProps#spec
   */
  //readonly spec?: CompositionSpecProps;

}