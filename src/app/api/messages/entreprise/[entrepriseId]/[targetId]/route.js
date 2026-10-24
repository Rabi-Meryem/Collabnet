import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const entrepriseId = parseInt(params.entrepriseId);
    const targetId = parseInt(params.targetId);
    
    if (!entrepriseId || !targetId) {
      return NextResponse.json({ error: 'IDs requis' }, { status: 400 });
    }

    // Trouver la conversation entre l'entreprise et le chercheur
    const conversation = await prisma.conversation.findFirst({
      where: {
        OR: [
          {
            entrepriseId: entrepriseId,
            chercheurId: targetId
          },
          {
            entrepriseId: targetId,
            chercheurId: entrepriseId
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