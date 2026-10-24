"use client";
import { useState, useEffect } from "react";

export default function HomePage() {
     const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('🔍 Chargement des projets...');
        const res = await fetch('/api/projects-entreprise');
        console.log('🔍 Status:', res.status);
        
        if (res.ok) {
        const data = await res.json();
          console.log('🔍 Données reçues:', data);
        setProjects(data);
        } else {
          console.error('❌ Erreur API:', res.status);
        }
      } catch (error) {
        console.error("❌ Erreur lors du chargement des projets", error);
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
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen w-full">
      {/* Header simple */}
      <div className="bg-blue-600 text-white p-6">
        <h1 className="text-3xl font-bold">CollabNet</h1>
        <p className="mt-2">Plateforme de collaboration scientifique</p>
      </div>

      {/* Barre de recherche */}
      <div className="flex justify-center my-6">
        <div className="relative w-[80%] max-w-xl">
          <input
            type="text"
            placeholder="Rechercher des projets..."
            className="w-full rounded-full px-4 py-2 border border-gray-300 bg-gray-100 pr-10"
          />
        </div>
      </div>

      {/* Projets des entreprises */}
      <div className="px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Projets disponibles</h2>
        
        {Array.isArray(projects) && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow p-6 border">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {project.description && project.description.length > 100 
                    ? project.description.substring(0, 100) + '...' 
                    : project.description}
                </p>
                <div className="space-y-1 text-sm text-gray-500">
                  <p><strong>Domaine:</strong> {project.domain}</p>
                  <p><strong>TRL:</strong> {project.trl}</p>
                  <p><strong>Budget:</strong> {project.budgetMin} - {project.budgetMax}</p>
                  <p><strong>Entreprise:</strong> {project.entreprise?.companyName || 'Inconnue'}</p>
                </div>
                <div className="flex gap-2 mt-4">
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
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun projet disponible</h3>
            <p className="text-gray-500">Les entreprises publieront bientôt leurs projets ici</p>
          </div>
        )}
      </div>
    </div>
  );
}
