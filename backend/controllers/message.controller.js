import Conversation from "../models/conversation.models.js";
import Message from "../models/message.model.js";
import { getRecieverSocketId, io } from "../socket/socket.js";

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

    const recieverSocketId = getRecieverSocketId(recieverId);
    if (recieverSocketId) {
      //sents events to a specific client
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).send(newMessage);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [userToChatId, senderId] },
    }).populate({
      path: "messages",
      options: { sort: { createdAt: -1 }, limit: 1 },
    });
    const conversations = await Conversation.findOne({
      participants: { $all: [userToChatId, senderId] },
    }).populate({
      path: "messages",
    });

    if (!conversations)
      return res.status(200).json({ messages: [], lastMessage: null });

    const lastMessage = conversation.messages[0];
    res.status(200).json({
      messages: conversations.messages,
      lastMessage: lastMessage
        ? {
            text: lastMessage.message,
            createdAt: lastMessage.createdAt,
          }
        : null,
    });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};
