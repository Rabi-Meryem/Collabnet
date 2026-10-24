'use client';
import { useState, useEffect } from 'react';

export default function TestPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const testAPI = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/projects-entreprise');
        console.log('Response status:', response.status);
        
        if (response.ok) {
          const result = await response.json();
          console.log('API Response:', result);
          setData(result);
        } else {
          const errorText = await response.text();
          console.error('API Error:', errorText);
          setError(errorText);
        }
      } catch (err) {
        console.error('Fetch Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    testAPI();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Page de Test</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Test API</h2>
        
        {loading && (
          <div className="text-blue-600">Chargement en cours...</div>
        )}
        
        {error && (
          <div className="text-red-600 mb-4">
            <strong>Erreur:</strong> {error}
          </div>
        )}
        
        {data && (
          <div className="text-green-600 mb-4">
            <strong>Succès!</strong> {Array.isArray(data) ? `${data.length} projets trouvés` : 'Données reçues'}
          </div>
        )}
        
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Console Logs:</h3>
          <p className="text-sm text-gray-600">Vérifiez la console du navigateur pour plus de détails</p>
        </div>
      </div>
    </div>
  );
} 