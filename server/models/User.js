const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const UserScheme = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        minLength: 5,
        maxLength: 50
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email'
        ],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minLength: 5
    }
})

UserScheme.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserScheme.methods.createJWT = function(){
    return jwt.sign(
        {
            userID: this._id,
            name: this.name
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME
        }
    )
}

UserScheme.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

UserScheme.statics.findByName = function(name){
    return this.where({name: new RegExp(name, 'i')});
    // same as this.find({name: new RegExp(name, 'i)})
}

/*
    this is used as a chainable on a query
    like User.find().byName("Kyle"))

    query is returned by .find() or .where()
*/
UserScheme.query.byName = function(name){
    return this.where({name: new RegExp(name, 'i')});
    // same as this.find({name: new RegExp(name, 'i)})
}

/*
    used to make a property on a document that you dont want
    to be saved on the document but just a static (virtual)
    property to use inside your codebase

    used like: user.nameAndEmail (user is a document)
*/
UserScheme.virtual('nameAndEmail').get(function(){
    return `${this.name} <${this.email}>`
})

module.exports = mongoose.model('Users', UserScheme);