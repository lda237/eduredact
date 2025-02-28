import { useState, useEffect } from 'react';
import { Calculator, Clock, FileText, ChevronRight, CheckCircle } from 'lucide-react';
import { predictEstimate } from '../services/estimateService';

export function EstimationPage() {
  const [serviceType, setServiceType] = useState('redaction');
  const [pageCount, setPageCount] = useState(1);
  const [urgency, setUrgency] = useState('standard');
  const [totalPrice, setTotalPrice] = useState(0);
  const [estimatedDays, setEstimatedDays] = useState(0);
  const [complexity, setComplexity] = useState('secondaire');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEstimation = async () => {
      setIsLoading(true);
      try {
        const serviceTypeNumber = serviceType === 'redaction' ? 0 : serviceType === 'traduction' ? 1 : 2;
        const urgencyNumber = urgency === 'standard' ? 0 : 1;
        const response = await predictEstimate(serviceTypeNumber, pageCount, urgencyNumber);
        setTotalPrice(Math.round(response.price));
        setEstimatedDays(Math.round(response.time));
        setError(null);
      } catch (error) {
        console.error('Error fetching estimation:', error);
        setError('Une erreur est survenue, veuillez réessayer plus tard.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEstimation();
  }, [serviceType, pageCount, urgency]);

  const serviceOptions = [
    { value: 'redaction', label: 'Rédaction', description: 'Création de contenu original' },
    { value: 'correction', label: 'Correction', description: 'Révision et amélioration de vos textes' },
    { value: 'traduction', label: 'Traduction', description: 'Traduction professionnelle de vos documents' }
  ];

  const complexityOptions = [
    { value: 'secondaire', label: 'Niveau Secondaire' },
    { value: 'licence', label: 'Licence' },
    { value: 'master', label: 'Master' },
    { value: 'doctorat', label: 'Doctorat' },
    { value: 'professionnel', label: 'Professionnel' }
  ];

  return (
    <div className="py-12 bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Estimation de votre projet
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Obtenez une estimation instantanée du prix et du délai pour votre projet académique ou professionnel
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 bg-indigo-600 text-white">
            <h2 className="text-xl font-semibold">Configurez votre projet</h2>
            <p className="text-indigo-100">Personnalisez les options ci-dessous pour obtenir votre devis</p>
          </div>

          <form className="p-8 space-y-8">
            {/* Type de service */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Type de service
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {serviceOptions.map((option) => (
                  <div 
                    key={option.value}
                    onClick={() => setServiceType(option.value)}
                    className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                      serviceType === option.value 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200 hover:border-indigo-200'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{option.label}</span>
                      {serviceType === option.value && (
                        <CheckCircle className="h-5 w-5 text-indigo-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre de pages */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de pages
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    <FileText className="h-4 w-4" />
                  </span>
                  <input
                    type="number"
                    min="1"
                    value={pageCount}
                    onChange={(e) => setPageCount(Math.max(1, parseInt(e.target.value)))}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
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
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2"
                >
                  {complexityOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Urgence */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Niveau d'urgence
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  onClick={() => setUrgency('standard')}
                  className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                    urgency === 'standard' 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Standard</div>
                      <p className="text-sm text-gray-500">Délai normal, prix économique</p>
                    </div>
                    {urgency === 'standard' && (
                      <CheckCircle className="h-5 w-5 text-indigo-600" />
                    )}
                  </div>
                </div>
                <div 
                  onClick={() => setUrgency('express')}
                  className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                    urgency === 'express' 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Express</div>
                      <p className="text-sm text-gray-500">Livraison prioritaire</p>
                    </div>
                    {urgency === 'express' && (
                      <CheckCircle className="h-5 w-5 text-indigo-600" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Affichage des résultats ou erreur */}
            {error && (
              <div className="mt-4 text-red-600 bg-red-50 p-4 rounded-md border border-red-200">
                {error}
              </div>
            )}

            <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Estimation de votre projet
              </h3>
              {isLoading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-pulse flex space-x-4">
                    <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                    <Calculator className="h-8 w-8 text-indigo-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Prix estimé</p>
                      <p className="text-2xl font-bold text-gray-900">{totalPrice} €</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                    <Clock className="h-8 w-8 text-indigo-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Délai estimé</p>
                      <p className="text-2xl font-bold text-gray-900">{estimatedDays} jours</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                    <FileText className="h-8 w-8 text-indigo-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Pages</p>
                      <p className="text-2xl font-bold text-gray-900">{pageCount}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
              Commander maintenant
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </form>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>* Les estimations sont données à titre indicatif et peuvent varier selon les spécificités de votre projet.</p>
        </div>
      </div>
    </div>
  );
}