'use client'

import { useState, useEffect } from 'react'
import { Header } from '../components/Header'
import { useStore } from '../store/useStore'
import { supabase } from '../lib/supabase' // ✅ FIXED (no alias issue)
import { createRazorpayOrder } from '../lib/api'
import toast from 'react-hot-toast'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function WalletPage() {
  const { balance, addBalance, deductBalance, setBalance, resetBalance, user } = useStore()

  const [depositAmount, setDepositAmount] = useState(100)
  const [withdrawAmount, setWithdrawAmount] = useState(50)
  const [loading, setLoading] = useState(false)

  // ✅ Sync balance from backend
  useEffect(() => {
    if (!user?.id || !API_URL) return

    const fetchBalance = async () => {
      try {
        const res = await fetch(`${API_URL}/api/wallet/balance/${user.id}`)
        const data = await res.json()
        if (data.balance != null) setBalance(data.balance)
      } catch (err) {
        console.error('Balance fetch failed')
      }
    }

    fetchBalance()
  }, [user?.id, API_URL, setBalance])

  // ✅ Deposit handler (stable)
  const handleDeposit = async () => {
    if (!depositAmount || depositAmount < 1) {
      toast.error('Enter valid amount')
      return
    }

    setLoading(true)

    try {
      const data = await createRazorpayOrder(depositAmount)

      // Load Razorpay script safely
      await new Promise<void>((resolve) => {
        const existing = document.querySelector('#razorpay-script')
        if (existing) return resolve()

        const script = document.createElement('script')
        script.id = 'razorpay-script'
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.onload = () => resolve()
        document.body.appendChild(script)
      })

      const Rzr = (window as any).Razorpay

      if (data?.orderId && Rzr) {
        const rzp = new Rzr({
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: depositAmount * 100,
          currency: 'INR',
          order_id: data.orderId,
          handler: () => {
            addBalance(depositAmount)
            toast.success(`₹${depositAmount} added!`)
          },
        })
        rzp.open()
      } else {
        addBalance(depositAmount)
        toast.success(`₹${depositAmount} added (test)!`)
      }
    } catch {
      addBalance(depositAmount)
      toast.success(`₹${depositAmount} added (mock)!`)
    } finally {
      setLoading(false)
    }
  }

  // ✅ Withdraw handler
  const handleWithdraw = () => {
    if (withdrawAmount <= 0) {
      toast.error('Invalid amount')
      return
    }

    if (balance < withdrawAmount) {
      toast.error('Insufficient balance')
      return
    }

    deductBalance(withdrawAmount)
    toast.success(`₹${withdrawAmount} withdrawn`)
  }

  return (
    <main className="min-h-screen bg-black text-white p-4">
      <Header />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-yellow-400">💰 Wallet</h1>
        <p className="text-gray-400 text-sm">Manage your balance</p>
      </div>

      {/* Balance */}
      <div className="bg-gradient-to-br from-yellow-600/20 to-purple-600/20 rounded-2xl border border-yellow-500/30 p-6 mb-6">
        <p className="text-gray-400 text-sm mb-1">Available Balance</p>
        <p className="text-4xl font-bold text-yellow-400">₹{balance}</p>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => {
            addBalance(500)
            toast.success('₹500 added!')
          }}
          className="flex-1 min-w-[100px] bg-green-600 hover:bg-green-500 py-3 rounded-xl font-semibold"
        >
          +₹500
        </button>

        <button
          onClick={() => {
            addBalance(100)
            toast.success('₹100 added!')
          }}
          className="flex-1 min-w-[100px] bg-green-600/80 hover:bg-green-500 py-3 rounded-xl font-semibold"
        >
          +₹100
        </button>

        <button
          onClick={() => {
            resetBalance()
            toast.success('Balance reset!')
          }}
          className="flex-1 min-w-[100px] bg-yellow-600 hover:bg-yellow-500 text-black py-3 rounded-xl font-semibold"
        >
          Reset
        </button>
      </div>

      {/* Deposit */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Deposit</h2>
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(Number(e.target.value) || 100)}
            min={1}
            className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-600 text-white mb-3"
          />

          <button
            onClick={handleDeposit}
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-black font-bold py-3 rounded-xl"
          >
            {loading ? 'Processing...' : `Deposit ₹${depositAmount}`}
          </button>
        </div>
      </section>

      {/* Withdraw */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Withdraw</h2>
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(Number(e.target.value) || 50)}
            min={1}
            max={balance}
            className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-600 text-white mb-3"
          />

          <button
            onClick={handleWithdraw}
            className="w-full bg-gray-700 hover:bg-gray-600 py-3 rounded-xl font-semibold"
          >
            Withdraw ₹{withdrawAmount}
          </button>
        </div>
      </section>
    </main>
  )
}