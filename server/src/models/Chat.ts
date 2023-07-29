import mongoose from 'mongoose'

const Schema = mongoose.Schema
//const ObjectId = mongoose.Types.ObjectId 

const ChatSchema = new Schema({
    chatName: String,
    chatMembers: [{type: String}],
    chatContents: [{sender: String, messageTime: Number, messageContents: String}],
})

const ChatModel = mongoose.model('Chat', ChatSchema)

export default ChatModel