
const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require("cors");

app.use(cors());

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

//This socketRoomInfo will store the following thing:
// {
    // 'room_num': {
    //     'usersArr' : [],
    //     'itemInCart': [],
    // }
// }

let socketRoomInfo = {}

io.on("connection", (socket) => {

    // socket.on("add_item", (data) => {
    //     console.log(data);
    //     socket.broadcast.emit("added_item", data);
    // })

    // socket.on("remove_item", (data) => {
    //     console.log(data);
    //     socket.broadcast.emit("removed_item", data)
    // })

    // Add client to a room, a room number will be table number that
    // client sent to the server on join_room event
    socket.on('join_room', ({id}) => {
        socket.join(id); // Join the user to a socket room
        console.log(socket.id, " just joint room: ", id);
        if (socketRoomInfo.hasOwnProperty(id)){
            const {usersArr, itemInCart} = socketRoomInfo[id];

            socket.emit('table_info', {
                table_status: 1,
                message: `Table ${id} is currently occupied`,
                client_count: usersArr.length,
                item_in_cart: itemInCart,
            });

            //add currently user to the list
            socketRoomInfo[id]['usersArr'].add(socket.id);
            
        } else {
            socket.emit('table_info', {
                table_status: 0,
                message: `Table ${id} is empty`,
            });
            //add currently user to the list
            socketRoomInfo[id] = {'usersArr': new Set(), 'itemInCart': []};
            socketRoomInfo[id]['usersArr'].add(socket.id)
        }
        
        // Send message to all users currently in the room, except the user that just joint
        console.log(typeof id);
        socket.to(id).emit('receive_message', {
            message: `${socket.id} has joined the chat room`,
            username: 'test',
        });
    });

    socket.on('leave_room', (table_id) => {
        socket.leave(room);
        // logic to handle this case
        // may not important at this time
        console.log(`${socket.id} has left the chat`);
    });

    // socket.on('disconnect', () => {
    //     console.log('User disconnected from the chat', socket.id);

    //     // Go to each table in the socketRoomInfo find the socket.id that left the room
    //     // remove that use from the room

    //     Object.keys(socketRoomInfo).forEach((key) => {

    //         let usersInRoom = socketRoomInfo[key].usersArr
            
            
    //         let room_id;

    //         if (usersInRoom.has(socket.id)){

    //             usersInRoom = usersInRoom.delete(socket.id);
    //             room_id = key;
    //         }

    //         socket.to(room_id).emit('user_left', {
    //             message: `${socket.id} has left the chat room`,
    //         });
    //     })
    // });

    socket.on('cart_changed', ({itemInCart, id}) => {
        // console.log('cart_changed ', socketRoomInfo );
        // console.log('new items from client: ', items)
        //set item in cart in socketRoomInfo
        console.log('itemInCart: ', itemInCart);
        if (socketRoomInfo.hasOwnProperty(id)){
            console.log('inside if: ', socketRoomInfo);
            console.log('socketRoomInfo.id: ', socketRoomInfo[`${id}`]['itemInCart']);
            socketRoomInfo[`${id}`]['itemInCart'] = itemInCart;
            console.log('after added socketRoomInfo.id: ', socketRoomInfo[`${id}`]['itemInCart']);
            // socketRoomInfo.id.itemInCart = itemInCart;
        }
        //send item in cart in socketRoomInfo to let other client know
        console.log("id ", id);
        socket.to(id).emit('cart_updated', {
            msg: `Items in cart for table ${id} changed`, 
            items_in_cart: socketRoomInfo[`${id}`]['itemInCart'],
        });
    });


    // setInterval(() => {
    //     console.log('interval_update');
    //     Object.keys(socketRoomInfo).forEach((key) => {
    //         let itemInRoom = socketRoomInfo[key]['itemInCart']
    //         console.log('itemInRoom', itemInRoom);
    //         socket.to(key).emit('interval_update', itemInRoom)
    //     })
    //   }, 5000)

})

server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
})