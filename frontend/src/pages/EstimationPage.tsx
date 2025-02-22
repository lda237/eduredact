import React, { useState, useEffect } from 'react';
import { Calculator, Clock, FileText } from 'lucide-react';

interface PriceRates {
  [key: string]: {
    basePrice: number;
    urgencyMultiplier: {
      standard: number;
      express: number;
    };
    complexityMultiplier: {
      [key: string]: number;
    };
  };
}

const priceRates: PriceRates = {
  redaction: {
    basePrice: 20, // Prix par page
    urgencyMultiplier: {
      standard: 1,
      express: 1.5
    },
    complexityMultiplier: {
      secondaire: 1,
      licence: 1.2,
      master: 1.4,
      doctorat: 1.6,
      professionnel: 1.3
    }
  },
  correction: {
    basePrice: 15,
    urgencyMultiplier: {
      standard: 1,
      express: 1.5
    },
    complexityMultiplier: {
      secondaire: 1,
      licence: 1.2,
      master: 1.4,
      doctorat: 1.6,
      professionnel: 1.3
    }
  },
  traduction: {
    basePrice: 25,
    urgencyMultiplier: {
      standard: 1,
      express: 1.5
    },
    complexityMultiplier: {
      secondaire: 1,
      licence: 1.2,
      master: 1.4,
      doctorat: 1.6,
      professionnel: 1.3
    }
  }
};

export function EstimationPage() {
  const [serviceType, setServiceType] = useState('redaction');
  const [pageCount, setPageCount] = useState(1);
  const [urgency, setUrgency] = useState('standard');
  const [complexity, setComplexity] = useState('licence');
  const [totalPrice, setTotalPrice] = useState(0);
  const [estimatedDays, setEstimatedDays] = useState(0);

  useEffect(() => {
    const calculatePrice = () => {
      const basePrice = priceRates[serviceType].basePrice;
      const urgencyMultiplier = priceRates[serviceType].urgencyMultiplier[urgency];
      const complexityMultiplier = priceRates[serviceType].complexityMultiplier[complexity];
      
      const total = basePrice * pageCount * urgencyMultiplier * complexityMultiplier;
      setTotalPrice(Math.round(total));

      // Calcul du délai estimé
      const baseDays = Math.ceil(pageCount / 5); // 5 pages par jour en moyenne
      const urgencyDays = urgency === 'express' ? Math.max(1, Math.ceil(baseDays / 2)) : baseDays;
      setEstimatedDays(urgencyDays);
    };

    calculatePrice();
  }, [serviceType, pageCount, urgency, complexity]);

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Estimation de votre projet
          </h1>
          <p className="text-xl text-gray-600">
            Obtenez une estimation instantanée du prix et du délai pour votre projet
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form className="space-y-6">
            {/* Type de service */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de service
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="redaction">Rédaction</option>
                <option value="correction">Correction</option>
                <option value="traduction">Traduction</option>
              </select>
            </div>

            {/* Nombre de pages */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de pages
              </label>
              <input
                type="number"
                min="1"
                value={pageCount}
                onChange={(e) => setPageCount(Math.max(1, parseInt(e.target.value)))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                Une page = environ 250 mots
              </p>
            </div>

            {/* Niveau de complexité */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Niveau académique
              </label>
              <select
                value={complexity}
                onChange={(e) => setComplexity(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="secondaire">Niveau Secondaire</option>
                <option value="licence">Licence</option>
                <option value="master">Master</option>
                <option value="doctorat">Doctorat</option>
                <option value="professionnel">Professionnel</option>
              </select>
            </div>

            {/* Urgence */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Niveau d'urgence
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="standard">Standard</option>
                <option value="express">Express</option>
              </select>
            </div>

            {/* Résultats */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Estimation de votre projet
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center">
                  <Calculator className="h-6 w-6 text-indigo-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Prix estimé</p>
                    <p className="text-xl font-bold text-gray-900">{totalPrice} €</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-indigo-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Délai estimé</p>
                    <p className="text-xl font-bold text-gray-900">{estimatedDays} jours</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FileText className="h-6 w-6 text-indigo-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Pages</p>
                    <p className="text-xl font-bold text-gray-900">{pageCount}</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors"
            >
              Commander maintenant
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}