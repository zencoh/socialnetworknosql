const { Schema, model } = require('mongoose');


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        },
        thoughts: {
            // array of _id values referencing the 'Thought' model
        },
        friends: {
            // array of _id values referencing the 'User' model (self-reference)
        }
    }
);

// virtual property that gets the amount of friends a user has
userSchema
    .virtual('friendCount')
    // getter
    .get(function () {
        return `${this.friends}.length`;
    })
    // setter, no idea how to do this
    .set