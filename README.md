# serializr-helpers
Provides some helper functions and serialization PropertySchemas for mobxjs/serializr - library

## Content 

### Class `MomentIsoSerialization` Usage
Can be used as a serializr PropSchema to serialize Moment Objects. 

    /**
     * A Timestamp as Moment.js object
     */
    @serializable(MomentSerializationSchema)
    timestamp: Moment;
    
## TODOs 

- add typescript 
- add jest testing
- add tests which serialize demo objects  
