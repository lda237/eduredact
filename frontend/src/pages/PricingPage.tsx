import  { useState } from "react";
import { Check, HelpCircle, ArrowRight, Star } from "lucide-react";



const plans = [
  {
    name: "Rédaction Académique",
    icon: "📝",
    price: "0.12", // Prix par mot pour la rédaction académique (standard)
    description: "Rédaction de travaux académiques adaptée à votre niveau d'études",
    features: [
      "Respect des normes académiques",
      "Recherche bibliographique",
      "Citations et références incluses",
      "Garantie anti-plagiat"
    ],
    options: [
      { text: "Standard", price: "0.12", tooltip: "Délai de 7-10 jours" },
      { text: "Express", price: "0.18", tooltip: "Délai de 3-5 jours" },
      { text: "Urgent", price: "0.25", tooltip: "Délai de 24-48h" }
    ],
    minWords: 1250, // 5 pages
    popular: false
  },
  {
    name: "Traduction Spécialisée",
    icon: "🌐",
    price: "0.15", // Prix par mot pour la traduction spécialisée (standard)
    description: "Traduction professionnelle par des experts du domaine",
    features: [
      "Traduction par des spécialistes du domaine",
      "Respect de la terminologie technique",
      "Révision bilingue incluse",
      "Adaptation culturelle"
    ],
    options: [
      { text: "Standard", price: "0.15", tooltip: "Délai de 7-10 jours" },
      { text: "Express", price: "0.22", tooltip: "Délai de 3-5 jours" },
      { text: "Urgent", price: "0.30", tooltip: "Délai de 24-48h" }
    ],
    minWords: 1250, // 5 pages
    popular: true
  },
  {
    name: "Correction et Relecture",
    icon: "✓",
    price: "0.08", // Prix par mot pour la correction et relecture (standard)
    description: "Perfectionner vos documents avec une révision professionnelle",
    features: [
      "Correction orthographique et grammaticale",
      "Amélioration du style et de la cohérence",
      "Suggestions de reformulation",
      "Vérification des références"
    ],
    options: [
      { text: "Standard", price: "0.08", tooltip: "Délai de 5-7 jours" },
      { text: "Express", price: "0.12", tooltip: "Délai de 2-3 jours" },
      { text: "Urgent", price: "0.16", tooltip: "Délai de 24h" }
    ],
    minWords: 2500, // 10 pages
    popular: false
  },
  {
    name: "Coaching Académique",
    icon: "👨‍🏫",
    price: "75", // Prix forfaitaire par session
    description: "Accompagnement personnalisé pour vos projets académiques",
    features: [
      "Sessions individuelles avec un expert",
      "Conseils méthodologiques",
      "Feedback détaillé sur vos travaux",
      "Support entre les sessions"
    ],
    options: [
      { text: "Session unique (1h)", price: "75", tooltip: "Une session d'une heure" },
      { text: "Pack de 5 sessions", price: "325", tooltip: "Économisez 50€" },
      { text: "Pack de 10 sessions", price: "600", tooltip: "Économisez 150€" }
    ],
    minWords: null,
    popular: false
  },
  {
    name: "Aide à la Publication",
    icon: "📊",
    price: "250", // Prix forfaitaire de base
    description: "Maximisez vos chances de publication dans des revues de qualité",
    features: [
      "Analyse de la revue cible",
      "Formatage selon les exigences",
      "Lettre de présentation personnalisée",
      "Assistance pour les révisions demandées"
    ],
    options: [
      { text: "Standard", price: "250", tooltip: "Aide à la soumission" },
      { text: "Premium", price: "450", tooltip: "Aide à la soumission + 1 cycle de révision" },
      { text: "Platine", price: "800", tooltip: "Accompagnement complet jusqu'à publication" }
    ],
    minWords: null,
    popular: false
  },
  {
    name: "Service Ultra Express",
    icon: "⚡",
    price: "0.35", // Prix par mot pour le service express
    description: "Solution d'urgence pour les délais critiques",
    features: [
      "Équipe dédiée à votre projet",
      "Communication prioritaire",
      "Révisions accélérées",
      "Livraison garantie dans les délais"
    ],
    options: [
      { text: "Délai de 24h", price: "0.35", tooltip: "Livraison sous 24h garantie" },
      { text: "Délai de 12h", price: "0.45", tooltip: "Livraison sous 12h garantie" },
      { text: "Délai de 6h", price: "0.60", tooltip: "Livraison sous 6h garantie" }
    ],
    minWords: 1250, // 5 pages
    popular: false
  }
];

