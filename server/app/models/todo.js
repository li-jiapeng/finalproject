'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for todo object.
 */
let todoSchema = new Schema({
    title: {
        type: String,
        required: "title is missing"
    },
    description: {
        type: String
    },
    dueDate: {
        type: Date
    },
    createdDate: {
        type: Date,
        default:Date.now
    },
    modifiedDate : {
        type: Date,
        default:Date.now
    },complete:{
        type: Boolean
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