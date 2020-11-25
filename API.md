# API Reference

**Classes**

Name|Description
----|-----------
[Configuration](#crossplane-cdk-configuration)|*No description*
[Resource](#crossplane-cdk-resource)|Base class for all Crossplane core objects.


**Structs**

Name|Description
----|-----------
[ConfigurationProps](#crossplane-cdk-configurationprops)|Properties for initialization of `Configuration`.
[ProviderDep](#crossplane-cdk-providerdep)|*No description*
[ResourceProps](#crossplane-cdk-resourceprops)|Initialization properties for resources.


**Interfaces**

Name|Description
----|-----------
[IConfiguration](#crossplane-cdk-iconfiguration)|Represents a Crossplane Configuration package.
[IResource](#crossplane-cdk-iresource)|Represents a resource.



## class Configuration  <a id="crossplane-cdk-configuration"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IResource](#crossplane-cdk-iresource), [IConfiguration](#crossplane-cdk-iconfiguration), [IResource](#crossplane-cdk-iresource)
__Extends__: [Resource](#crossplane-cdk-resource)

### Initializer




```ts
new Configuration(scope: Construct, id: string, props?: ConfigurationProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[ConfigurationProps](#crossplane-cdk-configurationprops)</code>)  *No description*
  * **metadata** (<code>[ApiObjectMetadata](#cdk8s-apiobjectmetadata)</code>)  Metadata that all persisted resources must have, which includes all objects users must create. __*Optional*__
  * **company** (<code>string</code>)  *No description* __*Optional*__
  * **crossplaneVersion** (<code>string</code>)  *No description* __*Default*__: ">=v0.14.0-0"
  * **description** (<code>string</code>)  *No description* __*Optional*__
  * **descriptionShort** (<code>string</code>)  *No description* __*Optional*__
  * **keywords** (<code>Array<string></code>)  *No description* __*Optional*__
  * **license** (<code>string</code>)  *No description* __*Optional*__
  * **maintainer** (<code>string</code>)  *No description* __*Optional*__
  * **name** (<code>string</code>)  *No description* __*Optional*__
  * **providers** (<code>Array<[ProviderDep](#crossplane-cdk-providerdep)></code>)  *No description* __*Optional*__
  * **readme** (<code>string</code>)  *No description* __*Optional*__
  * **source** (<code>string</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**apiObject** | <code>[ApiObject](#cdk8s-apiobject)</code> | The underlying cdk8s API object.

### Methods


#### addProvider(provider, version) <a id="crossplane-cdk-configuration-addprovider"></a>



```ts
addProvider(provider: string, version: string): void
```

* **provider** (<code>string</code>)  *No description*
* **version** (<code>string</code>)  *No description*






## class Resource  <a id="crossplane-cdk-resource"></a>

Base class for all Crossplane core objects.

Represents a single resource.

__Implements__: [IConstruct](#constructs-iconstruct), [IResource](#crossplane-cdk-iresource)
__Extends__: [Construct](#constructs-construct)
__Implemented by__: [Configuration](#crossplane-cdk-configuration)

### Initializer




```ts
new Resource(scope: Construct, id: string, _: ResourceProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **_** (<code>[ResourceProps](#crossplane-cdk-resourceprops)</code>)  *No description*
  * **metadata** (<code>[ApiObjectMetadata](#cdk8s-apiobjectmetadata)</code>)  Metadata that all persisted resources must have, which includes all objects users must create. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**apiObject** | <code>[ApiObject](#cdk8s-apiobject)</code> | The underlying cdk8s API object.
**metadata** | <code>[ApiObjectMetadataDefinition](#cdk8s-apiobjectmetadatadefinition)</code> | <span></span>
**name** | <code>string</code> | The name of this API object.



## struct ConfigurationProps  <a id="crossplane-cdk-configurationprops"></a>


Properties for initialization of `Configuration`.



Name | Type | Description 
-----|------|-------------
**company**? | <code>string</code> | __*Optional*__
**crossplaneVersion**? | <code>string</code> | __*Default*__: ">=v0.14.0-0"
**description**? | <code>string</code> | __*Optional*__
**descriptionShort**? | <code>string</code> | __*Optional*__
**keywords**? | <code>Array<string></code> | __*Optional*__
**license**? | <code>string</code> | __*Optional*__
**maintainer**? | <code>string</code> | __*Optional*__
**metadata**? | <code>[ApiObjectMetadata](#cdk8s-apiobjectmetadata)</code> | Metadata that all persisted resources must have, which includes all objects users must create.<br/>__*Optional*__
**name**? | <code>string</code> | __*Optional*__
**providers**? | <code>Array<[ProviderDep](#crossplane-cdk-providerdep)></code> | __*Optional*__
**readme**? | <code>string</code> | __*Optional*__
**source**? | <code>string</code> | __*Optional*__



## interface IConfiguration  <a id="crossplane-cdk-iconfiguration"></a>

__Implemented by__: [Configuration](#crossplane-cdk-configuration)

Represents a Crossplane Configuration package.

### Properties


Name | Type | Description 
-----|------|-------------
**name** | <code>string</code> | The Kubernetes name of this resource.



## interface IResource  <a id="crossplane-cdk-iresource"></a>

__Implemented by__: [Configuration](#crossplane-cdk-configuration)

Represents a resource.

### Properties


Name | Type | Description 
-----|------|-------------
**name** | <code>string</code> | The Kubernetes name of this resource.



## struct ProviderDep  <a id="crossplane-cdk-providerdep"></a>






Name | Type | Description 
-----|------|-------------
**provider** | <code>string</code> | <span></span>
**version** | <code>string</code> | <span></span>



## struct ResourceProps  <a id="crossplane-cdk-resourceprops"></a>


Initialization properties for resources.



Name | Type | Description 
-----|------|-------------
**metadata**? | <code>[ApiObjectMetadata](#cdk8s-apiobjectmetadata)</code> | Metadata that all persisted resources must have, which includes all objects users must create.<br/>__*Optional*__



