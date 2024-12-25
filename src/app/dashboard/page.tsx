'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/get-started');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Your API Key</h2>
          <div className="bg-gray-100 p-4 rounded-md font-mono break-all">
            {session?.user?.apiKey}
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Keep this key secure. Do not share it publicly.
          </p>
        </div>

        {/* API Documentation Section */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">API Usage</h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <pre className="overflow-x-auto">
              <code>
{`fetch('https://nutri-vision.com/api/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ${session?.user?.apiKey}'
  },
  body: JSON.stringify({
    image_url: 'your-food-image-url'
  })
})`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;