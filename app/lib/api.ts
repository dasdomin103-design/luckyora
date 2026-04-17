const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export async function fetchBalance(userId: string) {
  const res = await fetch(`${API_URL}/api/wallet/balance/${userId}`)
  if (!res.ok) throw new Error('Failed to fetch balance')
  return res.json()
}

export async function deposit(userId: string, amount: number) {
  const res = await fetch(`${API_URL}/api/wallet/deposit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, amount }),
  })
  if (!res.ok) throw new Error('Deposit failed')
  return res.json()
}

export async function withdraw(userId: string, amount: number) {
  const res = await fetch(`${API_URL}/api/wallet/withdraw`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, amount }),
  })
  if (!res.ok) throw new Error('Withdraw failed')
  return res.json()
}

export async function createRazorpayOrder(amount: number) {
  const res = await fetch(`${API_URL}/api/wallet/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount }),
  })
  return res.json()
}
