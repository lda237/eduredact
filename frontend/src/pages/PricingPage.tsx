import React from 'react';
import { Check, HelpCircle } from 'lucide-react';


  const plans = [
    {
      name: "Étudiant",
      price: "0.04",
      description: "Pour les travaux académiques standards",
      features: [
        {
          text: "Correction orthographique et grammaticale",
          tooltip: "Détection et correction des erreurs de langue"
        },
        {
          text: "Délai standard (3-5 jours)",
          tooltip: "Temps de traitement moyen pour des documents jusqu'à 10,000 mots"
        },
        {
          text: "Support par email",
          tooltip: "Réponse sous 24h ouvrées"
        },
        {
          text: "1 révision gratuite",
          tooltip: "À utiliser dans les 7 jours suivant la livraison"
        },
        {
          text: "Vérification anti-plagiat",
          tooltip: "Analyse complète avec rapport détaillé"
        }
      ],
      recommended: false
    },
    {
      name: "Premium",
      price: "0.06",
      description: "Pour les documents importants",
      features: [
        {
          text: "Tout du plan Étudiant",
          tooltip: "Inclut toutes les fonctionnalités du plan Étudiant"
        },
        {
          text: "Amélioration du style",
          tooltip: "Suggestions pour améliorer la clarté et l'impact de votre texte"
        },
        {
          text: "Délai prioritaire (2-3 jours)",
          tooltip: "Traitement accéléré de votre document"
        },
        {
          text: "3 révisions gratuites",
          tooltip: "À utiliser dans les 14 jours suivant la livraison"
        },
        {
          text: "Support prioritaire",
          tooltip: "Réponse sous 12h ouvrées"
        },
        {
          text: "Formatage selon les normes",
          tooltip: "APA, MLA, Chicago, ou autres normes académiques"
        }
      ],
      recommended: true
    },
    {
      name: "Excellence",
      price: "0.08",
      description: "Pour une qualité professionnelle",
      features: [
        {
          text: "Tout du plan Premium",
          tooltip: "Inclut toutes les fonctionnalités du plan Premium"
        },
        {
          text: "Révisions illimitées",
          tooltip: "Pendant 30 jours après la livraison"
        },
        {
          text: "Coaching personnalisé",
          tooltip: "Sessions individuelles avec un expert"
        },
        {
          text: "Support 24/7",
          tooltip: "Assistance disponible à tout moment"
        },
        {
          text: "Garantie de publication",
          tooltip: "Accompagnement jusqu'à l'acceptation par une revue"
        },
        {
          text: "Double relecture",
          tooltip: "Vérification par deux experts différents"
        },
        {
          text: "Délai express (24-48h)",
          tooltip: "Service ultra-rapide pour les urgences"
        }
      ],
      recommended: false
    }
  ];

  const faqs = [
    {
      question: "Comment est calculé le prix final ?",
      answer: "Le prix est calculé en multipliant le nombre de mots de votre document par le tarif au mot du plan choisi. Par exemple, pour un document de 1000 mots avec le plan Étudiant (0.04€/mot), le prix serait de 40€."
    },
    {
      question: "Quels types de paiement acceptez-vous ?",
      answer: "Nous acceptons les cartes bancaires (Visa, Mastercard, American Express), PayPal, et les virements bancaires pour les institutions."
    },
    {
      question: "Puis-je changer de plan après avoir commencé ?",
      answer: "Oui, vous pouvez upgrader votre plan à tout moment. La différence de prix sera calculée au prorata des services non encore utilisés."
    },
    {
      question: "Quelle est votre politique de remboursement ?",
      answer: "Nous offrons une garantie satisfaction de 30 jours. Si vous n'êtes pas satisfait de nos services, nous vous remboursons intégralement."
    }
  ];

  export const PricingPage: React.FC = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tarification Transparente
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des prix clairs et adaptés à vos besoins, avec une garantie de satisfaction
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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
                  <li key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-600 flex-grow">{feature.text}</span>
                    <span title={feature.tooltip}>
                      <HelpCircle className="h-5 w-5 text-gray-400 ml-2 cursor-help" />
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold ${
                  plan.recommended
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                } transition-colors`}
              >
                Choisir ce plan
              </button>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Questions Fréquentes
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}