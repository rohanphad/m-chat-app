const mongoose = require("mongoose");
// chatName
// isGroupChat
// users
// latestMessage
// groupAdmin

const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true }, // trim removes whitespaces at the end
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;
