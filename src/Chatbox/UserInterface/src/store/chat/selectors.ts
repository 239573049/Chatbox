
import { ChatMessage } from '@/types/message';
import type { ChatState } from './initialState';
import { messageMapKey } from '../utils/messageMapKey';

const getMessageById = (id: string) => (s: ChatState) => {
    return s.content.chatMessages.find(message => message.id === id);
}


const getMeta = (message: ChatMessage) => {
    switch (message.role) {
        case 'user': {
            return {
                avatar: '😀',
            };
        }

        case 'system': {
            return message.meta;
        }

        default: {
            return '🤖';
        }
    }
};

const getChatsWithThread = (s: ChatState, messages: ChatMessage[]) => {
    return messages.filter((m) => !m.threadId);
};


/**
 * Current active raw message list, include thread messages
 */
const activeBaseChats = (s: ChatState): ChatMessage[] => {
    if (!s.activeSessionId) return [];

    const messages = s.content.messagesMap[currentChatKey(s)] || [];

    return messages.map((i) => ({ ...i, meta: getMeta(i) } as ChatMessage));
};


const currentChatKey = (s: ChatState) => messageMapKey(s.activeSessionId ?? '');
/**
 * 排除掉所有 tool 消息，在展示时需要使用
 */
const activeBaseChatsWithoutTool = (s: ChatState) => {
    const messages = activeBaseChats(s);

    return messages.filter((m) => m.role !== 'tool');
};


const mainDisplayChats = (s: ChatState): ChatMessage[] => {
    const displayChats = activeBaseChatsWithoutTool(s);

    return getChatsWithThread(s, displayChats);
};
const mainDisplayChatIDs = (s: ChatState) => mainDisplayChats(s).map((s) => s.id);


const showInboxWelcome = (s: ChatState) => {
    return s.content.chatMessages.length === 0;
}

const isMessageEditing = (id: string) => (s: ChatState) => s.messageEditingIds.includes(id);

const isCurrentChatLoaded = (s: ChatState) => !!s.content.messagesMap[currentChatKey(s)];

const isMessageGenerating = (id: string) => (s: ChatState) => s.messageGeneratingIds.includes(id);

const isMessageInRAGFlow = (id: string) => (s: ChatState) => s.messageGeneratingIds.includes(id);

const isMessageLoading = (id: string) => (s: ChatState) => s.messageGeneratingIds.includes(id);

export const chatSelectors = {
    getMessageById,
    mainDisplayChatIDs,
    showInboxWelcome,
    currentChatKey,
    isCurrentChatLoaded,
    isMessageEditing,
    isMessageGenerating,
    isMessageInRAGFlow,
    isMessageLoading
}


