// Import model
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

// Create a new message
export const create = async (req, res) => {

  try {
    const user = await User.findById(req.body.sender);
    const conversation = await Conversation.findById(req.body.conversation);

    if (!user || !conversation) {
      return res.status(404).json({ message: "User or conversation not found" });
    }


    const model = new Message({
      conversation: conversation,
      sender: user,
      content: req.body.content,
    });

    const newMessage = await model.save();

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a message with id
export const update = async (req, res) => {
  try {
    const model = await Message.findById(req.params.id);
    model.sender = req.body.sender;
    model.receiver = req.body.receiver;
    model.content = req.body.content;
    await model.save();
    res.status(200).json(model);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Delete a message with id
export const remove = async (req, res) => {
  try {
    await Message.deleteOne({ _id: req.params.id });
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
