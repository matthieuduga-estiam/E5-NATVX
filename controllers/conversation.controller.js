// Import model
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const get = async (req, res) => {
  
    try {
        
        const sender = await User.findById(req.body.sender);
        const receiver = await User.findById(req.body.receiver);

        if (!sender || !receiver) {
            return res.status(404).json({ message: "User not found" });
        }

        var conversation = await Conversation.findOne({
            members: { $all: [sender, receiver] },
        })

        if (!conversation) {
            conversation = await Conversation.create({
                members: [sender, receiver],
            });
            conversation = await conversation.save();
        }


        var messages = await Message.find({ conversation: conversation._id }).populate("sender").sort({ createdAt: 'asc'}).exec()

        res.status(200).json({
            conversation: conversation,
            messages: messages,
            members: [sender, receiver]
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }

};

export const find = async (req, res) => {
    try {
        const me = await User.findById(req.user.id);
        const conversations = await Conversation.find({ members: me }).populate("members").exec();
        
        // Loop on each conversation to get the last message
        for (let i = 0; i < conversations.length; i++) {

            const otherUser = conversations[i].members.filter(member => member._id != me._id)[0].toObject()
            conversations[i].otherUser = otherUser.username;
            conversations[i].otherUserId = otherUser._id;

            const lastMessage = await Message.findOne({ conversation: conversations[i]._id }).sort({ createdAt: 'desc' }).exec();
            conversations[i].lastMessage = lastMessage.toObject().content;
        }

        res.status(200).json(conversations);

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}