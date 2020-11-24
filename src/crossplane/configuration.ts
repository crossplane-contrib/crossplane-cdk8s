import * as cdk8s from 'cdk8s';
import { Construct } from 'constructs';
import { ResourceProps, Resource, IResource } from './base';
import * as crossplane from './imports/meta.pkg.crossplane.io';
import { undefinedIfEmpty } from './utils';

/**
 * Properties for initialization of `Configuration`.
 */
export interface ConfigurationProps extends ResourceProps {
  // metadata.name
  readonly name?: string;

  // metadata.annotations.company
  readonly company?: string;

  // metadata.annotations.maintainer
  readonly maintainer?: string;

  // metadata.annotations.keywords
  readonly keywords?: string[];
  readonly source?: string;
  readonly license?: string;
  readonly descriptionShort?: string;
  readonly description?: string;
  readonly readme?: string;

  /**
   * @default ">=v0.14.0-0"
   */
  readonly crossplaneVersion?: string;

  readonly providers?: ProviderDep[];
}

export interface ProviderDep {
  readonly provider: string;
  readonly version: string;
}

/**
 * Represents a Crossplane Configuration package.
 */
export interface IConfiguration extends IResource {

}

export class Configuration extends Resource implements IConfiguration {
  /**
   * @see base.Resource.apiObject
   */
  protected readonly apiObject: cdk8s.ApiObject;

  private readonly providers: ProviderDep[] = [];

  public constructor(scope: Construct, id: string, props: ConfigurationProps = { }) {
    super(scope, id, { metadata: props.metadata });

    this.providers = new Array<ProviderDep>();

    const name = props.name ?? id;

    // well known annotations
    let annotations: any = { };
    if (props.company) { annotations.company = props.company; }
    if (props.keywords) { annotations.keywords = props.keywords.join(', '); }
    if (props.source) { annotations.source = props.source; }
    if (props.license) { annotations.license = props.license; }
    if (props.descriptionShort) { annotations.descriptionShort = props.descriptionShort; }
    if (props.description) { annotations.description = props.description; }
    if (props.readme) { annotations.readme = props.readme; }

    // merge extra annotations
    if (props.metadata?.annotations) { annotations = { ...props.metadata.annotations, ...annotations }; }

    // api object
    this.apiObject = new crossplane.Configuration(this, 'Default', {
      metadata: {
        name: name,
        annotations: annotations,
      },
      spec: {
        crossplane: {
          version: props.crossplaneVersion ?? '>=v0.14.0-0',
        },
        dependsOn: cdk8s.Lazy.any({ produce: () => this._synthProviders() }),
      },
    });

    for (const p of props.providers ?? []) {
      this.addProvider(p.provider, p.version);
    }
  }

  public addProvider(provider: string, version: string) {
    this.providers.push({ provider, version });
  }

  private _synthProviders() {
    const result = new Array();
    for (const p of this.providers) {
      result.push({
        provider: p.provider,
        version: p.version,
      });
    }
    return undefinedIfEmpty(result);
  }
}