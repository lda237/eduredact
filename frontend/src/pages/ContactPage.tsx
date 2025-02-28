import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Clock, Check, Users, ArrowRight } from 'lucide-react';

export function ContactPage() {
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    loading: false
  });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ loading: true, submitted: false });
    
    // Simuler un envoi de formulaire
    setTimeout(() => {
      setFormStatus({ loading: false, submitted: true });
      // Réinitialiser le formulaire après 3 secondes
      setTimeout(() => {
        setFormStatus({ loading: false, submitted: false });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative bg-indigo-700 text-white py-20">
        <div className="absolute inset-0 bg-indigo-900 opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Comment pouvons-nous vous aider ?
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-indigo-100">
            Notre équipe est à votre écoute pour répondre à toutes vos questions
          </p>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-16 padding">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
            <div className="bg-indigo-100 p-4 rounded-full mb-4">
              <Phone className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Appelez-nous</h3>
            <p className="text-gray-500 mb-4">Nous sommes disponibles du lundi au samedi</p>
            <a href="tel:+33123456789" className="text-indigo-600 font-medium text-lg">+33 1 23 45 67 89</a>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
            <div className="bg-indigo-100 p-4 rounded-full mb-4">
              <Mail className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Écrivez-nous</h3>
            <p className="text-gray-500 mb-4">Réponse garantie sous 24h</p>
            <a href="mailto:contact@eduredact.com" className="text-indigo-600 font-medium text-lg">contact@eduredact.com</a>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
            <div className="bg-indigo-100 p-4 rounded-full mb-4">
              <MapPin className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Visitez-nous</h3>
            <p className="text-gray-500 mb-4">123 Avenue des Champs-Élysées, Paris</p>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-medium flex items-center">
              Voir sur la carte <ArrowRight className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
        
        {/* Content Box */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Left Side - Form */}
            <div className="lg:col-span-3 p-8 lg:p-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Envoyez-nous un message
              </h2>
              
              {formStatus.submitted ? (
                <div className="bg-green-50 border border-green-100 rounded-xl p-8 text-center">
                  <div className="bg-green-100 p-4 rounded-full inline-flex mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message envoyé avec succès !</h3>
                  <p className="text-gray-600">Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais.</p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="devis">Demande de devis</option>
                      <option value="information">Demande d'information</option>
                      <option value="support">Support technique</option>
                      <option value="autre">Autre demande</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={6}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={formStatus.loading}
                    className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex justify-center items-center disabled:bg-indigo-400"
                  >
                    {formStatus.loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours...
                      </>
                    ) : "Envoyer le message"}
                  </button>
                </form>
              )}
            </div>
            
            {/* Right Side - Information */}
            <div className="lg:col-span-2 bg-indigo-700 text-white p-8 lg:p-12 flex flex-col">
              <h2 className="text-2xl font-bold mb-8">Informations</h2>
              
              <div className="space-y-8 flex-grow">
                <div className="flex items-start">
                  <div className="bg-indigo-600 p-3 rounded-lg mr-4">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Horaires d'ouverture</h3>
                    <p className="text-indigo-200">Lun - Ven: 9h00 - 18h00</p>
                    <p className="text-indigo-200">Samedi: 10h00 - 15h00</p>
                    <p className="text-indigo-200">Dimanche: Fermé</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-indigo-600 p-3 rounded-lg mr-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Notre équipe</h3>
                    <p className="text-indigo-200">
                      Une équipe d'experts dédiée pour vous accompagner dans tous vos projets académiques et professionnels.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto pt-8 border-t border-indigo-600">
                <div className="bg-indigo-800 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <MessageSquare className="h-6 w-6 mr-3" />
                    <h3 className="font-medium text-lg">Besoin d'une réponse rapide ?</h3>
                  </div>
                  <p className="text-indigo-200 mb-4">
                    Notre équipe de support est disponible en direct pour vous aider immédiatement.
                  </p>
                  <button className="w-full bg-white text-indigo-700 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
                    Démarrer le chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Questions fréquemment posées
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left mb-10">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">Quel est le délai de traitement de ma demande ?</h3>
              <p className="text-gray-600">Nous traitons toutes les demandes dans un délai de 24 heures ouvrables. Pour les demandes urgentes, utilisez notre chat en direct.</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">Comment puis-je suivre l'avancement de mon projet ?</h3>
              <p className="text-gray-600">Vous recevrez des mises à jour régulières par email. Vous pouvez également consulter votre espace client pour suivre en temps réel l'avancement.</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">Quelles sont les méthodes de paiement acceptées ?</h3>
              <p className="text-gray-600">Nous acceptons les paiements par carte bancaire, PayPal et virement bancaire. Toutes les transactions sont sécurisées.</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">Proposez-vous un service de révision ?</h3>
              <p className="text-gray-600">Oui, nous offrons un service de révision gratuit dans les 10 jours suivant la livraison de votre projet.</p>
            </div>
          </div>
          
          <a href="/faq" className="inline-flex items-center text-indigo-600 font-medium hover:underline">
            Voir toutes les questions <ArrowRight className="h-4 w-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}