'use client'

import { useState, useRef, useEffect } from 'react'
import { useSound } from '@/app/context/SoundContext'
import { useStore } from '@/app/store/useStore'

const QUICK_REPLIES = [
  { label: '💰 Check Wallet', msg: 'How do I check my wallet balance?' },
  { label: '🎮 Game Rules', msg: 'How does Teen Patti work?' },
  { label: '📤 Withdrawal', msg: 'My withdrawal is not received' },
  { label: '🎁 Bonuses', msg: 'What bonuses do you offer?' },
]

interface Message {
  role: 'user' | 'bot'
  text: string
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Hi! 👋 I\'m your Luckyora support assistant. How can I help you today?' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { play } = useSound()
  const { user } = useStore()

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight)
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim()) return
    play('click')

    const userMsg: Message = { role: 'user', text: text.trim() }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          userId: user?.id || 'guest',
        }),
      })
      const data = await res.json()
      const reply = data.reply || 'Sorry, I couldn\'t process that. Please try again.'
      setMessages((m) => [...m, { role: 'bot', text: reply }])
    } catch {
      setMessages((m) => [
        ...m,
        { role: 'bot', text: 'Connection error. Please try again in a moment.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      <button
        onClick={() => {
          play('click')
          setOpen((o) => !o)
        }}
        className="fixed bottom-20 right-5 z-50 w-14 h-14 rounded-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold shadow-lg flex items-center justify-center transition-transform hover:scale-105"
        aria-label="Support chat"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-36 right-5 z-50 w-[340px] max-h-[480px] flex flex-col bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
          <div className="p-3 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
            <span className="font-semibold text-yellow-400">💬 Support</span>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[320px]"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-yellow-500/20 text-right'
                      : 'bg-gray-800 text-left'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 px-4 py-2 rounded-2xl">
                  <span className="animate-pulse">Typing...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-2 space-y-2">
            <div className="flex gap-1 flex-wrap">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q.label}
                  onClick={() => sendMessage(q.msg)}
                  disabled={loading}
                  className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg"
                >
                  {q.label}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 bg-gray-800 rounded-xl border border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 rounded-xl text-black font-semibold text-sm"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
