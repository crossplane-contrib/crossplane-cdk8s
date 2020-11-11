# API Reference

**Classes**

Name|Description
----|-----------
[Configuration](#play-14140-configuration)|*No description*


**Structs**

Name|Description
----|-----------
[ConfigurationProps](#play-14140-configurationprops)|*No description*
[ProviderDep](#play-14140-providerdep)|*No description*



## class Configuration  <a id="play-14140-configuration"></a>



__Implements__: [IConstruct](#constructs-iconstruct)
__Extends__: [Construct](#constructs-construct)

### Initializer




```ts
new Configuration(scope: Construct, id: string, props?: ConfigurationProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[ConfigurationProps](#play-14140-configurationprops)</code>)  *No description*
  * **company** (<code>string</code>)  *No description* __*Optional*__
  * **crossplaneVersion** (<code>string</code>)  *No description* __*Default*__: ">=v0.14.0-0"
  * **keywords** (<code>Array<string></code>)  *No description* __*Optional*__
  * **license** (<code>string</code>)  *No description* __*Optional*__
  * **maintainer** (<code>string</code>)  *No description* __*Optional*__
  * **name** (<code>string</code>)  *No description* __*Optional*__
  * **providers** (<code>Array<[ProviderDep](#play-14140-providerdep)></code>)  *No description* __*Optional*__
  * **source** (<code>string</code>)  *No description* __*Optional*__


### Methods


#### addProvider(provider, version) <a id="play-14140-configuration-addprovider"></a>



```ts
addProvider(provider: string, version: string): void
```

* **provider** (<code>string</code>)  *No description*
* **version** (<code>string</code>)  *No description*






## struct ConfigurationProps  <a id="play-14140-configurationprops"></a>






Name | Type | Description 
-----|------|-------------
**company**? | <code>string</code> | __*Optional*__
**crossplaneVersion**? | <code>string</code> | __*Default*__: ">=v0.14.0-0"
**keywords**? | <code>Array<string></code> | __*Optional*__
**license**? | <code>string</code> | __*Optional*__
**maintainer**? | <code>string</code> | __*Optional*__
**name**? | <code>string</code> | __*Optional*__
**providers**? | <code>Array<[ProviderDep](#play-14140-providerdep)></code> | __*Optional*__
**source**? | <code>string</code> | __*Optional*__



## struct ProviderDep  <a id="play-14140-providerdep"></a>






Name | Type | Description 
-----|------|-------------
**provider** | <code>string</code> | <span></span>
**version** | <code>string</code> | <span></span>



