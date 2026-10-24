import { NextResponse } from "next/server";
import { prisma } from '../../../../lib/prisma';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    let userId1 = searchParams.get('userId1');
    let userId2 = searchParams.get('userId2');

    if (!userId1 || !userId2) {
      return NextResponse.json({ error: "userId1 et userId2 requis" }, { status: 400 });
    }

    // Forcer l'ID entreprise à 1001 si nécessaire
    if (parseInt(userId1) === 5) {
      userId1 = '1001';
      console.log('🔄 Forcer userId1 à 1001 (entreprise)');
    }
    if (parseInt(userId2) === 5) {
      userId2 = '1001';
      console.log('🔄 Forcer userId2 à 1001 (entreprise)');
    }

    console.log('📨 Récupération des messages pour la conversation:', { userId1, userId2 });

    // Déterminer les types d'utilisateurs
    let user1Type = null;
    let user2Type = null;

    // Debug: Afficher les types d'utilisateurs détectés
    console.log('🔍 Types d\'utilisateurs détectés:', { user1Type, user2Type });

    // Vérifier le type de userId1
    const user1Chercheur = await prisma.chercheur.findUnique({
      where: { id: parseInt(userId1) }
    });
    if (user1Chercheur) {
      user1Type = 'chercheur';
    } else {
      const user1Entreprise = await prisma.entreprise.findUnique({
        where: { id: parseInt(userId1) }
      });
      if (user1Entreprise) {
        user1Type = 'entreprise';
      }
    }

    // Vérifier le type de userId2
    const user2Chercheur = await prisma.chercheur.findUnique({
      where: { id: parseInt(userId2) }
    });
    if (user2Chercheur) {
      user2Type = 'chercheur';
    } else {
      const user2Entreprise = await prisma.entreprise.findUnique({
        where: { id: parseInt(userId2) }
      });
      if (user2Entreprise) {
        user2Type = 'entreprise';
      }
    }

    if (!user1Type || !user2Type) {
      return NextResponse.json({ error: "Types d'utilisateurs non trouvés" }, { status: 400 });
    }

    // Déterminer les IDs pour la conversation - LOGIQUE SIMPLIFIÉE
    let chercheurId, entrepriseId;
    
    // Toujours utiliser le plus petit ID comme chercheurId et le plus grand comme entrepriseId
    const id1 = parseInt(userId1);
    const id2 = parseInt(userId2);
    
    if (id1 <= id2) {
      chercheurId = id1;
      entrepriseId = id2;
    } else {
      chercheurId = id2;
      entrepriseId = id1;
    }
    
    console.log('🔍 IDs simplifiés:', { chercheurId, entrepriseId, id1, id2 });

    console.log('🔍 IDs de conversation déterminés:', { chercheurId, entrepriseId, user1Type, user2Type });

    // Trouver la conversation
    console.log('🔍 Recherche de conversation avec:', { chercheurId, entrepriseId });
    
    const conversation = await prisma.conversation.findFirst({
      where: {
        chercheurId: chercheurId,
        entrepriseId: entrepriseId
      }
    });

    if (!conversation) {
      console.log('❌ Aucune conversation trouvée avec ces IDs');
      
      // Lister toutes les conversations pour debug
      const allConversations = await prisma.conversation.findMany();
      console.log('📋 Toutes les conversations existantes:', allConversations);
      
      return NextResponse.json([]);
    }
    
    console.log('✅ Conversation trouvée:', conversation.id);

    // Récupérer les messages de la conversation
    console.log('🔍 Recherche de messages pour conversation:', conversation.id);
    
    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversation.id
      },
      orderBy: {
        createdAt: 'asc'
      },
      include: {
        conversation: true
      }
    });

    console.log('✅ Messages récupérés:', messages.length);
    console.log('📋 Détails des messages:', messages.map(m => ({
      id: m.id,
      content: m.content,
      senderId: m.senderId,
      receiverId: m.receiverId,
      conversationId: m.conversationId
    })));
    
    return NextResponse.json(messages);

  } catch (error) {
    console.error('❌ Erreur lors de la récupération des messages:', error);
    return NextResponse.json({ error: "Erreur lors de la récupération des messages" }, { status: 500 });
  }
} 