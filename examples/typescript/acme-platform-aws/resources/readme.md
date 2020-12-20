This Acme platform `Configuration` for Kubernetes and Data Services is a
starting point to build, run, and operate your own internal cloud platform and
offer a self-service console and API to your internal teams. It provides
platform APIs to provision fully configured EKS clusters, with secure
networking, and stateful cloud services (RDS) designed to securely connect to
the nodes in each EKS cluster -- all composed using cloud service primitives
from the [Crossplane AWS Provider](https://doc.crds.dev/github.com/crossplane/provider-aws).
App deployments can securely connect to the infrastructure they need using secrets
distributed directly to the app namespace.

[Quickstart Guide](https://github.com/crossplane-contrib/crossplane-cdk8s)

To learn more checkout the examples in the [GitHub
repo](https://github.com/crossplane-contrib/crossplane-cdk8s) that you can
copy and customize to meet the exact needs of your organization!