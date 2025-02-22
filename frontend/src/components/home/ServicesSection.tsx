import React from 'react';
import { FileText, Languages, CheckCircle, BookOpen, GraduationCap, Clock } from 'lucide-react';

export function ServicesSection() {
  const services = [
    {
      icon: FileText,
      title: "Rédaction Académique",
      description: "Nos experts vous accompagnent dans la rédaction de vos mémoires, thèses et articles scientifiques.",
      features: ["Respect des normes académiques", "Recherche approfondie", "Citations et bibliographie"]
    },
    {
      icon: Languages,
      title: "Traduction Spécialisée",
      description: "Service de traduction professionnelle dans plus de 20 langues pour vos documents académiques.",
      features: ["Traducteurs natifs", "Vocabulaire académique", "Relecture croisée"]
    },
    {
      icon: CheckCircle,
      title: "Correction et Relecture",
      description: "Amélioration de la qualité linguistique et de la cohérence de vos textes.",
      features: ["Correction orthographique", "Style et cohérence", "Suggestions d'amélioration"]
    },
    {
      icon: BookOpen,
      title: "Aide à la Publication",
      description: "Accompagnement pour la publication dans des revues scientifiques.",
      features: ["Formatage selon les normes", "Lettre de présentation", "Réponse aux reviewers"]
    },
    {
      icon: GraduationCap,
      title: "Coaching Académique",
      description: "Conseils personnalisés pour améliorer votre écriture académique.",
      features: ["Sessions individuelles", "Feedback détaillé", "Exercices pratiques"]
    },
    {
      icon: Clock,
      title: "Service Express",
      description: "Traitement prioritaire de vos documents avec des délais courts.",
      features: ["Livraison 24-48h", "Qualité garantie", "Support prioritaire"]
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nos Services Spécialisés
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des solutions complètes pour tous vos besoins en rédaction académique
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <Icon className="h-12 w-12 text-indigo-600 mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}