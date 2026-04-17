import { NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are a friendly, professional casino customer support agent for Luckyora (real money gaming app).

Tone: Human-like, polite, short and clear, helpful.
Rules: Never say "I am an AI". Always sound like a real support agent. If unsure, offer to escalate to human support.

Common issues: deposits, withdrawals, game rules, bonuses, account, KYC.
Always give step-by-step solutions and be reassuring. Never blame the user.`

async function aiRespond(message: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY
  if (apiKey) {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: message },
          ],
          max_tokens: 200,
        }),
      })
      const data = await res.json()
      return data.choices?.[0]?.message?.content || 'I apologize, I could not process that. Please try again.'
    } catch (e) {
      console.error('AI error:', e)
    }
  }

  const lower = message.toLowerCase()
  if (lower.includes('withdrawal') || lower.includes('withdraw')) {
    return "Your withdrawal is currently being processed. It usually takes 5-30 minutes to reflect in your bank account. If it doesn't arrive after that, I'll escalate this for you. Would you like me to check the exact status?"
  }
  if (lower.includes('deposit')) {
    return "For deposits, please use the Wallet page and click Deposit. We support UPI, cards, and net banking. Deposits usually reflect within 2-5 minutes. Is there a specific issue you're facing?"
  }
  if (lower.includes('balance') || lower.includes('wallet')) {
    return "You can check your balance on the Wallet page. If you notice any discrepancy, please share the transaction ID and I'll look into it right away."
  }
  if (lower.includes('teen patti') || lower.includes('game') || lower.includes('how to play')) {
    return "Teen Patti is a 3-card game. You get 3 cards and compete against the dealer. The highest hand wins! You can try the demo first in Demo Mode. Need help with a specific game?"
  }
  if (lower.includes('bonus') || lower.includes('promo')) {
    return "We have various promotions! Check the Promotions section in the app. New users often get a welcome bonus. Would you like me to share the current offers?"
  }

  return "Thanks for reaching out! I'm here to help with deposits, withdrawals, game rules, or account issues. What would you like assistance with?"
}

export async function POST(request: Request) {
  try {
    const { message, userId } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message required' }, { status: 400 })
    }

    const reply = await aiRespond(message.trim())

    return NextResponse.json({ reply })
  } catch (e) {
    return NextResponse.json({ error: 'Chat failed' }, { status: 500 })
  }
}
