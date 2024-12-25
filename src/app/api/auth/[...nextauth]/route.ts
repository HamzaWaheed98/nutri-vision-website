import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { sql } from '@vercel/postgres';
import crypto from 'crypto';

// Add type checking for environment variables
if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error('Missing GitHub OAuth credentials');
}

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      if (account?.provider === 'github') {
        try {
          // Check if user exists
          const result = await sql`
            SELECT * FROM users WHERE email = ${user.email}
          `;
          
          if (result.rows.length === 0) {
            // Create new user with API key
            const apiKey = `nv_${crypto.randomBytes(32).toString('hex')}`;
            await sql`
              INSERT INTO users (email, name, github_id, api_key)
              VALUES (${user.email}, ${user.name}, ${user.id}, ${apiKey})
            `;
          }
        } catch (error) {
          console.error('Error handling sign in:', error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session?.user?.email) {
        // Fetch user's API key
        const result = await sql`
          SELECT api_key FROM users WHERE email = ${session.user.email}
        `;
        if (result.rows[0]) {
          session.user.apiKey = result.rows[0].api_key;
        }
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };