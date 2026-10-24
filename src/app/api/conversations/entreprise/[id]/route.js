import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const entrepriseId = parseInt(params.id);
    
    if (!entrepriseId) {
      return NextResponse.json({ error: 'ID entreprise requis' }, { status: 400 });
    }

    // Récupérer toutes les conversations où l'entreprise est impliquée
    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [
          { entrepriseId: entrepriseId },
          { chercheurId: entrepriseId }
        ]
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        },
        entreprise: {
          select: {
            id: true,
            companyName: true
          }
        },
        chercheur: {
          select: {
            id: true,
            fullName: true
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    // Formater les conversations pour l'affichage
    const formattedConversations = conversations.map(conversation => {
      const lastMessage = conversation.messages[0];
      const targetUser = conversation.entrepriseId === entrepriseId 
        ? conversation.chercheur 
        : conversation.entreprise;
      
      return {
        id: conversation.id,
        targetUserId: targetUser.id,
        targetUserName: targetUser.fullName || targetUser.companyName,
        lastMessage: lastMessage?.content || null,
        lastMessageAt: lastMessage?.createdAt || conversation.updatedAt,
        unreadCount: 0 // À implémenter si nécessaire
      };
    });

    return NextResponse.json(formattedConversations);
  } catch (error) {
    console.error('Erreur lors de la récupération des conversations:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' }, 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 