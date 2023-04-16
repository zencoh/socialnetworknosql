const { Schema, model } = require('mongoose');


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Use a getter method to format the timestamp on query
        },
        // user that created this thought
        username: {
            type: String,
            required: true
        },
        // these are the replies
        reactions: {
            // array of nested documents created with the reaction schema
        }
    }
);

// virtual that retrieves the length of the thoughts reactions array 
thoughtSchema
    .virtual('reactionCount')
    // getter
    .get(function () {
        return `${this.reactions}.length`;
    })
    // setter
    .set