const { Schema, model, Types } = require('mongoose');
const { schema } = require('./user');
// const mongoose = require("mongoose")

const BlogSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    }
    ,
    coverImageURL:{
        type : String,
        required: false
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
},{timestamps: true})

const Blog = model('blog', BlogSchema)

module.exports=Blog;