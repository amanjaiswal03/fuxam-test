import React from 'react';
import { BaseWidget } from './BaseWidget';
import { Chat } from '@/lib/mock-data';
import { MessageCircle, User } from 'lucide-react';

interface RecentChatsProps {
  chats: Chat[];
  onDelete?: () => void;
}

export function RecentChats({ chats, onDelete }: RecentChatsProps) {
  return (
    <BaseWidget title="Recent Chats" onDelete={onDelete}>
      <div className="space-y-2">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-medium text-gray-900 text-sm truncate">{chat.name}</h4>
                  {chat.unread > 0 && (
                    <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full ml-2 flex-shrink-0">
                      {chat.unread}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 truncate mb-1">{chat.lastMessage}</p>
                <span className="text-xs text-gray-500">{chat.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
        {chats.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No recent chats</p>
          </div>
        )}
      </div>
    </BaseWidget>
  );
}

