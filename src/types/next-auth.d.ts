declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      apiKey?: string;
    }
  }
  
  interface User {
    id: string;
    email: string;
    name?: string;
    apiKey?: string;
  }
}

export {}