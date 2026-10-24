'use client';
import { useState, useEffect } from 'react';
import { FiMessageSquare, FiUser } from 'react-icons/fi';

export default function ChatSidebarEntreprise({ currentUserId, selectedUserId, onUserSelect }) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUserId) {
      fetchConversations();
    }
  }, [currentUserId]);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/conversations/entreprise/${currentUserId}`);
      if (response.ok) {
        const data = await response.json();
        setConversations(data);
      } else {
        console.error('Erreur lors du chargement des conversations');
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatLastMessage = (message) => {
    if (!message) return 'Aucun message';
    if (message.length > 30) {
      return message.substring(0, 30) + '...';
    }
    return message;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Aujourd\'hui';
    if (diffDays === 2) return 'Hier';
    if (diffDays <= 7) return `Il y a ${diffDays - 1} jours`;
    return date.toLocaleDateString('fr-FR');
  };

  if (loading) {
    return (
      <div className="w-80 bg-white border-r border-gray-200 p-4">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
        <p className="text-sm text-gray-500">Conversations avec les chercheurs</p>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <FiMessageSquare className="mx-auto text-4xl mb-2 text-gray-300" />
            <p>Aucune conversation</p>
            <p className="text-sm">Les chercheurs vous contacteront ici</p>
          </div>
        ) : (
          conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => onUserSelect(conversation.targetUserId)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedUserId === conversation.targetUserId ? 'bg-green-50 border-l-4 border-l-green-500' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <FiUser className="text-green-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {conversation.targetUserName || 'Chercheur'}
                    </p>
                    <span className="text-xs text-gray-500">
                      {formatDate(conversation.lastMessageAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {formatLastMessage(conversation.lastMessage)}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 