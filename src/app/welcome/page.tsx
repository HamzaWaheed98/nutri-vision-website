'use client';

import React from 'react';
import { Copy, Check } from 'lucide-react';

const Welcome = () => {
  const [copied, setCopied] = React.useState(false);
  const apiKey = "nutr_test_12345"; // This would be dynamically generated

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome to NutriVision!</h2>
          <p className="mt-2 text-gray-600">Here&apos;s everything you need to get started</p>
        </div>

        {/* API Key Section */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-6 py-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Your API Key</h3>
            <div className="flex items-center bg-gray-50 rounded-md p-3">
              <code className="flex-1 text-sm text-gray-800">{apiKey}</code>
              <button
                onClick={copyApiKey}
                className="ml-3 inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Keep this key secret. You can generate new keys in your dashboard.
            </p>
          </div>
        </div>

        {/* Quick Start Section */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Start</h3>
            <div className="bg-gray-800 rounded-md p-4 overflow-x-auto">
              <pre className="text-sm text-white">
                {`const response = await fetch('https://api.nutrivision.ai/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ${apiKey}'
  },
  body: JSON.stringify({
    image_base64: 'your_image_data'
  })
});

const nutritionData = await response.json();`}
              </pre>
            </div>
            
            <div className="mt-8 space-y-4">
              <h4 className="text-md font-medium text-gray-900">Next Steps</h4>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">1</span>
                    </div>
                  </div>
                  <p className="ml-3 text-sm text-gray-600">
                    Try making your first API call with the example above
                  </p>
                </li>
                <li className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">2</span>
                    </div>
                  </div>
                  <p className="ml-3 text-sm text-gray-600">
                    Check out our documentation for more examples
                  </p>
                </li>
                <li className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">3</span>
                    </div>
                  </div>
                  <p className="ml-3 text-sm text-gray-600">
                    Visit your dashboard to monitor API usage
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;