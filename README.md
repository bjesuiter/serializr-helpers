# serializr-helpers
Provides some helper functions and serialization PropertySchemas for mobxjs/serializr - library

## Content 

### Class `` Usage
Can be used as a factory for serializr PropSchema to serialize Moment Objects. 

    /**
     * A Timestamp as Moment.js object
     */
    @serializable(new MomentSerializationSchema())
    timestamp: Moment;

With options: 

    /**
     * A Timestamp as Moment.js object
     */
    @serializable(
    new MomentSerializationSchema.Builder()
      .useValueIfUndefined('no-date')
      .useUtc()
      .useSerializationFormat('YYYY-MM-DD')
      .build()
    )
    timestamp: Moment;

## TODOs 

- add typescript 
- add jest testing
- add tests which serialize demo objects  
