
import { Award, Users, TrendingUp, Lightbulb, FileCheck, Globe } from 'lucide-react';


  const stats = [
    { number: "98%", label: "Taux de satisfaction" },
    { number: "15k+", label: "Documents traités" },
    { number: "500+", label: "Experts qualifiés" },
    { number: "20+", label: "Langues disponibles" }
  ];

  const processSteps = [
    {
      title: "Expertise Académique",
      description: "Notre équipe est composée d'experts titulaires de doctorats et de professionnels de l'édition académique.",
      icon: Award
    },
    {
      title: "Approche Personnalisée",
      description: "Chaque projet est unique et reçoit une attention particulière adaptée à vos besoins spécifiques.",
      icon: Users
    },
    {
      title: "Innovation Continue",
      description: "Nous utilisons les dernières technologies pour optimiser la qualité et l'efficacité de nos services.",
      icon: TrendingUp
    }
  ];

  const testimonials = [
    {
      quote: "EduRédact a transformé mon manuscrit en un article publié dans une revue prestigieuse. Leur expertise a fait toute la différence.",
      author: "Dr. Sophie Martin",
      role: "Chercheure en Neurosciences",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80"
    },
    {
      quote: "Le service de traduction académique est exceptionnel. La précision et la rapidité sont remarquables.",
      author: "Prof. Thomas Dubois",
      role: "Professeur en Économie",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80"
    }
  ];

  export const AboutPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              L'Excellence Académique Accessible à Tous
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Découvrez comment EduRédact révolutionne l'accompagnement académique en combinant expertise humaine et innovation technologique.
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-indigo-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notre Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous croyons que chaque étudiant et chercheur mérite un accompagnement de qualité pour exprimer pleinement son potentiel académique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-6">
                    <Icon className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Académique */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Notre Impact sur la Recherche Académique
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <FileCheck className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Publications de Qualité
                    </h3>
                    <p className="text-gray-600">
                      Plus de 1000 articles publiés dans des revues internationales grâce à notre accompagnement.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Globe className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Rayonnement International
                    </h3>
                    <p className="text-gray-600">
                      Collaboration avec des chercheurs de plus de 50 pays pour promouvoir la diffusion des connaissances.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Lightbulb className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Innovation Pédagogique
                    </h3>
                    <p className="text-gray-600">
                      Développement continu de méthodes d'accompagnement personnalisées basées sur l'IA.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                alt="Collaboration académique"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Témoignages d'Excellence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {testimonial.author}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Prêt à Exceller dans Vos Projets Académiques ?
          </h2>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Commencer Maintenant
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
              Nous Contacter
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}