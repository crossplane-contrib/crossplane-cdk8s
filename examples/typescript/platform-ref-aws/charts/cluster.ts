import { Chart } from 'cdk8s';
import { Construct } from 'constructs';
import * as comp from '../crs/composition.apiextensions.crossplane.io';
import * as xrds from '../crs/xrd.apiextensions.crossplane.io';

export class ClusterChart extends Chart {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    xrds.compositeclustersAwsPlatformrefCrossplaneIo(this, 'cluster-xrd');
    comp.compositeclustersAwsPlatformrefCrossplaneIo(this, 'cluster-composition');

    xrds.eksAwsPlatformrefCrossplaneIo(this, 'eks-xrd');
    comp.eksAwsPlatformrefCrossplaneIo(this, 'eks-composition');

    xrds.servicesAwsPlatformrefCrossplaneIo(this, 'services-xrd');
    comp.servicesAwsPlatformrefCrossplaneIo(this, 'services-composition');
  }
}
