'use client';

import { signIn } from 'next-auth/react';
import { Github } from 'lucide-react';

const GetStarted = () => {
  const handleGithubSignIn = () => {
    signIn('github', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Get Started with NutriVision
          </h2>
          <p className="mt-2 text-gray-600">
            Get your API key in less than a minute
          </p>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-8">
            <button
              onClick={handleGithubSignIn}
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Github className="h-5 w-5 mr-2" />
              Continue with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;