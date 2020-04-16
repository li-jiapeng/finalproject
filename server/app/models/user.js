'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for todo object.
 */
let todoSchema = new Schema({
    userName: {
        type: String
    },
    nickName: {
        type: String
    },
    password: {
        type: Date
    }
},
{
    versionKey: false,
    timestamps: { createdAt: 'createdDate', updatedAt: 'modifiedDate' }
});
// Duplicate the id field as mongoose returns _id field instead of id.
todoSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
todoSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('todo', todoSchema);