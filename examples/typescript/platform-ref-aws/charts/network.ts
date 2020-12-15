import { Chart } from 'cdk8s';
import { Construct } from 'constructs';
import * as comp from '../crs/composition.apiextensions.crossplane.io';
import * as xrds from '../crs/xrd.apiextensions.crossplane.io';

export class NetworkChart extends Chart {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    xrds.compositenetworksAwsPlatformrefCrossplaneIo(this, 'network-xrd');
    comp.compositenetworksAwsPlatformrefCrossplaneIo(this, 'network-composition');
  }
}
