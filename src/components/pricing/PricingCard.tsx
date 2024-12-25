// src/components/PricingCard.tsx
import React from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';


interface PricingTier {
  name: string;
  price: string;
  requests: string;
  features: string[];
}

interface PricingCardProps {
  tier: PricingTier;
}

const PricingCard: React.FC<PricingCardProps> = ({ tier }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg flex flex-col h-full">
      <div className="p-6 flex-grow">
        <h2 className="text-2xl font-semibold text-gray-900">{tier.name}</h2>
        <p className="mt-4 text-sm text-gray-500">{tier.requests}</p>
        <p className="mt-8">
          <span className="text-4xl font-extrabold text-gray-900">{tier.price}</span>
        </p>
        <ul className="mt-6 space-y-4">
          {tier.features.map((feature) => (
            <li key={feature} className="flex">
              <Check className="flex-shrink-0 w-6 h-6 text-green-500" />
              <span className="ml-3 text-sm text-gray-500">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 pt-6 pb-8 mt-auto">

      <Link 
            href="/get-started" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md inline-block text-center"
            >
            Get Started
      </Link>
       
      </div>
    </div>
  );
};

export default PricingCard;