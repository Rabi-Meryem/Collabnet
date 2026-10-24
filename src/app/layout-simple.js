import "./globals.css";

export const metadata = {
  title: "CollabNet - Plateforme de collaboration scientifique",
  description: "Connectez chercheurs et entreprises pour des projets innovants",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, padding: 0, fontFamily: 'Arial, sans-serif' }}>
        {children}
      </body>
    </html>
  );
} 