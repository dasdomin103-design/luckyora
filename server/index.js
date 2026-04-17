import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()
const httpServer = createServer(app)

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())

// Wallet API
let balances = new Map()

app.get('/api/wallet/balance/:userId', (req, res) => {
  const { userId } = req.params
  const balance = balances.get(userId) ?? 500
  res.json({ balance })
})

app.post('/api/wallet/deposit', async (req, res) => {
  const { userId, amount } = req.body
  const current = balances.get(userId) ?? 500
  balances.set(userId, current + amount)
  res.json({ balance: current + amount })
})

app.post('/api/wallet/withdraw', (req, res) => {
  const { userId, amount } = req.body
  const current = balances.get(userId) ?? 500
  if (current < amount) {
    return res.status(400).json({ error: 'Insufficient balance' })
  }
  balances.set(userId, current - amount)
  res.json({ balance: current - amount })
})

// Razorpay order creation (test mode)
app.post('/api/wallet/create-order', async (req, res) => {
  const { amount } = req.body
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret || keyId === 'rzp_test_xxx') {
    return res.json({ mock: true, orderId: `mock_${Date.now()}` })
  }

  try {
    const Razorpay = (await import('razorpay')).default
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret })
    const order = await razorpay.orders.create({
      amount: (amount || 100) * 100,
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
    })
    res.json({ orderId: order.id })
  } catch (e) {
    console.error('Razorpay error:', e)
    res.json({ mock: true, orderId: `mock_${Date.now()}` })
  }
})

// WebSocket for Teen Patti multiplayer
const io = new Server(httpServer, {
  cors: { origin: 'http://localhost:3000' },
})

const rooms = new Map()

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)

  socket.on('join-room', ({ roomId, playerName }) => {
    socket.join(roomId)
    const room = rooms.get(roomId) || { players: [], gameState: null }
    room.players.push({ id: socket.id, name: playerName || 'Player' })
    rooms.set(roomId, room)
    io.to(roomId).emit('player-joined', room.players)
  })

  socket.on('leave-room', ({ roomId }) => {
    socket.leave(roomId)
    const room = rooms.get(roomId)
    if (room) {
      room.players = room.players.filter((p) => p.id !== socket.id)
      io.to(roomId).emit('player-left', room.players)
    }
  })

  socket.on('place-bet', ({ roomId, amount }) => {
    io.to(roomId).emit('bet-placed', { playerId: socket.id, amount })
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

const PORT = process.env.PORT || 4000
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`WebSocket ready for Teen Patti multiplayer`)
})
