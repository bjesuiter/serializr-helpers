# serializr-helpers

[![Greenkeeper badge](https://badges.greenkeeper.io/bjesuiter/serializr-helpers.svg)](https://greenkeeper.io/)

Provides some helper functions and serialization PropertySchemas for mobxjs/serializr - library

## Content 

### Usage 'MomentSerializationSchema
Can be used as a factory for serializr PropSchema to serialize Moment Objects. 

    /**
     * A Timestamp as Moment.js object
     */
    @serializable(MomentSerializationSchema())
    timestamp: Moment;

With options: 

    /**
     * A Timestamp as Moment.js object
     */
    @serializable(
    MomentSerializationSchema({
        useUtc: true
    })
    )
    timestamp: Moment;
    
All available options and their details could be read in 
`./src/lib/moment-serialization-options.ts`

### Usage serializr-helpers 

#### serializeToJson()
Takes a serializr annotated object and serializes directly to json without an intermediate js-object. 

#### deserializeFromJson()
Takes a json string and a target class object and deserializes the string into the target class instance. 

#### serializeJson()
Alias for `serializeToJson`

#### deserializeJson() 
Alias for `deserializeFromJson`

#### serializeToPojo()
Alias for native serializr `serialize()` function, to make the meaning less ambiguous

#### deserializeFromPojo()
Alias for native serializr `deserialize()` function, to make the meaning less ambiguous



## TODOs 
- fix wallaby test running (problems with modern import syntax => 
current workaround: npm run test:watch)

## Uses 

[mixu/minilog](https://github.com/mixu/minilog): A lighweight client & server logging lib with StreamApi backends  
Docs URL: http://mixu.net/minilog/
