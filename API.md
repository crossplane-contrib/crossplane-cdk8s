# API Reference

**Classes**

Name|Description
----|-----------
[CompositeResourceDefinition](#crossplane-cdk8s-compositeresourcedefinition)|An CompositeResourceDefinition defines a new kind of composite infrastructure resource.
[Composition](#crossplane-cdk8s-composition)|Composition defines the group of resources to be created when a compatible type is created with reference to the composition.
[CompositionSpecResource](#crossplane-cdk8s-compositionspecresource)|*No description*
[Configuration](#crossplane-cdk8s-configuration)|*No description*
[ConnectionSecret](#crossplane-cdk8s-connectionsecret)|*No description*
[MetaUI](#crossplane-cdk8s-metaui)|*No description*
[MetaUIInput](#crossplane-cdk8s-metauiinput)|*No description*
[MetaUISection](#crossplane-cdk8s-metauisection)|*No description*
[Names](#crossplane-cdk8s-names)|*No description*
[Prop](#crossplane-cdk8s-prop)|JSII callback class/interface for SchemaProp.with().
[Resource](#crossplane-cdk8s-resource)|Base class for all Crossplane core objects.
[SchemaPropInteger](#crossplane-cdk8s-schemapropinteger)|*No description*
[SchemaPropObject](#crossplane-cdk8s-schemapropobject)|openAPIv3Schema Object with MetaUI.
[SchemaPropString](#crossplane-cdk8s-schemapropstring)|*No description*
[Version](#crossplane-cdk8s-version)|*No description*


**Structs**

Name|Description
----|-----------
[CompositeResourceDefinitionProps](#crossplane-cdk8s-compositeresourcedefinitionprops)|An CompositeResourceDefinition defines a new kind of composite infrastructure resource.
[CompositionProps](#crossplane-cdk8s-compositionprops)|Composition defines the group of resources to be created when a compatible type is created with reference to the composition.
[ConfigurationProps](#crossplane-cdk8s-configurationprops)|Properties for initialization of `Configuration`.
[MetaUIInputIntegerPropOverrides](#crossplane-cdk8s-metauiinputintegerpropoverrides)|*No description*
[MetaUIInputIntegerProps](#crossplane-cdk8s-metauiinputintegerprops)|*No description*
[MetaUIInputPropOverrides](#crossplane-cdk8s-metauiinputpropoverrides)|Overrides with optional inputs for fluent API with reasonable defaults.
[MetaUIInputProps](#crossplane-cdk8s-metauiinputprops)|*No description*
[MetaUIInputStringPropOverrides](#crossplane-cdk8s-metauiinputstringpropoverrides)|*No description*
[MetaUIInputStringProps](#crossplane-cdk8s-metauiinputstringprops)|*No description*
[MetaUISectionProps](#crossplane-cdk8s-metauisectionprops)|*No description*
[ProviderDep](#crossplane-cdk8s-providerdep)|*No description*
[ResourceProps](#crossplane-cdk8s-resourceprops)|Initialization properties for resources.


**Interfaces**

Name|Description
----|-----------
[IAnyProp](#crossplane-cdk8s-ianyprop)|*No description*
[ICompositeResourceDefinitionMeta](#crossplane-cdk8s-icompositeresourcedefinitionmeta)|*No description*
[IConfiguration](#crossplane-cdk8s-iconfiguration)|Represents a Crossplane Configuration package.
[IConnectionSecretMeta](#crossplane-cdk8s-iconnectionsecretmeta)|*No description*
[INamesMeta](#crossplane-cdk8s-inamesmeta)|*No description*
[IResource](#crossplane-cdk8s-iresource)|Represents a resource.
[ISchemaProp](#crossplane-cdk8s-ischemaprop)|Schema Props.
[ISchemaPropMeta](#crossplane-cdk8s-ischemapropmeta)|*No description*
[ISchemaPropMetaInteger](#crossplane-cdk8s-ischemapropmetainteger)|*No description*
[ISchemaPropMetaString](#crossplane-cdk8s-ischemapropmetastring)|*No description*
[IVersionMeta](#crossplane-cdk8s-iversionmeta)|*No description*


**Enums**

Name|Description
----|-----------
[InputType](#crossplane-cdk8s-inputtype)|*No description*
[PropType](#crossplane-cdk8s-proptype)|*No description*



## class CompositeResourceDefinition  <a id="crossplane-cdk8s-compositeresourcedefinition"></a>

An CompositeResourceDefinition defines a new kind of composite infrastructure resource.

The new resource is composed of other composite or
managed infrastructure resources.

__Implements__: [IConstruct](#constructs-iconstruct), [IResource](#crossplane-cdk8s-iresource)
__Extends__: [Resource](#crossplane-cdk8s-resource)

### Initializer




```ts
new CompositeResourceDefinition(scope: Construct, id: string, props?: CompositeResourceDefinitionProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[CompositeResourceDefinitionProps](#crossplane-cdk8s-compositeresourcedefinitionprops)</code>)  *No description*
  * **metadata** (<code>[ApiObjectMetadata](#cdk8s-apiobjectmetadata)</code>)  Metadata that all persisted resources must have, which includes all objects users must create. __*Optional*__
  * **name** (<code>string</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**apiObject** | <code>[ApiObject](#cdk8s-apiobject)</code> | The underlying cdk8s API object.
**fqn** | <code>string</code> | <span></span>
**meta** | <code>[ICompositeResourceDefinitionMeta](#crossplane-cdk8s-icompositeresourcedefinitionmeta)</code> | <span></span>
**ui** | <code>[MetaUI](#crossplane-cdk8s-metaui)</code> | <span></span>

### Methods


#### claimKind(kind) <a id="crossplane-cdk8s-compositeresourcedefinition-claimkind"></a>



```ts
claimKind(kind: string): Names
```

* **kind** (<code>string</code>)  *No description*

__Returns__:
* <code>[Names](#crossplane-cdk8s-names)</code>

#### connectionSecret() <a id="crossplane-cdk8s-compositeresourcedefinition-connectionsecret"></a>



```ts
connectionSecret(): ConnectionSecret
```


__Returns__:
* <code>[ConnectionSecret](#crossplane-cdk8s-connectionsecret)</code>

#### group(val) <a id="crossplane-cdk8s-compositeresourcedefinition-group"></a>



```ts
group(val: string): CompositeResourceDefinition
```

* **val** (<code>string</code>)  *No description*

__Returns__:
* <code>[CompositeResourceDefinition](#crossplane-cdk8s-compositeresourcedefinition)</code>

#### kind(kind) <a id="crossplane-cdk8s-compositeresourcedefinition-kind"></a>



```ts
kind(kind: string): Names
```

* **kind** (<code>string</code>)  *No description*

__Returns__:
* <code>[Names](#crossplane-cdk8s-names)</code>

#### version(name) <a id="crossplane-cdk8s-compositeresourcedefinition-version"></a>



```ts
version(name: string): Version
```

* **name** (<code>string</code>)  *No description*

__Returns__:
* <code>[Version](#crossplane-cdk8s-version)</code>



## class Composition  <a id="crossplane-cdk8s-composition"></a>

Composition defines the group of resources to be created when a compatible type is created with reference to the composition.

__Implements__: [IConstruct](#constructs-iconstruct), [IResource](#crossplane-cdk8s-iresource)
__Extends__: [Resource](#crossplane-cdk8s-resource)

### Initializer




```ts
new Composition(scope: Construct, id: string, xrd: CompositeResourceDefinition, props?: CompositionProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **xrd** (<code>[CompositeResourceDefinition](#crossplane-cdk8s-compositeresourcedefinition)</code>)  *No description*
* **props** (<code>[CompositionProps](#crossplane-cdk8s-compositionprops)</code>)  *No description*
  * **metadata** (<code>[ApiObjectMetadata](#cdk8s-apiobjectmetadata)</code>)  Metadata that all persisted resources must have, which includes all objects users must create. __*Optional*__
  * **name** (<code>string</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**apiObject** | <code>[ApiObject](#cdk8s-apiobject)</code> | The underlying cdk8s API object.

### Methods


#### addResource(base) <a id="crossplane-cdk8s-composition-addresource"></a>



```ts
addResource(base: any): CompositionSpecResource
```

* **base** (<code>any</code>)  *No description*

__Returns__:
* <code>[CompositionSpecResource](#crossplane-cdk8s-compositionspecresource)</code>



## class CompositionSpecResource  <a id="crossplane-cdk8s-compositionspecresource"></a>




### Initializer


use Composition.addResource() instead.

```ts
new CompositionSpecResource(xrd: CompositeResourceDefinition, base: any)
```

* **xrd** (<code>[CompositeResourceDefinition](#crossplane-cdk8s-compositeresourcedefinition)</code>)  *No description*
* **base** (<code>any</code>)  *No description*


### Methods


#### connectionDetailsFromXrd(xrd?) <a id="crossplane-cdk8s-compositionspecresource-connectiondetailsfromxrd"></a>



```ts
connectionDetailsFromXrd(xrd?: CompositeResourceDefinition): CompositionSpecResource
```

* **xrd** (<code>[CompositeResourceDefinition](#crossplane-cdk8s-compositeresourcedefinition)</code>)  *No description*

__Returns__:
* <code>[CompositionSpecResource](#crossplane-cdk8s-compositionspecresource)</code>

#### mapFieldPath(from, to) <a id="crossplane-cdk8s-compositionspecresource-mapfieldpath"></a>



```ts
mapFieldPath(from: string, to: string): CompositionSpecResource
```

* **from** (<code>string</code>)  *No description*
* **to** (<code>string</code>)  *No description*

__Returns__:
* <code>[CompositionSpecResource](#crossplane-cdk8s-compositionspecresource)</code>

#### mapFieldPathXFormStringFormat(from, format, to) <a id="crossplane-cdk8s-compositionspecresource-mapfieldpathxformstringformat"></a>



```ts
mapFieldPathXFormStringFormat(from: string, format: string, to: string): CompositionSpecResource
```

* **from** (<code>string</code>)  *No description*
* **format** (<code>string</code>)  e.g. "%s-suffix".
* **to** (<code>string</code>)  *No description*

__Returns__:
* <code>[CompositionSpecResource](#crossplane-cdk8s-compositionspecresource)</code>



## class Configuration  <a id="crossplane-cdk8s-configuration"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IResource](#crossplane-cdk8s-iresource), [IConfiguration](#crossplane-cdk8s-iconfiguration), [IResource](#crossplane-cdk8s-iresource)
__Extends__: [Resource](#crossplane-cdk8s-resource)

### Initializer




```ts
new Configuration(scope: Construct, id: string, props?: ConfigurationProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[ConfigurationProps](#crossplane-cdk8s-configurationprops)</code>)  *No description*
  * **metadata** (<code>[ApiObjectMetadata](#cdk8s-apiobjectmetadata)</code>)  Metadata that all persisted resources must have, which includes all objects users must create. __*Optional*__
  * **name** (<code>string</code>)  *No description* __*Optional*__
  * **company** (<code>string</code>)  *No description* __*Optional*__
  * **crossplaneVersion** (<code>string</code>)  *No description* __*Default*__: ">=v1.0.0-0"
  * **description** (<code>string</code>)  *No description* __*Optional*__
  * **descriptionShort** (<code>string</code>)  *No description* __*Optional*__
  * **iconData** (<code>string</code>)  *No description* __*Optional*__
  * **keywords** (<code>Array<string></code>)  *No description* __*Optional*__
  * **license** (<code>string</code>)  *No description* __*Optional*__
  * **maintainer** (<code>string</code>)  *No description* __*Optional*__
  * **providers** (<code>Array<[ProviderDep](#crossplane-cdk8s-providerdep)></code>)  *No description* __*Optional*__
  * **readme** (<code>string</code>)  *No description* __*Optional*__
  * **source** (<code>string</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**apiObject** | <code>[ApiObject](#cdk8s-apiobject)</code> | The underlying cdk8s API object.

### Methods


#### addProvider(provider, version) <a id="crossplane-cdk8s-configuration-addprovider"></a>



```ts
addProvider(provider: string, version: string): void
```

* **provider** (<code>string</code>)  *No description*
* **version** (<code>string</code>)  *No description*






## class ConnectionSecret  <a id="crossplane-cdk8s-connectionsecret"></a>




### Initializer


use CompositeResourceDefinition.connectionSecret() instead.

```ts
new ConnectionSecret()
```




### Properties


Name | Type | Description 
-----|------|-------------
**meta** | <code>[IConnectionSecretMeta](#crossplane-cdk8s-iconnectionsecretmeta)</code> | <span></span>

### Methods


#### defaultNamespace(val) <a id="crossplane-cdk8s-connectionsecret-defaultnamespace"></a>



```ts
defaultNamespace(val: string): ConnectionSecret
```

* **val** (<code>string</code>)  *No description*

__Returns__:
* <code>[ConnectionSecret](#crossplane-cdk8s-connectionsecret)</code>

#### key(val) <a id="crossplane-cdk8s-connectionsecret-key"></a>



```ts
key(val: string): ConnectionSecret
```

* **val** (<code>string</code>)  *No description*

__Returns__:
* <code>[ConnectionSecret](#crossplane-cdk8s-connectionsecret)</code>



## class MetaUI  <a id="crossplane-cdk8s-metaui"></a>




### Initializer


use CompositeResourceDefinition.ui instead.

```ts
new MetaUI()
```




### Properties


Name | Type | Description 
-----|------|-------------
**activeSection** | <code>[MetaUISection](#crossplane-cdk8s-metauisection)</code> | <span></span>

### Methods


#### addSection(props) <a id="crossplane-cdk8s-metaui-addsection"></a>



```ts
addSection(props: MetaUISectionProps): MetaUISection
```

* **props** (<code>[MetaUISectionProps](#crossplane-cdk8s-metauisectionprops)</code>)  *No description*
  * **description** (<code>string</code>)  *No description* 
  * **title** (<code>string</code>)  *No description* 

__Returns__:
* <code>[MetaUISection](#crossplane-cdk8s-metauisection)</code>



## class MetaUIInput  <a id="crossplane-cdk8s-metauiinput"></a>




### Initializer


Use CompositeResourceDefinition.ui.activeSection.addInput() instead.

```ts
new MetaUIInput(props: MetaUIInputProps)
```

* **props** (<code>[MetaUIInputProps](#crossplane-cdk8s-metauiinputprops)</code>)  *No description*
  * **inputType** (<code>[InputType](#crossplane-cdk8s-inputtype)</code>)  *No description* 
  * **name** (<code>string</code>)  *No description* 
  * **path** (<code>string</code>)  *No description* 
  * **required** (<code>boolean</code>)  *No description* 
  * **title** (<code>string</code>)  *No description* 
  * **type** (<code>[PropType](#crossplane-cdk8s-proptype)</code>)  *No description* 
  * **customError** (<code>string</code>)  *No description* __*Optional*__
  * **description** (<code>string</code>)  *No description* __*Optional*__




## class MetaUISection  <a id="crossplane-cdk8s-metauisection"></a>




### Initializer


Use CompositeResourceDefinition.ui.addSection() instead.

```ts
new MetaUISection(props: MetaUISectionProps)
```

* **props** (<code>[MetaUISectionProps](#crossplane-cdk8s-metauisectionprops)</code>)  *No description*
  * **description** (<code>string</code>)  *No description* 
  * **title** (<code>string</code>)  *No description* 


### Methods


#### addInput(field) <a id="crossplane-cdk8s-metauisection-addinput"></a>



```ts
addInput(field: MetaUIInputProps): MetaUIInput
```

* **field** (<code>[MetaUIInputProps](#crossplane-cdk8s-metauiinputprops)</code>)  *No description*
  * **inputType** (<code>[InputType](#crossplane-cdk8s-inputtype)</code>)  *No description* 
  * **name** (<code>string</code>)  *No description* 
  * **path** (<code>string</code>)  *No description* 
  * **required** (<code>boolean</code>)  *No description* 
  * **title** (<code>string</code>)  *No description* 
  * **type** (<code>[PropType](#crossplane-cdk8s-proptype)</code>)  *No description* 
  * **customError** (<code>string</code>)  *No description* __*Optional*__
  * **description** (<code>string</code>)  *No description* __*Optional*__

__Returns__:
* <code>[MetaUIInput](#crossplane-cdk8s-metauiinput)</code>



## class Names  <a id="crossplane-cdk8s-names"></a>




### Initializer




```ts
new Names(xrd: CompositeResourceDefinition, kind: string)
```

* **xrd** (<code>[CompositeResourceDefinition](#crossplane-cdk8s-compositeresourcedefinition)</code>)  *No description*
* **kind** (<code>string</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**meta** | <code>[INamesMeta](#crossplane-cdk8s-inamesmeta)</code> | <span></span>

### Methods


#### category(val) <a id="crossplane-cdk8s-names-category"></a>



```ts
category(val: string): void
```

* **val** (<code>string</code>)  *No description*




#### listKind(val) <a id="crossplane-cdk8s-names-listkind"></a>



```ts
listKind(val: string): void
```

* **val** (<code>string</code>)  *No description*




#### plural(val) <a id="crossplane-cdk8s-names-plural"></a>



```ts
plural(val: string): void
```

* **val** (<code>string</code>)  *No description*




#### shortNames(val) <a id="crossplane-cdk8s-names-shortnames"></a>



```ts
shortNames(val: string): void
```

* **val** (<code>string</code>)  *No description*




#### singular(val) <a id="crossplane-cdk8s-names-singular"></a>



```ts
singular(val: string): void
```

* **val** (<code>string</code>)  *No description*






## class Prop  <a id="crossplane-cdk8s-prop"></a>

JSII callback class/interface for SchemaProp.with().


### Methods


#### object(prop) <a id="crossplane-cdk8s-prop-object"></a>



```ts
object(prop: SchemaPropObject): any
```

* **prop** (<code>[SchemaPropObject](#crossplane-cdk8s-schemapropobject)</code>)  *No description*

__Returns__:
* <code>any</code>

#### *static* for(doer) <a id="crossplane-cdk8s-prop-for"></a>



```ts
static for(doer: IAnyProp): any
```

* **doer** (<code>[IAnyProp](#crossplane-cdk8s-ianyprop)</code>)  *No description*

__Returns__:
* <code>any</code>



## class Resource  <a id="crossplane-cdk8s-resource"></a>

Base class for all Crossplane core objects.

Represents a single resource.

__Implements__: [IConstruct](#constructs-iconstruct), [IResource](#crossplane-cdk8s-iresource)
__Extends__: [Construct](#constructs-construct)
__Implemented by__: [CompositeResourceDefinition](#crossplane-cdk8s-compositeresourcedefinition), [Composition](#crossplane-cdk8s-composition), [Configuration](#crossplane-cdk8s-configuration)

### Initializer




```ts
new Resource(scope: Construct, id: string, _: ResourceProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **_** (<code>[ResourceProps](#crossplane-cdk8s-resourceprops)</code>)  *No description*
  * **metadata** (<code>[ApiObjectMetadata](#cdk8s-apiobjectmetadata)</code>)  Metadata that all persisted resources must have, which includes all objects users must create. __*Optional*__
  * **name** (<code>string</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**apiObject** | <code>[ApiObject](#cdk8s-apiobject)</code> | The underlying cdk8s API object.
**name** | <code>string</code> | The name of this API object.



## class SchemaPropInteger  <a id="crossplane-cdk8s-schemapropinteger"></a>



__Implements__: [ISchemaProp](#crossplane-cdk8s-ischemaprop)

### Initializer


use SchemaPropObject.propInteger() instead e.g. CompositeResourceDefinition.version().spec().propInteger().

```ts
new SchemaPropInteger(xrd: CompositeResourceDefinition, parentPath: string, name: string)
```

* **xrd** (<code>[CompositeResourceDefinition](#crossplane-cdk8s-compositeresourcedefinition)</code>)  *No description*
* **parentPath** (<code>string</code>)  *No description*
* **name** (<code>string</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**meta** | <code>[ISchemaPropMeta](#crossplane-cdk8s-ischemapropmeta)</code> | <span></span>

### Methods


#### description(val) <a id="crossplane-cdk8s-schemapropinteger-description"></a>



```ts
description(val: string): SchemaPropInteger
```

* **val** (<code>string</code>)  *No description*

__Returns__:
* <code>[SchemaPropInteger](#crossplane-cdk8s-schemapropinteger)</code>

#### implicit(val?) <a id="crossplane-cdk8s-schemapropinteger-implicit"></a>

field is implicitly added by Crossplane.

used for UI only fields and to suppress
adding this field to XRD schema props
during synth.

commonly used for writeConnectionSecretRef

defaults to false if not set

```ts
implicit(val?: boolean): SchemaPropInteger
```

* **val** (<code>boolean</code>)  boolean - default true.

__Returns__:
* <code>[SchemaPropInteger](#crossplane-cdk8s-schemapropinteger)</code>

#### max(val) <a id="crossplane-cdk8s-schemapropinteger-max"></a>



```ts
max(val: number): SchemaPropInteger
```

* **val** (<code>number</code>)  *No description*

__Returns__:
* <code>[SchemaPropInteger](#crossplane-cdk8s-schemapropinteger)</code>

#### min(val) <a id="crossplane-cdk8s-schemapropinteger-min"></a>



```ts
min(val: number): SchemaPropInteger
```

* **val** (<code>number</code>)  *No description*

__Returns__:
* <code>[SchemaPropInteger](#crossplane-cdk8s-schemapropinteger)</code>

#### path(val) <a id="crossplane-cdk8s-schemapropinteger-path"></a>



```ts
path(val: string): SchemaPropInteger
```

* **val** (<code>string</code>)  *No description*

__Returns__:
* <code>[SchemaPropInteger](#crossplane-cdk8s-schemapropinteger)</code>

#### required(val?) <a id="crossplane-cdk8s-schemapropinteger-required"></a>



```ts
required(val?: boolean): SchemaPropInteger
```

* **val** (<code>boolean</code>)  *No description*

__Returns__:
* <code>[SchemaPropInteger](#crossplane-cdk8s-schemapropinteger)</code>

#### uiInput(options?) <a id="crossplane-cdk8s-schemapropinteger-uiinput"></a>



```ts
uiInput(options?: MetaUIInputIntegerPropOverrides): SchemaPropInteger
```

* **options** (<code>[MetaUIInputIntegerPropOverrides](#crossplane-cdk8s-metauiinputintegerpropoverrides)</code>)  *No description*
  * **customError** (<code>string</code>)  *No description* __*Optional*__
  * **description** (<code>string</code>)  defaults to ISchemaPropMeta.description if not specified. __*Optional*__
  * **inputType** (<code>[InputType](#crossplane-cdk8s-inputtype)</code>)  defaults to InputType.SINGLE_INPUT. __*Optional*__
  * **name** (<code>string</code>)  defaults to camel case ISchemaPropMeta.path if not specified. __*Optional*__
  * **path** (<code>string</code>)  defaults to ISchemaPropMeta.path if not specified. __*Optional*__
  * **required** (<code>boolean</code>)  defaults to ISchemaPropMeta.required if not specified. __*Optional*__
  * **title** (<code>string</code>)  defaults to ISchemaPropMeta.name if not specified. __*Optional*__
  * **default** (<code>number</code>)  *No description* __*Optional*__
  * **max** (<code>number</code>)  defaults to ISchemaPropMetaInteger.max if not specified. __*Optional*__
  * **min** (<code>number</code>)  defaults to ISchemaPropMetaInteger.min if not specified. __*Optional*__

__Returns__:
* <code>[SchemaPropInteger](#crossplane-cdk8s-schemapropinteger)</code>



## class SchemaPropObject  <a id="crossplane-cdk8s-schemapropobject"></a>

openAPIv3Schema Object with MetaUI.

__Implements__: [ISchemaProp](#crossplane-cdk8s-ischemaprop)

### Initializer


use SchemaPropObject.propObject() instead e.g. CompositeResourceDefinition.version().spec().propObject().

```ts
new SchemaPropObject(xrd: CompositeResourceDefinition, parentPath: string, name: string)
```

* **xrd** (<code>[CompositeResourceDefinition](#crossplane-cdk8s-compositeresourcedefinition)</code>)  *No description*
* **parentPath** (<code>string</code>)  *No description*
* **name** (<code>string</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**meta** | <code>[ISchemaPropMeta](#crossplane-cdk8s-ischemapropmeta)</code> | <span></span>

### Methods


#### description(val) <a id="crossplane-cdk8s-schemapropobject-description"></a>



```ts
description(val: string): SchemaPropObject
```

* **val** (<code>string</code>)  *No description*

__Returns__:
* <code>[SchemaPropObject](#crossplane-cdk8s-schemapropobject)</code>

#### implicit(val?) <a id="crossplane-cdk8s-schemapropobject-implicit"></a>

field is implicitly added by Crossplane.

used for UI only fields and to suppress
adding this field to XRD schema props
during synth.

defaults to false if not set

```ts
implicit(val?: boolean): SchemaPropObject
```

* **val** (<code>boolean</code>)  boolean - default true.

__Returns__:
* <code>[SchemaPropObject](#crossplane-cdk8s-schemapropobject)</code>

#### propInteger(name) <a id="crossplane-cdk8s-schemapropobject-propinteger"></a>



```ts
propInteger(name: string): SchemaPropInteger
```

* **name** (<code>string</code>)  *No description*

__Returns__:
* <code>[SchemaPropInteger](#crossplane-cdk8s-schemapropinteger)</code>

#### propObject(name) <a id="crossplane-cdk8s-schemapropobject-propobject"></a>



```ts
propObject(name: string): SchemaPropObject
```

* **name** (<code>string</code>)  *No description*

__Returns__:
* <code>[SchemaPropObject](#crossplane-cdk8s-schemapropobject)</code>

#### propString(name) <a id="crossplane-cdk8s-schemapropobject-propstring"></a>



```ts
propString(name: string): SchemaPropString
```

* **name** (<code>string</code>)  *No description*

__Returns__:
* <code>[SchemaPropString](#crossplane-cdk8s-schemapropstring)</code>

#### required(val?) <a id="crossplane-cdk8s-schemapropobject-required"></a>



```ts
required(val?: boolean): SchemaPropObject
```

* **val** (<code>boolean</code>)  *No description*

__Returns__:
* <code>[SchemaPropObject](#crossplane-cdk8s-schemapropobject)</code>

#### uiSection(options) <a id="crossplane-cdk8s-schemapropobject-uisection"></a>



```ts
uiSection(options: MetaUISectionProps): SchemaPropObject
```

* **options** (<code>[MetaUISectionProps](#crossplane-cdk8s-metauisectionprops)</code>)  *No description*
  * **description** (<code>string</code>)  *No description* 
  * **title** (<code>string</code>)  *No description* 

__Returns__:
* <code>[SchemaPropObject](#crossplane-cdk8s-schemapropobject)</code>

#### with(prop) <a id="crossplane-cdk8s-schemapropobject-with"></a>



```ts
with(prop: Prop): SchemaPropObject
```

* **prop** (<code>[Prop](#crossplane-cdk8s-prop)</code>)  *No description*

__Returns__:
* <code>[SchemaPropObject](#crossplane-cdk8s-schemapropobject)</code>



## class SchemaPropString  <a id="crossplane-cdk8s-schemapropstring"></a>



__Implements__: [ISchemaProp](#crossplane-cdk8s-ischemaprop)

### Initializer


use SchemaPropObject.propString() instead e.g. CompositeResourceDefinition.version().spec().propString().

```ts
new SchemaPropString(xrd: CompositeResourceDefinition, parentPath: string, name: string)
```

* **xrd** (<code>[CompositeResourceDefinition](#crossplane-cdk8s-compositeresourcedefinition)</code>)  *No description*
* **parentPath** (<code>string</code>)  *No description*
* **name** (<code>string</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**meta** | <code>[ISchemaPropMeta](#crossplane-cdk8s-ischemapropmeta)</code> | <span></span>

### Methods


#### description(val) <a id="crossplane-cdk8s-schemapropstring-description"></a>



```ts
description(val: string): SchemaPropString
```

* **val** (<code>string</code>)  *No description*

__Returns__:
* <code>[SchemaPropString](#crossplane-cdk8s-schemapropstring)</code>

#### implicit(val?) <a id="crossplane-cdk8s-schemapropstring-implicit"></a>

field is implicitly added by Crossplane.

used for UI only fields and to suppress
adding this field to XRD schema props
during synth.

defaults to false if not set

```ts
implicit(val?: boolean): SchemaPropString
```

* **val** (<code>boolean</code>)  boolean - default true.

__Returns__:
* <code>[SchemaPropString](#crossplane-cdk8s-schemapropstring)</code>

#### required(val?) <a id="crossplane-cdk8s-schemapropstring-required"></a>



```ts
required(val?: boolean): SchemaPropString
```

* **val** (<code>boolean</code>)  *No description*

__Returns__:
* <code>[SchemaPropString](#crossplane-cdk8s-schemapropstring)</code>

#### uiInput(options?) <a id="crossplane-cdk8s-schemapropstring-uiinput"></a>



```ts
uiInput(options?: MetaUIInputStringPropOverrides): SchemaPropString
```

* **options** (<code>[MetaUIInputStringPropOverrides](#crossplane-cdk8s-metauiinputstringpropoverrides)</code>)  *No description*
  * **customError** (<code>string</code>)  *No description* __*Optional*__
  * **description** (<code>string</code>)  defaults to ISchemaPropMeta.description if not specified. __*Optional*__
  * **inputType** (<code>[InputType](#crossplane-cdk8s-inputtype)</code>)  defaults to InputType.SINGLE_INPUT. __*Optional*__
  * **name** (<code>string</code>)  defaults to camel case ISchemaPropMeta.path if not specified. __*Optional*__
  * **path** (<code>string</code>)  defaults to ISchemaPropMeta.path if not specified. __*Optional*__
  * **required** (<code>boolean</code>)  defaults to ISchemaPropMeta.required if not specified. __*Optional*__
  * **title** (<code>string</code>)  defaults to ISchemaPropMeta.name if not specified. __*Optional*__
  * **default** (<code>string</code>)  *No description* __*Optional*__

__Returns__:
* <code>[SchemaPropString](#crossplane-cdk8s-schemapropstring)</code>



## class Version  <a id="crossplane-cdk8s-version"></a>




### Initializer


use CompositeResourceDefinition.version() instead.

```ts
new Version(xrd: CompositeResourceDefinition, name: string)
```

* **xrd** (<code>[CompositeResourceDefinition](#crossplane-cdk8s-compositeresourcedefinition)</code>)  *No description*
* **name** (<code>string</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**meta** | <code>[IVersionMeta](#crossplane-cdk8s-iversionmeta)</code> | <span></span>
**name** | <code>string</code> | <span></span>

### Methods


#### referencable(val?) <a id="crossplane-cdk8s-version-referencable"></a>



```ts
referencable(val?: boolean): Version
```

* **val** (<code>boolean</code>)  *No description*

__Returns__:
* <code>[Version](#crossplane-cdk8s-version)</code>

#### served(val?) <a id="crossplane-cdk8s-version-served"></a>



```ts
served(val?: boolean): Version
```

* **val** (<code>boolean</code>)  *No description*

__Returns__:
* <code>[Version](#crossplane-cdk8s-version)</code>

#### spec() <a id="crossplane-cdk8s-version-spec"></a>



```ts
spec(): SchemaPropObject
```


__Returns__:
* <code>[SchemaPropObject](#crossplane-cdk8s-schemapropobject)</code>



## struct CompositeResourceDefinitionProps  <a id="crossplane-cdk8s-compositeresourcedefinitionprops"></a>


An CompositeResourceDefinition defines a new kind of composite infrastructure resource.

The new resource is composed of other composite or
managed infrastructure resources.

TODO: Support all available props in fluent API.
TODO: Process props.spec in CompositeResourceDefinition so you can init with
static spec fields instead of using the fluent API.



Name | Type | Description 
-----|------|-------------
**metadata**? | <code>[ApiObjectMetadata](#cdk8s-apiobjectmetadata)</code> | Metadata that all persisted resources must have, which includes all objects users must create.<br/>__*Optional*__
**name**? | <code>string</code> | __*Optional*__



## struct CompositionProps  <a id="crossplane-cdk8s-compositionprops"></a>


Composition defines the group of resources to be created when a compatible type is created with reference to the composition.

TODO: Support all available props in fluent API.
TODO: Process props.spec in Composition so you can init with
static spec fields instead of using the fluent API.



Name | Type | Description 
-----|------|-------------
**metadata**? | <code>[ApiObjectMetadata](#cdk8s-apiobjectmetadata)</code> | Metadata that all persisted resources must have, which includes all objects users must create.<br/>__*Optional*__
**name**? | <code>string</code> | __*Optional*__



## struct ConfigurationProps  <a id="crossplane-cdk8s-configurationprops"></a>


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
**providers**? | <code>Array<[ProviderDep](#crossplane-cdk8s-providerdep)></code> | __*Optional*__
**readme**? | <code>string</code> | __*Optional*__
**source**? | <code>string</code> | __*Optional*__



## interface IAnyProp  <a id="crossplane-cdk8s-ianyprop"></a>



### Methods


#### object(prop) <a id="crossplane-cdk8s-ianyprop-object"></a>



```ts
object(prop: SchemaPropObject): any
```

* **prop** (<code>[SchemaPropObject](#crossplane-cdk8s-schemapropobject)</code>)  *No description*

__Returns__:
* <code>any</code>



## interface ICompositeResourceDefinitionMeta  <a id="crossplane-cdk8s-icompositeresourcedefinitionmeta"></a>




### Properties


Name | Type | Description 
-----|------|-------------
**group** | <code>string</code> | <span></span>
**name** | <code>string</code> | <span></span>
**names** | <code>[INamesMeta](#crossplane-cdk8s-inamesmeta)</code> | <span></span>
**versionServed** | <code>string</code> | <span></span>
**claimNames**? | <code>[INamesMeta](#crossplane-cdk8s-inamesmeta)</code> | __*Optional*__
**connectionSecret**? | <code>[IConnectionSecretMeta](#crossplane-cdk8s-iconnectionsecretmeta)</code> | __*Optional*__
**versions**? | <code>Array<[IVersionMeta](#crossplane-cdk8s-iversionmeta)></code> | __*Optional*__



## interface IConfiguration  <a id="crossplane-cdk8s-iconfiguration"></a>

__Implemented by__: [Configuration](#crossplane-cdk8s-configuration)

Represents a Crossplane Configuration package.

### Properties


Name | Type | Description 
-----|------|-------------
**name** | <code>string</code> | The Kubernetes name of this resource.



## interface IConnectionSecretMeta  <a id="crossplane-cdk8s-iconnectionsecretmeta"></a>




### Properties


Name | Type | Description 
-----|------|-------------
**defaultNamespace** | <code>string</code> | <span></span>
**keys** | <code>Array<string></code> | <span></span>



## interface INamesMeta  <a id="crossplane-cdk8s-inamesmeta"></a>




### Properties


Name | Type | Description 
-----|------|-------------
**kind** | <code>string</code> | <span></span>
**plural** | <code>string</code> | <span></span>



## interface IResource  <a id="crossplane-cdk8s-iresource"></a>

__Implemented by__: [CompositeResourceDefinition](#crossplane-cdk8s-compositeresourcedefinition), [Composition](#crossplane-cdk8s-composition), [Configuration](#crossplane-cdk8s-configuration)

Represents a resource.

### Properties


Name | Type | Description 
-----|------|-------------
**name** | <code>string</code> | The Kubernetes name of this resource.



## interface ISchemaProp  <a id="crossplane-cdk8s-ischemaprop"></a>

__Implemented by__: [SchemaPropInteger](#crossplane-cdk8s-schemapropinteger), [SchemaPropObject](#crossplane-cdk8s-schemapropobject), [SchemaPropString](#crossplane-cdk8s-schemapropstring)

Schema Props.

### Properties


Name | Type | Description 
-----|------|-------------
**meta** | <code>[ISchemaPropMeta](#crossplane-cdk8s-ischemapropmeta)</code> | <span></span>



## interface ISchemaPropMeta  <a id="crossplane-cdk8s-ischemapropmeta"></a>




### Properties


Name | Type | Description 
-----|------|-------------
**implicit** | <code>boolean</code> | <span></span>
**name** | <code>string</code> | <span></span>
**path** | <code>string</code> | <span></span>
**required** | <code>boolean</code> | <span></span>
**type** | <code>[PropType](#crossplane-cdk8s-proptype)</code> | <span></span>
**description**? | <code>string</code> | __*Optional*__
**uiInput**? | <code>[MetaUIInputProps](#crossplane-cdk8s-metauiinputprops)</code> | __*Optional*__
**uiSection**? | <code>[MetaUISectionProps](#crossplane-cdk8s-metauisectionprops)</code> | __*Optional*__



## interface ISchemaPropMetaInteger  <a id="crossplane-cdk8s-ischemapropmetainteger"></a>




### Properties


Name | Type | Description 
-----|------|-------------
**implicit** | <code>boolean</code> | <span></span>
**name** | <code>string</code> | <span></span>
**path** | <code>string</code> | <span></span>
**required** | <code>boolean</code> | <span></span>
**type** | <code>[PropType](#crossplane-cdk8s-proptype)</code> | <span></span>
**description**? | <code>string</code> | __*Optional*__
**max**? | <code>number</code> | __*Optional*__
**min**? | <code>number</code> | __*Optional*__
**uiInput**? | <code>[MetaUIInputProps](#crossplane-cdk8s-metauiinputprops)</code> | __*Optional*__
**uiSection**? | <code>[MetaUISectionProps](#crossplane-cdk8s-metauisectionprops)</code> | __*Optional*__



## interface ISchemaPropMetaString  <a id="crossplane-cdk8s-ischemapropmetastring"></a>




### Properties


Name | Type | Description 
-----|------|-------------
**implicit** | <code>boolean</code> | <span></span>
**name** | <code>string</code> | <span></span>
**path** | <code>string</code> | <span></span>
**required** | <code>boolean</code> | <span></span>
**type** | <code>[PropType](#crossplane-cdk8s-proptype)</code> | <span></span>
**description**? | <code>string</code> | __*Optional*__
**uiInput**? | <code>[MetaUIInputProps](#crossplane-cdk8s-metauiinputprops)</code> | __*Optional*__
**uiSection**? | <code>[MetaUISectionProps](#crossplane-cdk8s-metauisectionprops)</code> | __*Optional*__



## interface IVersionMeta  <a id="crossplane-cdk8s-iversionmeta"></a>




### Properties


Name | Type | Description 
-----|------|-------------
**name** | <code>string</code> | <span></span>
**referencable**? | <code>boolean</code> | __*Optional*__
**served**? | <code>boolean</code> | __*Optional*__



## struct MetaUIInputIntegerPropOverrides  <a id="crossplane-cdk8s-metauiinputintegerpropoverrides"></a>






Name | Type | Description 
-----|------|-------------
**customError**? | <code>string</code> | __*Optional*__
**default**? | <code>number</code> | __*Optional*__
**description**? | <code>string</code> | defaults to ISchemaPropMeta.description if not specified.<br/>__*Optional*__
**inputType**? | <code>[InputType](#crossplane-cdk8s-inputtype)</code> | defaults to InputType.SINGLE_INPUT.<br/>__*Optional*__
**max**? | <code>number</code> | defaults to ISchemaPropMetaInteger.max if not specified.<br/>__*Optional*__
**min**? | <code>number</code> | defaults to ISchemaPropMetaInteger.min if not specified.<br/>__*Optional*__
**name**? | <code>string</code> | defaults to camel case ISchemaPropMeta.path if not specified.<br/>__*Optional*__
**path**? | <code>string</code> | defaults to ISchemaPropMeta.path if not specified.<br/>__*Optional*__
**required**? | <code>boolean</code> | defaults to ISchemaPropMeta.required if not specified.<br/>__*Optional*__
**title**? | <code>string</code> | defaults to ISchemaPropMeta.name if not specified.<br/>__*Optional*__



## struct MetaUIInputIntegerProps  <a id="crossplane-cdk8s-metauiinputintegerprops"></a>






Name | Type | Description 
-----|------|-------------
**inputType** | <code>[InputType](#crossplane-cdk8s-inputtype)</code> | <span></span>
**name** | <code>string</code> | <span></span>
**path** | <code>string</code> | <span></span>
**required** | <code>boolean</code> | <span></span>
**title** | <code>string</code> | <span></span>
**type** | <code>[PropType](#crossplane-cdk8s-proptype)</code> | <span></span>
**customError**? | <code>string</code> | __*Optional*__
**default**? | <code>number</code> | __*Optional*__
**description**? | <code>string</code> | __*Optional*__
**max**? | <code>number</code> | __*Optional*__
**min**? | <code>number</code> | __*Optional*__



## struct MetaUIInputPropOverrides  <a id="crossplane-cdk8s-metauiinputpropoverrides"></a>


Overrides with optional inputs for fluent API with reasonable defaults.



Name | Type | Description 
-----|------|-------------
**customError**? | <code>string</code> | __*Optional*__
**description**? | <code>string</code> | defaults to ISchemaPropMeta.description if not specified.<br/>__*Optional*__
**inputType**? | <code>[InputType](#crossplane-cdk8s-inputtype)</code> | defaults to InputType.SINGLE_INPUT.<br/>__*Optional*__
**name**? | <code>string</code> | defaults to camel case ISchemaPropMeta.path if not specified.<br/>__*Optional*__
**path**? | <code>string</code> | defaults to ISchemaPropMeta.path if not specified.<br/>__*Optional*__
**required**? | <code>boolean</code> | defaults to ISchemaPropMeta.required if not specified.<br/>__*Optional*__
**title**? | <code>string</code> | defaults to ISchemaPropMeta.name if not specified.<br/>__*Optional*__



## struct MetaUIInputProps  <a id="crossplane-cdk8s-metauiinputprops"></a>






Name | Type | Description 
-----|------|-------------
**inputType** | <code>[InputType](#crossplane-cdk8s-inputtype)</code> | <span></span>
**name** | <code>string</code> | <span></span>
**path** | <code>string</code> | <span></span>
**required** | <code>boolean</code> | <span></span>
**title** | <code>string</code> | <span></span>
**type** | <code>[PropType](#crossplane-cdk8s-proptype)</code> | <span></span>
**customError**? | <code>string</code> | __*Optional*__
**description**? | <code>string</code> | __*Optional*__



## struct MetaUIInputStringPropOverrides  <a id="crossplane-cdk8s-metauiinputstringpropoverrides"></a>






Name | Type | Description 
-----|------|-------------
**customError**? | <code>string</code> | __*Optional*__
**default**? | <code>string</code> | __*Optional*__
**description**? | <code>string</code> | defaults to ISchemaPropMeta.description if not specified.<br/>__*Optional*__
**inputType**? | <code>[InputType](#crossplane-cdk8s-inputtype)</code> | defaults to InputType.SINGLE_INPUT.<br/>__*Optional*__
**name**? | <code>string</code> | defaults to camel case ISchemaPropMeta.path if not specified.<br/>__*Optional*__
**path**? | <code>string</code> | defaults to ISchemaPropMeta.path if not specified.<br/>__*Optional*__
**required**? | <code>boolean</code> | defaults to ISchemaPropMeta.required if not specified.<br/>__*Optional*__
**title**? | <code>string</code> | defaults to ISchemaPropMeta.name if not specified.<br/>__*Optional*__



## struct MetaUIInputStringProps  <a id="crossplane-cdk8s-metauiinputstringprops"></a>






Name | Type | Description 
-----|------|-------------
**inputType** | <code>[InputType](#crossplane-cdk8s-inputtype)</code> | <span></span>
**name** | <code>string</code> | <span></span>
**path** | <code>string</code> | <span></span>
**required** | <code>boolean</code> | <span></span>
**title** | <code>string</code> | <span></span>
**type** | <code>[PropType](#crossplane-cdk8s-proptype)</code> | <span></span>
**customError**? | <code>string</code> | __*Optional*__
**default**? | <code>string</code> | __*Optional*__
**description**? | <code>string</code> | __*Optional*__



## struct MetaUISectionProps  <a id="crossplane-cdk8s-metauisectionprops"></a>






Name | Type | Description 
-----|------|-------------
**description** | <code>string</code> | <span></span>
**title** | <code>string</code> | <span></span>



## struct ProviderDep  <a id="crossplane-cdk8s-providerdep"></a>






Name | Type | Description 
-----|------|-------------
**provider** | <code>string</code> | <span></span>
**version** | <code>string</code> | <span></span>



## struct ResourceProps  <a id="crossplane-cdk8s-resourceprops"></a>


Initialization properties for resources.



Name | Type | Description 
-----|------|-------------
**metadata**? | <code>[ApiObjectMetadata](#cdk8s-apiobjectmetadata)</code> | Metadata that all persisted resources must have, which includes all objects users must create.<br/>__*Optional*__
**name**? | <code>string</code> | __*Optional*__



## enum InputType  <a id="crossplane-cdk8s-inputtype"></a>



Name | Description
-----|-----
**SINGLE_INPUT** |


## enum PropType  <a id="crossplane-cdk8s-proptype"></a>



Name | Description
-----|-----
**OBJECT** |
**INTEGER** |
**STRING** |