// Liste des questions fréquentes
const faqs = [
  {
    question: "Comment sont calculés les prix ?",
    answer: "Nos tarifs sont calculés par mot (environ 250 mots par page standard) pour assurer une tarification plus précise. Les prix varient selon la complexité du document, le niveau académique requis et le délai choisi. Les services express ou urgents sont majorés en raison de la mobilisation de ressources supplémentaires."
  },
  {
    question: "Quelles révisions sont incluses dans mes services ?",
    answer: "Tous nos services incluent une période de révision gratuite de 7 jours. La rédaction et la traduction comprennent deux cycles de révision, tandis que la correction en inclut un. Des révisions supplémentaires sont disponibles moyennant des frais supplémentaires minimes."
  },
  {
    question: "Comment garantissez-vous la qualité de vos services ?",
    answer: "Tous nos rédacteurs, traducteurs et correcteurs sont titulaires de diplômes avancés dans leurs domaines respectifs. Nous utilisons un processus rigoureux incluant une vérification anti-plagiat, une révision par les pairs et un contrôle qualité final avant chaque livraison."
  },
  {
    question: "Puis-je choisir mon rédacteur ou traducteur ?",
    answer: "Oui, pour les projets de grande envergure ou récurrents, vous pouvez demander à travailler avec un expert spécifique. Cette option est particulièrement appréciée pour les thèses, mémoires ou projets nécessitant une continuité de style et d'approche."
  },
  {
    question: "Quelles sont les méthodes de paiement acceptées ?",
    answer: "Nous acceptons les paiements par carte bancaire, PayPal et virement bancaire. Pour les projets importants, nous proposons également un paiement échelonné avec un acompte initial de 50% et le solde à la livraison."
  }
];

