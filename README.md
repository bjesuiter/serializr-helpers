# serializr-helpers
Provides some helper functions and serialization PropertySchemas for mobxjs/serializr - library

## Content 

### Class MomentObject Usage
Can be used as a serializr PropSchema to serialize Moment Objects. 

    /**
     * A Timestamp as Moment.js object
     */
    @serializable(MomentSerializationSchema)
    timestamp: Moment;
