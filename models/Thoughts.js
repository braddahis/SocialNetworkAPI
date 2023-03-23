const { Schema, model } = require ("mongoose")
const reactionSchema = require("./Reactions")
const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [reactionSchema],
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
      // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
      toJSON: {
        getters: true,
      },
      id: false,
    }
  );
  
  // Create a virtual property `fullName` that gets and sets the user's full name
  thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
      return this.reactions.length;
    })
   
  // Initialize our User model
  const Thought = model('Thought', thoughtSchema);
  
  module.exports = Thought;