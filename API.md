# API Reference

**Classes**

Name|Description
----|-----------
[CompositeResourceDefinition](#crossplane-cdk-compositeresourcedefinition)|An CompositeResourceDefinition defines a new kind of composite infrastructure resource.
[Configuration](#crossplane-cdk-configuration)|*No description*
[ConnectionSecret](#crossplane-cdk-connectionsecret)|*No description*
[Names](#crossplane-cdk-names)|*No description*
[Prop](#crossplane-cdk-prop)|JSII callback class/interface.
[Resource](#crossplane-cdk-resource)|Base class for all Crossplane core objects.
[SchemaPropInteger](#crossplane-cdk-schemapropinteger)|*No description*
[SchemaPropObject](#crossplane-cdk-schemapropobject)|*No description*
[SchemaPropString](#crossplane-cdk-schemapropstring)|*No description*
[Version](#crossplane-cdk-version)|*No description*


**Structs**

Name|Description
----|-----------
[CompositeResourceDefinitionProps](#crossplane-cdk-compositeresourcedefinitionprops)|An CompositeResourceDefinition defines a new kind of composite infrastructure resource.
[CompositeResourceDefinitionSpecClaimNamesProps](#crossplane-cdk-compositeresourcedefinitionspecclaimnamesprops)|ClaimNames specifies the names of an optional composite resource claim.
[CompositeResourceDefinitionSpecDefaultCompositionRefProps](#crossplane-cdk-compositeresourcedefinitionspecdefaultcompositionrefprops)|DefaultCompositionRef refers to the Composition resource that will be used in case no composition selector is given.
[CompositeResourceDefinitionSpecEnforcedCompositionRefProps](#crossplane-cdk-compositeresourcedefinitionspecenforcedcompositionrefprops)|EnforcedCompositionRef refers to the Composition resource that will be used by all composite instances whose schema is defined by this definition.
[CompositeResourceDefinitionSpecNamesProps](#crossplane-cdk-compositeresourcedefinitionspecnamesprops)|Names specifies the resource and kind names of the defined composite resource.
[CompositeResourceDefinitionSpecProps](#crossplane-cdk-compositeresourcedefinitionspecprops)|CompositeResourceDefinitionSpec specifies the desired state of the definition.
[CompositeResourceDefinitionSpecVersionsAdditionalPrinterColumnsProps](#crossplane-cdk-compositeresourcedefinitionspecversionsadditionalprintercolumnsprops)|CustomResourceColumnDefinition specifies a column for server side printing.
[CompositeResourceDefinitionSpecVersionsProps](#crossplane-cdk-compositeresourcedefinitionspecversionsprops)|CompositeResourceDefinitionVersion describes a version of an XR.
[CompositeResourceDefinitionSpecVersionsSchemaProps](#crossplane-cdk-compositeresourcedefinitionspecversionsschemaprops)|Schema describes the schema used for validation, pruning, and defaulting of this version of the defined composite resource.
[ConfigurationProps](#crossplane-cdk-configurationprops)|Properties for initialization of `Configuration`.
[ProviderDep](#crossplane-cdk-providerdep)|*No description*
[ResourceProps](#crossplane-cdk-resourceprops)|Initialization properties for resources.


**Interfaces**

Name|Description
----|-----------
[IAnyProp](#crossplane-cdk-ianyprop)|*No description*
[IConfiguration](#crossplane-cdk-iconfiguration)|Represents a Crossplane Configuration package.
[IResource](#crossplane-cdk-iresource)|Represents a resource.
[ISchemaProp](#crossplane-cdk-ischemaprop)|*No description*
[ISchemaPropMeta](#crossplane-cdk-ischemapropmeta)|Schema Props.


**Enums**

Name|Description
----|-----------
[InputType](#crossplane-cdk-inputtype)|UI Input Control Style.



## class CompositeResourceDefinition  <a id="crossplane-cdk-compositeresourcedefinition"></a>

An CompositeResourceDefinition defines a new kind of composite infrastructure resource.

The new resource is composed of other composite or managed infrastructure resources.

__Implements__: [IConstruct](#constructs-iconstruct), [IResource](#crossplane-cdk-iresource)
__Extends__: [Resource](#crossplane-cdk-resource)

### Initializer




```ts
new CompositeResourceDefinition(scope: Construct, id: string, props?: CompositeResourceDefinitionProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[CompositeResourceDefinitionProps](#crossplane-cdk-compositeresourcedefinitionprops)</code>)  *No description*
  * **metadata** (<code>[ApiObjectMetadata](#cdk8s-apiobjectmetadata)</code>)  *No description* __*Optional*__
  * **name** (<code>string</code>)  *No description* __*Optional*__
  * **spec** (<code>[CompositeResourceDefinitionSpecProps](#crossplane-cdk-compositeresourcedefinitionspecprops)</code>)  CompositeResourceDefinitionSpec specifies the desired state of the definition. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**apiObject** | <code>[ApiObject](#cdk8s-apiobject)</code> | The underlying cdk8s API object.

### Methods


#### claimKind(kind) <a id="crossplane-cdk-compositeresourcedefinition-claimkind"></a>



```ts
claimKind(kind: string): Names
```

* **kind** (<code>string</code>)  *No description*

__Returns__:
* <code>[Names](#crossplane-cdk-names)</code>

#### connectionSecret() <a id="crossplane-cdk-compositeresourcedefinition-connectionsecret"></a>



```ts
connectionSecret(): ConnectionSecret
```


__Returns__:
* <code>[ConnectionSecret](#crossplane-cdk-connectionsecret)</code>

#### group(val) <a id="crossplane-cdk-compositeresourcedefinition-group"></a>



```ts
group(val: string): CompositeResourceDefinition
```

* **val** (<code>string</code>)  *No description*

__Returns__:
* <code>[CompositeResourceDefinition](#crossplane-cdk-compositeresourcedefinition)</code>

#### kind(kind) <a id="crossplane-cdk-compositeresourcedefinition-kind"></a>



```ts
kind(kind: string): Names
```

* **kind** (<code>string</code>)  *No description*

__Returns__:
* <code>[Names](#crossplane-cdk-names)</code>

#### version(name) <a id="crossplane-cdk-compositeresourcedefinition-version"></a>



```ts
version(name: string): Version
```

* **name** (<code>string</code>)  *No description*

__Returns__:
* <code>[Version](#crossplane-cdk-version)</code>



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
  * **crossplaneVersion** (<code>string</code>)  *No description* __*Default*__: ">=v1.0.0-0"
  * **description** (<code>string</code>)  *No description* __*Optional*__
  * **descriptionShort** (<code>string</code>)  *No description* __*Optional*__
  * **iconData** (<code>string</code>)  *No description* __*Optional*__
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






## class ConnectionSecret  <a id="crossplane-cdk-connectionsecret"></a>




### Initializer




```ts
new ConnectionSecret()
```



### Methods


#### key(val) <a id="crossplane-cdk-connectionsecret-key"></a>



```ts
key(val: string): ConnectionSecret
```

* **val** (<code>string</code>)  *No description*

__Returns__:
* <code>[ConnectionSecret](#crossplane-cdk-connectionsecret)</code>



## class Names  <a id="crossplane-cdk-names"></a>




### Initializer




```ts
new Names(xrd: CompositeResourceDefinition, kind: string)
```

* **xrd** (<code>[CompositeResourceDefinition](#crossplane-cdk-compositeresourcedefinition)</code>)  *No description*
* **kind** (<code>string</code>)  *No description*


### Methods


#### category(val) <a id="crossplane-cdk-names-category"></a>



```ts
category(val: string): void
```

* **val** (<code>string</code>)  *No description*




#### listKind(val) <a id="crossplane-cdk-names-listkind"></a>



```ts
listKind(val: string): void
```

* **val** (<code>string</code>)  *No description*




#### plural(val) <a id="crossplane-cdk-names-plural"></a>



```ts
plural(val: string): void
```

* **val** (<code>string</code>)  *No description*




#### shortNames(val) <a id="crossplane-cdk-names-shortnames"></a>



```ts
shortNames(val: string): void
```

* **val** (<code>string</code>)  *No description*




#### singular(val) <a id="crossplane-cdk-names-singular"></a>



```ts
singular(val: string): void
```

* **val** (<code>string</code>)  *No description*






## class Prop  <a id="crossplane-cdk-prop"></a>

JSII callback class/interface.


### Methods


#### object(prop) <a id="crossplane-cdk-prop-object"></a>



```ts
object(prop: SchemaPropObject): any
```

* **prop** (<code>[SchemaPropObject](#crossplane-cdk-schemapropobject)</code>)  *No description*

__Returns__:
* <code>any</code>

#### *static* for(doer) <a id="crossplane-cdk-prop-for"></a>



```ts
static for(doer: IAnyProp): any
```

* **doer** (<code>[IAnyProp](#crossplane-cdk-ianyprop)</code>)  *No description*

__Returns__:
* <code>any</code>



## class Resource  <a id="crossplane-cdk-resource"></a>

Base class for all Crossplane core objects.

Represents a single resource.

__Implements__: [IConstruct](#constructs-iconstruct), [IResource](#crossplane-cdk-iresource)
__Extends__: [Construct](#constructs-construct)
__Implemented by__: [CompositeResourceDefinition](#crossplane-cdk-compositeresourcedefinition), [Configuration](#crossplane-cdk-configuration)

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



## class SchemaPropInteger  <a id="crossplane-cdk-schemapropinteger"></a>



__Implements__: [ISchemaProp](#crossplane-cdk-ischemaprop)

### Initializer




```ts
new SchemaPropInteger(_xrd: CompositeResourceDefinition, _parentPath: string, name: string)
```

* **_xrd** (<code>[CompositeResourceDefinition](#crossplane-cdk-compositeresourcedefinition)</code>)  *No description*
* **_parentPath** (<code>string</code>)  *No description*
* **name** (<code>string</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**meta** | <code>[ISchemaPropMeta](#crossplane-cdk-ischemapropmeta)</code> | <span></span>

### Methods


#### description(val) <a id="crossplane-cdk-schemapropinteger-description"></a>



```ts
description(val: string): SchemaPropInteger
```

* **val** (<code>string</code>)  *No description*

__Returns__:
* <code>[SchemaPropInteger](#crossplane-cdk-schemapropinteger)</code>

#### max(val) <a id="crossplane-cdk-schemapropinteger-max"></a>



```ts
max(val: number): SchemaPropInteger
```

* **val** (<code>number</code>)  *No description*

__Returns__:
* <code>[SchemaPropInteger](#crossplane-cdk-schemapropinteger)</code>

#### min(val) <a id="crossplane-cdk-schemapropinteger-min"></a>



```ts
min(val: number): SchemaPropInteger
```

* **val** (<code>number</code>)  *No description*

__Returns__:
* <code>[SchemaPropInteger](#crossplane-cdk-schemapropinteger)</code>

#### required(val?) <a id="crossplane-cdk-schemapropinteger-required"></a>



```ts
required(val?: boolean): SchemaPropInteger
```

* **val** (<code>boolean</code>)  *No description*

__Returns__:
* <code>[SchemaPropInteger](#crossplane-cdk-schemapropinteger)</code>

#### uiDefault(val) <a id="crossplane-cdk-schemapropinteger-uidefault"></a>



```ts
uiDefault(val: number): SchemaPropInteger
```

* **val** (<code>number</code>)  *No description*

__Returns__:
* <code>[SchemaPropInteger](#crossplane-cdk-schemapropinteger)</code>

#### uiDescription(val) <a id="crossplane-cdk-schemapropinteger-uidescription"></a>



```ts
uiDescription(val: string): SchemaPropInteger
```

* **val** (<code>string</code>)  *No description*

__Returns__:
* <code>[SchemaPropInteger](#crossplane-cdk-schemapropinteger)</code>

#### uiInputSingle() <a id="crossplane-cdk-schemapropinteger-uiinputsingle"></a>



```ts
uiInputSingle(): SchemaPropInteger
```


__Returns__:
* <code>[SchemaPropInteger](#crossplane-cdk-schemapropinteger)</code>

#### uiName(val) <a id="crossplane-cdk-schemapropinteger-uiname"></a>



```ts
uiName(val: string): SchemaPropInteger
```

* **val** (<code>string</code>)  *No description*

__Returns__:
* <code>[SchemaPropInteger](#crossplane-cdk-schemapropinteger)</code>



## class SchemaPropObject  <a id="crossplane-cdk-schemapropobject"></a>



__Implements__: [ISchemaProp](#crossplane-cdk-ischemaprop)

### Initializer




```ts
new SchemaPropObject(xrd: CompositeResourceDefinition, parentPath: string, name: string)
```

* **xrd** (<code>[CompositeResourceDefinition](#crossplane-cdk-compositeresourcedefinition)</code>)  *No description*
* **parentPath** (<code>string</code>)  *No description*
* **name** (<code>string</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**isRequired** | <code>boolean</code> | <span></span>
**meta** | <code>[ISchemaPropMeta](#crossplane-cdk-ischemapropmeta)</code> | <span></span>

### Methods


#### description(val) <a id="crossplane-cdk-schemapropobject-description"></a>



```ts
description(val: string): SchemaPropObject
```

* **val** (<code>string</code>)  *No description*

__Returns__:
* <code>[SchemaPropObject](#crossplane-cdk-schemapropobject)</code>

#### propInteger(name) <a id="crossplane-cdk-schemapropobject-propinteger"></a>



```ts
propInteger(name: string): SchemaPropInteger
```

* **name** (<code>string</code>)  *No description*

__Returns__:
* <code>[SchemaPropInteger](#crossplane-cdk-schemapropinteger)</code>

#### propObject(name) <a id="crossplane-cdk-schemapropobject-propobject"></a>



```ts
propObject(name: string): SchemaPropObject
```

* **name** (<code>string</code>)  *No description*

__Returns__:
* <code>[SchemaPropObject](#crossplane-cdk-schemapropobject)</code>

#### propString(name) <a id="crossplane-cdk-schemapropobject-propstring"></a>



```ts
propString(name: string): SchemaPropString
```

* **name** (<code>string</code>)  *No description*

__Returns__:
* <code>[SchemaPropString](#crossplane-cdk-schemapropstring)</code>

#### required(val?) <a id="crossplane-cdk-schemapropobject-required"></a>



```ts
required(val?: boolean): SchemaPropObject
```

* **val** (<code>boolean</code>)  *No description*

__Returns__:
* <code>[SchemaPropObject](#crossplane-cdk-schemapropobject)</code>

#### with(prop) <a id="crossplane-cdk-schemapropobject-with"></a>



```ts
with(prop: Prop): SchemaPropObject
```

* **prop** (<code>[Prop](#crossplane-cdk-prop)</code>)  *No description*

__Returns__:
* <code>[SchemaPropObject](#crossplane-cdk-schemapropobject)</code>



## class SchemaPropString  <a id="crossplane-cdk-schemapropstring"></a>



__Implements__: [ISchemaProp](#crossplane-cdk-ischemaprop)

### Initializer




```ts
new SchemaPropString(_xrd: CompositeResourceDefinition, _parentPath: string, name: string)
```

* **_xrd** (<code>[CompositeResourceDefinition](#crossplane-cdk-compositeresourcedefinition)</code>)  *No description*
* **_parentPath** (<code>string</code>)  *No description*
* **name** (<code>string</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**meta** | <code>[ISchemaPropMeta](#crossplane-cdk-ischemapropmeta)</code> | <span></span>

### Methods


#### description(val) <a id="crossplane-cdk-schemapropstring-description"></a>



```ts
description(val: string): SchemaPropString
```

* **val** (<code>string</code>)  *No description*

__Returns__:
* <code>[SchemaPropString](#crossplane-cdk-schemapropstring)</code>

#### required(val?) <a id="crossplane-cdk-schemapropstring-required"></a>



```ts
required(val?: boolean): SchemaPropString
```

* **val** (<code>boolean</code>)  *No description*

__Returns__:
* <code>[SchemaPropString](#crossplane-cdk-schemapropstring)</code>



## class Version  <a id="crossplane-cdk-version"></a>




### Initializer




```ts
new Version(xrd: CompositeResourceDefinition, name: string)
```

* **xrd** (<code>[CompositeResourceDefinition](#crossplane-cdk-compositeresourcedefinition)</code>)  *No description*
* **name** (<code>string</code>)  *No description*


### Methods


#### referencable(val?) <a id="crossplane-cdk-version-referencable"></a>



```ts
referencable(val?: boolean): Version
```

* **val** (<code>boolean</code>)  *No description*

__Returns__:
* <code>[Version](#crossplane-cdk-version)</code>

#### served(val?) <a id="crossplane-cdk-version-served"></a>



```ts
served(val?: boolean): Version
```

* **val** (<code>boolean</code>)  *No description*

__Returns__:
* <code>[Version](#crossplane-cdk-version)</code>

#### spec() <a id="crossplane-cdk-version-spec"></a>



```ts
spec(): SchemaPropObject
```


__Returns__:
* <code>[SchemaPropObject](#crossplane-cdk-schemapropobject)</code>



## struct CompositeResourceDefinitionProps  <a id="crossplane-cdk-compositeresourcedefinitionprops"></a>


An CompositeResourceDefinition defines a new kind of composite infrastructure resource.

The new resource is composed of other composite or managed infrastructure resources.



Name | Type | Description 
-----|------|-------------
**metadata**? | <code>[ApiObjectMetadata](#cdk8s-apiobjectmetadata)</code> | __*Optional*__
**name**? | <code>string</code> | __*Optional*__
**spec**? | <code>[CompositeResourceDefinitionSpecProps](#crossplane-cdk-compositeresourcedefinitionspecprops)</code> | CompositeResourceDefinitionSpec specifies the desired state of the definition.<br/>__*Optional*__



## struct CompositeResourceDefinitionSpecClaimNamesProps  <a id="crossplane-cdk-compositeresourcedefinitionspecclaimnamesprops"></a>


ClaimNames specifies the names of an optional composite resource claim.

When claim names are specified Crossplane will create a namespaced 'composite resource claim' CRD that corresponds to the defined composite resource. This composite resource claim acts as a namespaced proxy for the composite resource; creating, updating, or deleting the claim will create, update, or delete a corresponding composite resource. You may add claim names to an existing CompositeResourceDefinition, but they cannot be changed or removed once they have been set.



Name | Type | Description 
-----|------|-------------
**kind** | <code>string</code> | kind is the serialized kind of the resource.
**plural** | <code>string</code> | plural is the plural name of the resource to serve.
**categories**? | <code>Array<string></code> | categories is a list of grouped resources this custom resource belongs to (e.g. 'all'). This is published in API discovery documents, and used by clients to support invocations like `kubectl get all`.<br/>__*Optional*__
**listKind**? | <code>string</code> | listKind is the serialized kind of the list for this resource.<br/>__*Default*__: kind`List".
**shortNames**? | <code>Array<string></code> | shortNames are short names for the resource, exposed in API discovery documents, and used by clients to support invocations like `kubectl get <shortname>`.<br/>__*Optional*__
**singular**? | <code>string</code> | singular is the singular name of the resource.<br/>__*Default*__: lowercased `kind`.



## struct CompositeResourceDefinitionSpecDefaultCompositionRefProps  <a id="crossplane-cdk-compositeresourcedefinitionspecdefaultcompositionrefprops"></a>


DefaultCompositionRef refers to the Composition resource that will be used in case no composition selector is given.



Name | Type | Description 
-----|------|-------------
**name** | <code>string</code> | Name of the referenced object.



## struct CompositeResourceDefinitionSpecEnforcedCompositionRefProps  <a id="crossplane-cdk-compositeresourcedefinitionspecenforcedcompositionrefprops"></a>


EnforcedCompositionRef refers to the Composition resource that will be used by all composite instances whose schema is defined by this definition.



Name | Type | Description 
-----|------|-------------
**name** | <code>string</code> | Name of the referenced object.



## struct CompositeResourceDefinitionSpecNamesProps  <a id="crossplane-cdk-compositeresourcedefinitionspecnamesprops"></a>


Names specifies the resource and kind names of the defined composite resource.



Name | Type | Description 
-----|------|-------------
**kind** | <code>string</code> | kind is the serialized kind of the resource.
**plural** | <code>string</code> | plural is the plural name of the resource to serve.
**categories**? | <code>Array<string></code> | categories is a list of grouped resources this custom resource belongs to (e.g. 'all'). This is published in API discovery documents, and used by clients to support invocations like `kubectl get all`.<br/>__*Optional*__
**listKind**? | <code>string</code> | listKind is the serialized kind of the list for this resource.<br/>__*Default*__: kind`List".
**shortNames**? | <code>Array<string></code> | shortNames are short names for the resource, exposed in API discovery documents, and used by clients to support invocations like `kubectl get <shortname>`.<br/>__*Optional*__
**singular**? | <code>string</code> | singular is the singular name of the resource.<br/>__*Default*__: lowercased `kind`.



## struct CompositeResourceDefinitionSpecProps  <a id="crossplane-cdk-compositeresourcedefinitionspecprops"></a>


CompositeResourceDefinitionSpec specifies the desired state of the definition.



Name | Type | Description 
-----|------|-------------
**group** | <code>string</code> | Group specifies the API group of the defined composite resource.
**names** | <code>[CompositeResourceDefinitionSpecNamesProps](#crossplane-cdk-compositeresourcedefinitionspecnamesprops)</code> | Names specifies the resource and kind names of the defined composite resource.
**versions** | <code>Array<[CompositeResourceDefinitionSpecVersionsProps](#crossplane-cdk-compositeresourcedefinitionspecversionsprops)></code> | Versions is the list of all API versions of the defined composite resource.
**claimNames**? | <code>[CompositeResourceDefinitionSpecClaimNamesProps](#crossplane-cdk-compositeresourcedefinitionspecclaimnamesprops)</code> | ClaimNames specifies the names of an optional composite resource claim.<br/>__*Optional*__
**connectionSecretKeys**? | <code>Array<string></code> | ConnectionSecretKeys is the list of keys that will be exposed to the end user of the defined kind.<br/>__*Optional*__
**defaultCompositionRef**? | <code>[CompositeResourceDefinitionSpecDefaultCompositionRefProps](#crossplane-cdk-compositeresourcedefinitionspecdefaultcompositionrefprops)</code> | DefaultCompositionRef refers to the Composition resource that will be used in case no composition selector is given.<br/>__*Optional*__
**enforcedCompositionRef**? | <code>[CompositeResourceDefinitionSpecEnforcedCompositionRefProps](#crossplane-cdk-compositeresourcedefinitionspecenforcedcompositionrefprops)</code> | EnforcedCompositionRef refers to the Composition resource that will be used by all composite instances whose schema is defined by this definition.<br/>__*Optional*__



## struct CompositeResourceDefinitionSpecVersionsAdditionalPrinterColumnsProps  <a id="crossplane-cdk-compositeresourcedefinitionspecversionsadditionalprintercolumnsprops"></a>


CustomResourceColumnDefinition specifies a column for server side printing.



Name | Type | Description 
-----|------|-------------
**jsonPath** | <code>string</code> | jsonPath is a simple JSON path (i.e. with array notation) which is evaluated against each custom resource to produce the value for this column.
**name** | <code>string</code> | name is a human readable name for the column.
**type** | <code>string</code> | type is an OpenAPI type definition for this column.
**description**? | <code>string</code> | description is a human readable description of this column.<br/>__*Optional*__
**format**? | <code>string</code> | format is an optional OpenAPI type definition for this column.<br/>__*Optional*__
**priority**? | <code>number</code> | priority is an integer defining the relative importance of this column compared to others.<br/>__*Optional*__



## struct CompositeResourceDefinitionSpecVersionsProps  <a id="crossplane-cdk-compositeresourcedefinitionspecversionsprops"></a>


CompositeResourceDefinitionVersion describes a version of an XR.



Name | Type | Description 
-----|------|-------------
**name** | <code>string</code> | Name of this version, e.g. “v1”, “v2beta1”, etc. Composite resources are served under this version at `/apis/<group>/<version>/...` if `served` is true.
**referenceable** | <code>boolean</code> | Referenceable specifies that this version may be referenced by a Composition in order to configure which resources an XR may be composed of.
**served** | <code>boolean</code> | Served specifies that this version should be served via REST APIs.
**additionalPrinterColumns**? | <code>Array<[CompositeResourceDefinitionSpecVersionsAdditionalPrinterColumnsProps](#crossplane-cdk-compositeresourcedefinitionspecversionsadditionalprintercolumnsprops)></code> | AdditionalPrinterColumns specifies additional columns returned in Table output.<br/>__*Optional*__
**schema**? | <code>[CompositeResourceDefinitionSpecVersionsSchemaProps](#crossplane-cdk-compositeresourcedefinitionspecversionsschemaprops)</code> | Schema describes the schema used for validation, pruning, and defaulting of this version of the defined composite resource.<br/>__*Optional*__



## struct CompositeResourceDefinitionSpecVersionsSchemaProps  <a id="crossplane-cdk-compositeresourcedefinitionspecversionsschemaprops"></a>


Schema describes the schema used for validation, pruning, and defaulting of this version of the defined composite resource.

Fields required by all composite resources will be injected into this schema automatically, and will override equivalently named fields in this schema. Omitting this schema results in a schema that contains only the fields required by all composite resources.



Name | Type | Description 
-----|------|-------------
**openAPIV3Schema**? | <code>any</code> | OpenAPIV3Schema is the OpenAPI v3 schema to use for validation and pruning.<br/>__*Optional*__



## struct ConfigurationProps  <a id="crossplane-cdk-configurationprops"></a>


Properties for initialization of `Configuration`.



Name | Type | Description 
-----|------|-------------
**company**? | <code>string</code> | __*Optional*__
**crossplaneVersion**? | <code>string</code> | __*Default*__: ">=v1.0.0-0"
**description**? | <code>string</code> | __*Optional*__
**descriptionShort**? | <code>string</code> | __*Optional*__
**iconData**? | <code>string</code> | __*Optional*__
**keywords**? | <code>Array<string></code> | __*Optional*__
**license**? | <code>string</code> | __*Optional*__
**maintainer**? | <code>string</code> | __*Optional*__
**metadata**? | <code>[ApiObjectMetadata](#cdk8s-apiobjectmetadata)</code> | Metadata that all persisted resources must have, which includes all objects users must create.<br/>__*Optional*__
**name**? | <code>string</code> | __*Optional*__
**providers**? | <code>Array<[ProviderDep](#crossplane-cdk-providerdep)></code> | __*Optional*__
**readme**? | <code>string</code> | __*Optional*__
**source**? | <code>string</code> | __*Optional*__



## interface IAnyProp  <a id="crossplane-cdk-ianyprop"></a>



### Methods


#### object(prop) <a id="crossplane-cdk-ianyprop-object"></a>



```ts
object(prop: SchemaPropObject): any
```

* **prop** (<code>[SchemaPropObject](#crossplane-cdk-schemapropobject)</code>)  *No description*

__Returns__:
* <code>any</code>



## interface IConfiguration  <a id="crossplane-cdk-iconfiguration"></a>

__Implemented by__: [Configuration](#crossplane-cdk-configuration)

Represents a Crossplane Configuration package.

### Properties


Name | Type | Description 
-----|------|-------------
**name** | <code>string</code> | The Kubernetes name of this resource.



## interface IResource  <a id="crossplane-cdk-iresource"></a>

__Implemented by__: [CompositeResourceDefinition](#crossplane-cdk-compositeresourcedefinition), [Configuration](#crossplane-cdk-configuration)

Represents a resource.

### Properties


Name | Type | Description 
-----|------|-------------
**name** | <code>string</code> | The Kubernetes name of this resource.



## interface ISchemaProp  <a id="crossplane-cdk-ischemaprop"></a>

__Implemented by__: [SchemaPropInteger](#crossplane-cdk-schemapropinteger), [SchemaPropObject](#crossplane-cdk-schemapropobject), [SchemaPropString](#crossplane-cdk-schemapropstring)



### Properties


Name | Type | Description 
-----|------|-------------
**meta** | <code>[ISchemaPropMeta](#crossplane-cdk-ischemapropmeta)</code> | <span></span>



## interface ISchemaPropMeta  <a id="crossplane-cdk-ischemapropmeta"></a>


Schema Props.

### Properties


Name | Type | Description 
-----|------|-------------
**name** | <code>string</code> | <span></span>
**required** | <code>boolean</code> | <span></span>



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



## enum InputType  <a id="crossplane-cdk-inputtype"></a>

UI Input Control Style.

Name | Description
-----|-----
**SINGLE_INPUT** |Single input.


