import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/get-started',
  },
});

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};