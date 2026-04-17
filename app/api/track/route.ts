import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/app/lib/supabaseServer'

const BOT_PATTERNS = [
  'bot','crawler','spider','crawling',
  'curl','wget','python','java','php','go-http',
  'postman','insomnia','axios','httpclient',
  'libwww','node','fetch','headless','chrome'
]

function isBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase()
  return BOT_PATTERNS.some(pattern => ua.includes(pattern))
}

function generateSessionId(): string {
  return 'sess_' + Math.random().toString(36).substring(2) + Date.now().toString(36)
}

function getDeviceType(ua: string) {
  if (/mobile/i.test(ua)) return 'mobile'
  if (/tablet/i.test(ua)) return 'tablet'
  return 'desktop'
}

export async function POST(request: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
  }

  try {
    const body = await request.json()
    const { sessionId, path, referrer } = body
    
    const userAgent = request.headers.get('user-agent') || ''

    if (isBot(userAgent)) {
      return NextResponse.json({ success: true, skipped: 'bot' })
    }

    let currentSessionId = sessionId
    let isNewSession = false

    if (!currentSessionId) {
      currentSessionId = generateSessionId()
      isNewSession = true
    }

    const country =
      request.headers.get('x-vercel-ip-country') ||
      request.headers.get('cf-ipcountry') ||
      'Unknown'

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown'

    const device = getDeviceType(userAgent)

    const { error: sessionError } = await supabaseAdmin
      .from('sessions')
      .upsert(
        {
          session_id: currentSessionId,
          user_agent: userAgent.substring(0, 500),
          country,
          ip_address: ip,
          device,
          last_active: new Date().toISOString(),
          ...(isNewSession && { created_at: new Date().toISOString() })
        },
        { onConflict: 'session_id' }
      )

    if (sessionError) {
      console.error(sessionError)
      return NextResponse.json({ error: 'Session failed' }, { status: 500 })
    }

    const { error: pageViewError } = await supabaseAdmin
      .from('page_views')
      .insert({
        session_id: currentSessionId,
        path: path || '/',
        referrer: referrer?.substring(0, 200) || null
      })

    if (pageViewError) {
      console.error(pageViewError)
      return NextResponse.json({ error: 'Page view failed' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      sessionId: currentSessionId,
      isNewSession
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok' })
}