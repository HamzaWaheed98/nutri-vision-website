import { NextApiRequest, NextApiResponse } from 'next'
import { verifyAPIKey } from '@/lib/auth'
import { checkRateLimit } from '@/lib/rateLimit'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // 1. Get API key from request header
    const apiKey = req.headers.authorization?.replace('Bearer ', '')
    if (!apiKey) {
      return res.status(401).json({ error: 'No API key provided' })
    }

    // 2. Verify API key and get user data
    const user = await verifyAPIKey(apiKey)
    if (!user) {
      return res.status(401).json({ error: 'Invalid API key' })
    }

    // 3. Check rate limits
    const rateLimitResult = await checkRateLimit(user.id, user.plan)
    if (!rateLimitResult.allowed) {
      return res.status(429).json({ error: 'Rate limit exceeded' })
    }

    const response = await fetch('https://nutrition-api-702536471508.us-central1.run.app/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body)
    })

    // 5. Return response from nutrition service
    const data = await response.json()
    return res.status(response.status).json(data)

  } catch (error) {
    console.error('Error processing request:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
