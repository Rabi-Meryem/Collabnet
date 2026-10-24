export default function BasicPage() {
  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#333', fontSize: '32px', marginBottom: '20px' }}>
        Page Basique
      </h1>
      
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#2563eb', marginBottom: '10px' }}>
          Test de base
        </h2>
        <p style={{ color: '#666', lineHeight: '1.6' }}>
          Si vous voyez cette page avec du style, alors le problème n'est pas avec React ou Next.js.
        </p>
      </div>
      
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#059669', marginBottom: '10px' }}>
          Test API
        </h2>
        <button 
          onClick={async () => {
            try {
              const response = await fetch('/api/projects-entreprise');
              console.log('Status:', response.status);
              
              if (response.ok) {
                const data = await response.json();
                console.log('Data:', data);
                alert(`✅ API fonctionne! ${data.length} projets trouvés`);
              } else {
                const errorText = await response.text();
                console.error('API Error:', errorText);
                alert(`❌ Erreur API: ${response.status} - ${errorText}`);
              }
            } catch (error) {
              console.error('Network Error:', error);
              alert(`❌ Erreur réseau: ${error.message}`);
            }
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#059669',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Tester l'API
        </button>
      </div>
    </div>
  );
} 