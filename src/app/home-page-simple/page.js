'use client';
import { useState, useEffect } from 'react';

export default function HomePageSimple() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        console.log('🔍 Tentative de récupération des projets...');
        
        const res = await fetch('/api/projects-entreprise');
        console.log('🔍 Status de la réponse:', res.status);
        
        if (res.ok) {
          const data = await res.json();
          console.log('🔍 Données reçues:', data);
          setProjects(data);
        } else {
          const errorText = await res.text();
          console.error('❌ Erreur API:', errorText);
          setError(errorText);
        }
      } catch (error) {
        console.error('❌ Erreur réseau:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des projets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">CollabNet</h1>
          <p className="text-gray-600 mt-2">Plateforme de collaboration scientifique</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">Projets disponibles</h2>
        
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun projet disponible</h3>
            <p className="text-gray-500">Les entreprises publieront bientôt leurs projets ici</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {project.description && project.description.length > 100 
                    ? project.description.substring(0, 100) + '...' 
                    : project.description}
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p><strong>Domaine:</strong> {project.domain}</p>
                  <p><strong>TRL:</strong> {project.trl}</p>
                  <p><strong>Budget:</strong> {project.budgetMin} - {project.budgetMax}</p>
                  <p><strong>Entreprise:</strong> {project.entreprise?.companyName || 'Inconnue'}</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600">
                    Voir détails
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600">
                    Contacter
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 