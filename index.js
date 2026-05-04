import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

// Handle socket connections

io.on('connection' , (socket) => {
    socket.on('chatMessage', (data) => {
        io.emit('message' , data)
    })
})



app.use(express.static('public'))

server.listen(9000, () => console.log('Server is running on port 9000') )