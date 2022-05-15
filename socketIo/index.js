const socketIo = require("socket.io");
const Item = require("../models/Items");

const socket = (server) => {
	const io = socketIo(server,{
		cors: 'http://localhost:3000',
		credentials: true,
});

io.on("connection", (socket) => {
	console.log("New client connected");

	socket.on("joinToRoom", (room) => socket.join(room));

	socket.on("updateItemComments", (data) =>
		updateItemComments(io, socket, data)
	);

	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});
});
};

const updateItemComments = async (io, socket, data) => {
	const { itemId, comments } = data;

	await Item.findByIdAndUpdate(itemId, { comments });

	io.to(itemId).emit("updateItemComments", comments);

};

module.exports = socket;
