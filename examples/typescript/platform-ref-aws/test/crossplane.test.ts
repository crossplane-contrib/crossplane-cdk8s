import { App, Testing } from 'cdk8s';

import * as crossplane from '../crossplane';

test('platform-ref-aws', () => {

    const crossplanePackage = new App();

    console.log(typeof(crossplane.configYaml));

    expect(Testing.synth(crossplane.configYaml(crossplanePackage))).toMatchSnapshot();
    expect(Testing.synth(crossplane.postgresYaml(crossplanePackage))).toMatchSnapshot();
    expect(Testing.synth(crossplane.networkYaml(crossplanePackage))).toMatchSnapshot();
    expect(Testing.synth(crossplane.clusterYaml(crossplanePackage))).toMatchSnapshot();
});