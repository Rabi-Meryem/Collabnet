'use client';
import { useState } from 'react';

export default function TestCSSPage() {
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    setTestResult(null);
    
    try {
      console.log('🔍 Test API en cours...');
      const response = await fetch('/api/projects-entreprise');
      console.log('🔍 Status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('🔍 Données:', data);
        setTestResult({
          success: true,
          message: `✅ API fonctionne! ${data.length} projets trouvés`,
          data: data
        });
      } else {
        const errorText = await response.text();
        console.error('❌ Erreur API:', errorText);
        setTestResult({
          success: false,
          message: `❌ Erreur API: ${response.status} - ${errorText}`
        });
      }
    } catch (error) {
      console.error('❌ Erreur réseau:', error);
      setTestResult({
        success: false,
        message: `❌ Erreur réseau: ${error.message}`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="test-container">
      <div className="test-card">
        <h1 style={{ color: '#333', fontSize: '24px', marginBottom: '20px' }}>
          🧪 Test CSS de Base
        </h1>
        
        <div className="test-card">
          <h2 style={{ color: '#007bff', marginBottom: '10px' }}>
            Étape 1: Test de base
          </h2>
          <p style={{ color: '#666', margin: 0 }}>
            ✅ Si vous voyez cette page avec du style, CSS fonctionne correctement.
          </p>
        </div>
        
        <div className="test-card">
          <h2 style={{ color: '#28a745', marginBottom: '10px' }}>
            Étape 2: Test de l'API
          </h2>
          <button 
            onClick={testAPI}
            disabled={loading}
            className="test-button"
          >
            {loading ? '⏳ Test en cours...' : '🔍 Tester l\'API'}
          </button>
        </div>
        
        {testResult && (
          <div className="test-card" style={{
            backgroundColor: testResult.success ? '#d4edda' : '#f8d7da',
            border: `1px solid ${testResult.success ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            <h3 style={{ 
              color: testResult.success ? '#155724' : '#721c24',
              marginBottom: '10px'
            }}>
              Résultat du test
            </h3>
            <p style={{ 
              color: testResult.success ? '#155724' : '#721c24',
              margin: 0,
              fontWeight: 'bold'
            }}>
              {testResult.message}
            </p>
            {testResult.success && testResult.data && (
              <div style={{ marginTop: '10px' }}>
                <p style={{ color: '#155724', fontSize: '14px' }}>
                  <strong>Détails:</strong> {testResult.data.length} projet(s) trouvé(s)
                </p>
                {testResult.data.length > 0 && (
                  <div style={{ marginTop: '10px' }}>
                    <p style={{ color: '#155724', fontSize: '14px', fontWeight: 'bold' }}>
                      Premier projet:
                    </p>
                    <div style={{
                      backgroundColor: '#f8f9fa',
                      padding: '10px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontFamily: 'monospace'
                    }}>
                      <p><strong>Titre:</strong> {testResult.data[0].title}</p>
                      <p><strong>Domaine:</strong> {testResult.data[0].domain}</p>
                      <p><strong>Entreprise:</strong> {testResult.data[0].entreprise?.companyName || 'Inconnue'}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        <div className="test-card" style={{ backgroundColor: '#fff3cd', border: '1px solid #ffeaa7' }}>
          <h3 style={{ color: '#856404', marginBottom: '10px' }}>
            📋 Instructions
          </h3>
          <ul style={{ color: '#856404', margin: 0, paddingLeft: '20px' }}>
            <li>Cliquez sur "Tester l'API" pour vérifier la connexion</li>
            <li>Vérifiez la console du navigateur (F12) pour plus de détails</li>
            <li>Si l'API fonctionne, le problème vient du CSS complexe</li>
            <li>Si l'API ne fonctionne pas, le problème vient de la base de données</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 