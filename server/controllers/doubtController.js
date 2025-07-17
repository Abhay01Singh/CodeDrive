import Message from "../models/Message.js";

// Get chat rooms for instructor
export const getChatRooms = async (req, res) => {
  try {
    // Find all unique rooms from messages
    const rooms = await Message.aggregate([
      {
        $group: {
          _id: "$roomId",
          lastMessage: { $last: "$$ROOT" },
          unreadCount: {
            $sum: {
              $cond: [{ $eq: ["$read", false] }, 1, 0],
            },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "lastMessage.sender",
          foreignField: "_id",
          as: "student",
        },
      },
      {
        $project: {
          _id: 1,
          lastMessage: 1,
          unreadCount: 1,
          studentName: { $arrayElemAt: ["$student.name", 0] },
          updatedAt: "$lastMessage.createdAt",
        },
      },
      { $sort: { updatedAt: -1 } },
    ]);

    res.json({
      success: true,
      rooms: rooms.map((room) => ({
        _id: room._id,
        studentName: room.studentName,
        lastMessage: room.lastMessage.text,
        unreadCount: room.unreadCount,
        updatedAt: room.updatedAt,
      })),
    });
  } catch (error) {
    console.error("Get Chat Rooms Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch chat rooms",
    });
  }
};

// Existing getMessages function
export const getMessages = async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await Message.find({ roomId })
      .populate("sender", "name")
      .sort({ createdAt: 1 });

    res.json({ success: true, messages });
  } catch (error) {
    console.error("Get Messages Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });
  }
};

// Save message to database
export const saveMessage = async (messageData) => {
  try {
    const { roomId, sender, text, isMentor } = messageData;
    await Message.create({
      roomId,
      sender,
      text,
      isMentor,
    });
    return true;
  } catch (error) {
    console.error("Save Message Error:", error);
    return false;
  }
};
