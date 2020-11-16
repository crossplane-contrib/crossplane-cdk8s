import { ApiObject, Lazy } from 'cdk8s';
import { Construct } from 'constructs';

export interface ConfigurationProps {
  readonly name?: string;

  /**
   * @default ">=v0.14.0-0"
   */
  readonly crossplaneVersion?: string;

  readonly company?: string;
  readonly maintainer?: string;
  readonly keywords?: string[];
  readonly source?: string;
  readonly license?: string;

  readonly providers?: ProviderDep[];
}

export interface ProviderDep {
  readonly provider: string;
  readonly version: string;
}

export class Configuration extends Construct {

  private readonly providers: ProviderDep[];

  constructor(scope: Construct, id: string, props: ConfigurationProps = { }) {
    super(scope, id);

    this.providers = new Array<ProviderDep>();

    const annotations: any = { };

    if (props.company) { annotations.company = props.company; }
    if (props.keywords) { annotations.keywords = props.keywords.join(', '); }
    if (props.source) { annotations.source = props.source; }
    if (props.license) { annotations.license = props.license; }

    new ApiObject(this, 'Default', {
      apiVersion: 'meta.pkg.crossplane.io/v1alpha1',
      kind: 'Configuration',
      metadata: {
        name: props.name,
        annotations: annotations,
      },
      spec: {
        crossplane: {
          version: props.crossplaneVersion ?? '>=v0.14.0-0',
        },
        dependsOn: Lazy.any({ produce: () => this._synthProviders() }),
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
    return result;
  }
}