'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { startConversation, getCurrentUserInfo } from '../utils/messaging';

export default function ContactButtonChercheur({ 
  targetUserId, 
  targetUserType, 
  className = "w-1/2 border border-gray-300 rounded-full py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition text-center",
  children = "Contact"
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleContact = async () => {
    try {
      setIsLoading(true);
      console.log('🔍 ContactButtonChercheur: Début du processus de contact');
      
      // Vérifier que les paramètres requis sont présents
      if (!targetUserId || !targetUserType) {
        console.error('❌ ContactButtonChercheur: Paramètres manquants:', { targetUserId, targetUserType });
        alert('Erreur: Informations de contact manquantes');
        return;
      }
      
      const currentUser = getCurrentUserInfo();
      console.log('🔍 ContactButtonChercheur: Utilisateur actuel:', currentUser);
      
      if (!currentUser) {
        console.error('❌ ContactButtonChercheur: Aucun utilisateur connecté');
        alert('Veuillez vous connecter pour contacter cette personne');
        return;
      }

      // Vérifier que l'utilisateur est bien un chercheur
      if (currentUser.type !== 'chercheur') {
        console.error('❌ ContactButtonChercheur: Utilisateur non autorisé');
        alert('Cette fonctionnalité est réservée aux chercheurs');
        return;
      }

      // Récupérer les informations du chercheur
      console.log('🔍 ContactButtonChercheur: Récupération du profil chercheur...');
      const userRes = await fetch(`/api/profile/chercheur?email=${currentUser.email}`);
      
      if (!userRes.ok) {
        const errorText = await userRes.text();
        console.error('❌ ContactButtonChercheur: Erreur lors de la récupération du profil:', errorText);
        alert('Erreur lors de la récupération de votre profil. Veuillez vous reconnecter.');
        return;
      }
      
      const currentUserData = await userRes.json();
      console.log('🔍 ContactButtonChercheur: Données chercheur récupérées:', currentUserData);

      // Vérifier que l'utilisateur a un ID valide
      if (!currentUserData.id) {
        console.error('❌ ContactButtonChercheur: ID chercheur manquant');
        alert('Erreur: Impossible de récupérer votre identifiant');
        return;
      }

      console.log('🔍 ContactButtonChercheur Debug:', {
        currentUserData,
        targetUserId,
        targetUserType,
        currentUserType: currentUser.type
      });

      // Vérifier que l'utilisateur ne contacte pas lui-même
      if (currentUserData.id === targetUserId) {
        console.log('❌ ContactButtonChercheur: Tentative de contact avec soi-même');
        alert('Vous ne pouvez pas vous contacter vous-même');
        return;
      }

      // Redirection vers la page de messages chercheur
      const redirectUrl = `/messages-chercheur/${targetUserId}?type=${targetUserType}`;
      console.log('🔍 ContactButtonChercheur - Redirection vers:', redirectUrl);
      window.location.href = redirectUrl;

    } catch (error) {
      console.error('❌ ContactButtonChercheur: Erreur complète:', error);
      
      // Message d'erreur plus spécifique selon le type d'erreur
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        alert('Erreur de connexion au serveur. Vérifiez votre connexion internet.');
      } else {
        alert('Erreur lors du contact. Veuillez réessayer plus tard.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleContact}
      disabled={isLoading}
      className={`${className} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isLoading ? 'Chargement...' : children}
    </button>
  );
} 