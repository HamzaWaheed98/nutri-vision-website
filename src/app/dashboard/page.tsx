'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  Copy, 
  RefreshCw, 
  LogOut, 
  User, 
  Key, 
  Code, 
  BarChart,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('api-key');
  const [copySuccess, setShowSuccess] = useState(false);
  const [showRegenerateConfirm, setShowRegenerateConfirm] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/get-started');
    }
  }, [status, router]);

  const handleCopyApiKey = async () => {
    if (session?.user?.apiKey) {
      await navigator.clipboard.writeText(session.user.apiKey);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'api-key', label: 'API Key', icon: Key },
    { id: 'documentation', label: 'Documentation', icon: Code },
    { id: 'usage', label: 'Usage & Limits', icon: BarChart },
    { id: 'account', label: 'Account', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation Bar */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-white">NutriVision Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">{session?.user?.email}</span>
              <button
                onClick={() => router.push('/')}
                className="text-gray-300 hover:text-white"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="border-b border-gray-700">
          <nav className="flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center px-3 py-2 text-sm font-medium border-b-2 
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'}
                `}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="mt-6">
          {activeTab === 'api-key' && (
            <div className="bg-gray-800 shadow rounded-lg divide-y divide-gray-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">Your API Key</h2>
                  {copySuccess && (
                    <span className="flex items-center text-green-400 text-sm">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Copied!
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 bg-gray-900 p-4 rounded-md font-mono text-sm break-all text-blue-400">
                    {session?.user?.apiKey}
                  </code>
                  <button
                    onClick={handleCopyApiKey}
                    className="p-2 text-gray-400 hover:text-white rounded-md hover:bg-gray-700"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-4 flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                  <p className="text-sm text-gray-300">
                    Keep this API key secure and never share it publicly. If compromised,
                    you can regenerate it using the button below.
                  </p>
                </div>
                <div className="mt-6">
                  {showRegenerateConfirm ? (
                    <div className="bg-red-900/50 border border-red-700 rounded-md p-4">
                      <p className="text-sm text-red-300 mb-4">
                        Are you sure? This will invalidate your current API key immediately.
                      </p>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setShowRegenerateConfirm(false)}
                          className="px-3 py-1.5 text-sm border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            // Add regeneration logic here
                            setShowRegenerateConfirm(false);
                          }}
                          className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                          Yes, regenerate key
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowRegenerateConfirm(true)}
                      className="flex items-center text-sm text-gray-400 hover:text-white"
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Regenerate API Key
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-medium text-white mb-4">Quick Start</h3>
                <div className="bg-gray-900 p-4 rounded-md">
                  <pre className="overflow-x-auto text-sm text-blue-400">
                    <code>{`
// Install using npm
npm install nutrivision-api

// Initialize the client
import { NutriVision } from 'nutrivision-api';

const client = new NutriVision({
  apiKey: '${session?.user?.apiKey}'
});

// Analyze an image
const result = await client.analyze({
  image_url: 'https://example.com/food.jpg'
});`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* Documentation Tab Content */}
          {activeTab === 'documentation' && (
            <div className="bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6">API Documentation</h2>
              <div className="space-y-8">
                <section>
                  <h3 className="text-lg font-medium text-white mb-3">Endpoints</h3>
                  <div className="bg-gray-900 p-4 rounded-md">
                    <h4 className="font-mono text-sm mb-2 text-blue-400">POST /api/analyze</h4>
                    <p className="text-sm text-gray-300 mb-4">
                      Analyze a food image and receive detailed nutritional information.
                    </p>
                    <pre className="overflow-x-auto text-sm text-blue-400">
                      <code>{`
// Request
fetch('https://nutri-vision.com/api/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ${session?.user?.apiKey}'
  },
  body: JSON.stringify({
    image_url: 'your-food-image-url'
  })
})

// Response
{
  "calories": 245,
  "protein": 12,
  "carbohydrates": 30,
  "fat": 8,
  "ingredients": [
    "chicken breast",
    "brown rice",
    "broccoli"
  ],
  "confidence": 0.92
}`}
                      </code>
                    </pre>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-medium text-white mb-3">Rate Limits</h3>
                  <div className="bg-gray-900 p-4 rounded-md">
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• Free tier: 100 requests per month</li>
                      <li>• Rate limit: 10 requests per minute</li>
                      <li>• Maximum image size: 10MB</li>
                      <li>• Supported formats: JPEG, PNG</li>
                    </ul>
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* Usage Tab Content */}
          {activeTab === 'usage' && (
            <div className="bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Usage Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-400">API Calls This Month</h3>
                  <p className="mt-2 text-3xl font-semibold text-white">23/100</p>
                  <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '23%' }}></div>
                  </div>
                </div>

                <div className="bg-gray-900 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-400">Average Response Time</h3>
                  <p className="mt-2 text-3xl font-semibold text-white">238ms</p>
                </div>

                <div className="bg-gray-900 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-400">Success Rate</h3>
                  <p className="mt-2 text-3xl font-semibold text-white">99.8%</p>
                </div>
              </div>
            </div>
          )}

          {/* Account Tab Content */}
          {activeTab === 'account' && (
            <div className="bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Account Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Email</h3>
                  <p className="mt-1 text-sm text-white">{session?.user?.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Plan</h3>
                  <p className="mt-1 text-sm text-white">Free Tier</p>
                  <button className="mt-2 text-sm text-blue-400 hover:text-blue-300">
                    Upgrade to Pro
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;