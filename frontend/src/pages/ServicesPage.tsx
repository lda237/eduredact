// pages/ServicesPage.tsx
import { useNavigate } from 'react-router-dom';
import { FileText, Languages, CheckCircle, BookOpen, GraduationCap, Clock } from 'lucide-react';


  const services = [
    {
      id: 1,
      icon: FileText,
      title: "Rédaction Académique",
      description: "Service complet de rédaction académique pour vos projets de recherche.",
      features: [
        "Rédaction de thèses et mémoires",
        "Articles scientifiques",
        "Rapports de recherche",
        "Revue de littérature",
        "Méthodologie de recherche",
        "Analyse de données"
      ]
    },
    {
      id: 2,
      icon: Languages,
      title: "Traduction Spécialisée",
      description: "Traduction professionnelle de documents académiques dans plus de 20 langues.",
      features: [
        "Articles scientifiques",
        "Thèses et mémoires",
        "Résumés et abstracts",
        "Présentations académiques",
        "Documents de recherche",
        "Certifications académiques"
      ]
    },
    {
      id: 3,
      icon: CheckCircle,
      title: "Correction et Relecture",
      description: "Service professionnel de correction et relecture pour garantir l'excellence de vos écrits.",
      features: [
        "Correction orthographique",
        "Correction grammaticale",
        "Amélioration du style",
        "Vérification de la cohérence",
        "Formatage académique",
        "Suggestions d'amélioration"
      ]
    },
    {
      id: 4,
      icon: BookOpen,
      title: "Aide à la Publication",
      description: "Accompagnement complet pour la publication dans des revues scientifiques.",
      features: [
        "Sélection de revues",
        "Formatage selon les normes",
        "Lettre de présentation",
        "Réponse aux reviewers",
        "Suivi de publication",
        "Conseils stratégiques"
      ]
    },
    {
      id: 5,
      icon: GraduationCap,
      title: "Coaching Académique",
      description: "Accompagnement personnalisé pour développer vos compétences en rédaction académique.",
      features: [
        "Sessions individuelles",
        "Ateliers d'écriture",
        "Techniques de rédaction",
        "Gestion du temps",
        "Méthodologie",
        "Préparation de soutenance"
      ]
    },
    {
      id: 6,
      icon: Clock,
      title: "Service Express",
      description: "Service accéléré pour vos documents urgents avec la même qualité garantie.",
      features: [
        "Livraison en 24-48h",
        "Traitement prioritaire",
        "Support dédié",
        "Suivi en temps réel",
        "Révisions rapides",
        "Garantie satisfaction"
      ]
    }
  ];

  export const ServicesPage: React.FC = () => {
    const navigate = useNavigate();
  
    return (
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Services Détaillés
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez notre gamme complète de services académiques conçus pour vous accompagner vers l'excellence
            </p>
          </div>
  
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.id} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Icon className="h-12 w-12 text-indigo-600" />
                    </div>
                    <div className="ml-6">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {service.description}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => navigate(`/service/${service.id}`)}
                        className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                      >
                        En savoir plus
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };