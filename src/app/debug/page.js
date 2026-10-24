'use client';

export default function DebugPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: 'blue' }}>Page de Debug</h1>
      <p>Si vous voyez ce texte, React fonctionne correctement.</p>
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <h3>Test de base</h3>
        <p>✅ Page chargée avec succès</p>
        <p>✅ React fonctionne</p>
        <p>✅ Next.js fonctionne</p>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Test API</h3>
        <button 
          onClick={async () => {
            try {
              const response = await fetch('/api/projects-entreprise');
              console.log('API Response:', response.status);
              if (response.ok) {
                const data = await response.json();
                console.log('Data:', data);
                alert(`API OK! ${data.length} projets trouvés`);
              } else {
                alert(`Erreur API: ${response.status}`);
              }
            } catch (error) {
              console.error('Error:', error);
              alert(`Erreur: ${error.message}`);
            }
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Tester l'API
        </button>
      </div>
    </div>
  );
} 