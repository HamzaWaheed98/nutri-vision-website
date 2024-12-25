import { prisma } from './prisma'

export type User = {
  id: string;
  plan: 'free' | 'pro' | 'enterprise';
  apiKey: string;
}

export async function verifyAPIKey(apiKey: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { apiKey },
      select: {
        id: true,
        plan: true,
        apiKey: true
      }
    })
    return user
  } catch (error) {
    console.error('Error verifying API key:', error)
    return null
  }
}