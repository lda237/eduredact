import { FileText, Languages, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom'; // Importe Link pour la redirection

export function Hero() {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Perfectionnez vos écrits académiques
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Traduction, rédaction, correction et relecture de documents académiques
            par des experts qualifiés.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/login" // Redirige vers la page de connexion
              className="bg-white text-indigo-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100"
            >
              Commencer Maintenant
            </Link>
            <button className="border-2 border-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-indigo-600">
              En savoir plus
            </button>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg">
            <FileText className="h-10 w-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Rédaction</h3>
            <p>Des rédacteurs experts pour vos documents académiques</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg">
            <Languages className="h-10 w-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Traduction</h3>
            <p>Traduction professionnelle dans plusieurs langues</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-lg">
            <CheckCircle className="h-10 w-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Correction</h3>
            <p>Relecture et correction minutieuse de vos textes</p>
          </div>
        </div>
      </div>
    </div>
  );
}