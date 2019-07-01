# serializr-helpers
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

## TODOs 
- fix wallaby test running (problems with modern import syntax => 
current workaround: npm run test:watch)

## Uses 

[mixu/minilog](https://github.com/mixu/minilog): A lighweight client & server logging lib with StreamApi backends  
Docs URL: http://mixu.net/minilog/
