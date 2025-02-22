import React from 'react';
import { Check } from 'lucide-react';

export function PricingSection() {
  const plans = [
    {
      name: "Étudiant",
      price: "0.04",
      description: "Pour les travaux académiques standards",
      features: [
        "Correction orthographique et grammaticale",
        "Délai standard",
        "Support par email",
        "1 révision gratuite"
      ],
      recommended: false
    },
    {
      name: "Premium",
      price: "0.06",
      description: "Pour les documents importants",
      features: [
        "Tout du plan Étudiant",
        "Amélioration du style",
        "Délai prioritaire",
        "3 révisions gratuites",
        "Support prioritaire"
      ],
      recommended: true
    },
    {
      name: "Excellence",
      price: "0.08",
      description: "Pour une qualité professionnelle",
      features: [
        "Tout du plan Premium",
        "Révisions illimitées",
        "Coaching personnalisé",
        "Support 24/7",
        "Garantie de publication"
      ],
      recommended: false
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tarifs Transparents
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des prix au mot adaptés à tous les budgets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl ${
                plan.recommended
                  ? 'ring-2 ring-indigo-600 shadow-xl'
                  : 'border border-gray-200 shadow-lg'
              } p-8`}
            >
              {plan.recommended && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Recommandé
                  </span>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="flex justify-center items-baseline mb-2">
                  <span className="text-5xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-xl text-gray-600 ml-1">€/mot</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold ${
                  plan.recommended
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Choisir ce plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}