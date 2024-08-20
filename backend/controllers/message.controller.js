import Conversation from "../models/conversation.models.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { id: recieverId } = req.params;
    const { message } = req.body;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);
    res.status(201).send(newMessage);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
};

export const getMessages = async (req, res) => {
    try {
        const {id: userToChatId} = req.params;
        const senderId = req.user._id;
        console.log(senderId);
        

        const conversation = await Conversation.findOne({
          participants: { $all: [userToChatId, senderId] },
        }).populate("messages");

        if(!conversation) return res.status(200).send([]);

        res.status(200).send(conversation.messages);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
}
