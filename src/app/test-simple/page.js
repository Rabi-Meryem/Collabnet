'use client';
import { useState } from 'react';

export default function TestSimplePage() {
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
    <div style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '30px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          color: '#1f2937',
          fontSize: '28px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          🧪 Test de Diagnostic
        </h1>
        
        <div style={{
          backgroundColor: '#e5f3ff',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #b3d9ff'
        }}>
          <h2 style={{ color: '#1e40af', marginBottom: '10px' }}>
            Étape 1: Test de base
          </h2>
          <p style={{ color: '#374151', margin: 0 }}>
            ✅ Si vous voyez cette page, React et Next.js fonctionnent correctement.
          </p>
        </div>
        
        <div style={{
          backgroundColor: '#f0fdf4',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #bbf7d0'
        }}>
          <h2 style={{ color: '#166534', marginBottom: '10px' }}>
            Étape 2: Test de l'API
          </h2>
          <button 
            onClick={testAPI}
            disabled={loading}
            style={{
              padding: '12px 24px',
              backgroundColor: loading ? '#9ca3af' : '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            {loading ? '⏳ Test en cours...' : '🔍 Tester l\'API'}
          </button>
        </div>
        
        {testResult && (
          <div style={{
            backgroundColor: testResult.success ? '#f0fdf4' : '#fef2f2',
            padding: '15px',
            borderRadius: '8px',
            border: `1px solid ${testResult.success ? '#bbf7d0' : '#fecaca'}`,
            marginTop: '20px'
          }}>
            <h3 style={{ 
              color: testResult.success ? '#166534' : '#dc2626',
              marginBottom: '10px'
            }}>
              Résultat du test
            </h3>
            <p style={{ 
              color: testResult.success ? '#374151' : '#991b1b',
              margin: 0,
              fontWeight: 'bold'
            }}>
              {testResult.message}
            </p>
            {testResult.success && testResult.data && (
              <div style={{ marginTop: '10px' }}>
                <p style={{ color: '#374151', fontSize: '14px' }}>
                  <strong>Détails:</strong> {testResult.data.length} projet(s) trouvé(s)
                </p>
                {testResult.data.length > 0 && (
                  <div style={{ marginTop: '10px' }}>
                    <p style={{ color: '#374151', fontSize: '14px', fontWeight: 'bold' }}>
                      Premier projet:
                    </p>
                    <div style={{
                      backgroundColor: '#f9fafb',
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
        
        <div style={{
          backgroundColor: '#fef3c7',
          padding: '15px',
          borderRadius: '8px',
          marginTop: '20px',
          border: '1px solid #fde68a'
        }}>
          <h3 style={{ color: '#92400e', marginBottom: '10px' }}>
            📋 Instructions
          </h3>
          <ul style={{ color: '#78350f', margin: 0, paddingLeft: '20px' }}>
            <li>Cliquez sur "Tester l'API" pour vérifier la connexion</li>
            <li>Vérifiez la console du navigateur (F12) pour plus de détails</li>
            <li>Si l'API fonctionne, le problème vient du CSS</li>
            <li>Si l'API ne fonctionne pas, le problème vient de la base de données</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 