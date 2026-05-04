import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

// Handle socket connections

io.on('connection', (socket) => {

    socket.on('join', (username) => {
        socket.username = username
    })

    
    socket.on('chatMessage', (data) => {
        io.emit('message', {
            user: socket.username,   
            text: data.text,
            time: data.time
        })
    })

    
    socket.on('typing', () => {
        socket.broadcast.emit('typing', socket.username)
    })
})



app.use(express.static('public'))
const PORT = process.env.PORT || 9000

server.listen(PORT, () => 
    console.log(`Server running on ${PORT}`)
)