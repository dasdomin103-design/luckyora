'use client'

import { useState, useRef, useEffect } from 'react'
import { useSound } from '@/app/context/SoundContext'
import { useStore } from '@/app/store/useStore'

const QUICK_REPLIES = [
  { label: '💰 Wallet', msg: 'How do I check my wallet balance?' },
  { label: '🎮 Game Rules', msg: 'How does Teen Patti work?' },
  { label: '📤 Withdraw', msg: 'My withdrawal is not received' },
  { label: '🎁 Bonuses', msg: 'What bonuses do you offer?' },
]

interface Message {
  role: 'user' | 'bot'
  text: string
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: "Hi 👋 I'm your LuckyOra support assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const { play } = useSound()
  const { user } = useStore()

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
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

      setMessages((m) => [
        ...m,
        {
          role: 'bot',
          text:
            data.reply ||
            "Sorry, I couldn't process that. Please try again.",
        },
      ])
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: 'bot',
          text: 'Connection error. Please try again.',
        },
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
      {/* Floating Button */}
      <button
        onClick={() => {
          play('click')
          setOpen((o) => !o)
        }}
        className="fixed bottom-20 right-5 z-50 w-14 h-14 rounded-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold shadow-lg flex items-center justify-center transition-transform hover:scale-105"
      >
        💬
      </button>

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-36 right-5 z-50 w-[340px] max-h-[500px] flex flex-col bg-gradient-to-b from-[#0f172a] to-[#020617] border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="p-3 bg-[#111827] border-b border-gray-700 flex justify-between items-center">
            <span className="font-semibold text-yellow-400">💬 Support</span>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[320px]"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2 rounded-2xl shadow-md text-sm ${
                    msg.role === 'user'
                      ? 'bg-yellow-500 text-black'
                      : 'bg-[#1e293b] text-gray-200'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#1e293b] text-gray-300 px-4 py-2 rounded-2xl animate-pulse text-sm">
                  Typing...
                </div>
              </div>
            )}
          </div>

          {/* Quick Replies */}
          <div className="px-3 pb-2 flex flex-wrap gap-2">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q.label}
                onClick={() => sendMessage(q.msg)}
                disabled={loading}
                className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-lg hover:bg-gray-700 transition"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 p-3 border-t border-gray-700"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-[#020617] text-white placeholder-gray-400 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-black font-semibold px-4 py-2 rounded-lg text-sm"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  )
}