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
        </div>
    </div>
  );
};
export default PricingPage;