// src/components/LandingPage.tsx
import React from 'react';
import PricingCard from "@/components/pricing/PricingCard";

const pricingTiers = [
  {
    name: 'Free Tier',
    price: '$0',
    requests: '100 requests/month',
    features: [
      'Basic nutrition analysis',
      'Standard response time',
      'Community support',
      'Basic documentation'
    ]
  },
  {
    name: 'Pro',
    price: '$49/month',
    requests: '5,000 requests/month',
    features: [
      'Advanced nutrition analysis',
      'Priority response time',
      'Email support',
      'Detailed documentation',
      'Custom integration support'
    ]
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    requests: 'Unlimited requests',
    features: [
      'Full nutrition analysis',
      'Dedicated support',
      'SLA guarantees',
      'Custom features',
      'White-label options',
      'Private deployment available'
    ]
  }
];

const LandingPage = () => {
  return (
    <div id="top" className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              NutriVision API
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-xl text-gray-500">
              Transform food images into detailed nutritional insights with our advanced AI-powered API
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Powerful Features for Developers
            </h2>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="text-lg font-medium text-gray-900">Accurate Analysis</div>
                <p className="mt-2 text-base text-gray-500">
                  Get precise nutritional information including calories, macronutrients, and ingredient lists
                </p>
              </div>

              <div className="relative">
                <div className="text-lg font-medium text-gray-900">Simple Integration</div>
                <p className="mt-2 text-base text-gray-500">
                  Easy-to-use REST API with comprehensive documentation and SDK support
                </p>
              </div>

              <div className="relative">
                <div className="text-lg font-medium text-gray-900">Fast Response Times</div>
                <p className="mt-2 text-base text-gray-500">
                  Lightning-fast analysis with results typically delivered in under 2 seconds
                </p>
              </div>

              <div className="relative">
                <div className="text-lg font-medium text-gray-900">Scalable Infrastructure</div>
                <p className="mt-2 text-base text-gray-500">
                  Built on GCP for reliable performance at any scale
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Simple, Transparent Pricing
            </h2>
          </div>

          <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
            {pricingTiers.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </div>
        </div>
      </div>

      {/* API Documentation Preview */}
      <div id="api" className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Quick Start Guide
            </h2>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-white">
            <pre className="overflow-x-auto">
            <code>{`
// Example API Usage
const analyzeImage = async (imageData) => {
  const response = await fetch('https://nutrivision.com/api/v1/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      image_base64: imageData // Base64 encoded image
    })
  });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Rate limit exceeded');
    }
    if (response.status === 401) {
      throw new Error('Invalid API key');
    }
    throw new Error('Analysis failed');
  }

  const nutritionData = await response.json();
  
  // Response format:
  // {
  //   calories: number,
  //   protein: number,
  //   carbohydrates: number,
  //   fat: number,
  //   fiber: number,
  //   sugar: number,
  //   sodium: number,
  //   serving_size: string,
  //   ingredients: string[]
  // }
  
  return nutritionData;
};`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;