// Composant pour afficher les plans
const PricingPage = () => {
  const [activeTab, setActiveTab] = useState("academic");
  
  const filteredPlans = activeTab === "all" 
    ? plans 
    : activeTab === "academic" 
      ? plans.filter(p => ["Rédaction Académique", "Correction et Relecture", "Coaching Académique"].includes(p.name))
      : plans.filter(p => ["Traduction Spécialisée", "Aide à la Publication", "Service Ultra Express"].includes(p.name));

  return (
    <div className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Tarification Transparente
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des services académiques professionnels adaptés à tous les budgets et délais.
            Pas de frais cachés, uniquement des prix clairs et des résultats garantis.
          </p>
          
          {/* Filtres de catégorie */}
          <div className="mt-8 inline-flex p-1 bg-gray-100 rounded-full">
            <button 
              onClick={() => setActiveTab("academic")} 
              className={`px-6 py-2 rounded-full text-sm font-medium ${
                activeTab === "academic" ? "bg-blue-600 text-white shadow-md" : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Services Académiques
            </button>
            <button 
              onClick={() => setActiveTab("professional")} 
              className={`px-6 py-2 rounded-full text-sm font-medium ${
                activeTab === "professional" ? "bg-blue-600 text-white shadow-md" : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Services Professionnels
            </button>
            <button 
              onClick={() => setActiveTab("all")} 
              className={`px-6 py-2 rounded-full text-sm font-medium ${
                activeTab === "all" ? "bg-blue-600 text-white shadow-md" : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Tous les Services
            </button>
          </div>
        </div>

        {/* Section Tarification */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative overflow-hidden bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 flex items-center rounded-bl-lg shadow-md">
                  <Star className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">Populaire</span>
                </div>
              )}
              
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{plan.icon}</span>
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                </div>
                
                <p className="text-gray-600 mb-6 h-14">{plan.description}</p>
                
                {plan.minWords && (
                  <p className="text-gray-500 text-sm mb-4">
                    <strong>Minimum :</strong> {plan.minWords} mots (~{Math.round(plan.minWords/250)} pages)
                  </p>
                )}
                
                <div className="mb-6">
                  <div className="flex items-baseline mb-1">
                    <span className="text-3xl font-bold text-blue-600">
                      {plan.price.includes(".") ? plan.price + "€" : plan.price + "€"}
                    </span>
                    <span className="text-gray-500 ml-1">
                      {plan.price.includes(".") ? "/mot" : "/session"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {plan.price.includes(".") ? `~${(Number(plan.price) * 250).toFixed(0)}€ par page standard` : ""}
                  </p>
                </div>
                
                <div className="mb-8">
                  <p className="font-semibold text-gray-800 mb-2">Options :</p>
                  <ul className="space-y-3">
                    {plan.options.map((option, idx) => (
                      <li key={idx} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-gray-700">{option.text}</span>
                          <div className="relative group ml-1">
                            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-48 shadow-lg">
                              {option.tooltip}
                            </div>
                          </div>
                        </div>
                        <span className="font-medium text-gray-900">
                          {option.price}€{option.price.includes(".") ? "/mot" : ""}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-8">
                  <p className="font-semibold text-gray-800 mb-2">Ce qui est inclus :</p>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-center">
                  <button 
                    onClick={() => window.location.href = "/estimation"} 
                    className="w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center font-medium"
                  >
                    Obtenir une estimation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Garanties */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Nos Garanties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Satisfaction Garantie</h3>
              <p className="text-gray-600">Si vous n'êtes pas satisfait, nous travaillerons gratuitement sur les révisions jusqu'à votre entière satisfaction.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Livraison à Temps</h3>
              <p className="text-gray-600">Nous respectons scrupuleusement les délais convenus. En cas de retard, nous vous offrons une remise de 10%.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Confidentialité Totale</h3>
              <p className="text-gray-600">Vos documents et informations restent strictement confidentiels et ne sont jamais partagés avec des tiers.</p>
            </div>
          </div>
        </div>

        {/* Section FAQ améliorée */}
        <div className="max-w-6xl mx-auto px-4 py-16 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-xl my-16">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
        Questions Fréquentes
      </h2>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Tout ce que vous devez savoir sur nos services académiques professionnels
      </p>
      
      {/* Grille responsive qui s'adapte en fonction de la taille de l'écran */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg h-full">
            <details className="group h-full flex flex-col">
              <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <span className="flex items-center justify-center bg-blue-100 text-blue-600 h-8 w-8 rounded-full mr-3 font-bold">
                    {index + 1}
                  </span>
                  {faq.question}
                </h3>
                <span className="text-blue-500 transform group-open:rotate-180 transition-transform duration-300 flex-shrink-0 ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 pt-2 text-gray-600 border-t border-gray-100">
                <p className="leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          </div>
        ))}
      </div>
    </div>
        
        {/* CTA amélioré */}
        <div className="mt-16 mb-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl py-14 px-8 shadow-xl relative overflow-hidden">
            {/* Éléments décoratifs */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white"></div>
              <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-white"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-6">
                Besoin d'une solution sur mesure ?
              </h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
                Contactez-nous pour discuter de vos besoins spécifiques. Notre équipe d'experts est à votre disposition pour créer une offre adaptée à votre projet académique.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button 
                  onClick={() => window.location.href = "/contact"} 
                  className="px-8 py-4 bg-white text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-300 shadow-md flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Demander un devis personnalisé
                </button>
                
                <button 
                  onClick={() => window.location.href = "/faq"} 
                  className="px-8 py-4 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-300 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  Voir toutes les FAQ
                </button>
              </div>
            </div>
          </div>
          
          {/* Statistique */}
          <div className="mt-10 max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-600">
              Rejoignez plus de <span className="font-bold text-blue-600">5,000+ étudiants</span> qui ont fait confiance à nos services pour leurs projets académiques
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;