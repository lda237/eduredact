import React from 'react';
import { Upload, MessageSquare, FileCheck, CreditCard } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "1. Soumettez votre document",
      description: "Téléchargez votre fichier et précisez vos besoins spécifiques."
    },
    {
      icon: CreditCard,
      title: "2. Recevez un devis instantané",
      description: "Obtenez une estimation immédiate du prix et du délai de livraison."
    },
    {
      icon: MessageSquare,
      title: "3. Échangez avec nos experts",
      description: "Discutez directement avec votre rédacteur ou traducteur assigné."
    },
    {
      icon: FileCheck,
      title: "4. Recevez votre document",
      description: "Téléchargez votre document finalisé et demandez des révisions si nécessaire."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Un processus simple et efficace en 4 étapes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 w-full h-0.5 bg-indigo-200 transform translate-y-[-50%] translate-x-[50%]" />
                )}
                <div className="relative bg-white rounded-xl shadow-lg p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-indigo-100">
                    <Icon className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}