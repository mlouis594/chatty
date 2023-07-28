import mongoose from 'mongoose'

const Schema = mongoose.Schema
//const ObjectId = mongoose.Types.ObjectId 

const AccountSchema = new Schema({
    fullName: String,
    userName: String,
    email: String,
    password: String,
    friends: [{type: String}],
    chats: [{type: String}],
    notifications: [{type: String}]
})

const AccountModel = mongoose.model('Account', AccountSchema)

export default AccountModel