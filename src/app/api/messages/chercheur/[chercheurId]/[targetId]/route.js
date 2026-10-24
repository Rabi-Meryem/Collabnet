import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const chercheurId = parseInt(params.chercheurId);
    const targetId = parseInt(params.targetId);
    
    if (!chercheurId || !targetId) {
      return NextResponse.json({ error: 'IDs requis' }, { status: 400 });
    }

    // Trouver la conversation entre le chercheur et l'entreprise
    const conversation = await prisma.conversation.findFirst({
      where: {
        OR: [
          {
            chercheurId: chercheurId,
            entrepriseId: targetId
          },
          {
            chercheurId: targetId,
            entrepriseId: chercheurId
          }
        ]
      }
    });

    if (!conversation) {
      return NextResponse.json([]);
    }

    // Récupérer tous les messages de cette conversation
    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversation.id
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' }, 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 