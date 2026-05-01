import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

// Handle socket connections

io.on('connection' , (socket) => {
    socket.on('chatMessage', (data) => {
        console.log('Received message:', data)
        socket.broadcast.emit('chatMessage', data) // Broadcast the message to all other clients

    })
})



app.use(express.static('public'))

server.listen(9000, () => console.log('Server is running on port 9000') )