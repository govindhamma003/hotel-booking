import { useState, useRef, useEffect } from 'react'
import {
  Fab, Paper, Box, Typography, InputBase,
  IconButton, CircularProgress, Card, CardMedia
} from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'


const API_URL = 'http://localhost:5000'

function ChatBot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! Tell me what kind of room you want, for example "cheap room for 2 with sea view".' }
  ])
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return 

    setMessages((prev) => [...prev, { from: 'user', text }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/api/ai/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      })
      const json = await res.json()

      if (!res.ok || !json.status) {
        throw new Error(json.message || 'Something went wrong')
      }

      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: json.data.reply, rooms: json.data.rooms }
      ])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: error.message || 'Sorry, something went wrong. Please try again.' }
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* floating button, uses your global color classes */}
      <Fab
        className="bg-primary text-white hover-bg-primary"
        onClick={() => setOpen(!open)}
        sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1300 }}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </Fab>

      {open && (
        <Paper
          elevation={8}
          sx={{
            position: 'fixed',
            bottom: 90,
            right: { xs: 10, sm: 20 },
            width: { xs: 'calc(100% - 20px)', sm: 340 },
            height: { xs: '70vh', sm: 480 },
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1300,
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          {/* header */}
          <Box className="bg-primary text-white" sx={{ p: 1.5 }}>
            <Typography fontWeight="bold">Room Assistant</Typography>
          </Box>

          {/* messages */}
          <Box sx={{ flex: 1, overflowY: 'auto', p: 1.5 }}>
            {messages.map((m, i) => (
              <Box
                key={i}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: m.from === 'user' ? 'flex-end' : 'flex-start',
                  mb: 1.5
                }}
              >
                <Box
                  className={m.from === 'user' ? 'bg-primary text-white' : 'bg-light-gray'}
                  sx={{ px: 1.5, py: 1, borderRadius: 2, maxWidth: '85%' }}
                >
                  <Typography variant="body2">{m.text}</Typography>
                </Box>

                {/* room cards */}
                {m.rooms && m.rooms.map((room) => (
                  <Card
                    key={room.id}
                    variant="outlined"
                    sx={{ display: 'flex', mt: 1, width: '100%' }}
                  >
                    <CardMedia
                      component="img"
                      image={room.images[0]}
                      alt={room.roomType}
                      sx={{ width: 90, objectFit: 'cover' }}
                    />
                    <Box sx={{ p: 1 }}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {room.roomType}
                      </Typography>
                      <Typography variant="body2" className="text-muted">
                        ₹{room.pricePerNight} / night
                      </Typography>
                      <Typography variant="body2" className="text-muted">
                        Up to {room.capacity} guests
                      </Typography>
                    </Box>
                  </Card>
                ))}
              </Box>
            ))}

            {loading && <CircularProgress size={22} />}
            <div ref={bottomRef} />
          </Box>

          {/* input */}
          <Box sx={{ display: 'flex', borderTop: '1px solid #ddd', p: 0.5 }}>
            <InputBase
              sx={{ flex: 1, px: 1.5 }}
              placeholder="Type your request..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              inputProps={{ maxLength: 300 }}
            />
            <IconButton onClick={sendMessage} disabled={loading} color="primary">
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  )
}

export default ChatBot