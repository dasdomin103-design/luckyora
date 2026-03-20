import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function POST(request: Request) {
  const authHeader = request.headers.get('Authorization')
  const token = authHeader?.replace('Bearer ', '')

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  const { data: { user }, error: authError } = await supabase.auth.getUser(token)

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const amount = parseInt(body.amount) || 100

  if (amount < 10) {
    return NextResponse.json({ error: 'Minimum deposit is ₹10' }, { status: 400 })
  }

  // Razorpay integration - requires RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET
  const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
  const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET

  if (razorpayKeyId && razorpayKeySecret) {
    try {
      const Razorpay = (await import('razorpay')).default
      const razorpay = new Razorpay({
        key_id: razorpayKeyId,
        key_secret: razorpayKeySecret,
      })

      const order = await razorpay.orders.create({
        amount: amount * 100,
        currency: 'INR',
        receipt: `dep_${user.id}_${Date.now()}`,
      })

      return NextResponse.json({ orderId: order.id, amount })
    } catch (err) {
      console.error('Razorpay order creation failed:', err)
      return NextResponse.json({ error: 'Payment initiation failed' }, { status: 500 })
    }
  }

  // No Razorpay keys - return mock success for development
  return NextResponse.json({
    mock: true,
    message: 'Use mock deposit in wallet UI',
  })
}
